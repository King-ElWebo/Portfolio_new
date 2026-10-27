import type { ActionFunctionArgs } from "react-router";
import { cloudflareContext } from "~/context";

interface ContactSubmission {
  name?: string;
  email?: string;
  message?: string;
  _gotcha?: string;
  "cf-turnstile-response"?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createMailtoFallback(recipient: string, name: string, email: string, message: string): string {
  const subject = `Projektanfrage — ${name.replace(/[\r\n]+/g, " ")}`;
  const body = `${message}\r\n\r\nAbsender: ${name}\r\nE-Mail: ${email}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

interface ResolvedEnv {
  contactRecipient: string;
  contactFrom: string;
  resendApiKey?: string;
  turnstileSecret?: string;
}

function resolveEnvironment(context: ActionFunctionArgs["context"]): ResolvedEnv {
  let cfEnv: Record<string, string | undefined> | undefined;
  try {
    cfEnv = context?.get?.(cloudflareContext)?.env as Record<string, string | undefined> | undefined;
  } catch {
    // context.get throws if context wasn't registered
  }

  const globalEnv = globalThis as unknown as Record<string, any>;
  const procEnv = typeof process !== "undefined" ? process.env : undefined;

  const contactRecipient =
    cfEnv?.CONTACT_RECIPIENT_EMAIL ||
    globalEnv?.CONTACT_RECIPIENT_EMAIL ||
    procEnv?.CONTACT_RECIPIENT_EMAIL ||
    "office@bywilk.at";

  const contactFrom =
    cfEnv?.CONTACT_FROM_EMAIL ||
    globalEnv?.CONTACT_FROM_EMAIL ||
    procEnv?.CONTACT_FROM_EMAIL ||
    "WILK Portfolio <contact@bywilk.at>";

  const resendApiKey =
    cfEnv?.RESEND_API_KEY ||
    globalEnv?.RESEND_API_KEY ||
    procEnv?.RESEND_API_KEY;

  const turnstileSecret =
    cfEnv?.TURNSTILE_SECRET_KEY ||
    globalEnv?.TURNSTILE_SECRET_KEY ||
    procEnv?.TURNSTILE_SECRET_KEY;

  return {
    contactRecipient,
    contactFrom,
    resendApiKey,
    turnstileSecret,
  };
}

export async function action({ request, context }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json(
      { success: false, error: "method_not_allowed", message: "Method not allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  // 1. Parse payload (JSON or FormData)
  let data: ContactSubmission = {};
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      data = (await request.json()) as ContactSubmission;
    } else {
      const formData = await request.formData();
      data = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        message: String(formData.get("message") || ""),
        _gotcha: String(formData.get("_gotcha") || ""),
        "cf-turnstile-response": String(formData.get("cf-turnstile-response") || ""),
      };
    }
  } catch {
    return Response.json(
      { success: false, error: "bad_request", message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }

  // 2. Anti-Spam: Honeypot check
  if (data._gotcha && data._gotcha.trim().length > 0) {
    // Silent success for automated bots
    return Response.json({ success: true, message: "OK" });
  }

  // 3. Validation
  const rawName = String(data.name || "").trim();
  const rawEmail = String(data.email || "").trim().toLowerCase();
  const rawMessage = String(data.message || "").trim();

  const errors: Record<string, string> = {};

  if (!rawName || rawName.length < 2) {
    errors.name = "Bitte gib deinen Namen an (mindestens 2 Zeichen).";
  } else if (rawName.length > 120) {
    errors.name = "Der Name darf maximal 120 Zeichen lang sein.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!rawEmail || !emailRegex.test(rawEmail) || rawEmail.length > 254) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse an.";
  }

  if (!rawMessage || rawMessage.length < 10) {
    errors.message = "Bitte gib eine Nachricht ein (mindestens 10 Zeichen).";
  } else if (rawMessage.length > 3000) {
    errors.message = "Die Nachricht darf maximal 3.000 Zeichen lang sein.";
  }

  // 4. Resolve environment bindings
  const { contactRecipient, contactFrom, resendApiKey, turnstileSecret } =
    resolveEnvironment(context);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      {
        success: false,
        error: "validation",
        errors,
        mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
      },
      { status: 400 }
    );
  }

  // 5. Anti-Spam: Cloudflare Turnstile verification (only when client token flow is active)
  const turnstileToken = data["cf-turnstile-response"]?.trim();
  if (turnstileSecret && turnstileToken) {
    try {
      const clientIp = request.headers.get("cf-connecting-ip") || "";
      const turnstileVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: clientIp,
        }),
      });

      const outcome = (await turnstileVerify.json()) as { success: boolean };
      if (!outcome.success) {
        return Response.json(
          {
            success: false,
            error: "turnstile_failed",
            message: "Sicherheitsprüfung fehlgeschlagen. Bitte versuche es erneut.",
            mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
          },
          { status: 400 }
        );
      }
    } catch {
      // In case of timeout connecting to siteverify endpoint, fail safely
      return Response.json(
        {
          success: false,
          error: "turnstile_timeout",
          message: "Sicherheitsdienst vorübergehend nicht erreichbar. Bitte nutze den E-Mail-Entwurf.",
          mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
        },
        { status: 504 }
      );
    }
  }

  // 6. Check if Resend API key is configured
  if (!resendApiKey || resendApiKey.trim() === "" || resendApiKey.startsWith("placeholder")) {
    return Response.json(
      {
        success: false,
        error: "service_unconfigured",
        message:
          "Der automatische E-Mail-Dienst ist derzeit serverseitig noch nicht vollständig konfiguriert. Bitte nutze den vorbereiteten E-Mail-Entwurf an office@bywilk.at.",
        mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
      },
      { status: 503 }
    );
  }

  // 7. Transmit transactional email via Resend API
  // Prevent CRLF injection into subject header
  const cleanSubject = `Portfolio-Anfrage: ${rawName.replace(/[\r\n]+/g, " ")}`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactRecipient],
        reply_to: rawEmail,
        subject: cleanSubject,
        text: `Name: ${rawName}\nE-Mail: ${rawEmail}\n\nNachricht:\n${rawMessage}\n\n---\nÜbermittelt über das Kontaktformular auf https://bywilk.at`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; padding: 24px; background: #ffffff;">
            <div style="border-bottom: 2px solid #ebbf87; padding-bottom: 12px; margin-bottom: 20px;">
              <span style="font-size: 11px; letter-spacing: 0.1em; color: #888; text-transform: uppercase;">WILK Portfolio // Kontaktanfrage</span>
              <h2 style="margin: 6px 0 0 0; font-size: 20px; color: #0d0e11;">Neue Nachricht von ${escapeHtml(rawName)}</h2>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 4px 0; font-size: 14px;"><strong>Absender:</strong> ${escapeHtml(rawName)}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(rawEmail)}" style="color: #5f4114;">${escapeHtml(rawEmail)}</a></p>
            </div>
            <div style="background: #f7f6f2; border-left: 3px solid #ebbf87; padding: 16px; margin: 20px 0; border-radius: 2px;">
              <h4 style="margin: 0 0 8px 0; font-size: 12px; letter-spacing: 0.08em; color: #666; text-transform: uppercase;">Nachrichteninhalt:</h4>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #222;">${escapeHtml(rawMessage)}</p>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">
              Du kannst direkt auf diese E-Mail antworten, um ${escapeHtml(rawName)} (<a href="mailto:${escapeHtml(rawEmail)}">${escapeHtml(rawEmail)}</a>) zu kontaktieren.
            </p>
          </div>
        `,
      }),
    });

    const resendData = (await resendResponse.json().catch(() => null)) as {
      id?: string;
      name?: string;
      message?: string;
      statusCode?: number;
    } | null;

    if (!resendResponse.ok) {
      if (resendResponse.status === 429) {
        return Response.json(
          {
            success: false,
            error: "rate_limit",
            message: "Zu viele Anfragen in kurzer Zeit. Bitte warte einen Moment oder nutze den direkten E-Mail-Entwurf.",
            mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
          },
          { status: 429 }
        );
      }

      if (resendResponse.status === 401 || resendResponse.status === 403) {
        return Response.json(
          {
            success: false,
            error: "auth_error",
            message: "Der E-Mail-Dienst konnte serverseitig nicht autorisiert werden. Bitte nutze den direkten E-Mail-Entwurf an office@bywilk.at.",
            mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
          },
          { status: 502 }
        );
      }

      return Response.json(
        {
          success: false,
          error: "delivery_failed",
          message: "Die E-Mail konnte nicht über den Dienst zugestellt werden. Bitte nutze stattdessen den direkten E-Mail-Entwurf.",
          mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
        },
        { status: 502 }
      );
    }

    // Verify Resend contract: returns { id: string } (can be UUID or msg_ prefix)
    const validId = typeof resendData?.id === "string" && resendData.id.trim().length > 0;
    if (!validId) {
      return Response.json(
        {
          success: false,
          error: "unconfirmed_delivery",
          message: "Der Versand konnte vom E-Mail-Dienst nicht bestätigt werden. Bitte nutze den direkten E-Mail-Entwurf.",
          mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
        },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      id: resendData.id,
      message: "Vielen Dank! Deine Nachricht wurde erfolgreich übermittelt. Ich melde mich so bald wie möglich.",
    });
  } catch {
    return Response.json(
      {
        success: false,
        error: "network_error",
        message: "Ein technischer Übertragungsfehler ist aufgetreten. Bitte nutze den direkten E-Mail-Entwurf.",
        mailto: createMailtoFallback(contactRecipient, rawName, rawEmail, rawMessage),
      },
      { status: 502 }
    );
  }
}
