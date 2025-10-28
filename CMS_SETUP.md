# CMS Setup Guide - GitHub OAuth

Simple guide to set up the admin panel at https://kunart.netlify.app/admin

## Quick Setup (5 minutes)

### Step 1: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in:
   - Application name: Kunga Art Portfolio CMS
   - Homepage URL: https://kunart.netlify.app
   - Authorization callback URL: https://api.netlify.com/auth/done
4. Click "Register application"
5. Copy the Client ID
6. Click "Generate a new client secret" and copy it

### Step 2: Add to Netlify

1. Go to https://app.netlify.com/sites/kunart/settings/access
2. Scroll to "OAuth" section
3. Click "Install provider" under GitHub
4. Paste your Client ID and Client Secret
5. Click "Install"

### Step 3: Test

1. Visit https://kunart.netlify.app/admin
2. Click "Login with GitHub"
3. Authorize the app
4. Start editing your artworks!

## How It Works

- Login with your GitHub account
- Edit artworks, blog posts, and pages
- Changes are automatically committed to GitHub
- Netlify rebuilds the site (2-3 minutes)
- Your changes go live!

## Managing Content

**Add Artwork:**
- Go to /admin → Artworks → New Artwork
- Upload image, set price, add Mollie payment link
- Save (auto-commits to GitHub)

**Write Blog Post:**
- Go to /admin → Blog Posts → New Post
- Write in markdown, add images
- Save and publish

**Edit Pages:**
- Go to /admin → Pages
- Update About page content in EN/FR

## Important URLs

- CMS Admin: https://kunart.netlify.app/admin
- GitHub OAuth: https://github.com/settings/developers
- Netlify Settings: https://app.netlify.com/sites/kunart/settings/access
- Repository: https://github.com/ngawang21/artist-portfolio
