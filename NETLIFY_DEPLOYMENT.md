# Complete Netlify Deployment Guide

## Step-by-Step Deployment for Kunga DEMPA TSANG Artist Portfolio

This guide will walk you through deploying your artist portfolio to Netlify with custom domain, SSL, CMS, and Mollie payment integration.

---

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Mollie account for payment processing
- Custom domain (optional, but recommended)

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `artist-portfolio` (or your preferred name)
3. Description: "Professional artist portfolio for Kunga DEMPA TSANG"
4. Choose **Public** (required for free Netlify hosting)
5. **Do NOT** initialize with README (we already have one)
6. Click **"Create repository"**

### Step 2: Push Your Code

```bash
# Navigate to your project
cd /home/ubuntu/artist-portfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete artist portfolio with Mollie payments"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/artist-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy to Netlify

### Step 1: Connect Repository to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your `artist-portfolio` repository

### Step 2: Configure Build Settings

Netlify should auto-detect Astro settings, but verify:

- **Build command**: `pnpm build`
- **Publish directory**: `dist`
- **Base directory**: (leave empty)

Click **"Deploy site"**

### Step 3: Wait for Deployment

- First deployment takes 2-5 minutes
- You'll get a random URL like: `https://random-name-12345.netlify.app`
- Site is now live!

---

## Part 3: Enable Netlify CMS

### Step 1: Enable Netlify Identity

1. In Netlify dashboard, go to **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Under **Registration preferences**, select **"Invite only"**
4. Under **External providers**, you can optionally enable Google/GitHub login
5. Click **"Save"**

### Step 2: Enable Git Gateway

1. Still in **Identity** settings, scroll to **Services**
2. Click **"Enable Git Gateway"**
3. This allows CMS to commit changes to your GitHub repo

### Step 3: Invite Yourself as Admin

1. Go to **Identity** tab (top navigation)
2. Click **"Invite users"**
3. Enter your email: `dempatsang@gmail.com`
4. Check your email inbox
5. Click the invitation link
6. Set a strong password
7. You're now the CMS admin!

### Step 4: Access the CMS

1. Visit: `https://your-site.netlify.app/admin`
2. Log in with your credentials
3. You should see the CMS dashboard with:
   - **Artworks** collection
   - **Blog Posts** collection
   - **Pages** collection

---

## Part 4: Configure Mollie Payments

### Step 1: Create Mollie Account

