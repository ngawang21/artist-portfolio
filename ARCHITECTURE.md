# Technical Architecture for Artist Portfolio Enhancements

## Overview

This document outlines the technical architecture for implementing a complete e-commerce workflow for the artist portfolio website, using exclusively free services and tools to ensure zero ongoing costs.

## Technology Stack

### Frontend
- **Framework**: Astro 5.15.1 (static site generation)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **i18n**: Custom bilingual implementation (EN/FR)

### Backend Services (Serverless)
- **Hosting**: Netlify (free tier)
- **Serverless Functions**: Netlify Functions (125,000 requests/month free)
- **Environment**: Node.js 20

### Third-Party Services

#### Email Service: Resend
**Selected for:**
- Modern, developer-friendly API
- 3,000 emails/month free (100/day)
- Excellent deliverability
- Simple integration with Netlify Functions
- No credit card required for free tier

**Alternative considered:**
- SendGrid: Only 100 emails/day for 60 days trial, then requires payment

#### Payment Processing: Mollie
**Already in use:**
- Payment links for individual artworks
- Webhook support for payment verification
- Free to use (transaction fees only)

#### Data Storage
- **Artwork data**: GitHub repository (JSON files in `/src/content/artworks/`)
- **Invoice counter**: JSON file in repository root (`/data/invoice-counter.json`)
- **Generated invoices**: Committed to repository (`/invoices/` directory)

#### PDF Generation
- **Library**: PDFKit (Node.js)
- **Alternative**: Puppeteer (if HTML-to-PDF needed)
- **Fonts**: System fonts or embedded open-source fonts

## System Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Gallery    │  │   Checkout   │  │   Success    │      │
│  │     Page     │──▶│     Page     │──▶│     Page     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Mollie Payment                          │
│                    (External Service)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (Webhook)
┌─────────────────────────────────────────────────────────────┐
│                    Netlify Functions                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/payment-webhook                                │   │
│  │  - Verify payment signature                          │   │
│  │  - Get payment details                               │   │
│  │  - Trigger post-purchase workflow                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│  ┌──────────────────────────┼───────────────────────────┐   │
│  │                          │                           │   │
│  ▼                          ▼                           ▼   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │   Generate   │  │    Update    │  │     Send     │  │   │
│  │   Invoice    │  │   Artwork    │  │    Emails    │  │   │
│  │     PDF      │  │    Status    │  │              │  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  │   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  GitHub API  │  │    Resend    │  │   Mollie     │      │
│  │  (CMS Data)  │  │   (Emails)   │  │   (Payment)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Purchase Workflow

1. **User browses gallery**
   - Views artworks with prices and availability
   - Clicks "Buy Now" / "Acheter" button

2. **Checkout page**
   - URL: `/checkout/[artworkSlug]?lang=[en|fr]`
   - Form collects:
     - Full name
     - Email address
     - Phone number
     - Billing address (optional for invoice)
   - Displays artwork details and price
   - Creates Mollie payment on form submission

3. **Payment processing**
   - Redirect to Mollie payment page
   - User completes payment
   - Mollie sends webhook to `/api/payment-webhook`

4. **Post-purchase workflow** (triggered by webhook)
   - **Step 1**: Verify payment signature and status
   - **Step 2**: Get next invoice number
   - **Step 3**: Generate PDF invoice
   - **Step 4**: Send confirmation email to buyer (with invoice attached)
   - **Step 5**: Send notification email to artist (with invoice attached)
   - **Step 6**: Update artwork JSON to set `sold: true`
   - **Step 7**: Commit changes to GitHub

5. **Success page**
   - Thank you message
   - Order confirmation
   - Email notification sent

### Invoice Numbering System

**Storage**: `/data/invoice-counter.json`

```json
{
  "lastInvoiceNumber": 1,
  "lastUpdated": "2024-10-28T12:00:00Z"
}
```

**Process**:
1. Read current counter from GitHub
2. Increment by 1
3. Format as `Facture{number:03d}` (e.g., Facture001, Facture002)
4. Generate PDF with this number
5. Update counter in GitHub
6. Use atomic commits to prevent race conditions

### Artwork Status Update

**Process**:
1. Read artwork JSON file from GitHub
2. Update `sold` field to `true`
3. Commit with message: `Mark as sold: [Artwork Title]`
4. Trigger Netlify rebuild (automatic via GitHub webhook)

## API Endpoints

### Netlify Functions

