import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Edify Management Consultancy | Strategic Excellence",
    template: "%s | Edify EMC",
  },
  description:
    "Edify Management Consultancy (EMC) delivers world-class strategic advisory, organisational transformation, and leadership development solutions.",
  keywords: ["management consultancy", "strategy", "business transformation", "Edify EMC"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edifyemc.com",
    siteName: "Edify Management Consultancy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${playfair.variable} dark`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
