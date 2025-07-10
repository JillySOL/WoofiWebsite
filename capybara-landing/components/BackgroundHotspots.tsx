import React, { useState } from "react";
import ThemedModal from "./ThemedModal";
import WoofiModalContent1 from "./WoofiModalContent1";
import WoofiModalContent2 from "./WoofiModalContent2";

const hotspots = [
  {
    top: '25%', left: '35%', width: '14%', height: '20%', label: 'Meet Woofi',
    modal: {
      title: 'Meet Woofi',
      body: <WoofiModalContent1 />, imageSrc: '/images/logos/PIC_Woofi.png'
    }
  },
  {
    top: '55%', left: '51%', width: '14.2%', height: '21%', label: 'Save the Dogs',
    modal: {
      title: 'Save the Dogs',
      body: <WoofiModalContent2 />, imageSrc: '/images/logos/CA BOX.png'
    }
  },
  {
    top: '27%', left: '52%', width: '11%', height: '15%', label: 'Coming Soon',
    modal: {
      title: 'Coming Soon',
      body: <div style={{ fontFamily: 'Arial, sans-serif' }}>Coming soon</div>
    }
  },
  {
    top: '70%', left: '38.5%', width: '10%', height: '14%', label: 'DexScreener',
    modal: {
      title: 'DexScreener',
      body: <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer">Open DexScreener</a>
    }
  },
];

const BackgroundHotspots: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.18; box-shadow: 0 0 0 0 rgba(80,80,80,0.10); }
          50% { opacity: 0.38; box-shadow: 0 0 16px 8px rgba(80,80,80,0.13); }
          100% { opacity: 0.18; box-shadow: 0 0 0 0 rgba(80,80,80,0.10); }
        }
        .bg-hotspot {
          position: absolute;
          background: rgba(255, 255, 255, 0.18);
          border: 2.5px solid rgba(80, 80, 80, 0.18);
          border-radius: 50%;
          box-shadow: 0 2px 12px 2px rgba(80, 80, 80, 0.10), 0 0 0 2px rgba(255,255,255,0.10) inset;
          cursor: pointer;
          z-index: 30;
          transition: background 0.2s, box-shadow 0.2s, border 0.2s;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2.5s infinite;
        }
        .bg-hotspot:focus,
        .bg-hotspot:hover {
          background: rgba(255, 255, 255, 0.55);
          border: 2.5px solid rgba(80, 80, 80, 0.32);
          box-shadow: 0 6px 32px 8px rgba(80, 80, 80, 0.18), 0 0 0 6px rgba(255,255,255,0.22) inset;
          opacity: 1.0;
          animation: none;
        }
      `}</style>
      {hotspots.map((h, i) => (
        <div
          key={i}
          className="bg-hotspot"
          style={{
            top: h.top,
            left: h.left,
            width: h.width,
            height: h.height,
          }}
          tabIndex={0}
          aria-label={h.label}
          onClick={() => setOpenIndex(i)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpenIndex(i); }}
        />
      ))}
      {openIndex !== null && (
        <ThemedModal
          open={true}
          onClose={() => setOpenIndex(null)}
          title={hotspots[openIndex].modal.title}
          body={hotspots[openIndex].modal.body}
          imageSrc={hotspots[openIndex].modal.imageSrc}
        />
      )}
    </>
  );
};

export default BackgroundHotspots; 