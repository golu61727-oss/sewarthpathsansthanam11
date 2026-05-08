import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sewarth Path Sansthanam | सेवार्थ पथ संस्थानम्",
  description:
    "A registered public charitable trust working for education, health, social welfare and cultural preservation. Reg. No. 202200996052093",
  keywords: "NGO, Varanasi, charity, seva, volunteer, donate, सेवार्थ",
  openGraph: {
    title: "Sewarth Path Sansthanam",
    description: "सेवा परमो धर्म — Service is the Highest Dharma",
    url: "https://sewarthpathsansthanam.org",
    siteName: "Sewarth Path Sansthanam",
    locale: "hi_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>{children}</body>
    </html>
  );
}
