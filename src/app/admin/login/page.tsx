import Link from "next/link";
import { AdminLogin } from "@/components/admin-login";
import { BrandMark } from "@/components/brand-mark";
import { ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      {/* Background Subtle Watermark */}
      <p className="watermark pointer-events-none -bottom-10 left-10 select-none opacity-[0.015]">
        CREOVATES
      </p>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <BrandMark />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#8e949d] transition-colors hover:text-[#f4f4f2]"
          >
            <ArrowLeft size={13} />
            <span>Site</span>
          </Link>
        </div>

        <div>
          <p className="eyebrow">Studio Management Area</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-.06em] text-[#f4f4f2] md:text-5xl">
            ADMIN <span className="text-[#8e949d]">PORTAL.</span>
          </h1>
          <p className="mt-2 text-xs leading-5 text-[#8e949d]">
            Access project publisher, Cloudinary media pipeline, and website controls.
          </p>
        </div>

        <AdminLogin />
      </div>
    </main>
  );
}
