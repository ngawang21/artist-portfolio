# Deployment Guide - Artist Portfolio

Complete step-by-step instructions for deploying your artist portfolio website.

## Table of Contents

1. [Netlify Deployment](#netlify-deployment)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [CMS Setup](#cms-setup)
4. [Contact Form Setup](#contact-form-setup)
5. [Payment Integration](#payment-integration)
6. [Custom Domain](#custom-domain)
7. [Troubleshooting](#troubleshooting)

---

## Netlify Deployment

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Artist Portfolio"

# Create main branch
git branch -M main
```

### Step 2: Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository
5. Configure build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)
6. Click **"Deploy site"**

Your site will be live at `https://random-name-12345.netlify.app`

### Step 4: Configure Site Settings

1. Go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"** to customize your URL
3. Example: `kunga-dempa-art.netlify.app`

---

## GitHub Pages Deployment

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2: Update Astro Config

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/YOUR_REPO_NAME', // Only if not using custom domain
  // ... rest of config
});
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push your changes to trigger deployment

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push
```

Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## CMS Setup (Netlify Only)

### Step 1: Enable Netlify Identity

1. In Netlify dashboard, go to **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Under **Registration**, select **"Invite only"**
4. Click **"Save"**

### Step 2: Enable Git Gateway

1. Go to **Settings** → **Identity** → **Services**
2. Click **"Enable Git Gateway"**

### Step 3: Invite Yourself

1. Go to **Identity** tab
2. Click **"Invite users"**
3. Enter your email: `dempatsang@gmail.com`
4. Check your email and accept the invitation
5. Set your password

### Step 4: Access CMS

1. Visit `https://your-site.netlify.app/admin`
2. Log in with your credentials
3. Start managing content!

### CMS Features

- **Artworks**: Add/edit artwork entries with images and pricing
- **Blog Posts**: Create and publish articles
- **Pages**: Edit about page content

---

## Contact Form Setup

### Option 1: Formspree (Easiest)

1. **Sign up** at [https://formspree.io](https://formspree.io)
2. **Create a new form**
3. **Copy your form ID** (looks like `abc123xyz`)
4. **Update contact pages**:

Edit `src/pages/contact.astro` and `src/pages/fr/contact.astro`:

```html
<!-- Replace this line: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- With: -->
<form action="https://formspree.io/f/abc123xyz" method="POST">
```

5. **Rebuild and deploy**

### Option 2: Netlify Forms (Netlify only)

1. **Update form tag** in `src/pages/contact.astro` and `src/pages/fr/contact.astro`:

```html
<form 
  data-netlify="true" 
  name="contact" 
  method="POST"
  class="space-y-6"
>
  <!-- Add hidden field for Netlify -->
  <input type="hidden" name="form-name" value="contact" />
  
  <!-- Rest of form fields... -->
</form>
```

2. **Rebuild and deploy**
3. **View submissions** in Netlify dashboard under **Forms** tab

---

## Payment Integration

### Stripe Payment Links

1. **Create Stripe account** at [https://stripe.com](https://stripe.com)
2. **Go to** [Payment Links](https://dashboard.stripe.com/payment-links)
3. **Create a payment link** for each artwork:
   - Product name: "Parisian Sunset - Original Painting"
   - Price: €1200
   - Quantity: 1 (one-time purchase)
4. **Copy the payment link**
5. **Update** `src/data/artworks.ts`:

```typescript
{
  id: '1',
  title: { en: 'Parisian Sunset', fr: 'Coucher de soleil parisien' },
  // ... other fields
  stripeLink: 'https://buy.stripe.com/test_abc123xyz',
}
```

6. **Test mode**: Use test links during development
7. **Live mode**: Switch to live links when ready to accept payments

### PayPal Buy Now Buttons (Alternative)

1. **Create buttons** at [PayPal Button Factory](https://www.paypal.com/buttons/)
2. **Add links** to `paypalLink` field in artwork data

---

## Custom Domain

### Netlify Custom Domain

1. **Purchase domain** (Namecheap, Google Domains, etc.)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Enter your domain: `kungadempa.art`
4. **Configure DNS** (Netlify provides instructions):
   - Add A record pointing to Netlify's IP
   - Or add CNAME record
5. **Enable HTTPS** (automatic with Netlify)

### GitHub Pages Custom Domain

1. **Add CNAME file** to `public/` directory:
   ```
   kungadempa.art
   ```
2. **Configure DNS** at your domain registrar:
   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. **Enable HTTPS** in GitHub Pages settings

---

## Troubleshooting

### Build Fails

**Error**: `Command failed with exit code 1`

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Images Not Loading

**Error**: Images show broken links

**Solution**:
- Ensure images are in `public/` directory
- Use absolute paths: `/images/artwork.jpg`
- Check image file names (case-sensitive)

### CMS Not Accessible

**Error**: 404 on `/admin` page

**Solution**:
- Ensure `public/admin/index.html` exists
- Check Netlify Identity is enabled
- Clear browser cache

### Forms Not Working

**Error**: Form submission fails

**Solution**:
- **Formspree**: Verify form ID is correct
- **Netlify**: Ensure `data-netlify="true"` attribute is present
- Check for JavaScript errors in browser console

### Language Switching Broken

**Error**: 404 when switching languages

**Solution**:
- Ensure French pages exist in `src/pages/fr/`
- Check `astro.config.mjs` i18n configuration
- Verify routing in `BaseLayout.astro`

---

## Post-Deployment Checklist

- [ ] Site loads correctly on desktop and mobile
- [ ] All pages accessible (home, gallery, about, contact, blog)
- [ ] Language switching works (EN ↔ FR)
- [ ] Contact form submits successfully
- [ ] Payment links work (test mode first!)
- [ ] Images load properly
- [ ] SEO meta tags present (check with View Source)
- [ ] Social media links correct
- [ ] CMS accessible (if using Netlify)
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Google Analytics added (optional)

---

## Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Astro Docs**: https://docs.astro.build
- **GitHub Pages Docs**: https://docs.github.com/pages
- **Contact**: dempatsang@gmail.com

---

**Good luck with your deployment! 🚀**

