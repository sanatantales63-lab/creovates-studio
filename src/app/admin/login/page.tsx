import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AdminLogin } from "@/components/admin-login";
import { BrandMark } from "@/components/brand-mark";

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 bg-[#08090b] text-white">
      {/* Ambient Radial Glow & Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(75, 131, 238, 0.32) 0%, rgba(29, 78, 216, 0.1) 42%, transparent 70%),
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <BrandMark />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#b0b5be] transition-all hover:border-[#4b83ee] hover:text-white"
          >
            <ArrowLeft size={13} />
            <span>Back to Site</span>
          </Link>
        </div>

        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-4">
            <Sparkles size={12} />
            Studio Management Area
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Admin{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              portal
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#8e949d]">
            Access the project publisher, one-click URL screenshot importer,
            Cloudinary media pipeline, and client enquiries.
          </p>
        </div>

        <AdminLogin />
      </div>
    </main>
  );
}
