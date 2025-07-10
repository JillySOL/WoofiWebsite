import React, { useState } from 'react';
import PulseDot from './PulseDot';
import ThemedModal from './ThemedModal';
import WoofiModalContent1 from './WoofiModalContent1';
import WoofiModalContent2 from './WoofiModalContent2';

// Example dot data
const dots = [
  {
    x: 0.31,
    y: 0.38,
    type: 'modal1',
    title: 'Meet Woofi',
    imageSrc: '/images/logos/PIC_Woofi.png',
  },
  {
    x: 0.7,
    y: 0.7,
    type: 'modal2',
    title: 'Save the Dogs',
    imageSrc: '/images/logos/CA BOX.png',
  },
  {
    x: 0.5,
    y: 0.2,
    type: 'tooltip',
    title: 'Coming Soon',
    tooltip: 'coming soon',
  },
  {
    x: 0.85,
    y: 0.3,
    type: 'link',
    title: 'DexScreener',
    href: 'https://dexscreener.com',
  },
];

const DotOverlay: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="absolute inset-0 pointer-events-auto z-20">
      {dots.map((dot, idx) => {
        if (dot.type === 'modal1') {
          return (
            <PulseDot
              key={idx}
              x={dot.x}
              y={dot.y}
              onClick={() => setOpenIndex(idx)}
              ariaLabel={dot.title}
            />
          );
        }
        if (dot.type === 'modal2') {
          return (
            <PulseDot
              key={idx}
              x={dot.x}
              y={dot.y}
              onClick={() => setOpenIndex(idx)}
              ariaLabel={dot.title}
            />
          );
        }
        if (dot.type === 'tooltip') {
          return (
            <PulseDot
              key={idx}
              x={dot.x}
              y={dot.y}
              ariaLabel={dot.title}
              tooltip={dot.tooltip}
            />
          );
        }
        if (dot.type === 'link') {
          return (
            <PulseDot
              key={idx}
              x={dot.x}
              y={dot.y}
              ariaLabel={dot.title}
              asLink={true}
              href={dot.href}
            />
          );
        }
        return null;
      })}
      {openIndex === 0 && (
        <ThemedModal
          open={true}
          onClose={() => setOpenIndex(null)}
          title={dots[0].title}
          body={<WoofiModalContent1 />}
          imageSrc={dots[0].imageSrc}
        />
      )}
      {openIndex === 1 && (
        <ThemedModal
          open={true}
          onClose={() => setOpenIndex(null)}
          title={dots[1].title}
          body={<WoofiModalContent2 />}
          imageSrc={dots[1].imageSrc}
        />
      )}
    </div>
  );
};

export default DotOverlay; 