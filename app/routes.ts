import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  // Root index handler: locale detection and redirect to /de or /en
  index("routes/_index.tsx"),

  // Locale-prefixed routes: /de, /en
  ...prefix(":locale", [
    index("routes/home.tsx"),
    route("work", "routes/work.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;
