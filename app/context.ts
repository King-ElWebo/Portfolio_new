import { createContext } from "react-router";

export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export const cloudflareContext = createContext<{
  env: Env;
  ctx: ExecutionContext;
}>();
