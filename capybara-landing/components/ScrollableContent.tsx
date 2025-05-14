/*
UPDATED: Always fit by width on portrait/mobile, preserve desktop logic intact
*/

"use client";

import { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { overlays, Overlay, OverlayLayer } from "./bannerOverlays";
import IntroVideoOverlay from "./IntroVideoOverlay";

const SCROLL_THRESHOLD_PX = 10;
const INACTIVITY_TIMEOUT_MS = 1000;
const SCROLL_AMOUNT_PX = 300;
const SCROLL_ANIMATION_DURATION_MS = 350;
const SCROLL_INTERVAL_MS = 100;

const ScrollableContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [fillByWidth, setFillByWidth] = useState(false);
  const typedOverlays: Overlay[] = overlays;
  const [scrollInterval, setScrollInterval] = useState<number | undefined>(undefined);

  const showArrowsAfterDelay = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      setShowLeftIndicator(el.scrollLeft > SCROLL_THRESHOLD_PX);
      setShowRightIndicator(
        el.scrollLeft < el.scrollWidth - el.clientWidth - SCROLL_THRESHOLD_PX
      );
    }, INACTIVITY_TIMEOUT_MS);
  };

  const hideArrows = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowLeftIndicator(false);
    setShowRightIndicator(false);
  };

  useEffect(() => {
    const el = scrollRef.current;
    const imgEl = imgRef.current;
    if (!el || !imgEl) return;

    const handleResizeOrLoad = () => {
      // Always use the "best fit" logic, regardless of portrait or landscape:
      const { naturalWidth, naturalHeight } = imgEl;
      const heightScale      = el.clientHeight / naturalHeight;
      const widthAtHeight    = naturalWidth * heightScale;
    
      // If widthAtHeight < containerWidth → fill by width, else fill by height
      setFillByWidth(widthAtHeight < el.clientWidth);
    
      // Center horizontally
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    
      showArrowsAfterDelay();
    };

    const handleScroll = () => {
      hideArrows();
      showArrowsAfterDelay();
    };

    // Initial and event-triggered layout recalcs
    handleResizeOrLoad();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResizeOrLoad);
    imgEl.addEventListener("load", handleResizeOrLoad);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResizeOrLoad);
      imgEl.removeEventListener("load", handleResizeOrLoad);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  const startScrolling = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    hideArrows();
    const delta = direction === 'left' ? -SCROLL_AMOUNT_PX : SCROLL_AMOUNT_PX;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    setTimeout(showArrowsAfterDelay, SCROLL_ANIMATION_DURATION_MS);
  };

  // start auto‐scrolling left or right
  const onZoneEnter = (direction: 'left'|'right') => {
    if (scrollInterval) window.clearInterval(scrollInterval);
    const id = window.setInterval(() => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -SCROLL_AMOUNT_PX : SCROLL_AMOUNT_PX, behavior: 'smooth' });
    }, SCROLL_INTERVAL_MS);
    setScrollInterval(id);
  };

  // stop auto‐scrolling
  const onZoneLeave = () => {
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
      setScrollInterval(undefined);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollInterval) window.clearInterval(scrollInterval);
    };
  }, [scrollInterval]);

  return (
    <>
      <IntroVideoOverlay videoSrc="/videos/LoadingVideop.mp4" />
      <div
        ref={scrollRef}
        className="relative h-screen w-screen overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
        style={{
          touchAction: 'pan-x pinch-zoom',
          WebkitOverflowScrolling: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Desktop hover scroll zones */}
        <div
          className="hidden md:block absolute left-0 top-0 h-full w-1/6 z-30 cursor-w-resize"
          onMouseEnter={() => onZoneEnter('left')}
          onMouseLeave={onZoneLeave}
        />
        <div
          className="hidden md:block absolute right-0 top-0 h-full w-1/6 z-30 cursor-e-resize"
          onMouseEnter={() => onZoneEnter('right')}
          onMouseLeave={onZoneLeave}
        />

        <div className="h-full w-max relative">
          <Image
            ref={imgRef}
            src="/images/2560x1440.png"
            alt="Capybara Banner"
            className="block"
            aria-hidden="true"
            width={2560}
            height={1440}
            style={{
              width: fillByWidth ? '100vw' : 'auto',
              height: fillByWidth ? 'auto' : '100vh',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />

          <div className="absolute top-0 left-0 w-full h-full z-10">
            {typedOverlays.map((overlay, idx) => (
              <Link
                key={idx}
                href={overlay.href}
                className="absolute group"
                style={{ top: overlay.top, left: overlay.left, transform: 'translate(-50%, -50%)', zIndex: 10 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {overlay.layers.map((layer: OverlayLayer, lidx: number) => {
                  const isHovered = hoveredIdx === idx;
                  const highlightClass = isHovered ? 'highlighted' : '';
                  if (layer.type === 'animation' && layer.format === 'webm') {
                    return (
                      <video
                        key={lidx}
                        src={layer.src}
                        width={layer.width}
                        height={layer.height}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`capy-animation ${highlightClass}`}
                        style={{ zIndex: layer.zIndex }}
                      />
                    );
                  }
                  if (layer.type === 'image' && layer.format === 'png') {
                    return (
                      <Image
                        key={lidx}
                        src={layer.src}
                        width={layer.width}
                        height={layer.height}
                        alt={overlay.label}
                        className={`capy-animation ${highlightClass}`}
                        style={{ zIndex: layer.zIndex }}
                      />
                    );
                  }
                  return null;
                })}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                  {overlay.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {showLeftIndicator && (
          <button
            onClick={() => startScrolling('left')}
            onTouchStart={() => startScrolling('left')}
            className="fixed left-2 top-1/2 -translate-y-1/2 z-40 transition-transform hover:scale-110 cursor-pointer"
          >
            <Image src="/images/ArrowLeft.png" alt="Scroll Left" width={64} height={64} />
          </button>
        )}

        {showRightIndicator && (
          <button
            onClick={() => startScrolling('right')}
            onTouchStart={() => startScrolling('right')}
            className="fixed right-2 top-1/2 -translate-y-1/2 z-40 transition-transform hover:scale-110 cursor-pointer"
          >
            <Image src="/images/ArrowRight.png" alt="Scroll Right" width={64} height={64} />
          </button>
        )}
      </div>
    </>
  );
};

export default ScrollableContent;
