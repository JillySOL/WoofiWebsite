"use client";

import { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

const SCROLL_THRESHOLD_PX = 10;
const INACTIVITY_TIMEOUT_MS = 1000;
const SCROLL_AMOUNT_PX = 300;
const SCROLL_ANIMATION_DURATION_MS = 350; // Estimated duration for smooth scroll

const hotspots = [
  { label: "Community", top: "57.7%", left: "9.7%", href: "/community" },
  { label: "Documentation", top: "53.9%", left: "22.5%", href: "/documentation" },
  { label: "Tokenomics", top: "55.8%", left: "78.9%", href: "/tokenomics" },
  { label: "CA", top: "25.8%", left: "52.5%", href: "/ca" },
  { label: "FAQ", top: "55.0%", left: "33.7%", href: "/faq" },
];

const ScrollableContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const showArrowsAfterDelay = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      setShowLeftIndicator(el.scrollLeft > SCROLL_THRESHOLD_PX);
      setShowRightIndicator(el.scrollLeft < el.scrollWidth - el.clientWidth - SCROLL_THRESHOLD_PX);
    }, INACTIVITY_TIMEOUT_MS);
  };
  
  const hideArrows = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowLeftIndicator(false);
    setShowRightIndicator(false);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;

    showArrowsAfterDelay();

    const handleScroll = () => {
      hideArrows();
      showArrowsAfterDelay();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  const startScrolling = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    hideArrows();

    const scrollAmount = direction === 'left' ? -SCROLL_AMOUNT_PX : SCROLL_AMOUNT_PX;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    setTimeout(() => {
        showArrowsAfterDelay();
    }, SCROLL_ANIMATION_DURATION_MS);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden m-0 p-0"
      style={{ overscrollBehaviorX: "none" }}
    >
      <div
        ref={scrollRef}
        className="h-full w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        <div className="h-full w-max relative">
          <img
            src="/images/capywebbanner2.jpg"
            alt="Capybara Banner"
            className="h-full w-auto block object-contain"
            style={{
              maxWidth: "none",
              height: "100%",
              width: "auto",
            }}
          />

          <div className="absolute top-0 left-0 w-full h-full z-10">
            {hotspots.map((spot, idx) => (
              <div
                key={idx}
                className="absolute z-10 group"
                style={{
                  top: spot.top,
                  left: spot.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {
                  spot.label === "CA" ? (
                    // Custom CA Display
                    <div className="relative group">
                      <div className="w-4 h-4 rounded-full bg-white shadow-lg animate-buzz transition-transform group-hover:scale-110 cursor-pointer" />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                        <div className="flex flex-col items-center p-2 min-w-[200px]">
                          <span className="font-semibold mb-1">CONTRACT:</span>
                          <span className="font-mono text-xs break-all mb-2">37iwfsqgntsafshobtbzqghwsttkwazw3yvzgjwkn6ik</span>
                          <button
                            className="text-xs text-black bg-white border border-gray-600 px-2 py-1 rounded hover:bg-gray-200 pointer-events-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText("37iwfsqgntsafshobtbzqghwsttkwazw3yvzgjwkn6ik");
                              // Consider adding feedback here
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Default Link Display for other hotspots
                    <Link href={spot.href} className="block p-4">
                      <div className="w-4 h-4 rounded-full bg-white shadow-lg animate-buzz transition-transform group-hover:scale-110 cursor-pointer" />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                        {spot.label}
                      </div>
                    </Link>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLeftIndicator && (
        <button
          onClick={() => startScrolling('left')}
          onTouchStart={() => startScrolling('left')}
          className="fixed left-2 top-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-110 cursor-pointer"
        >
          <Image src="/images/ArrowLeft.png" alt="Scroll Left" width={64} height={64} />
        </button>
      )}

      {showRightIndicator && (
        <button
          onClick={() => startScrolling('right')}
          onTouchStart={() => startScrolling('right')}
          className="fixed right-2 top-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-110 cursor-pointer"
        >
          <Image src="/images/ArrowRight.png" alt="Scroll Right" width={64} height={64} />
        </button>
      )}
    </div>
  );
};

export default ScrollableContent;
