import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isGerman = location.pathname.startsWith("/de");
  const locale = isGerman ? "de" : "en";

  return (
    <html lang={locale} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "An unexpected error occurred.";
  let details = "Please return to the homepage or try again later.";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.status === 404 ? "Page Not Found" : "Application Error";
    details = error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#0c0d10",
        color: "#f4f4f6",
      }}
    >
      <p style={{ fontFamily: "var(--font-mono)", color: "#d48b47", marginBottom: "1rem" }}>
        STATUS // {status}
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.5rem",
          fontWeight: 400,
          marginBottom: "1rem",
        }}
      >
        {message}
      </h1>
      <p style={{ color: "#9da3af", maxWidth: "45ch", marginBottom: "2rem" }}>
        {details}
      </p>
      {(() => {
        const isDe = typeof location !== "undefined" && location?.pathname?.startsWith("/de");
        return (
          <a
            href={isDe ? "/de" : "/en"}
            style={{
              display: "inline-flex",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#f4f4f6",
              color: "#0c0d10",
              borderRadius: "4px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {isDe ? "Zurück zur Startseite" : "Return to Portfolio"}
          </a>
        );
      })()}
    </main>
  );
}
