# Quick Start - Push to GitHub & Deploy

## 🚀 Ready to Deploy Your Artist Portfolio!

Your clean repository is ready to push to GitHub. Follow these simple steps:

---

## Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name**: `artist-portfolio`
3. **Description**: "Artist portfolio for Kunga DEMPA TSANG"
4. **Visibility**: **Public** (required for free Netlify)
5. **Do NOT** initialize with README
6. Click **"Create repository"**

---

## Step 2: Push Your Code

You're already in the clean repository directory. Just run these commands:

```bash
# Add your GitHub repository URL (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/artist-portfolio.git

# Push to GitHub
git push -u origin main
```

**Note**: You may need a GitHub Personal Access Token instead of password.
- Create one at: [https://github.com/settings/tokens](https://github.com/settings/tokens)
- Select scope: `repo`
- Use token as password when pushing

---

## Step 3: Deploy to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your `artist-portfolio` repository
5. Build settings (auto-detected):
   - Build command: `pnpm build`
   - Publish directory: `dist`
6. Click **"Deploy site"**

**🎉 Your site is live in 2-3 minutes!**

---

## Step 4: Enable CMS (Content Management)

1. In Netlify dashboard → **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Registration: **"Invite only"**
4. Go to **Services** → Enable **"Git Gateway"**
5. Go to **Identity** tab → **"Invite users"**
6. Enter: `dempatsang@gmail.com`
7. Check email and set password
8. Access CMS at: `https://your-site.netlify.app/admin`

---

## Step 5: Configure Mollie Payments

1. Create account at [https://www.mollie.com/signup](https://www.mollie.com/signup)
2. Go to **Payment links** in dashboard
3. Create payment link for each artwork:
   - Description: "Artwork Name - Original Painting"
   - Amount: €1200 (example)
   - Currency: EUR
4. Copy the payment link
5. Add to CMS:
   - Go to `/admin`
   - Click **"Artworks"** → Select artwork
   - Paste link in **"Mollie Payment Link"** field
   - Publish

---

## What's Included

✅ **All Documentation**:
- `README.md` - Project overview
- `NETLIFY_DEPLOYMENT.md` - Complete deployment guide (12KB)
- `GITHUB_SETUP.md` - GitHub push instructions
- `TESTING_CHECKLIST.md` - Testing guide
- `DEPLOYMENT.md` - General deployment info

✅ **Complete Source Code**:
- Astro project with Tailwind CSS
- 10 pages (5 English + 5 French)
- Netlify CMS configuration
- Mollie payment integration
- Contact form ready
- Blog system
- SEO optimized

✅ **Ready to Use**:
- Artist info already configured
- Sample artworks included
- Translations complete
- Responsive design
- Production build tested

---

## File Structure

```
artist-portfolio-clean/
├── src/
│   ├── data/artworks.ts       # Artwork data
│   ├── i18n/utils.ts          # Translations
│   ├── layouts/BaseLayout.astro
│   ├── pages/                 # English pages
│   │   ├── index.astro
│   │   ├── gallery.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── blog/
│   └── pages/fr/              # French pages
├── public/
│   └── admin/                 # Netlify CMS
├── netlify.toml               # Netlify config
├── package.json
├── astro.config.mjs
├── tailwind.config.js
└── Documentation (*.md files)
```

---

## Next Steps After Deployment

1. **Test the site**: Visit your Netlify URL
2. **Test CMS**: Log in to `/admin`
3. **Upload real artwork photos**: Replace sample images
4. **Add real Mollie links**: Create payment links and add via CMS
5. **Test contact form**: Submit a test message
6. **Add custom domain** (optional): Netlify settings → Domain
7. **Start selling!** 🎨

---

## Quick Commands

```bash
# View git status
git status

# View commit history
git log --oneline

# Make changes and commit
git add .
git commit -m "Update artwork prices"
git push

# View remote repository
git remote -v
```

---

## Support

- **Full Deployment Guide**: See `NETLIFY_DEPLOYMENT.md`
- **GitHub Help**: See `GITHUB_SETUP.md`
- **Testing Guide**: See `TESTING_CHECKLIST.md`
- **Email**: dempatsang@gmail.com

---

**Your repository is clean, committed, and ready to push! 🚀**

Current directory: `/home/ubuntu/artist-portfolio-clean/`
Branch: `main`
Commit: Ready to push
Files: 31 files, 8008 lines of code

