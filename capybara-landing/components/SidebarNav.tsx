'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Community', href: '/community' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'Tokenomics', href: '/tokenomics' },
  { label: 'CA', href: '/ca' },
  { label: 'FAQ', href: '/faq' },
];

export default function SidebarNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-black bg-opacity-70 text-white rounded-md flex items-center justify-center"
      >
        ☰
      </button>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#111111]/90 border-r-2 border-[#9b6d3f] z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          ✕
        </button>
        <div className="h-full pt-8 px-6 text-white flex flex-col justify-center gap-6 font-luckiest-guy">
          {links.map(({ label, href }) => (
            <React.Fragment key={href}>
              <Link href={href} onClick={() => setOpen(false)} legacyBehavior>
                <span className="block text-xl hover:text-yellow-400 transition">{label.toUpperCase()}</span>
              </Link>
              {label === 'CA' && (
                <div className="mt-2 bg-[#222] text-gray-300 px-4 py-2 rounded text-sm flex items-center justify-between gap-2">
                  <span>Contract: G2Ab...pump</span>
                  <button
                    className="text-xs text-white bg-black border border-gray-600 px-2 py-1 rounded hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent sidebar from closing
                      navigator.clipboard.writeText("G2Ab...pump");
                    }}
                  >
                    Copy
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
} 