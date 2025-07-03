import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsacapy.com"),
  title: "Capy: The Chillest Memecoin on Solana",
  description: "Dripped in top tier design and backed by a wild community, Capy is the token you didn't know you needed. Join the capyverse.",
  openGraph: {
    title: "Capy: The Chillest Memecoin on Solana",
    description: "Dripped in top tier design and backed by a wild community, Capy is the token you didn't know you needed. Join the capyverse.",
    url: "https://itsacapy.com/",
    type: "website",
    images: [
      {
        url: "/images/banner.JPG",
        width: 1200,
        height: 630,
        alt: "Capy Social Share Banner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Capy: The Chillest Memecoin on Solana",
    description: "Dripped in top tier design and backed by a wild community, Capy is the token you didn't know you needed. Join the capyverse.",
    images: [
      "/images/banner.JPG"
    ],
    site: "@itsacapy"
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/favicon/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/images/favicon/android-chrome-192x192.png', sizes: '192x192' }, 
      { rel: 'icon', url: '/images/favicon/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
