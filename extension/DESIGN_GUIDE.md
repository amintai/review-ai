# ReviewAI Extension Design Guide

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
Orange: #ea580c
Amber: #f59e0b
Gradient: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)
```

#### Verdict Colors
```css
BUY:
  - Background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)
  - Border: #86efac
  - Icon: #16a34a (green-600)

SKIP:
  - Background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)
  - Border: #fca5a5
  - Icon: #dc2626 (red-600)

CAUTION:
  - Background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)
  - Border: #fde047
  - Icon: #d97706 (amber-600)
```

#### Neutral Colors
```css
Gray-50: #f9fafb
Gray-100: #f3f4f6
Gray-200: #e5e7eb
Gray-400: #9ca3af
Gray-600: #4b5563
Gray-700: #374151
Gray-900: #111827
Black: #000000
White: #ffffff
```

### Typography

#### Font Family
```css
font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
```

#### Font Sizes
```css
Heading (Large): 20px / font-black
Heading (Medium): 16px / font-bold
Body (Large): 14px / font-semibold
Body (Regular): 14px / font-normal
Caption: 12px / font-semibold
Label: 10px / font-bold / uppercase
Micro: 9px / font-bold / uppercase
```

#### Font Weights
```css
Regular: 400
Semibold: 600
Bold: 700
Extra Bold: 800
Black: 900
```

### Spacing Scale

```css
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
3xl: 32px
4xl: 40px
```

### Border Radius

```css
Small: 8px
Medium: 10px
Large: 12px
XL: 16px
2XL: 20px
Full: 9999px (circles)
```

### Shadows

```css
Small: 0 4px 12px rgba(234, 88, 12, 0.25)
Medium: 0 6px 16px rgba(234, 88, 12, 0.35)
Large: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## 🧩 Component Patterns

### Button Styles

#### Primary Button
```css
background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)
color: white
padding: 12px 16px
border-radius: 12px
font-weight: 700
box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25)

hover:
  transform: translateY(-2px)
  box-shadow: 0 6px 16px rgba(234, 88, 12, 0.35)
```

#### Secondary Button
```css
background: linear-gradient(135deg, #111827 0%, #1f2937 100%)
color: white
padding: 12px 16px
border-radius: 12px
font-weight: 700
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)

hover:
  transform: translateY(-2px)
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25)
```

#### Text Button
```css
color: #6b7280
padding: 10px
border-radius: 10px
font-weight: 600

hover:
  color: #ea580c
  background: #fef3c7
```

### Card Styles

#### Info Card
```css
background: gradient (blue/indigo)
border: 1px solid
border-radius: 12px
padding: 16px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Metric Card
```css
background: #f9fafb
border: 1px solid #e5e7eb
border-radius: 12px
padding: 16px
display: flex
align-items: center
gap: 12px
```

#### Verdict Card
```css
background: gradient (based on verdict)
border: 2px solid (based on verdict)
border-radius: 16px
padding: 20px
```

### Icon Badges

#### Logo Badge
```css
width: 36-48px
height: 36-48px
border-radius: 10-12px
background: rgba(255, 255, 255, 0.2)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.3)
display: flex
align-items: center
justify-content: center
```

#### Status Badge
```css
display: inline-flex
align-items: center
gap: 6px
padding: 6px 12px
background: #f0fdf4
border: 1px solid #bbf7d0
border-radius: 8px
font-size: 11px
font-weight: 600
color: #16a34a
```

## 📐 Layout Patterns

### Popup Layout
```
┌─────────────────────────────────┐
│  Header (Gradient)              │
│  - Logo + Branding              │
├─────────────────────────────────┤
│  Navigation Bar (if logged in)  │
│  - Home | History | Settings    │
├─────────────────────────────────┤
│                                 │
│  Main Content Area              │
│  - User Info Card               │
│  - Action Cards                 │
│  - Quick Links                  │
│                                 │
├─────────────────────────────────┤
│  Footer                         │
│  - Status + Version             │
└─────────────────────────────────┘
```

### Overlay Layout
```
┌─────────────────────────────────┐
│  Header (Gradient)              │
│  - Logo + Title | Close         │
├─────────────────────────────────┤
│                                 │
│  Content Area                   │
│  - Verdict Card                 │
│  - Summary Text                 │
│  - Sync Badge                   │
│  - Metrics Grid                 │
│  - Action Buttons               │
│                                 │
└─────────────────────────────────┘
```

## 🎭 Animation Guidelines

### Timing Functions
```css
Standard: cubic-bezier(0.16, 1, 0.3, 1)
Quick: 0.2s ease
Smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1)
```

### Common Animations

#### Slide In
```css
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

#### Spin
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Lift (Hover)
```css
hover {
  transform: translateY(-2px);
  transition: all 0.2s;
}
```

## 🎯 Icon Usage

### Icon Sizes
```css
Small: 14-16px
Medium: 18-20px
Large: 24-28px
XL: 32-40px
```

### Icon + Text Pattern
```jsx
<button>
  <Icon size={18} />
  <span>Button Text</span>
</button>
```

### Stroke Width
```css
Regular: 2
Bold: 2.5
```

## 📱 Responsive Considerations

### Popup Dimensions
```css
Width: 380px (fixed)
Min Height: 500px
Max Height: 600px (scrollable)
```

### Overlay Dimensions
```css
Width: 360px (fixed)
Max Height: 90vh (scrollable)
```

### Breakpoints
```css
Mobile: < 380px (not applicable for extension)
Tablet: 380px - 768px
Desktop: > 768px
```

## ✨ Best Practices

### Do's
✅ Use gradient backgrounds for primary elements
✅ Include icons with text for clarity
✅ Maintain consistent spacing
✅ Use shadows for depth
✅ Animate state changes
✅ Provide clear feedback
✅ Use semantic colors (green=good, red=bad)

### Don'ts
❌ Mix flat and gradient styles
❌ Use too many colors
❌ Overcrowd the interface
❌ Use animations longer than 0.4s
❌ Forget hover states
❌ Use low contrast text
❌ Ignore loading states

## 🔧 Implementation Tips

### CSS Organization
1. Use Tailwind for popup (utility-first)
2. Use custom CSS for overlay (scoped styles)
3. Keep animations in separate section
4. Group related styles together

### Component Structure
1. Header/Footer separate from content
2. Reusable card components
3. Consistent button patterns
4. Centralized icon usage

### State Management
1. Loading states with spinners
2. Error states with icons
3. Success states with badges
4. Empty states with illustrations

## 📚 Resources

### Fonts
- Inter: https://fonts.google.com/specimen/Inter

### Icons
- Lucide: https://lucide.dev/

### Colors
- Tailwind CSS: https://tailwindcss.com/docs/customizing-colors

### Gradients
- CSS Gradient: https://cssgradient.io/
