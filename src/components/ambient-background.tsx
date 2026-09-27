"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry";

export function AmbientBackground() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {/* J&T-style Ambient Drifting Sapphire Glow Blobs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div
          className="animate-blob-1 absolute -top-[10%] -left-[10%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(75, 131, 238, 0.08) 0%, rgba(75, 131, 238, 0.025) 45%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob-2 absolute top-[35%] -right-[12%] w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96, 165, 250, 0.07) 0%, rgba(75, 131, 238, 0.02) 45%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob-3 absolute -bottom-[15%] left-[20%] w-[650px] h-[650px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(75, 131, 238, 0.065) 0%, rgba(75, 131, 238, 0.015) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating WhatsApp Button (hidden on admin routes) */}
      {!isAdmin && (
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:scale-110 transition-all duration-300 group"
        >
          <span className="absolute -top-10 right-0 whitespace-nowrap rounded-full bg-[#101216] border border-white/15 px-3 py-1 text-xs font-medium text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-lg">
            Chat with us
          </span>
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        </a>
      )}
    </>
  );
}
