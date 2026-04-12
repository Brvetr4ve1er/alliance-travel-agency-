# Égypte 2026 — Alliance Travel Landing Page

This is a premium, high-conversion landing page built with Next.js, Shadcn UI, and Firebase, optimized for lead generation via WhatsApp.

---

## 🚀 How to Setup Git & Push Your Project

Follow these steps in your terminal to host your code on a platform like GitHub, GitLab, or Bitbucket.

### 1. Initialize the Local Repository
Open your terminal in the project root and run:
```bash
git init
```

### 2. Add Your Files
Stage all the project files for the first commit:
```bash
git add .
```

### 3. Create the Initial Commit
```bash
git commit -m "Initial commit: Egypt 2026 Landing Page"
```

### 4. Authenticate with GitHub (Login)
If you haven't logged in to Git on this machine, the easiest way is using the **GitHub CLI**:
```bash
# If you have GitHub CLI installed
gh auth login
```
Alternatively, Git will prompt you for your credentials the first time you try to push. You should use a **Personal Access Token (PAT)** instead of your password if using HTTPS.

### 5. Connect to a Remote Repository
1. Create a **new empty repository** on [GitHub](https://github.com/new).
2. Copy the repository URL (e.g., `https://github.com/your-username/your-repo.git`).
3. Run the following command (replacing the URL with yours):
```bash
git remote add origin <your-repository-url>
```

### 6. Push Your Code
Rename your branch to `main` and push:
```bash
git branch -M main
git push -u origin main
```

---

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Backend**: Firebase (Firestore for Leads, Storage for Documents)
- **Communication**: WhatsApp wa.me integration

## 📦 Deployment
This project is configured for Firebase Hosting.
1. `npm run build`
2. `firebase deploy`
