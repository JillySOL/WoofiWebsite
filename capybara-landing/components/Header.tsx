import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_DISPLAY } from '../constants/links';

const Header = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="text-white font-luckiest-guy text-xl md:text-2xl">Caby</div>
          <div className="bg-gray-800/70 border border-gray-700/80 text-gray-300 px-3 py-2 rounded-lg text-xs flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded-sm flex-shrink-0"></div>
            <span className="truncate font-mono">Contract: {CONTRACT_ADDRESS_DISPLAY}</span>
            <button
              className={`text-xs text-white px-2 py-1 rounded-md flex items-center gap-1 transition-colors duration-200 flex-shrink-0 ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-black/50 border border-gray-600 hover:bg-gray-700'}`}
              onClick={() => {
                navigator.clipboard.writeText(CONTRACT_ADDRESS);
                setCopied(true);
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 