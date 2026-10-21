import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ConsultationProvider } from "@/components/providers/ConsultationProvider";
import ChatWidget from "@/components/chatbot/ChatWidget";
import ImageProtection from "@/components/common/ImageProtection";

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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ConsultationProvider>
          <ImageProtection />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
          {/* <ChatWidget /> */}
        </ConsultationProvider>
      </body>
    </html>
  );
}

