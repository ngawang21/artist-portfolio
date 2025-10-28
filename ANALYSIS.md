# Artist Portfolio Analysis

## Current State

### Technology Stack
- **Frontend Framework**: Astro 5.15.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.18
- **CMS**: Decap CMS (formerly Netlify CMS) with GitHub backend
- **Hosting**: Netlify (free tier)
- **Payment**: Mollie payment links
- **i18n**: Custom implementation with EN/FR support

### Existing Features
1. **CMS Integration**
   - GitHub OAuth backend
   - Artworks collection (JSON format)
   - Blog posts (MDX format)
   - Pages (Markdown format)
   - Media uploads to `/public/images/uploads`

2. **Gallery Display**
   - Content collection using Astro's getCollection
   - Bilingual support (EN/FR)
   - Featured/sold status
   - Direct Mollie payment links
   - Responsive grid layout

3. **Current Issues Identified**
   - EN gallery: Buy button shows "Buy Now" but missing translation key `gallery.buyNow`
   - FR gallery: Buy button shows "Acheter" correctly using `gallery.buy`
   - No checkout interface - direct link to Mollie
   - No post-purchase workflow (marking as sold, emails, invoices)
   - CMS commit messages use generic template

## Invoice Template Analysis

**Artist Information:**
- Name: Dempa Tsang Kunga - Entrepreneur individuel
- Address: 9 rue Léopold Sédar Senghor, 91000 Evry Courcouronnes
- N° Siret: 929 714 483 00013
- N° Sécurité Sociale: 299119921618054
- Tél: +33 (0)6 63 16 37 69

**Invoice Format:**
- Invoice number: Sequential (e.g., n° 001)
- Date: DD/MM/YYYY format
- Client section with full details
- Item description with artwork details (title, year, dimensions)
- Quantity column
- Total price (Prix forfaitaire)
- Footer: "1,1% à la charge du diffuseur"
- Footer: "T.V.A. non applicable, article 293-B du code général des impôts."

## Required Improvements

### 1. Git Commit Messages ✓
- Update CMS config to use concise commit messages
- Format: "Add artwork: [title]" instead of generic slug

### 2. CMS & Gallery Sync ✓
- Already working correctly - all artworks display
- Need to verify EN/FR translation consistency

### 3. Payment Workflow & UX
**Missing Features:**
- Mark artwork as sold in CMS after purchase
- Send confirmation email to buyer (EN/FR)
- Generate PDF invoice with incremental numbering
- Send invoice + confirmation to admin/artist
- No current backend - need serverless solution

### 4. Dedicated Checkout Interface
**Requirements:**
- Separate checkout page
- Client info collection (name, email, phone)
- Integrate Mollie payment
- Professional, user-friendly design
- Bilingual support

### 5. Localization & Compliance
**Requirements:**
- EUR € formatting
- European/French date format (DD/MM/YYYY)
- Language-specific invoice content
- Language-specific email content

## Technical Architecture Plan

### Free Services Strategy

1. **Backend/API**: Netlify Functions (free tier)
   - Serverless functions for payment processing
   - Invoice generation
   - Email sending
   - CMS updates via GitHub API

2. **Email Service**: 
   - Option 1: Netlify Forms + Zapier free tier
   - Option 2: SendGrid free tier (100 emails/day)
   - Option 3: Resend free tier (100 emails/day)
   - **Recommended**: Resend (better API, modern)

3. **PDF Generation**:
   - Server-side using PDFKit or Puppeteer
   - Template matching invoice format

4. **Invoice Numbering**:
   - Store in GitHub repo as JSON file
   - Atomic updates via GitHub API
   - Format: Facture001, Facture002, etc.

5. **Artwork Status Updates**:
   - GitHub API to update artwork JSON
   - Set `sold: true` after successful payment

### Implementation Phases

**Phase 1: Fix Current Issues**
- Fix EN translation for Buy button
- Improve CMS commit messages

**Phase 2: Checkout Interface**
- Create `/checkout/[artworkId]` page
- Form for client details
- Mollie payment integration
- Bilingual support

**Phase 3: Payment Webhook**
- Netlify Function for Mollie webhook
- Verify payment status
- Trigger post-purchase workflow

**Phase 4: Invoice Generation**
- PDF generation matching template
- Incremental numbering system
- Store invoices in GitHub or S3-compatible storage

**Phase 5: Email Notifications**
- Resend integration
- Bilingual email templates
- Send to buyer and admin

**Phase 6: CMS Updates**
- Update artwork status via GitHub API
- Commit with proper message

## Next Steps

1. Set up Netlify Functions
2. Choose and configure email service (Resend)
3. Implement checkout page
4. Create Mollie webhook handler
5. Build PDF invoice generator
6. Implement email templates
7. Test end-to-end workflow
8. Deploy and verify
