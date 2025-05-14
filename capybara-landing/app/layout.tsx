import type { Metadata } from "next";
import { Inter, Luckiest_Guy } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-luckiest-guy',
});

export const metadata: Metadata = {
  title: "CAPY",
  description: "The official landing page for CAPY.",
  openGraph: {
    title: "CAPY",
    description: "The official landing page for CAPY.",
    url: "https://yourdomain.com/",
    type: "website",
    images: [
      {
        url: "https://pbs.twimg.com/profile_banners/1893067822604881920/1740417427/1500x500",
        width: 1500,
        height: 500,
        alt: "CAPY Social Share Banner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CAPY",
    description: "The official landing page for CAPY.",
    images: [
      "https://pbs.twimg.com/profile_banners/1893067822604881920/1740417427/1500x500"
    ],
    site: "@itsacapy"
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${luckiestGuy.className}`}>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
