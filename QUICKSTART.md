# 🚀 Quick Start Guide

## Installation

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open automatically at http://localhost:3000

## How to Play

1. **Launch the app** - You'll see number "1" on the left side
2. **Scroll down** - Use mouse wheel, trackpad, or touch to scroll
3. **Watch the magic** - The cyan path animates and connects each number
4. **Track progress** - Header shows current number, progress bar fills up
5. **Reach 22** - Complete the full journey from 1 to 22!

## File Structure

```
components/
├── App.tsx                # Main app with header/footer UI
├── NumberScroller.tsx     # Core scrolling component (YOUR ORIGINAL FILE)
├── main.tsx              # React entry point
├── index.html            # HTML template
├── index.css             # Global styles
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── postcss.config.js     # PostCSS config
```

## Customization Examples

### Change to 30 numbers instead of 22:
```typescript
// In NumberScroller.tsx, line 3
const NUMBERS = Array.from({ length: 30 }, (_, i) => i + 1);
const TOTAL_NUMBERS = 30;

// In App.tsx, line 25
<span className="text-sm text-slate-400">/ 30</span>
```

### Change path color to purple:
```typescript
// In NumberScroller.tsx, lines 118-119
<stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
<stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
```

### Make numbers bigger:
```typescript
// In NumberScroller.tsx, line 137
<h2 className="text-9xl font-bold text-white">{number}</h2>
```

## Build for Production

```powershell
# Create optimized build
npm run build

# Preview production build
npm run preview
```

Builds to `dist/` folder - deploy to any static hosting service!
