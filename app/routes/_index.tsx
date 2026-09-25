import { redirect, type LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  // Detect if German is preferred in the browser accept-language header
  const isGerman = /^(de|de-)/i.test(acceptLanguage) || acceptLanguage.toLowerCase().includes("de");
  const targetLocale = isGerman ? "de" : "en";

  return redirect(`/${targetLocale}`);
}

export default function RootIndex() {
  return null;
}
