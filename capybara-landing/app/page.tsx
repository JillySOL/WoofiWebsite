"use client";

import Header from "@/components/Header";
import ScrollableContent from "@/components/ScrollableContent";
import Image from 'next/image'
import Link from 'next/link'
import { SOCIAL_LINKS } from '../constants/links';
import { useState } from 'react';
import IntroVideoOverlay from '@/components/IntroVideoOverlay';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  return (
    <main className="m-0 p-0">
      <Header />
      <IntroVideoOverlay showIntro={showIntro} setShowIntro={setShowIntro} />
      <ScrollableContent />
      {/* Social Links - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[51] flex flex-row items-end gap-4">
        <Link
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image src="/images/logos/telegram.png" alt="Telegram" width={64} height={64} className="w-16 h-16 object-contain" />
        </Link>
        <Link
          href={SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image src="/images/logos/twitter.png" alt="Twitter" width={64} height={64} className="w-16 h-16 object-contain" />
        </Link>
        <Link
          href={SOCIAL_LINKS.dexscreener}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image src="/images/logos/dex-screener-logo-png_seeklogo-527276-removebg-preview.png" alt="DexScreener" width={64} height={64} className="w-16 h-16 object-contain" />
        </Link>
        {/* Play Video Button */}
        <button
          id="play-video-btn"
          className="hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center"
          style={{ background: 'none', border: 'none', padding: 0 }}
          onClick={() => setShowIntro(true)}
        >
          <Image src="/images/logos/video.png" alt="Play Video" width={64} height={64} className="w-16 h-16 object-contain" />
        </button>
      </div>
    </main>
  );
}
