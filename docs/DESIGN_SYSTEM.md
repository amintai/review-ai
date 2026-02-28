# UI Design System (ReviewAI)

This document outlines the standard design system variables, colors, and typography used in the ReviewAI dashboard. **All new components, pages, and extensions MUST adhere to these tokens to ensure a unified, premium SaaS look.**

## Base Theme (Light Mode Default)
The dashboard defaults to a clean, light interface with high-contrast text and vibrant accents.

### Core Colors
| Name | HSL Value | Hex Equivalent | Usage |
|------|-----------|----------------|-------|
| **Background** | `240 25% 96%` | `#F7F6F3` (off-white) | Main app backgrounds |
| **Foreground** | `240 28% 14%` | `#1A1A2E` (near-black) | Primary text |
| **Card** | `0 0% 100%` | `#FFFFFF` (white) | Card & Popover backgrounds |
| **Border / Card Border** | `240 10% 93%` | `#EBEBF0` | Borders for cards, dividers |
| **Input Border** | `240 15% 86%` | `#D8D8E0` | Input outlines |

### Accents & Branding
| Name | HSL Value | Hex Equivalent | Usage |
|------|-----------|----------------|-------|
| **Primary (Brand)** | `16 100% 60%` | `#FF6B35` (orange) | Primary buttons, active states, focus rings (`--ring`) |
| **Secondary Text** | `240 9% 46%` | `#6B6B80` | Secondary labels, descriptions |
| **Muted Text** | `240 10% 66%` | `#A0A0B0` | Placeholder text, disabled, very subtle labels |
| **Destructive** | `0 84% 60%` | `#EF4444` (red) | Delete actions, critical errors |

### Verdict & Trust Semantic Colors
Review signals rely heavily on these distinct colors to communicate safety.
| Meaning | Category | HSL Value | Ext. Tailwind / Hex |
|---------|----------|-----------|----------------------|
| **BUY** | Text | `160 84% 39%` | `#10B981` (green-500) |
| **BUY** | Bg | `160 84% 95%` | `#ECFDF5` (green-50) |
| **BUY** | Border | `153 76% 80%` | `#A7F3D0` (green-200) |
| **CAUTION** | Text | `38 92% 50%` | `#F59E0B` (amber-500) |
| **CAUTION** | Bg | `48 100% 96%` | `#FFFBEB` (amber-50) |
| **CAUTION** | Border | `45 93% 76%` | `#FDE68A` (amber-200) |
| **SKIP** | Text | `0 84% 60%` | `#EF4444` (red-500) |
| **SKIP** | Bg | `0 86% 97%` | `#FEF2F2` (red-50) |
| **SKIP** | Border | `0 94% 82%` | `#FECACA` (red-200) |
| **Trust Score** | Accent | `189 94% 37%` | `#06B6D4` (cyan-500) |

## Typography
The system uses three primary font families (managed via CSS variables in Tailwind):
1. **Syne** (`font-syne`): Used for bold, premium headers.
2. **DM Sans** (`font-sans`): Default application font for body text, providing excellent readability.
3. **JetBrains Mono** (`font-mono`): Used for code, data points, or technical references.

## Dark Mode
A dark mode palette exists (`.dark` in `globals.css`) but is currently *only* used for the left-side panel of the authentication pages. **The main dashboard and extension should use the Light theme as the default.**

If extending dark mode, ensure you stick to the strict dark `#1A1A2E` background and `#FFFFFF` foreground as defined in `globals.css` under `.dark`.

---
*Note: This file is meant as context for AI assistants and developers modifying UI. Always reference `src/app/globals.css` and `tailwind.config.ts` for the ground truth.*
