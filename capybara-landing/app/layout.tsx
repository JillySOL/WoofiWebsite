import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsacapy.com"),
  title: "Woofi: The Genius Dog",
  description: "Woof with us, save the dogs! Discover the puppy who's changing the way we help and make money at the same time.",
  openGraph: {
    title: "Woofi: The Genius Dog",
    description: "Woof with us, save the dogs! Discover the puppy who's changing the way we help and make money at the same time.",
    url: "https://itsacapy.com/",
    type: "website",
    images: [
      {
        url: "/images/logos/PIC_Woofi.png",
        width: 1200,
        height: 630,
        alt: "Woofi Social Share Banner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Woofi: The Genius Dog",
    description: "Woof with us, save the dogs! Discover the puppy who's changing the way we help and make money at the same time.",
    images: [
      "/images/logos/PIC_Woofi.png"
    ]
  },
  icons: {
    icon: [
      { url: '/images/favicon/FAV-Icon.png', sizes: 'any' }
    ],
    apple: '/images/favicon/FAV-Icon.png',
    other: [
      { rel: 'icon', url: '/images/favicon/FAV-Icon.png', sizes: '192x192' }, 
      { rel: 'icon', url: '/images/favicon/FAV-Icon.png', sizes: '512x512' },
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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif' }}>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
