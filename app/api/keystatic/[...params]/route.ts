import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "../../../../keystatic.config";
import { guard } from "@/lib/keystatic-access";

/** Keystatic API (GitHub login, token refresh), wrapped in the approved-accounts check (lib/keystatic-access.ts). */
// Created on first request rather than at import: Keystatic throws when the GitHub app secrets are
// missing, and that must not break `next build` (or the rest of the site) before they are configured.
let handlers: ReturnType<typeof makeRouteHandler> | null = null;
const keystatic = () => (handlers ??= makeRouteHandler({ config: keystaticConfig }));

const notConfigured = () =>
  new Response("The CMS isn’t set up on this deployment yet (missing Keystatic GitHub app environment variables).", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

function handle(method: "GET" | "POST") {
  return (req: Request) => {
    let handler: (req: Request) => Promise<Response>;
    try {
      handler = keystatic()[method];
    } catch {
      return notConfigured();
    }
    return guard(req, handler);
  };
}

export const GET = handle("GET");
export const POST = handle("POST");
