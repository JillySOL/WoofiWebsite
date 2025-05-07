'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Users, BookOpen, PieChart, FileText, HelpCircle, Copy, Check } from 'lucide-react';
import Image from 'next/image';

const links = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Documentation', href: '/documentation', icon: BookOpen },
  { label: 'Tokenomics', href: '/tokenomics', icon: PieChart },
  { label: 'CA', href: '/ca', icon: FileText },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
];

export default function SidebarNav() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

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
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-black/60 backdrop-blur-md border-r-2 border-[#9b6d3f] z-50 transition-transform duration-500 ease-in-out ${
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
        <div className="h-full pt-20 pb-8 px-6 text-white flex flex-col justify-start gap-y-4 font-luckiest-guy overflow-y-auto">
          {links.map(({ label, href, icon: Icon }, index) => (
            <React.Fragment key={href}>
              <Link href={href} onClick={() => setOpen(false)} legacyBehavior>
                <span
                  className={`flex items-center gap-3 text-xl hover:text-yellow-400 hover:scale-105 transition-all duration-300 ease-out ${
                    open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                  }`}
                  style={{ transitionDelay: open ? `${index * 100}ms` : '0ms' }}
                >
                  <Icon size={24} />
                  {label.toUpperCase()}
                </span>
              </Link>
              {label === 'CA' && (
                <div 
                  className={`mt-2 mb-4 bg-gray-800/70 border border-gray-700/80 text-gray-300 px-3 py-3 rounded-lg text-sm flex flex-wrap items-center justify-between gap-x-3 gap-y-2 transition-all duration-300 ease-out ${
                    open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                  }`}
                  style={{ transitionDelay: open ? `${index * 100 + 50}ms` : '0ms' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 bg-gray-600 rounded-sm flex-shrink-0"></div>
                    <span className="truncate font-mono text-xs">Contract: G2Ab...pump</span>
                  </div>
                  <button
                    className={`text-xs text-white px-2 py-1.5 rounded-md flex items-center gap-1 transition-colors duration-200 flex-shrink-0 ${
                      copied ? 'bg-green-500 hover:bg-green-600' : 'bg-black/50 border border-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText("G2Ab...pump");
                      setCopied(true);
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Peeking Capybara Image */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-[200px] w-[157px] pointer-events-none select-none transition-opacity duration-300 ease-in-out delay-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: '240px' }}
        >
          <Image
            src="/images/capysidebar.png"
            alt="Peeking Capybara"
            width={157}
            height={200}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </>
  );
} 