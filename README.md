# 🇦🇿 Alliance Travel — Azerbaijan 2026

Premium, high-conversion landing page for **Alliance Travel**, specializing in luxury tours to Azerbaijan (Baku, Gabala, Shahdag). Optimized for performance, accessibility, and instant lead generation via WhatsApp.

## 🌟 Overview

This application is built with **Next.js 15** and follows a modern, configuration-driven architecture. It features a bespoke "Emerald Green" design system inspired by the natural beauty of the Caucasus mountains and the luxury of modern Baku.

### Key Features
- **🌍 Multi-Language Support**: Seamless toggle between French (FR) and Arabic (AR) with full RTL support.
- **⚡ Performance First**: Zero Layout Shift (ZLS) using `next/font`, optimized images, and efficient rendering pipelines.
- **📈 Conversion Optimized**: Integrated WhatsApp lead generation that formats structured inquiries for travel agents.
- **🎨 Glassmorphism UI**: High-end aesthetic using backdrop blurs, subtle noise textures, and premium serif typography.
- **⚙️ Config-Driven**: All trip data (prices, dates, hotels, flights) is managed in a single source of truth.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Infrastructure**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🏛 Project Structure

```text
src/
├── app/              # Next.js App Router (Layouts, Pages, Globals)
├── components/       # Atomic UI components and feature sections
├── context/          # React Context (LanguageProvider)
├── lib/              # Utilities and Data (The Source of Truth)
│   ├── trip-config.ts # CENTRAL CONFIG: Prices, Dates, Hotels
│   ├── translations.ts # I18n strings (FR/AR)
│   └── placeholder-images.ts # Asset management
└── ai/               # Genkit integration (Ready for AI insights)
```

## ⚙️ Configuration & Customization

### Updating Trip Data
To change pricing, departure dates, or hotel names, edit:
`src/lib/trip-config.ts`

### Managing Translations
To update text content for either language, edit:
`src/lib/translations.ts`

## 🚀 Deployment

The project is configured for **Firebase App Hosting**.

1. **Connect GitHub**: Link your repository in the Firebase Console under 'App Hosting'.
2. **Auto-Deploy**: Every push to the `azerbaijan-landing-page` branch will trigger a production build.

---

## 🌿 Branch Management

**Current Project (Azerbaijan)**: `azerbaijan-landing-page`
**Main Project (Egypt)**: `main`

To push changes to this specific branch:
```bash
git add .
git commit -m "Update Azerbaijan site content"
git push origin azerbaijan-landing-page
```

---
© 2026 Alliance Travel Alger. Built for excellence.
