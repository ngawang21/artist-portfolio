# Kunga DEMPA TSANG - Artist Portfolio

A modern, multilingual artist portfolio website built with Astro, featuring Netlify CMS for content management, Mollie payment integration, and full SEO optimization.

## 🌟 Features

- ✅ **Multilingual Support**: Full English and French translations with easy language switching
- ✅ **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- ✅ **Netlify CMS**: Artist-friendly content management - upload paintings without coding
- ✅ **Mollie Payments**: Secure payment processing for artwork sales
- ✅ **SEO Optimized**: Meta tags, OpenGraph, sitemap, and structured data
- ✅ **Blog System**: MDX-powered blog with markdown support
- ✅ **Gallery**: Beautiful grid layout with sold/available status tracking
- ✅ **Contact Form**: Netlify Forms integration (free, no setup required)
- ✅ **Fast Performance**: Static site generation with Astro
- ✅ **Free Hosting**: Deploy to Netlify with custom domain and SSL support
- ✅ **Accessible**: WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

Visit `http://localhost:4321` to see your site.

## 📦 What's Included

### Pages (English & French)

- **Home**: Hero banner, featured artworks, artist introduction
- **Gallery**: All artworks with pricing, dimensions, and buy buttons
- **About**: Artist biography, exhibitions, statement, press coverage
- **Contact**: Contact form with social media links
- **Blog**: Articles and news

### Content Management

- **Netlify CMS** at `/admin` for easy content updates
- Upload artwork images directly through CMS
- Edit text, prices, and details without touching code
- Changes auto-deploy to live site

### Payment Integration

- **Mollie** payment links for each artwork
- Secure checkout process
- Supports all major payment methods
- Easy to set up and manage

## 🌐 Deployment to Netlify

### Quick Deploy

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/artist-portfolio.git
   git push -u origin main
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Deploy!

3. **Enable CMS**:
   - Site settings → Identity → Enable
   - Enable Git Gateway
   - Invite yourself as admin
   - Access CMS at `https://your-site.netlify.app/admin`

**📖 Full deployment guide**: See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)

## 💳 Setting Up Mollie Payments

1. Create account at [mollie.com](https://www.mollie.com)
2. Create payment links for each artwork
3. Add links via CMS or in `src/data/artworks.ts`
4. Test with Mollie's test mode before going live

**📖 Complete Mollie setup**: See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md#part-4-configure-mollie-payments)

## 🎨 Managing Content

### Via CMS (Recommended)

1. Visit `https://your-site.netlify.app/admin`
2. Log in with your credentials
3. Add/edit artworks, blog posts, and pages
4. Upload images directly
5. Publish changes
6. Site rebuilds automatically (2-3 minutes)

### Via Code

Edit files in `src/`:
- **Artworks**: `src/data/artworks.ts`
- **Pages**: `src/pages/` and `src/pages/fr/`
- **Translations**: `src/i18n/utils.ts`

Commit and push to GitHub for deployment.

## 📁 Project Structure

```
/
├── public/
│   ├── admin/              # Netlify CMS
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/uploads/     # CMS uploaded images
│   └── robots.txt
├── src/
│   ├── data/
│   │   └── artworks.ts     # Artwork data
│   ├── i18n/
│   │   └── utils.ts        # Translations
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro     # English homepage
│   │   ├── gallery.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── blog/
│   │   └── fr/             # French pages
│   └── styles/
│       └── global.css
├── netlify.toml            # Netlify configuration
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

## 🔧 Configuration

### Update Artist Information

- **Name, email, social**: `src/layouts/BaseLayout.astro`
- **Contact page**: `src/pages/contact.astro` and `src/pages/fr/contact.astro`
- **About content**: `src/pages/about.astro` and `src/pages/fr/about.astro`

### Add Artworks

**Via CMS**: `/admin` → Artworks → New Artwork

**Via Code**: Edit `src/data/artworks.ts`:

```typescript
{
  id: '7',
  title: {
    en: 'Your Artwork Title',
    fr: 'Titre de votre œuvre',
  },
  description: {
    en: 'Description in English',
    fr: 'Description en français',
  },
  image: '/images/uploads/artwork.jpg',
  dimensions: '100 × 80 cm',
  price: 1500,
  currency: 'EUR',
  sold: false,
  featured: true,
  year: 2024,
  medium: 'Oil on canvas',
  mollieLink: 'https://paymentlink.mollie.com/payment/YOUR_LINK/',
}
```

## 📱 Contact Information

- **Artist**: Kunga DEMPA TSANG
- **Email**: dempatsang@gmail.com
- **Instagram**: [@kunga.dempa](https://instagram.com/kunga.dempa)
- **Location**: Paris, France

## 🆓 Free Services Used

- **Hosting**: Netlify (free tier includes custom domain + SSL)
- **CMS**: Netlify/Decap CMS (free, open-source)
- **Forms**: Netlify Forms (free tier: 100 submissions/month)
- **Payments**: Mollie (pay-as-you-go, no monthly fees)
- **Images**: Unsplash (free stock photos for examples)

## 📚 Documentation

- **Netlify Deployment**: [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
- **General Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Astro Docs**: https://docs.astro.build
- **Netlify CMS Docs**: https://decapcms.org/docs
- **Mollie Docs**: https://docs.mollie.com

## 🎯 Built With

- [Astro](https://astro.build) - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Decap CMS](https://decapcms.org) - Content Management
- [Mollie](https://www.mollie.com) - Payment Processing
- [Netlify](https://www.netlify.com) - Hosting & Deployment

## 📄 License

This project is open source and available for personal and commercial use.

---

**Ready to deploy? Follow [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for step-by-step instructions!**


