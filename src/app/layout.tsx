import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { PageLoader } from "@/components/page-loader";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

export const metadata: Metadata = { metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://creovates.com"), title:{default:"Creovates. — Premium Digital Studio",template:"%s — Creovates."}, description:"Creovates designs and builds considered websites and digital experiences for ambitious brands.", openGraph:{type:"website",siteName:"Creovates.",title:"Creovates. — Premium Digital Studio",description:"Where Creativity Meets Innovation."}, twitter:{card:"summary_large_image"} };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <PageLoader />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
