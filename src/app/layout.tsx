import type { Metadata, Viewport } from "next";
import { Inter, Montserrat_Alternates } from "next/font/google";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { site } from "@/data/site";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat-alternates",
  display: "swap",
});

const title = `${site.name} | ${site.tagline}`;
const description =
  "Principal software engineer in Avon, CT building fast, modern websites and practical AI for Connecticut businesses: AI assistants, automation and AI strategy.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#07060f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline theme script sets data-theme on <html>
    // before React hydrates, so that attribute intentionally differs from the server.
    <html
      lang="en"
      className={`${inter.variable} ${montserratAlternates.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
