// TypeScript types for overlays and layers
export type OverlayLayer = {
  type: 'animation' | 'image';
  format: string;
  src: string;
  zIndex: number;
  width: number;
  height: number;
  autoplay?: boolean;
  loop?: boolean;
};

export type Overlay = {
  top: string;
  left: string;
  label: string;
  href: string;
  layers: OverlayLayer[];
};

export const overlays: Overlay[] = [
  // Documentation/WebM section removed for now
  // Add more overlays as needed
]; 