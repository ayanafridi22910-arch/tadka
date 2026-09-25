import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (client components).
 * Server-side requests should use the server client in server.ts.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
