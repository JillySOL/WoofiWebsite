import React from 'react';

interface ThemedModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  imageSrc?: string;
}

const ThemedModal: React.FC<ThemedModalProps> = ({ open, onClose, title, body, imageSrc }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-[90vw] w-full max-w-md flex flex-col items-center">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        {/* Image (optional) */}
        {imageSrc && (
          <img src={imageSrc} alt="Modal Visual" className="mb-4 max-h-40 object-contain rounded" />
        )}
        {/* Title */}
        <h2 style={{ fontFamily: '"Gamja Flower", cursive', fontSize: '2rem' }} className="mb-2 text-center">
          {title}
        </h2>
        {/* Body */}
        <div style={{ fontFamily: 'Arial, sans-serif' }} className="text-gray-800 text-center">
          {body}
        </div>
      </div>
    </div>
  );
};

export default ThemedModal; 