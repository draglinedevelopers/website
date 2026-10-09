/**
 * Approved-accounts check for the Keystatic CMS (used by app/api/keystatic/[...params]/route.ts).
 *
 * Access to the CMS requires BOTH:
 *   1. write access to the GitHub repo (enforced by GitHub itself), and
 *   2. the GitHub username being listed in KEYSTATIC_ALLOWED_GITHUB_USERS (comma-separated).
 * The check runs whenever Keystatic issues a session (login and every token refresh), so removing a
 * name from the list ends that person's access within one token lifetime (about 8 hours) at most.
 * With no names configured, nobody can log in (fails closed).
 */
const ACCESS_COOKIE = "keystatic-gh-access-token";
const REFRESH_COOKIE = "keystatic-gh-refresh-token";
const SESSION_ROUTES = ["github/oauth/callback", "github/refresh-token"];

const allowedUsers = () =>
  (process.env.KEYSTATIC_ALLOWED_GITHUB_USERS ?? "")
    .split(",")
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean);

const expired = (name: string) => `${name}=; Path=/; Max-Age=0; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;

function deny(message: string) {
  const headers = new Headers({ "Content-Type": "text/html; charset=utf-8" });
  headers.append("Set-Cookie", expired(ACCESS_COOKIE));
  headers.append("Set-Cookie", expired(REFRESH_COOKIE));
  const body = `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Access denied</title>
<body style="font-family:system-ui,sans-serif;max-width:520px;margin:80px auto;padding:0 24px;line-height:1.6">
<h1 style="font-size:24px">This GitHub account can’t use the CMS</h1><p>${message}</p>
<p>Ask the site owner to approve your account, then <a href="/keystatic">try again</a>.</p></body>`;
  return new Response(body, { status: 403, headers });
}

/** Revoke a token we refuse, so it can't be used directly against GitHub either. */
async function revoke(token: string) {
  const id = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const secret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  if (!id || !secret) return;
  await fetch(`https://api.github.com/applications/${id}/token`, {
    method: "DELETE",
    headers: { Authorization: `Basic ${btoa(`${id}:${secret}`)}`, Accept: "application/vnd.github+json" },
    body: JSON.stringify({ access_token: token }),
  }).catch(() => {});
}

export async function guard(req: Request, handler: (req: Request) => Promise<Response>) {
  // Local storage mode edits files on disk: development only, never in production.
  if (process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local" && process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const res = await handler(req);
  const path = new URL(req.url).pathname.replace(/^\/api\/keystatic\//, "");
  if (!SESSION_ROUTES.includes(path)) return res;

  const tokenCookie = res.headers.getSetCookie().find((c) => c.startsWith(`${ACCESS_COOKIE}=`));
  if (!tokenCookie) return res; // no session issued (e.g. an error page from Keystatic)
  const token = decodeURIComponent(tokenCookie.slice(ACCESS_COOKIE.length + 1).split(";")[0]);

  const allowed = allowedUsers();
  if (!allowed.length) {
    await revoke(token);
    return deny("No approved accounts have been configured for this site yet.");
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  const login = userRes.ok ? String(((await userRes.json()) as { login?: string }).login ?? "").toLowerCase() : "";
  if (!login || !allowed.includes(login)) {
    await revoke(token);
    return deny(login ? `The account <strong>@${login}</strong> isn’t on the approved list.` : "We couldn’t verify your GitHub account.");
  }
  return res;
}

