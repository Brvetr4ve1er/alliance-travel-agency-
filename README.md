# Égypte 2026 — Alliance Travel Landing Page

This is a premium, high-conversion landing page built with Next.js, Shadcn UI, and Firebase, optimized for lead generation via WhatsApp.

## 🚀 Getting Started with Git

To push this project to your own Git repository (e.g., GitHub), follow these steps in your terminal:

1. **Initialize the local repository:**
   ```bash
   git init
   ```

2. **Add all files to the staging area:**
   ```bash
   git add .
   ```

3. **Commit the changes:**
   ```bash
   git commit -m "Initial commit: Egypt 2026 Funnel"
   ```

4. **Add your remote repository URL:**
   *Replace `<your-repository-url>` with your actual repo link (e.g., `https://github.com/username/repo.git`).*
   ```bash
   git remote add origin <your-repository-url>
   ```

5. **Rename the main branch and push:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI)
- **Backend**: Firebase (Firestore for Leads, Storage for Documents)
- **Communication**: WhatsApp wa.me integration

## 📦 Deployment

This project is configured for Firebase Hosting.

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

## 📁 Project Structure

- `src/lib/trip-config.ts`: **Single Source of Truth** for all trip data (prices, dates, hotels).
- `src/components/sections/`: Modular React components for each section of the page.
- `src/lib/i18n.ts`: Translation dictionary for French and Arabic support.
