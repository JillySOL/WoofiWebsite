import { useState, useEffect } from 'react';
import Image from 'next/image';

const SHOW_CONTRACT_BOX = true; // Set to true to show the contract box after launch

const Header = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText('D3S1AW1Tj1BbQVCo34D9frJDoD81dU8YRCPhbtUUpump');
    setCopied(true);
  };

  return (
    <header className="fixed left-0 w-full z-50 px-4 py-2" style={{ top: '5.5%' }}>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          {SHOW_CONTRACT_BOX && (
            <div className="relative">
              <Image 
                src="/images/logos/CA BOX.png" 
                alt="Contract Address Box" 
                width={160} 
                height={48} 
                className="w-auto h-12 object-contain"
              />
              <button
                onClick={handleCopy}
                className="absolute right-10 top-1/2 -translate-y-1/2 flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
                style={{ zIndex: 2 }}
              >
                <Image 
                  src={copied ? "/images/logos/Copied_butt_01.png" : "/images/logos/copy_butt01.png"} 
                  alt={copied ? "Copied" : "Copy"} 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 object-contain"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 