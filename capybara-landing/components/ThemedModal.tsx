import React from 'react';

interface ThemedModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  imageSrc?: string;
  maxWidth?: string | number;
}

const ThemedModal: React.FC<ThemedModalProps> = ({ open, onClose, title, body, imageSrc, maxWidth }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      style={{ backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-6 w-full flex flex-col items-center animate-modalIn"
        style={{
          boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
          animation: 'modalIn 0.22s cubic-bezier(.4,1.6,.6,1)',
          maxWidth: maxWidth || '90vw',
          ...(maxWidth ? {} : { maxWidth: '90vw', width: '100%', maxWidthFallback: 'max-w-md' })
        }}
        onClick={e => e.stopPropagation()}
      >
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
          <img src={imageSrc} alt="Modal Visual" className="mb-4 max-h-40 object-contain rounded" style={{ background: '#f8f8f8', border: '1.5px solid #eee', padding: 8, borderRadius: 16 }} />
        )}
        {/* Title */}
        <h2
          style={{ fontFamily: '"Gamja Flower", cursive', fontSize: '2rem', color: 'black', fontWeight: 700, textShadow: '0 1px 0 #fff', letterSpacing: '0.01em', lineHeight: 1.1, marginBottom: 8, WebkitTextStroke: '0.2px #111', textAlign: 'center' }}
          className="mb-2 text-center modal-title"
        >
          {title}
        </h2>
        {/* Body */}
        <div style={{ fontFamily: 'Arial, sans-serif' }} className="text-gray-800 text-center">
          {body}
        </div>
      </div>
      <style>{`
        @keyframes modalIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .modal-title { color: #111 !important; }
      `}</style>
    </div>
  );
};

export default ThemedModal; 