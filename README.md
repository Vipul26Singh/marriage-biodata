# Biodata Generator

**Create stunning, print-ready marriage biodata in minutes — no design skills needed.**

Biodata Generator is a beautiful, browser-based tool that lets you craft elegant marriage biodata documents with a live visual editor. Choose from 8 unique layout templates, 4 curated color themes (or build your own), upload photos, customize every detail, and get a polished result ready to share or print.

---

## Why Biodata Generator?

- **Zero design effort** — Pick a layout, choose a theme, and start typing. Decorative elements are built in.
- **8 unique layouts** — Classic, Floral, Minimalist, Modern Card, Traditional, Elegant, Royal, and Contemporary — each with a completely different visual structure.
- **Live preview** — Every change appears instantly on the right-side document preview. What you see is what you print.
- **Fully customizable** — Adjust colors, fonts, padding, border radius, background images, opacity, blur, typography, watermarks, and more.
- **Multi-language** — Supports English, Hindi, Gujarati, Tamil, Marathi, Punjabi, Bengali, and Telugu labels out of the box.
- **Works offline** — Runs entirely in your browser. No data leaves your device. Your photos and personal details stay private.
- **Print & export ready** — Download as PNG, JPG, or PDF. Share via WhatsApp or Email. Print directly from the browser.
- **Auto-save** — Your work is automatically saved to browser storage. Never lose progress.

---

## Features

### 8 Distinct Layout Templates
- **Classic** — Corner ornaments, fine borders, diagonal texture, decorative motifs
- **Floral** — SVG floral/vine borders, rose dividers, feminine pastel aesthetic
- **Minimalist** — No borders, generous whitespace, hairline dividers, clean and modern
- **Modern Card** — Card-style sections with shadows and rounded corners, colored banner header
- **Traditional (Ornate)** — Heavy double borders, mandala/paisley corner decorations, ornamental flourishes
- **Elegant** — Thin double-line border, calligraphic swirl dividers, diamond ornaments
- **Royal** — Dark header band with crest motif, two-tone design, crown-accented headings
- **Contemporary** — Asymmetric sidebar layout with profile on the left, content on the right

### 4 Curated Themes + Custom Theme Builder
Choose from Royal Gold, Rose Pink, Emerald, or Navy Classic — or create your own with full control over primary, accent, and background colors via color pickers. Switching to custom theme starts with your current theme's colors.

### Background Image Support
Upload any image as a background, then fine-tune with:
- Opacity control (0-100%)
- Blur effect (0-20px)
- Size modes (Cover, Contain, Stretch, Original)
- 9 position presets

### Advanced Layout Controls
- Independent padding for top, left, and right
- Per-corner border radius
- Toggle decorative borders on/off
- Toggle profile photo visibility

### Typography Controls
Fine-tune section headings, labels, and values independently:
- Font size and line spacing sliders
- Bold toggles
- 8 font family choices including Devanagari script support
- One-click reset to defaults

### Multi-Language Support
Switch between 8 languages for default labels:
English, Hindi (हिन्दी), Gujarati (ગુજરાતી), Tamil (தமிழ்), Marathi (मराठी), Punjabi (ਪੰਜਾਬੀ), Bengali (বাংলা), Telugu (తెలుగు)

### Built-in Photo Editor
Crop, zoom, rotate, and pan photos with:
- Circular or square crop shapes
- Rule-of-thirds grid overlay
- Multiple photo slots per section

### Save, Load & Export
- **Auto-save** to browser localStorage
- **Load sample data** for instant demo
- **Export/Import JSON** for backup and sharing
- **Download** as PNG, JPG, or PDF
- **Share** via WhatsApp or Email

### Undo / Redo
Full undo/redo support with smart debouncing for text input.

### Watermark
Add a custom text watermark with adjustable opacity.

### Responsive Design
- Desktop: side-by-side editor + preview
- Mobile: tabbed Edit/Preview interface
- Print-optimized CSS

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation & Running

```bash
# Clone the repository
git clone <your-repo-url>
cd biodata-generator/biodata-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`.

### Building for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

The `dist/` folder contains the static build — deploy it to any web host (Netlify, Vercel, S3, etc.).

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Framework  | React 19                    |
| Bundler    | Vite 8                      |
| State      | React Context + useReducer  |
| Styling    | Component-scoped CSS files  |
| Fonts      | Google Fonts (8 families)   |
| Export     | html2canvas + jsPDF         |

No backend. No database. Everything runs client-side in the browser.

---

## Project Structure

```
src/
  App.jsx                    # Root component with provider + layout
  App.css                    # Global styles, print, responsive
  context/
    BiodataContext.jsx        # State management (reducer + context)
  hooks/
    useLocalStorage.js        # Auto-persist to localStorage
    useUndoRedo.js            # Undo/redo history
  data/
    templates.js              # Color theme definitions
    layouts.js                # Layout template registry
    fonts.js                  # Font family definitions
    i18n.js                   # Multi-language translations
    sampleData.js             # Pre-filled demo data
  components/
    editor/                   # Editor panel components
    preview/                  # Preview panel + sheet wrapper
    layouts/                  # 8 visual layout templates
    shared/                   # Reusable UI components
  utils/
    download.js               # PNG/JPG/PDF export
    share.js                  # WhatsApp/Email sharing
    storage.js                # localStorage helpers
    uid.js                    # Unique ID generator
```

---

## License

This project is open source. Feel free to use, modify, and distribute.
