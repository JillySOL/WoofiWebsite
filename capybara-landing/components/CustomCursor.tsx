"use client"; // This component uses state and browser APIs

import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true); // Show cursor when mouse enters window

      // Check if the target element suggests a pointer cursor
      const targetElement = e.target as Element;
      if (targetElement) {
        const computedStyle = window.getComputedStyle(targetElement);
        const targetCursor = computedStyle.cursor;
        setIsPointer(targetCursor === 'pointer' || targetElement.closest('a, button') !== null);
      }
    };

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
        setPosition({ x: -100, y: -100 }); // Move off-screen when mouse leaves
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Base cursor style
  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '64px', // Reduced from 96px (33% smaller)
    height: '64px', // Reduced from 96px (33% smaller)
    backgroundImage: 'url(/images/cursor.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    // Center the image on the actual cursor position
    transform: 'translate(-50%, -50%)', 
    opacity: isVisible ? 1 : 0, // Hide when mouse leaves window
    transition: 'opacity 0.2s ease-in-out', // Smooth fade
  };

  // Style adjustments when over a clickable element (pointer)
  const pointerStyle = isPointer ? {
    transform: 'translate(-50%, -50%) scale(1.2)', // Keep scale effect relative to new size
  } : {};

  return (
    <div
      className="fixed pointer-events-none z-[9999] custom-cursor-component" // Removed hidden md:block
      style={{ ...cursorStyle, ...pointerStyle }} // Merge styles
    />
  )
}

export default CustomCursor; 