// file: components/IntroVideoOverlay.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import ThemedModal from './ThemedModal';
import WoofiModalContent1 from './WoofiModalContent1';
import WoofiModalContent2 from './WoofiModalContent2';

export default function IntroVideoOverlay({
  showIntro,
  setShowIntro,
  videoSrc = "/videos/IMG_3895.MP4"
}: {
  showIntro: boolean,
  setShowIntro: (show: boolean) => void,
  videoSrc?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [closing, setClosing] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleClose = () => setOpenIndex(null);

  const closeIntro = () => {
    setClosing(true);
    setTimeout(() => {
      setShowIntro(false);
      setClosing(false);
      setPercent(0);
    }, 500); // match your CSS transition-duration
  };

  useEffect(() => {
    if (!showIntro) return;
    const vid = videoRef.current!;
    let rafId: number;
    let endTimer: number;

    const updateProgress = () => {
      if (vid.duration) {
        setPercent((vid.currentTime / vid.duration) * 100);
      }
      if (!vid.paused && !vid.ended) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    const onLoadedData = () => {
      setPercent(0);
      setIsLoading(false);

      vid
        .play()
        .then(() => {
          updateProgress();
          if (vid.duration > 0.5) {
            endTimer = window.setTimeout(
              closeIntro,
              (vid.duration - 0.5) * 1000
            );
          }
        })
        .catch((err) => {
          console.warn("Autoplay prevented:", err);
        });
    };

    const onTimeUpdate = () => {
      if (vid.duration) {
        setPercent((vid.currentTime / vid.duration) * 100);
      }
    };

    const onPause = () => cancelAnimationFrame(rafId);
    const onEnded = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(endTimer);
      closeIntro();
    };

    vid.addEventListener("loadeddata", onLoadedData);
    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(endTimer);
      vid.removeEventListener("loadeddata", onLoadedData);
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("ended", onEnded);
    };
  }, [showIntro]);

  if (!showIntro && !closing) return null;

  return (
    <>
      {showIntro && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black ${isLoading ? "bg-opacity-100" : "bg-opacity-75"}
            backdrop-blur-sm
            transition-opacity duration-500
            ${closing ? "opacity-0" : "opacity-100"}
          `}
        >
          <div className="relative max-w-[90vw] max-h-[80vh]"
            onClick={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              preload="auto"
              autoPlay
              muted
              playsInline
              controls
              className="block rounded-2xl w-full h-auto z-10"
              onError={(e) => {
                console.error("Video error:", e);
                closeIntro();
              }}
              onClick={(e) => e.preventDefault()}
            />
            {/* No hotspots or hotspot CSS here */}
            {/* Modals for each hotspot */}
            {openIndex === 0 && (
              <ThemedModal
                open={true}
                onClose={handleClose}
                title="Meet Woofi"
                body={<WoofiModalContent1 />}
                imageSrc="/images/logos/PIC_Woofi.png"
              />
            )}
            {openIndex === 1 && (
              <ThemedModal
                open={true}
                onClose={handleClose}
                title="Save the Dogs"
                body={<WoofiModalContent2 />}
                imageSrc="/images/logos/CA BOX.png"
              />
            )}
            {openIndex === 2 && (
              <ThemedModal
                open={true}
                onClose={handleClose}
                title="Coming Soon"
                body={<div style={{ fontFamily: 'Arial, sans-serif' }}>Coming soon</div>}
              />
            )}
            {openIndex === 3 && (
              <ThemedModal
                open={true}
                onClose={handleClose}
                title="DexScreener"
                body={<a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer">Open DexScreener</a>}
              />
            )}
            {/* progress bar - using direct updates */}
            <div 
              className="w-full h-1 mt-2 bg-gray-700 rounded-full overflow-hidden pointer-events-none select-none touch-none"
              role="presentation"
              aria-hidden="true"
            >
              <div
                className="h-full bg-white pointer-events-none select-none touch-none"
                style={{ 
                  width: `${percent}%`,
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              />
            </div>
            {/* skip */}
            {!isLoading && (
              <button
                onClick={closeIntro}
                className="
                  absolute top-2 right-2 px-3 py-1
                  bg-white text-black rounded-full
                  shadow-lg hover:bg-gray-200 transition
                "
              >
                Skip
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
