# Artist Portfolio - E-Commerce Platform

A fully production-ready, forever free artist portfolio website with integrated e-commerce functionality. Built with Astro, powered by Netlify, and featuring automated payment processing, invoice generation, and email notifications.

## 🎨 Features

### Core Features
- **Bilingual Support**: Full EN/FR localization
- **CMS Integration**: Decap CMS with GitHub backend
- **Responsive Design**: Mobile-first, beautiful UI with Tailwind CSS
- **SEO Optimized**: Sitemap, meta tags, and semantic HTML

### E-Commerce Features
- **Secure Checkout**: Dedicated checkout interface with customer info collection
- **Payment Processing**: Mollie integration for credit card, iDEAL, and other payment methods
- **Automated Invoices**: PDF invoice generation with incremental numbering (Facture001, Facture002, etc.)
- **Email Notifications**: Automated emails to buyers and artist with invoice attachments
- **Inventory Management**: Automatic artwork status updates after purchase
- **Multi-language**: Checkout, emails, and invoices in customer's language

## 🚀 Technology Stack

### Frontend
- **Astro 5.15.1**: Static site generation
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **MDX**: Markdown with JSX for blog posts

### Backend (Serverless)
- **Netlify Functions**: Node.js serverless functions
- **Mollie API**: Payment processing
- **Resend API**: Email delivery
- **GitHub API**: CMS data storage and updates

### Services (All Free Tier)
- **Hosting**: Netlify (125,000 function requests/month)
- **Email**: Resend (3,000 emails/month)
- **Payment**: Mollie (transaction fees only)
- **CMS**: Decap CMS + GitHub (unlimited)

## 📁 Project Structure

```
artist-portfolio/
├── netlify/
│   └── functions/
│       ├── create-payment.ts       # Create Mollie payment
│       └── payment-webhook.ts      # Process payment completion
├── src/
│   ├── pages/
│   │   ├── checkout/
│   │   │   └── [slug].astro       # Checkout page (EN)
│   │   ├── gallery.astro          # Gallery page (EN)
│   │   ├── success.astro          # Success page (EN)
│   │   └── fr/                    # French versions
│   ├── content/
│   │   ├── artworks/              # Artwork JSON files
│   │   └── config.ts              # Content schema
│   ├── lib/
│   │   ├── github-api.ts          # GitHub API helper
│   │   ├── invoice-generator.ts   # PDF invoice generation
│   │   └── email-templates.ts     # Email templates
│   ├── i18n/
│   │   └── utils.ts               # Translation utilities
│   └── layouts/
│       └── BaseLayout.astro       # Base layout
├── public/
│   └── admin/
│       └── config.yml             # Decap CMS configuration
├── data/
│   └── invoice-counter.json       # Invoice numbering
└── invoices/                      # Generated invoices (committed to repo)
```

## 🛠️ Installation

