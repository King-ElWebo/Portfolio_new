import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  // Root index handler: locale detection and redirect to /de or /en
  index("routes/_index.tsx"),

  // Contact API endpoint for server action handling
  route("api/contact", "routes/api.contact.ts"),

  // Locale-prefixed routes: /de, /en
  ...prefix(":locale", [
    index("routes/home.tsx"),
    route("work", "routes/work.tsx"),
    route("work/:slug", "routes/case-study.tsx"),
    route("contact", "routes/contact.tsx"),
    // Legal routes
    route("impressum", "routes/impressum.tsx"),
    route("legal-notice", "routes/legal-notice.tsx"),
    route("datenschutz", "routes/datenschutz.tsx"),
    route("privacy", "routes/privacy.tsx"),
  ]),
] satisfies RouteConfig;
