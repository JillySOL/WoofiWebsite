# Capybara Landing Page

A visually engaging, horizontally scrollable landing page for a Capybara-themed meme project. Built with Next.js and Tailwind CSS, featuring interactive elements and smooth animations.

## 🚀 Features

- **Horizontal Scrolling Layout**
  - Smooth, responsive horizontal scrolling
  - Dynamic scroll indicators
  - Touch-friendly for mobile devices
  - Desktop hover zones for intuitive navigation

- **Interactive Elements**
  - Animated overlays with hover effects
  - Custom scroll indicators
  - Responsive design for all screen sizes

- **Performance Optimized**
  - Image optimization with Next.js
  - Smooth animations
  - Efficient scroll handling
  - Responsive image scaling

## 🛠️ Tech Stack

- **Framework:** Next.js with TypeScript
- **Styling:** Tailwind CSS
- **Animations:** CSS transitions and transforms
- **Deployment:** Firebase Hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd capybara-landing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🎨 Project Structure

```
capybara-landing/
├── components/
│   ├── ScrollableContent.tsx    # Main scrollable content component
│   └── bannerOverlays.ts        # Overlay configurations
├── public/
│   └── images/                  # Static assets
├── styles/
│   └── globals.css             # Global styles
└── pages/
    └── index.tsx               # Main page component
```

## 🔧 Key Components

### ScrollableContent.tsx
The main component that handles the horizontal scrolling functionality. Features include:
- Dynamic scroll indicators
- Touch and mouse interaction
- Responsive image scaling
- Interactive overlay elements

### Configuration Constants
```typescript
const SCROLL_THRESHOLD_PX = 10;
const INACTIVITY_TIMEOUT_MS = 1000;
const SCROLL_AMOUNT_PX = 300;
const SCROLL_ANIMATION_DURATION_MS = 350;
```

## 🎯 Usage

The main component can be imported and used in any Next.js page:

```typescript
import ScrollableContent from '../components/ScrollableContent';

export default function Home() {
  return (
    <main>
      <ScrollableContent />
    </main>
  );
}
```

## 📱 Responsive Design

- Adapts to different screen sizes
- Touch-friendly for mobile devices
- Desktop hover interactions
- Dynamic image scaling based on viewport

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## 📝 License

[Add your license here]

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

[Add your contact information here] 