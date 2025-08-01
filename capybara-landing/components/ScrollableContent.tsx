/*
UPDATED: Always fit by width on portrait/mobile, preserve desktop logic intact
*/

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { overlays, Overlay, OverlayLayer } from "./bannerOverlays";
import BackgroundHotspots from "./BackgroundHotspots";

//const SCROLL_AMOUNT_PX = 300;
const SCROLL_ANIMATION_DURATION_MS = 350;

const ScrollableContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLVideoElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [fillByWidth, setFillByWidth] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canPan, setCanPan] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const typedOverlays: Overlay[] = overlays;

  const updateScrollIndicators = () => {
    const el = scrollRef.current;
    if (!el) return;
    
    const containerWidth = el.clientWidth;
    const contentWidth = el.scrollWidth;
    const widthRatio = contentWidth / containerWidth;
    
    // Only show indicators if content is more than 20% wider than container
    if (widthRatio > 1.2) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const currentScroll = el.scrollLeft;
      const scrollThreshold = maxScroll / 4; // 25% threshold for position detection

      // Determine position
      const isLeft = currentScroll < scrollThreshold;
      const isRight = currentScroll > (maxScroll - scrollThreshold);
      const isCenter = !isLeft && !isRight;

      // Show appropriate buttons based on position
      setShowLeftIndicator(isCenter || isRight);
      setShowRightIndicator(isCenter || isLeft);
    } else {
      setShowLeftIndicator(false);
      setShowRightIndicator(false);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    const imgEl = imgRef.current;
    if (!el || !imgEl) return;

    const handleScroll = () => {
      updateScrollIndicators();
    };

    const handleResizeOrLoad = () => {
      const { videoWidth, videoHeight } = imgEl;
      const heightScale = el.clientHeight / videoHeight;
      const widthAtHeight = videoWidth * heightScale;
      setFillByWidth(widthAtHeight < el.clientWidth);
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      updateScrollIndicators();
      // Update canPan
      const containerWidth = el.clientWidth;
      const contentWidth = el.scrollWidth;
      const widthRatio = contentWidth / containerWidth;
      setCanPan(widthRatio > 1.2);
    };

    const handleVideoLoad = () => {
      setVideoLoading(false);
      setVideoLoaded(true);
      handleResizeOrLoad();
    };

    const handleVideoError = () => {
      setVideoLoading(false);
      setVideoLoaded(true); // Still show content even if video fails
      handleResizeOrLoad();
    };

    handleResizeOrLoad();
    window.addEventListener("resize", handleResizeOrLoad);
    imgEl.addEventListener("loadeddata", handleVideoLoad);
    imgEl.addEventListener("error", handleVideoError);
    el.addEventListener("scroll", handleScroll, { passive: true });

    // If video is already loaded (e.g. on fast reload), center immediately
    if (imgEl.readyState >= 2) {
      handleVideoLoad();
    }

    return () => {
      window.removeEventListener("resize", handleResizeOrLoad);
      imgEl.removeEventListener("loadeddata", handleVideoLoad);
      imgEl.removeEventListener("error", handleVideoError);
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startScrolling = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;
    const scrollThreshold = maxScroll / 4;

    let targetScroll;
    if (direction === 'left') {
      // If we're on the right, go to center. If we're in center, go to left
      targetScroll = currentScroll > (maxScroll - scrollThreshold) ? maxScroll / 2 : 0;
    } else {
      // If we're on the left, go to center. If we're in center, go to right
      targetScroll = currentScroll < scrollThreshold ? maxScroll / 2 : maxScroll;
    }

    el.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setTimeout(updateScrollIndicators, SCROLL_ANIMATION_DURATION_MS);
  };

  // Drag/Swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || !canPan) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = canPan ? 'grab' : 'default';
    }
  }, [canPan]);

  // For window event listener, use MouseEvent type
  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !scrollRef.current || !canPan) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, canPan, startX, scrollLeft]);

  // ... keep handleMouseMove for React events ...
  //const handleMouseMove = (e: React.MouseEvent) => {
  //  if (!isDragging || !scrollRef.current || !canPan) return;
  //  e.preventDefault();
  //  const x = e.pageX - scrollRef.current.offsetLeft;
  //  const walk = (x - startX) * 2;
  //  scrollRef.current.scrollLeft = scrollLeft - walk;
  //};

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current || !canPan) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current || !canPan) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [handleMouseUp, handleGlobalMouseMove]);

  return (
    <>
      <div
        ref={scrollRef}
        className="relative h-screen w-screen overflow-hidden scrollbar-none"
        style={{
          scrollBehavior: 'smooth',
          overflowX: 'hidden',
          userSelect: 'none',
          touchAction: canPan ? 'none' : 'auto',
          cursor: canPan ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full w-max relative">
          {/* Loading overlay */}
          {videoLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <div className="text-white text-lg font-semibold">Loading Woofi...</div>
                <div className="text-white text-sm opacity-75 mt-2">Preparing your experience</div>
              </div>
            </div>
          )}
          
          <video
            ref={imgRef}
            src="/videos/Woofi.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="block"
            style={{
              width: fillByWidth ? '100vw' : 'auto',
              height: fillByWidth ? 'auto' : '100vh',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          
          {/* Only show hotspots when video is loaded */}
          {videoLoaded && <BackgroundHotspots />}
          
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
        
        {/* Scroll indicators - only show when video is loaded */}
        {videoLoaded && (
          <>
            {showLeftIndicator && (
              <button
                onClick={() => startScrolling('left')}
                className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hover:opacity-80 transition-all duration-200"
                aria-label="Scroll left"
              >
                <Image src="/images/ArrowLeft.png" alt="Left" width={48} height={48} />
              </button>
            )}
            {showRightIndicator && (
              <button
                onClick={() => startScrolling('right')}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hover:opacity-80 transition-all duration-200"
                aria-label="Scroll right"
              >
                <Image src="/images/ArrowRight.png" alt="Right" width={48} height={48} />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ScrollableContent;