1. Go to [https://www.mollie.com/signup](https://www.mollie.com/signup)
2. Sign up for a free account
3. Complete business verification (required for live payments)
4. Note: You can use test mode while setting up

### Step 2: Create Payment Links

1. Log in to [Mollie Dashboard](https://www.mollie.com/dashboard)
2. Go to **Payment links** in the sidebar
3. Click **"Create payment link"**

For each artwork:

- **Description**: "Parisian Sunset - Original Oil Painting by Kunga DEMPA TSANG"
- **Amount**: €1200.00
- **Currency**: EUR
- **Redirect URL**: `https://your-site.netlify.app/gallery?payment=success`
- Click **"Create payment link"**
- **Copy the link** (looks like: `https://paymentlink.mollie.com/payment/abc123xyz/`)

Repeat for each artwork in your gallery.

### Step 3: Add Payment Links to Artworks

**Option A: Via CMS (Recommended)**

1. Go to `https://your-site.netlify.app/admin`
2. Click **"Artworks"**
3. Click on an artwork to edit
4. Scroll to **"Mollie Payment Link"** field
5. Paste the payment link from Mollie
6. Click **"Publish"**
7. Changes will be committed to GitHub and site will auto-rebuild

**Option B: Via Code**

Edit `src/data/artworks.ts`:

```typescript
{
  id: '1',
  title: { en: 'Parisian Sunset', fr: 'Coucher de soleil parisien' },
  // ... other fields
  mollieLink: 'https://paymentlink.mollie.com/payment/YOUR_LINK_ID/',
}
```

Commit and push to GitHub.

### Step 4: Test Payments

1. Visit your gallery page
2. Click **"Buy Now"** on an artwork
3. You'll be redirected to Mollie's secure checkout
4. Use Mollie's test card numbers (in test mode):
   - Card: `5555 5555 5555 4444`
   - Expiry: Any future date
   - CVC: Any 3 digits
5. Complete test payment
6. Verify redirect back to your site

---

## Part 5: Custom Domain & SSL

### Step 1: Add Custom Domain

1. In Netlify dashboard, go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain: `kungadempa.art` (example)
4. Click **"Verify"**

### Step 2: Configure DNS

**If your domain is registered elsewhere (Namecheap, Google Domains, etc.):**

1. Netlify will show DNS configuration instructions
2. Go to your domain registrar's DNS settings
3. Add the following records:

**Option A: Using CNAME (Recommended)**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

**Option B: Using A Record**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer IP)
```

4. Save DNS changes
5. Wait 24-48 hours for DNS propagation (usually faster)

### Step 3: Enable HTTPS/SSL

1. Once domain is verified, go to **Domain settings** → **HTTPS**
2. Netlify automatically provisions a free SSL certificate via Let's Encrypt
3. Enable **"Force HTTPS"** to redirect all HTTP traffic to HTTPS
4. Your site is now secure! 🔒

---

## Part 6: Configure Contact Form

### Option 1: Netlify Forms (Recommended - Free)

1. Edit `src/pages/contact.astro` and `src/pages/fr/contact.astro`
2. Update the form tag:

```html
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  netlify-honeypot="bot-field"
  class="space-y-6"
>
  <!-- Add hidden fields -->
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />
  
  <!-- Rest of form fields... -->
</form>
```

3. Commit and push changes
4. After deployment, form submissions appear in Netlify dashboard under **Forms** tab
5. Configure email notifications in **Forms** → **Form notifications**

### Option 2: Formspree (Alternative)

1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID
4. Update form action: `action="https://formspree.io/f/YOUR_FORM_ID"`

---

## Part 7: Using the CMS

### Adding New Artworks

1. Go to `https://your-site.netlify.app/admin`
2. Click **"Artworks"** → **"New Artwork"**
3. Fill in the fields:
   - **Title (English)**: "New Painting Title"
   - **Title (French)**: "Nouveau titre de peinture"
   - **Description (English)**: Artwork description
   - **Description (French)**: Description de l'œuvre
   - **Image**: Click "Choose an image" → Upload from computer
   - **Dimensions**: "100 × 80 cm"
   - **Price (EUR)**: 1500
   - **Year**: 2024
   - **Medium**: "Oil on canvas"
   - **Sold**: false
   - **Featured**: true (to show on homepage)
   - **Mollie Payment Link**: Paste your Mollie link
4. Click **"Publish"**
5. CMS commits changes to GitHub
6. Netlify auto-rebuilds site (2-3 minutes)
7. New artwork appears on gallery!

### Uploading Images

- **Supported formats**: JPG, PNG, WebP
- **Recommended size**: 1200-2000px wide
- **File size**: Keep under 2MB for fast loading
- Images are stored in `public/images/uploads/`
- CMS automatically handles image paths

### Editing Existing Content

1. Click **"Artworks"** or **"Blog Posts"**
2. Click on item to edit
3. Make changes
4. Click **"Publish"**
5. Site rebuilds automatically

### Marking Artworks as Sold

1. Open artwork in CMS
2. Toggle **"Sold"** to true
3. Publish
4. "Buy Now" button disappears, "Sold" badge appears

---

## Part 8: Testing Checklist

### ✅ Before Going Live

- [ ] All pages load correctly (home, gallery, about, contact, blog)
- [ ] Language switching works (EN ↔ FR)
- [ ] All images load properly
- [ ] Contact form submits successfully
- [ ] Mollie payment links work (test with test card)
- [ ] CMS login works
- [ ] Can upload new artwork via CMS
- [ ] Can edit existing content via CMS
- [ ] Custom domain resolves correctly
- [ ] HTTPS/SSL is enabled
- [ ] Mobile responsive design works
- [ ] All social media links correct
- [ ] SEO meta tags present (view page source)

---

## Part 9: Ongoing Management

### Adding New Paintings

1. Create Mollie payment link for the artwork
2. Log in to CMS: `https://your-site.netlify.app/admin`
3. Add new artwork with all details
4. Upload high-quality image
5. Paste Mollie payment link
6. Publish
7. Done! Artwork is live and ready to sell

### Updating Prices

1. Update price in Mollie dashboard
2. Update price in CMS
3. Publish changes

### Writing Blog Posts

1. Go to CMS → **Blog Posts** → **New Blog Post**
2. Write in Markdown format
3. Upload featured image
4. Set publish date
5. Publish
6. Post appears on blog page

### Monitoring Sales

- Check Mollie dashboard for payment notifications
- Set up email notifications in Mollie settings
- Mark sold artworks in CMS

---

## Troubleshooting

### Build Fails

**Error**: "Build failed with exit code 1"

**Solution**:
```bash
# Locally test build
pnpm build

# If successful, commit and push
git add .
git commit -m "Fix build"
git push
```

### CMS Not Accessible

**Error**: 404 on `/admin` page

**Solution**:
- Ensure `public/admin/index.html` and `public/admin/config.yml` exist
- Check Netlify Identity is enabled
- Clear browser cache

### Images Not Uploading

**Error**: CMS image upload fails

**Solution**:
- Check image file size (< 5MB)
- Ensure Git Gateway is enabled
- Verify you have write permissions to repo

### Payment Links Not Working

**Error**: Mollie link returns error

**Solution**:
- Verify link is active in Mollie dashboard
- Check link format is correct
- Ensure Mollie account is verified

### Domain Not Resolving

**Error**: Custom domain shows "Site not found"

**Solution**:
- Wait up to 48 hours for DNS propagation
- Verify DNS records are correct
- Use [https://dnschecker.org](https://dnschecker.org) to check propagation

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Astro Docs**: https://docs.astro.build
- **Mollie Docs**: https://docs.mollie.com
- **Decap CMS Docs**: https://decapcms.org/docs

---

## Quick Reference

### Important URLs

- **Live Site**: `https://your-site.netlify.app` (or custom domain)
- **CMS Admin**: `https://your-site.netlify.app/admin`
- **Netlify Dashboard**: https://app.netlify.com
- **Mollie Dashboard**: https://www.mollie.com/dashboard
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/artist-portfolio`

### Contact

- **Artist**: Kunga DEMPA TSANG
- **Email**: dempatsang@gmail.com
- **Instagram**: @kunga.dempa

---

**Congratulations! Your artist portfolio is now live and ready to sell artworks! 🎨🚀**

