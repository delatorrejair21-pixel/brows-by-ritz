import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Brows by Ritz | Luxury Brow & Lip Blush Artist",
  description:
    "Luxury permanent makeup artist specializing in ombré brows, nano brows, combo brows, brow touchups, lip blush, and lip refresh. Soft, natural, customized results.",
  keywords:
    "brows by ritz, microshading, ombré brows, nano brows, combo brows, lip blush, permanent makeup, luxury brow artist",
  openGraph: {
    title: "Brows by Ritz | Luxury Brow & Lip Blush Artist",
    description:
      "Specializing in ombré brows, nano brows, combo brows, touchups, and lip blush with a soft, elegant, customized finish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F5F2] text-[#111] antialiased">
        {children}
      </body>
    </html>
  );
}
