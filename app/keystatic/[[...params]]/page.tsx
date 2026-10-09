import { connection } from "next/server";
import { Suspense } from "react";

/** Marks the admin as rendered per request (it's a client-side app for signed-in editors). */
async function RequestTime() {
  await connection();
  return null;
}

// The Keystatic admin UI itself is rendered by app/keystatic/layout.tsx; this page only claims the routes.
export default function KeystaticPage() {
  return (
    <Suspense fallback={null}>
      <RequestTime />
    </Suspense>
  );
}
