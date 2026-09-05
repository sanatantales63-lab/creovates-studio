import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const ADMIN_COOKIE_NAME = "creovates_admin_session";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "creovates2026";
}

/**
 * Validates admin access via either:
 * 1. Admin Password session cookie (.env ADMIN_PASSWORD)
 * 2. Supabase Authenticated User Session
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  // Check 1: Custom admin session cookie matches expected value
  if (sessionCookie && sessionCookie.value === "authorized_admin_session") {
    return true;
  }

  // Check 2: Supabase authenticated user
  if (hasSupabaseConfig) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // Ignore in read-only route
              }
            },
          },
        }
      );
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) return true;
    } catch {
      // Fallback
    }
  }

  return false;
}

export async function requireAdmin() {
  const authed = await isAuthenticatedAdmin();
  if (!authed) {
    redirect("/admin/login");
  }
  return true;
}
