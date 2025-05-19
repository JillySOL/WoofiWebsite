// file: components/IntroVideoOverlay.tsx
"use client";
import { useRef, useEffect, useState } from "react";

export default function IntroVideoOverlay({
  videoSrc = "/videos/LoadingVideop.mp4"
}: { videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [closing, setClosing] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const closeIntro = () => {
    setClosing(true);
    setTimeout(() => {
      setShowIntro(false);
      setClosing(false);
      setPercent(0);
    }, 500); // match your CSS transition-duration
  };

  const playIntro = () => {
    setPercent(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setShowIntro(true);
    setClosing(false);
    setIsLoading(true);
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
              className="block rounded-2xl w-full h-auto"
              onError={(e) => {
                console.error("Video error:", e);
                closeIntro();
              }}
              onClick={(e) => e.preventDefault()}
            />

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

      {!showIntro && !closing && (
        <button
          onClick={playIntro}
          className="
            fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full
            bg-black text-white font-bold shadow-lg
            hover:scale-105 transition-all text-lg
          "
        >
          ▶ Play Video
        </button>
      )}
    </>
  );
}