### Prerequisites
- Node.js 20+
- pnpm (or npm/yarn)
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/ngawang21/artist-portfolio.git
cd artist-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
MOLLIE_API_KEY=test_xxxxx
RESEND_API_KEY=re_xxxxx
GITHUB_TOKEN=ghp_xxxxx
GITHUB_REPO=ngawang21/artist-portfolio
ARTIST_EMAIL=your-email@example.com
SITE_URL=http://localhost:4321
```

5. Start development server:
```bash
pnpm dev
```

6. Open http://localhost:4321

### Testing Netlify Functions Locally

Install Netlify CLI:
```bash
npm install -g netlify-cli
```

Run with Netlify Dev:
```bash
netlify dev
```

This will run both Astro and Netlify Functions locally.

## 📝 Content Management

### Adding Artworks

1. Go to `/admin` on your deployed site
2. Log in with GitHub OAuth
3. Click "Artworks" → "New Artwork"
4. Fill in all fields:
   - Title (EN/FR)
   - Description (EN/FR)
   - Image (upload or URL)
   - Dimensions
   - Price (in EUR)
   - Year
   - Medium
   - Featured (yes/no)
   - Sold (yes/no)
5. Save

The artwork will automatically appear on the gallery page.

### Updating Pages

Use the CMS to edit:
- About page (EN/FR)
- Blog posts

## 💳 Payment Workflow

### Customer Journey

1. **Browse Gallery**: Customer views artworks
2. **Click Buy**: Redirects to checkout page
3. **Enter Details**: Name, email, phone, address
4. **Proceed to Payment**: Redirects to Mollie
5. **Complete Payment**: Credit card, iDEAL, etc.
6. **Success Page**: Confirmation message

### Backend Processing (Automatic)

1. **Webhook Triggered**: Mollie sends payment confirmation
2. **Generate Invoice**: PDF created with incremental number
3. **Send Emails**:
   - Buyer: Confirmation + invoice
   - Artist: Notification + invoice
4. **Update Inventory**: Artwork marked as sold
5. **Commit to GitHub**: Invoice saved, counter updated

### Invoice Format

Invoices follow the French format:
- Artist details (name, address, SIRET, etc.)
- Customer details
- Invoice number (Facture001, Facture002, etc.)
- Artwork description (title, year, dimensions)
- Price in EUR
- Legal footer (TVA, etc.)

## 🌍 Localization

### Supported Languages
- English (default)
- French

### Adding Translations

Edit `src/i18n/utils.ts`:

```typescript
export const ui = {
  en: {
    'key': 'English text',
  },
  fr: {
    'key': 'Texte français',
  },
};
```

Use in components:
```astro
---
import { useTranslations } from '../i18n/utils';
const t = useTranslations('en');
---
<h1>{t('key')}</h1>
```

## 🔒 Security

- **Environment Variables**: All API keys stored securely in Netlify
- **Webhook Verification**: Mollie signatures verified
- **Input Validation**: All user inputs sanitized
- **HTTPS Only**: Enforced by Netlify
- **No Client-Side Secrets**: API keys never exposed to frontend

## 📊 Monitoring

### Netlify Functions
- Dashboard → Functions → View logs
- Monitor request count and errors

### Resend Emails
- Dashboard → Emails
- Track delivery status

### Mollie Payments
- Dashboard → Payments
- View transaction history

### GitHub Commits
- Repository → Commits
- Track CMS updates and invoices

## 🐛 Troubleshooting

### Common Issues

**Payment creation fails**
- Check `MOLLIE_API_KEY` is set
- Verify Mollie account is active
- Check Netlify Functions logs

**Emails not sent**
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for errors
- Verify sender domain is verified

**Artwork not marked as sold**
- Check `GITHUB_TOKEN` has write permissions
- Verify `GITHUB_REPO` is correct
- Check Netlify Functions logs

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed troubleshooting.

## 📦 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.

### Quick Deploy to Netlify

1. Push to GitHub
2. Netlify auto-deploys
3. Add environment variables in Netlify dashboard
4. Test with Mollie test mode
5. Switch to live mode when ready

## 🎯 Roadmap

Future enhancements (optional):
- [ ] Admin dashboard for order management
- [ ] Shopping cart for multiple artworks
- [ ] Shipping cost calculator
- [ ] Analytics integration
- [ ] Customer reviews
- [ ] Newsletter signup

## 📄 License

This project is private and proprietary.

## 👤 Author

**Dempa Tsang Kunga**
- Website: https://kunart.netlify.app
- Email: [Artist Email]
- Phone: +33 (0)6 63 16 37 69

## 🙏 Acknowledgments

- **Astro**: Amazing static site generator
- **Netlify**: Generous free tier
- **Mollie**: Reliable payment processing
- **Resend**: Modern email API
- **Decap CMS**: User-friendly CMS

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Review Netlify Functions logs
3. Check service dashboards (Mollie, Resend)
4. Review GitHub issues

---

**Built with ❤️ using 100% free services**
