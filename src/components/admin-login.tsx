"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight, ShieldAlert } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-white/[.08] bg-[#0d0f12] p-7 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[.14em] text-[#8e949d]">
            Admin Access Key / Password
          </label>
          <div className="relative mt-2.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8e949d]">
              <Lock size={16} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password from .env.local"
              className="block w-full rounded-lg border border-white/[.12] bg-[#08090b] py-3.5 pl-10 pr-11 text-sm text-[#f4f4f2] placeholder-[#8e949d]/40 outline-none transition focus:border-[#4b83ee] focus:ring-1 focus:ring-[#4b83ee]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#8e949d] transition-colors hover:text-[#f4f4f2]"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-[#8e949d]/60">
            Default set in <code className="rounded bg-white/[.06] px-1 py-0.5 text-[#f4f4f2]">.env.local</code> as <code className="text-[#4b83ee]">ADMIN_PASSWORD</code>
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-[#e05252]/20 bg-[#e05252]/10 p-3 text-xs text-[#e05252]">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#4b83ee] py-3.5 text-xs font-bold uppercase tracking-[.14em] text-white transition-all hover:bg-[#3d6fd4] hover:shadow-lg disabled:opacity-50"
        >
          <span>{loading ? "Authenticating..." : "Unlock Studio Admin"}</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </form>
    </div>
  );
}
