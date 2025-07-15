import React, { useState, useEffect } from "react";
import ThemedModal from "./ThemedModal";
import WoofiModalContent1 from "./WoofiModalContent1";
import WoofiModalContent2 from "./WoofiModalContent2";
import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_DISPLAY } from '../constants/links';

const copyIcon = '/images/logos/COPY ICON.png';
const roadmapImg = '/roadmap.PNG';
const dexscreenerImg = '/images/logos/dex-screener-logo-png_seeklogo-527276-removebg-preview.png';

const DEXSCREENER_URL = 'https://dexscreener.com/solana/5UF9Q7tdkGnZy8MoMrYqe6tcAZJbSaNWMGuUnJajmoon';
const TWITTER_URL = 'https://x.com/wooficoin';
const TELEGRAM_URL = 'https://t.me/+RdMGm9WTD5kyOTUx';

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
      body: (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', maxWidth: '2000px', margin: '0 auto' }}>
          Woofi is pioneering the next generation of socially conscious memes, we're saving the world's puppies through Solana.<br /><br />
          <span style={{ fontFamily: '"Gamja Flower", cursive', fontSize: '1.2em' }}>Merging web 2 and web 3</span>
          <div style={{ margin: '2.5rem 0 0 0' }}>
            <img src={roadmapImg} alt="Woofi Roadmap" style={{ maxWidth: '100%', width: '100%', height: 'auto', borderRadius: 12 }} />
          </div>
        </div>
      ),
      imageSrc: undefined // Remove CA Box image
    }
  },
  {
    top: '70%', left: '38.5%', width: '10%', height: '14%', label: 'Roadmap', // Now the roadmap modal
    modal: {
      title: '', // No title for Coming Soon
      body: (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', color: '#222', textAlign: 'center', padding: '2.5rem 0', fontWeight: 600, letterSpacing: '0.01em' }}>
          <span style={{ fontSize: '2.2rem', marginRight: 10 }}>🚧</span> More features and updates are coming soon!
        </div>
      ),
      imageSrc: undefined
    }
  },
  {
    top: '27%', left: '52%', width: '11%', height: '15%', label: 'DexScreener',
    modal: {
      title: 'DexScreener',
      body: (
        <DexScreenerModal />
      ),
      imageSrc: undefined // Remove CA Box image
    }
  },
];

function DexScreenerModal() {
  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
  };
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16, marginTop: 12 }}>
        <span style={{ fontFamily: 'monospace', fontSize: '1em', background: '#f4f4f4', borderRadius: 6, padding: '2px 8px' }}>{CONTRACT_ADDRESS_DISPLAY}</span>
        <button onClick={handleCopy} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Copy contract address">
          <img src={copyIcon} alt="Copy" style={{ width: 35, height: 35, verticalAlign: 'middle' }} />
        </button>
      </div>
      <a href={DEXSCREENER_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 12 }}>
        <img src={dexscreenerImg} alt="DexScreener" style={{ width: 180, height: 'auto', borderRadius: 10 }} />
      </a>
    </div>
  );
}

const BackgroundHotspots: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure smooth transition after video loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.18; box-shadow: 0 0 0 0 rgba(80,80,80,0.10); }
          50% { opacity: 0.38; box-shadow: 0 0 16px 8px rgba(80,80,80,0.13); }
          100% { opacity: 0.18; box-shadow: 0 0 0 0 rgba(80,80,80,0.10); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
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
          opacity: 0;
          transform: scale(0.8);
          animation: fadeIn 0.6s ease-out forwards, pulse 2.5s infinite 0.6s;
        }
        .bg-hotspot.visible {
          opacity: 1;
          transform: scale(1);
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
          className={`bg-hotspot ${isVisible ? 'visible' : ''}`}
          style={{
            top: h.top,
            left: h.left,
            width: h.width,
            height: h.height,
            animationDelay: `${0.6 + (i * 0.1)}s`, // Stagger the animations
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
          maxWidth={openIndex === 1 ? '3000px' : undefined}
        />
      )}
    </>
  );
};

export default BackgroundHotspots; 