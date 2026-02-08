# ReviewAI Chrome Extension

Production-ready browser extension for showing **AI purchase verdicts** directly on Amazon product pages.

## ✨ What it does

- 🎯 Detects supported Amazon product pages (`/dp/ASIN` and `/gp/product/ASIN`)
- 🛡️ Injects a **Get AI Verdict** badge near the product pricing area
- 📊 Sends page context + visible review snippets to ReviewAI backend
- 💎 Displays beautiful verdict panel with trust/confidence metrics
- 🔗 Provides quick access to full report and dashboard
- 🎨 Modern, responsive UI with smooth animations

## 🚀 Features

### Popup Interface
- **Enhanced Header** - Gradient background with shield logo
- **Navigation Bar** - Quick access to Home, History, and Settings
- **User Status** - Beautiful user info card with gradient styling
- **Smart Detection** - Automatically detects Amazon product pages
- **Quick Actions** - One-click analysis and dashboard access

### Amazon Overlay
- **Instant Analysis** - Click the badge to analyze any product
- **Verdict Display** - Clear BUY/SKIP/CAUTION recommendations
- **Metrics Cards** - Trust and confidence scores with icons
- **Smooth Animations** - Slide-in effects and hover states
- **Responsive Design** - Works perfectly on all screen sizes

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- Lucide Icons for beautiful icons
- Manifest V3 (service worker background)
- Supabase for authentication

## 📦 Setup

From repository root:

```bash
cd extension
npm install
```

Create `extension/.env` with:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Optional override for backend target
# VITE_REVIEWAI_BASE_URL=https://reviewai.pro
```

## 💻 Development

```bash
npm run dev
```

The extension will be built in watch mode. Load it in Chrome as described below.

## 🏗️ Build

```bash
npm run build
```

Build output is generated in `extension/dist`.

## 🔧 Load into Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select `extension/dist`
5. The extension icon will appear in your toolbar

## 🎨 UI Improvements (v1.1.0)

### Popup Enhancements
- ✅ Gradient header with shield logo and pattern overlay
- ✅ Navigation bar with Home, History, and Settings
- ✅ Enhanced user info card with gradient styling
- ✅ Improved loading state with animated icon
- ✅ Better error messages with icons
- ✅ Smooth hover effects and transitions
- ✅ Status indicator in footer

### Overlay Enhancements
- ✅ Gradient header matching popup design
- ✅ Enhanced verdict cards with icons
- ✅ Metric cards with emoji icons
- ✅ Sync status badge
- ✅ Improved button styling with gradients
- ✅ Better spacing and alignment
- ✅ Smooth animations and transitions

## 🔒 Production Hardening

- ✅ Safer runtime messaging with explicit error handling
- ✅ Stronger URL checks for supported Amazon product pages
- ✅ Idempotent content-script mounting (prevents duplicate React roots)
- ✅ Graceful handling when Supabase env vars are missing
- ✅ Resilient badge injection with MutationObserver fallback
- ✅ Unified backend base URL config (`src/lib/config.ts`)
- ✅ International Amazon host support (`amazon.*`)

## 🔑 Permissions Used

- `activeTab`: Identify current page in popup
- `cookies`: Sync web login session into extension
- `storage`: Local settings and state management
- `scripting`: Inject content scripts on Amazon pages
- `host_permissions`: Access to Amazon and ReviewAI API domains

## 📁 Project Structure

```
extension/
├── src/
│   ├── App.tsx              # Main popup UI (enhanced)
│   ├── App.css              # Popup styles
│   ├── content/
│   │   ├── index.tsx        # Content script entry
│   │   ├── AmazonOverlay.tsx # Amazon page overlay (enhanced)
│   │   └── content.css      # Overlay styles (enhanced)
│   ├── background/
│   │   └── index.ts         # Background service worker
│   └── lib/
│       ├── config.ts        # Configuration
│       └── supabase.ts      # Supabase client
├── public/
│   └── logo.svg             # Extension icon (new)
├── manifest.json            # Extension manifest
├── index.html               # Popup HTML
└── package.json
```

## 📝 Known Operational Notes

- If auth cookie format changes on the web app, extension session sync logic may need an update
- For local development, make sure your web app is running at `http://localhost:3000` unless overridden
- The extension automatically detects Amazon product pages and shows the analysis badge
- All styling uses Tailwind CSS for consistency with the main web app

## 🎯 Future Enhancements

- [ ] Add keyboard shortcuts for quick analysis
- [ ] Implement offline mode with cached results
- [ ] Add product comparison feature
- [ ] Support for more Amazon marketplaces
- [ ] Dark mode support
- [ ] Customizable badge position

## 📄 License

Proprietary - ReviewAI
