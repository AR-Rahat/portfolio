# Portfolio Live Editor

A cutting-edge portfolio website with built-in live editing capabilities. Edit your portfolio content in real-time using a secure admin panel accessible via keyboard shortcut.

## 🚀 Features

- **Live Editing**: Press `Ctrl+Shift+E` (or `Cmd+Shift+E` on Mac) to open the editor
- **Secure Access**: PIN-protected admin panel (default PIN: `1234`)
- **Complete Control**: Edit all sections, customize theme, manage content
- **Data Persistence**: 
  - Auto-save to localStorage
  - GitHub integration for backup
  - Export/Import JSON
- **Professional Design**: Modern, responsive, animated UI
- **GitHub Pages Ready**: Deploy with one command

## 📋 Sections

- **Hero**: Name, title, subtitle, and call-to-action
- **About**: Bio, highlights, and resume
- **Experience**: Work history with timeline
- **Projects**: Portfolio projects with tags and links
- **Skills**: Categorized skill sets with proficiency levels
- **Blog**: Article previews with tags
- **Testimonials**: Client reviews with ratings
- **Contact**: Contact form and social links

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Octokit (GitHub API)
- React Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"
4. Push to main branch - automatic deployment will trigger

### Option 2: Manual Deployment

```bash
# Build and deploy
npm run deploy
```

**Important**: Update the `base` in `vite.config.ts` to match your repository name:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

## 🔒 Security

### Changing the Default PIN

1. Open browser console
2. Generate SHA-256 hash of your desired PIN:
   ```javascript
   async function hashPin(pin) {
     const encoder = new TextEncoder();
     const data = encoder.encode(pin);
     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
     const hashArray = Array.from(new Uint8Array(hashBuffer));
     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
   }
   await hashPin('yourNewPin'); // Copy the result
   ```
3. Update localStorage:
   ```javascript
   localStorage.setItem('adminConfig', JSON.stringify({
     pinHash: 'your-generated-hash'
   }));
   ```

### GitHub Integration

To enable GitHub sync:

1. Create a GitHub Personal Access Token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` permissions
2. Open admin panel (`Ctrl+Shift+E`)
3. Go to "GitHub Sync" tab
4. Enter your token, owner, and repo name
5. Save configuration

## 🎨 Customization

### Theme

Use the Theme tab in the admin panel to:
- Choose from presets (Professional Blue, Modern Purple, Dark Mode)
- Customize individual colors
- Change typography

### Sections

Each section can be:
- Edited with rich text editors
- Hidden/shown using visibility toggles
- Reordered (via JSON export/import)

### Content

Edit content directly in the admin panel or:

1. Export current data (`Download` button)
2. Edit JSON file
3. Import back (`Upload` button)

## 📱 Usage

### Opening the Editor

- Press `Ctrl+Shift+E` (Windows/Linux)
- Press `Cmd+Shift+E` (Mac)
- Enter PIN (default: `1234`)

### Editing Content

1. Select section from left sidebar
2. Edit fields in the editor
3. Changes auto-save to localStorage
4. Optionally push to GitHub for backup

### Managing Data

- **Export**: Download JSON backup of all data
- **Import**: Upload previously exported JSON
- **Reset**: Restore default data (cannot be undone)
- **GitHub Sync**: Push/pull data from repository

## 🌐 Live Example

After deployment, your portfolio will be available at:
```
https://your-username.github.io/your-repo-name/
```

## 📝 License

MIT License - feel free to use this template for your portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⚡ Tips

- Export your data regularly as backup
- Use GitHub sync for version control
- Test changes in development before deploying
- Customize the default data in `src/data/defaultData.ts`
- PIN is hashed with SHA-256 for security

## 🐛 Troubleshooting

### White screen after deployment
- Check that `base` in `vite.config.ts` matches your repo name
- Ensure GitHub Pages is enabled in repository settings

### Changes not saving
- Check browser console for errors
- Verify localStorage is not full
- Try exporting/importing data

### GitHub sync not working
- Verify Personal Access Token has `repo` permissions
- Check repository name and owner are correct
- Ensure token hasn't expired

---

Built with ❤️ using React + TypeScript + Vite