#### 1. `/api/create-payment`
**Method**: POST  
**Purpose**: Create Mollie payment with metadata  
**Input**:
```json
{
  "artworkId": "weeping-willow",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+33612345678",
  "language": "en"
}
```
**Output**:
```json
{
  "checkoutUrl": "https://www.mollie.com/checkout/...",
  "paymentId": "tr_xxxxx"
}
```

#### 2. `/api/payment-webhook`
**Method**: POST  
**Purpose**: Handle Mollie payment webhook  
**Input**: Mollie webhook payload  
**Process**:
1. Verify webhook signature
2. Check payment status
3. If paid, trigger post-purchase workflow
4. Return 200 OK

#### 3. `/api/check-payment-status`
**Method**: GET  
**Purpose**: Check payment status for success page  
**Input**: `?paymentId=tr_xxxxx`  
**Output**:
```json
{
  "status": "paid",
  "invoiceNumber": "Facture001",
  "artworkTitle": "Weeping Willow"
}
```

## File Structure

```
artist-portfolio/
├── netlify/
│   └── functions/
│       ├── create-payment.ts
│       ├── payment-webhook.ts
│       └── check-payment-status.ts
├── src/
│   ├── pages/
│   │   ├── checkout/
│   │   │   └── [slug].astro
│   │   ├── success.astro
│   │   └── fr/
│   │       ├── checkout/
│   │       │   └── [slug].astro
│   │       └── success.astro
│   ├── lib/
│   │   ├── invoice-generator.ts
│   │   ├── email-templates.ts
│   │   └── github-api.ts
│   └── i18n/
│       └── utils.ts (enhanced)
├── data/
│   └── invoice-counter.json
├── invoices/
│   └── (generated PDFs)
└── public/
    └── admin/
        └── config.yml (updated)
```

## Environment Variables

Required in Netlify:

```bash
# Mollie
MOLLIE_API_KEY=test_xxxxx  # or live_xxxxx for production

# Resend
RESEND_API_KEY=re_xxxxx

# GitHub (for CMS updates)
GITHUB_TOKEN=ghp_xxxxx
GITHUB_REPO=ngawang21/artist-portfolio

# Artist contact
ARTIST_EMAIL=artist@example.com
ARTIST_NAME="Dempa Tsang Kunga"

# Site URL
SITE_URL=https://kunart.netlify.app
```

## Security Considerations

1. **Webhook Verification**
   - Verify Mollie webhook signatures
   - Reject unauthorized requests

2. **Environment Variables**
   - Never expose API keys in frontend code
   - Use Netlify Functions for all sensitive operations

3. **GitHub Token**
   - Use fine-grained personal access token
   - Limit permissions to repository contents only

4. **Rate Limiting**
   - Implement basic rate limiting in functions
   - Prevent abuse of payment creation endpoint

5. **Input Validation**
   - Validate all user inputs
   - Sanitize data before PDF generation
   - Prevent injection attacks

## Scalability & Limits

### Netlify Functions (Free Tier)
- 125,000 requests/month
- 100 hours runtime/month
- Sufficient for small art gallery (expect <100 sales/month)

### Resend (Free Tier)
- 3,000 emails/month
- 100 emails/day
- Each sale = 2 emails (buyer + artist)
- Can handle 1,500 sales/month (far exceeds expected volume)

### GitHub API
- 5,000 requests/hour (authenticated)
- Each sale = ~3 API calls (read counter, update counter, update artwork)
- Can handle 1,666 sales/hour (no practical limit)

### Mollie
- No request limits on free tier
- Transaction fees only (no monthly fees)

## Deployment Strategy

1. **Development**
   - Test with Mollie test mode
   - Use Resend sandbox mode
   - Deploy to Netlify preview branch

2. **Production**
   - Switch to Mollie live API key
   - Use Resend production mode
   - Deploy to main branch
   - Configure custom domain if needed

3. **Monitoring**
   - Netlify function logs
   - Resend email delivery logs
   - Mollie payment dashboard
   - GitHub commit history

## Rollback Plan

If issues occur:
1. Revert GitHub commits
2. Netlify auto-deploys previous version
3. No data loss (all transactions logged in Mollie)
4. Can manually process pending orders

## Future Enhancements (Optional)

1. **Admin Dashboard**
   - View all orders
   - Download invoices
   - Manage inventory

2. **Shopping Cart**
   - Multiple artworks per order
   - Combined invoice

3. **Shipping Integration**
   - Calculate shipping costs
   - Generate shipping labels

4. **Analytics**
   - Track sales metrics
   - Popular artworks
   - Revenue reports

All future enhancements must maintain the "forever free" requirement.
