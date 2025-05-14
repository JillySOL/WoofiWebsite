// file: components/IntroVideoOverlay.tsx
"use client";
import { useRef, useEffect, useState } from "react";

export default function IntroVideoOverlay({
  videoSrc = "/videos/LoadingVideop.mp4"
}: { videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("introPlayed") !== "true";
  });
  const [closing, setClosing] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const closeIntro = () => {
    setClosing(true);
    setTimeout(() => {
      setShowIntro(false);
      setClosing(false);
      localStorage.setItem("introPlayed", "true");
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

    // updates percent at ~60fps
    const updateProgress = () => {
      if (vid.duration) {
        setPercent((vid.currentTime / vid.duration) * 100);
      }
      if (!vid.paused && !vid.ended) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    // hide spinner, start playback & RAF
    const onLoadedData = () => {
      setPercent(0);
      setIsLoading(false);

      // play() returns a promise; when it resolves, playback has started
      vid
        .play()
        .then(() => {
          updateProgress();
          // schedule auto-close 0.5s before end
          if (vid.duration > 0.5) {
            endTimer = window.setTimeout(
              closeIntro,
              (vid.duration - 0.5) * 1000
            );
          }
        })
        .catch((err) => {
          console.warn("Autoplay prevented:", err);
          // if blocked, you could show a "▶" overlay on the video itself
        });
    };

    const onPause = () => cancelAnimationFrame(rafId);
    const onEnded = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(endTimer);
      closeIntro();
    };

    vid.addEventListener("loadeddata", onLoadedData);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(endTimer);
      vid.removeEventListener("loadeddata", onLoadedData);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("ended", onEnded);
    };
  }, [showIntro]);

  const shouldShowButton = !showIntro && !closing;

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
          <div className="relative max-w-[90vw] max-h-[80vh]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-100 rounded-2xl">
                <div className="text-white text-xl font-bold animate-pulse">
                  Loading...
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              src={videoSrc}
              preload="auto"
              autoPlay
              muted
              playsInline
              className="block rounded-2xl w-full h-auto"
            />

            {/* progress bar */}
            <div className="w-full h-1 mt-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-[width] duration-100 ease-linear"
                style={{ width: `${percent}%` }}
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

      {shouldShowButton && (
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
