import React from 'react';

interface PulseDotProps {
  x: number; // 0-1 (percent of width)
  y: number; // 0-1 (percent of height)
  onClick?: () => void;
  ariaLabel?: string;
  tooltip?: string;
  asLink?: boolean;
  href?: string;
}

const PulseDot: React.FC<PulseDotProps> = ({ x, y, onClick, ariaLabel, tooltip, asLink, href }) => {
  const [hover, setHover] = React.useState(false);
  const commonProps = {
    className: "absolute z-10",
    style: {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      transform: 'translate(-50%, -50%)',
      outline: 'none',
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    'aria-label': ariaLabel || 'Open info',
    tabIndex: 0,
  };
  const dot = (
    <span className="block w-6 h-6 rounded-full bg-white border-2 border-black shadow-lg relative">
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-white opacity-70 animate-pulseDot" />
      {tooltip && hover && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none" style={{fontFamily:'Arial, sans-serif'}}>
          {tooltip}
        </span>
      )}
    </span>
  );
  if (asLink && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps} style={{...commonProps.style, cursor:'pointer'}}>
        {dot}
      </a>
    );
  }
  return (
    <button {...commonProps} onClick={onClick} type="button">
      {dot}
    </button>
  );
};

export default PulseDot; 