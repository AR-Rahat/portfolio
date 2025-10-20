# Setup Guide

## Quick Start

Follow these steps to get your portfolio website up and running:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, Framer Motion, and more.

### 2. Start Development Server

```bash
npm run dev
```

Your portfolio will be available at `http://localhost:5173`

### 3. Open the Admin Panel

- Press `Ctrl+Shift+E` (Windows/Linux) or `Cmd+Shift+E` (Mac)
- Enter the default PIN: `1234`
- Start editing your portfolio!

## Customizing Your Portfolio

### Edit Your Information

1. **Hero Section**: Your name, title, and main message
2. **About Section**: Bio, highlights, and resume link
3. **Experience**: Add your work history
4. **Projects**: Showcase your work
5. **Skills**: List your technical skills
6. **Blog**: Share your articles (optional)
7. **Testimonials**: Add client reviews (optional)
8. **Contact**: Email, phone, and social links

### Change Theme Colors

1. Open admin panel
2. Go to "Theme" tab
3. Choose a preset or customize colors
4. Changes apply immediately!

### Hide/Show Sections

In the admin panel:
- Click the eye icon next to any section to hide/show it
- Hidden sections won't appear on your live site

## Deploying to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to GitHub and create a new repository
2. Name it `Portfolio` (or any name you prefer)
3. Make it public

### Step 2: Update Configuration

Edit `vite.config.ts` and change the base path to match your repo name:

```typescript
base: '/Portfolio/', // Change this to your repo name
```

### Step 3: Push Your Code

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy your site

Your site will be live at: `https://YOUR_USERNAME.github.io/Portfolio/`

## Setting Up GitHub Sync (Optional)

This feature allows you to backup your portfolio data to GitHub.

### Step 1: Create Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Editor")
4. Check the `repo` scope
5. Generate and copy the token

### Step 2: Configure in Admin Panel

1. Open admin panel (`Ctrl+Shift+E`)
2. Go to "GitHub Sync" tab
3. Enter:
   - Token: Your personal access token
   - Owner: Your GitHub username
   - Repo: Your repository name (e.g., "Portfolio")
4. Click "Save Configuration"

### Step 3: Use Sync Features

- **Pull from GitHub**: Load data from `data.json` in your repo
- **Push to GitHub**: Save current data to `data.json` in your repo

## Changing Your PIN

For security, you should change the default PIN:

1. Open browser console (F12)
2. Run this code:
```javascript
async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
await hashPin('YourNewPin123');
```
3. Copy the output hash
4. Run:
```javascript
localStorage.setItem('adminConfig', JSON.stringify({
  pinHash: 'PASTE_HASH_HERE'
}));
```
5. Your new PIN is now active!

## Backup Your Data

### Method 1: Export JSON

1. Open admin panel
2. Click the download icon (Export)
3. Save the JSON file to a safe location

### Method 2: GitHub Sync

- Use the "Push to GitHub" feature
- Your data is backed up in `data.json` in your repository

### Method 3: Browser Backup

Your data is automatically saved in localStorage. To back it up:

1. Open browser console
2. Run: `console.log(localStorage.getItem('portfolioData'))`
3. Copy and save the output

## Advanced Customization

### Editing Default Data

Edit `src/data/defaultData.ts` to change the initial data that appears for new users.

### Modifying Sections

Each section component is in `src/components/sections/`. You can:
- Edit the layout
- Add new fields
- Change animations
- Customize styling

### Theme Presets

Add more theme presets in `src/components/admin/ThemeEditor.tsx`.

### Adding Images

You can add images by:
1. Using external URLs (recommended for GitHub Pages)
2. Converting to base64 (use online tools)
3. Hosting on image CDN services

## Troubleshooting

### Port 5173 already in use

```bash
npm run dev -- --port 3000
```

### Build fails

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try `npm run build`

### Admin panel won't open

- Make sure you're pressing the correct keys: `Ctrl+Shift+E`
- Check browser console for errors
- Try refreshing the page

### Data not persisting

- Check if localStorage is enabled in your browser
- Try exporting your data as a backup
- Clear browser cache and re-import

## Support

If you encounter issues:
1. Check the README.md for common solutions
2. Review browser console for error messages
3. Ensure all dependencies are properly installed

## Next Steps

1. ✅ Install and run locally
2. ✅ Edit your information
3. ✅ Customize theme
4. ✅ Deploy to GitHub Pages
5. ✅ Set up GitHub sync (optional)
6. ✅ Change default PIN
7. ✅ Share your portfolio!

---

Happy building! 🚀

