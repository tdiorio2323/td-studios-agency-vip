# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **UI drop-in bundle** for TD Studios Agency - a glassmorphism landing page component designed to integrate into existing Next.js (App Router) + Tailwind CSS projects. The project contains a luxury-styled landing page with frosted glass effects, shimmer animations, and a premium black/white aesthetic.

## Architecture

### Core Structure
- **Single Page Application**: Built with Next.js App Router
- **Component-Based**: Single main component (`AgencyLanding.tsx`) with embedded sub-components
- **Self-Contained**: No external UI libraries - uses only Tailwind CSS classes
- **Glassmorphism Design**: Uses backdrop-blur, gradients, and transparency effects

### Key Files
- `components/AgencyLanding.tsx` - Main landing page component with all UI elements
- `app/page.tsx` - Root page that dynamically imports AgencyLanding (SSR disabled)
- `styles/globals.css` - Tailwind imports + Inter font + global styles
- `tailwind.config.ts` - Custom design tokens (colors, fonts, shadows)

### Design System
Custom Tailwind tokens defined in `tailwind.config.ts`:
- **Colors**: `ink` (#0B0B0C), `ivory` (#F7F7F5), `gold` (#C8A96A), `stone` (#9FA4AD)
- **Typography**: Inter font family for both display and sans
- **Effects**: Custom `luxe` shadow and glassmorphism utilities

## Development

### Running the Project
This is a drop-in bundle meant to be copied into an existing Next.js project. Typical commands:
```bash
npm run dev
# or
pnpm dev
```

### Key Implementation Notes
- **Dynamic Import**: AgencyLanding uses `dynamic()` with `ssr: false` to prevent SSR issues
- **Glassmorphism**: Components use `backdrop-blur` and layered transparency effects
- **Animations**: Custom shimmer animation defined in component styles
- **Responsive**: Mobile-first design with responsive grid layouts

### Component Architecture
The main `AgencyLanding` component contains:
- Embedded sub-components (GlassCard, FrostButton, GhostButton, etc.)
- Inline styles for animations using `<style jsx global>`
- Gradient backgrounds and blur effects for glassmorphism
- Structured sections: navbar, hero, features, pricing, footer

### Installation Notes
- Designed to merge/replace files in existing Next.js projects
- Requires Tailwind CSS with backdrop-filter support enabled
- Inter font loaded via Google Fonts in globals.css
- Best with black background to highlight glass effects