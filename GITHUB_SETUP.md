# GitHub Setup Guide

## Pushing Your Artist Portfolio to GitHub

This guide explains how to push your project to GitHub and connect it to Netlify for automatic deployments.

---

## Step 1: Create GitHub Repository

### Via GitHub Website

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in the details:
   - **Repository name**: `artist-portfolio`
   - **Description**: "Professional artist portfolio for Kunga DEMPA TSANG with Netlify CMS and Mollie payments"
   - **Visibility**: **Public** (required for free Netlify hosting)
   - **Do NOT** check "Initialize this repository with a README"
3. Click **"Create repository"**

### Via GitHub CLI (Alternative)

If you have GitHub CLI installed:

```bash
gh repo create artist-portfolio --public --description "Artist portfolio for Kunga DEMPA TSANG"
```

---

## Step 2: Prepare Your Local Repository

### Check Current Status

```bash
cd /home/ubuntu/artist-portfolio

# Check git status
git status
```

### Configure Git (if not already done)

```bash
# Set your name and email
git config --global user.name "Kunga DEMPA TSANG"
git config --global user.email "dempatsang@gmail.com"
```

### Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Ensure we're on main branch
git branch -M main
```

---

## Step 3: Add and Commit Files

### Review .gitignore

Ensure `.gitignore` excludes unnecessary files:

```bash
cat .gitignore
```

Should include:
```
node_modules/
dist/
.astro/
.env
.env.production
.DS_Store
.local/
.cache/
.npm/
```

### Stage All Files

```bash
# Add all files
git add .

# Check what will be committed
git status
```

### Create Initial Commit

```bash
git commit -m "Initial commit: Complete artist portfolio with Netlify CMS and Mollie payments

Features:
- Multilingual support (English/French)
- Netlify CMS for content management
- Mollie payment integration
- Responsive design
- SEO optimized
- Contact form
- Blog system
"
```

---

## Step 4: Push to GitHub

### Add Remote Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/artist-portfolio.git
```

### Verify Remote

```bash
git remote -v
```

Should show:
```
origin  https://github.com/YOUR_USERNAME/artist-portfolio.git (fetch)
origin  https://github.com/YOUR_USERNAME/artist-portfolio.git (push)
```

### Push to GitHub

```bash
git push -u origin main
```

You'll be prompted for GitHub credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

### Creating a Personal Access Token (if needed)

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "Artist Portfolio Deployment"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 5: Verify on GitHub

1. Go to `https://github.com/YOUR_USERNAME/artist-portfolio`
2. You should see all your files
3. Check that these files are present:
   - `README.md`
   - `NETLIFY_DEPLOYMENT.md`
   - `package.json`
   - `astro.config.mjs`
   - `netlify.toml`
   - `src/` directory
   - `public/admin/` directory

---

## Step 6: Connect to Netlify

Now that your code is on GitHub, follow these steps to deploy:

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify (if first time)
5. Select `artist-portfolio` repository
6. Build settings (should auto-detect):
   - Build command: `pnpm build`
   - Publish directory: `dist`
7. Click **"Deploy site"**

**🎉 Your site is now live!**

---

## Step 7: Enable Netlify Features

### Enable Netlify Identity (for CMS)

1. In Netlify dashboard → **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Registration: **"Invite only"**
4. Save

### Enable Git Gateway

1. **Identity** → **Services** → **Git Gateway**
2. Click **"Enable Git Gateway"**

### Invite Yourself

1. Go to **Identity** tab
2. Click **"Invite users"**
3. Enter: `dempatsang@gmail.com`
4. Check email and set password

### Access CMS

Visit: `https://your-site.netlify.app/admin`

---

## Future Updates

### Making Changes

```bash
# Make your changes to files
# ...

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add new artwork: Garden Dreams"

# Push to GitHub
git push

# Netlify automatically rebuilds and deploys!
```

### Via CMS

Changes made through CMS at `/admin` are automatically:
1. Committed to GitHub
2. Trigger Netlify rebuild
3. Deployed to live site

No manual git commands needed!

---

## Troubleshooting

### Authentication Failed

**Error**: "Authentication failed"

**Solution**: Use Personal Access Token instead of password

### Permission Denied

**Error**: "Permission denied (publickey)"

**Solution**: Use HTTPS URL instead of SSH:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/artist-portfolio.git
```

### Large Files

**Error**: "File is too large"

**Solution**: Ensure large files are in `.gitignore`:
```bash
echo "*.psd" >> .gitignore
echo "*.ai" >> .gitignore
git rm --cached large-file.psd
git commit -m "Remove large files"
```

### Merge Conflicts

If you edit both in CMS and locally:

```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts if any
# Then commit and push
git add .
git commit -m "Resolve conflicts"
git push
```

---

## Repository Settings

### Recommended Settings

1. Go to repository **Settings**
2. **General**:
   - Enable "Automatically delete head branches" (cleans up after merges)
3. **Branches**:
   - Add branch protection rule for `main`
   - Require status checks before merging (optional)

### Collaborators

To add other people who can edit:

1. **Settings** → **Collaborators**
2. Click **"Add people"**
3. Enter their GitHub username
4. They can now push changes

---

## Quick Reference

### Common Git Commands

```bash
# Check status
git status

# View changes
git diff

# Add specific file
git add src/data/artworks.ts

# Commit with message
git commit -m "Update artwork prices"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename.ts
```

### Repository URL

- **HTTPS**: `https://github.com/YOUR_USERNAME/artist-portfolio.git`
- **SSH**: `git@github.com:YOUR_USERNAME/artist-portfolio.git`
- **Web**: `https://github.com/YOUR_USERNAME/artist-portfolio`

---

## Next Steps

1. ✅ Push to GitHub (you're here!)
2. ⏭️ Deploy to Netlify → See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
3. ⏭️ Configure Mollie payments
4. ⏭️ Add custom domain
5. ⏭️ Start selling artworks!

---

**Need help?** Contact: dempatsang@gmail.com

