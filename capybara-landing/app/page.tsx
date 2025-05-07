"use client";

import Header from "@/components/Header";
import ScrollableContent from "@/components/ScrollableContent";
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="m-0 p-0">
      <Header />
      <ScrollableContent />
      {/* Social Links - Bottom Left (Corrected) */}
      <div className="fixed bottom-6 left-4 z-[51] flex space-x-3">
        <Link
          href="https://dexscreener.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          legacyBehavior>
          <Image src="/images/logos/dex-screener-logo-png_seeklogo-527276-removebg-preview.png" alt="DexScreener" width={40} height={40} />
        </Link>
        <Link
          href="https://telegram.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          legacyBehavior>
          <Image src="/images/logos/telegram-xxl.png" alt="Telegram" width={40} height={40} />
        </Link>
        <Link
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          legacyBehavior>
          <Image src="/images/logos/twitter-xxl.png" alt="Twitter" width={40} height={40} />
        </Link>
      </div>
    </main>
  );
}
