import { Handler } from '@netlify/functions';
import { createMollieClient } from '@mollie/api-client';
import { Resend } from 'resend';
import { GitHubAPI } from '../../src/lib/github-api';
import { generateInvoicePDF } from '../../src/lib/invoice-generator';
import { getBuyerEmailTemplate, getArtistEmailTemplate } from '../../src/lib/email-templates';

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { id: paymentId } = JSON.parse(event.body || '{}');

    if (!paymentId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing payment ID' }),
      };
    }

    // Initialize Mollie client
    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY || '',
    });

    // Get payment details
    const payment = await mollieClient.payments.get(paymentId);

    // Only process paid payments
    if (payment.status !== 'paid') {
      console.log(`Payment ${paymentId} status: ${payment.status}`);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment not completed yet' }),
      };
    }

    // Extract metadata
    const metadata = payment.metadata as {
      artworkId: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      customerAddress: string;
      language: 'en' | 'fr';
      artworkTitle: string;
    };

    console.log('Processing payment for:', metadata);

    // Initialize services
    const github = new GitHubAPI();
    const resend = new Resend(process.env.RESEND_API_KEY || '');

    // Get artwork details from GitHub
    const artworkFile = await github.getFile(`src/content/artworks/${metadata.artworkId}.json`);
    const artwork = JSON.parse(artworkFile.content);

    // Get next invoice number
    const invoiceNumber = await github.getInvoiceNumber();
    const invoiceNumberFormatted = `Facture${String(invoiceNumber).padStart(3, '0')}`;

    console.log('Generated invoice number:', invoiceNumberFormatted);

    // Generate PDF invoice
    const invoicePDF = await generateInvoicePDF({
      invoiceNumber,
      date: new Date(),
      customerName: metadata.customerName,
      customerAddress: metadata.customerAddress,
      artworkTitle: metadata.artworkTitle,
      artworkYear: artwork.year,
      artworkDimensions: artwork.dimensions,
      price: artwork.price,
      language: metadata.language,
    });

    console.log('Invoice PDF generated');

    // Save invoice to GitHub
    await github.saveInvoice(invoiceNumber, invoicePDF);
    console.log('Invoice saved to GitHub');

    // Prepare email templates
    const buyerEmail = getBuyerEmailTemplate({
      customerName: metadata.customerName,
      artworkTitle: metadata.artworkTitle,
      artworkPrice: artwork.price,
      invoiceNumber: invoiceNumberFormatted,
      language: metadata.language,
    });

    const artistEmail = getArtistEmailTemplate({
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
      customerPhone: metadata.customerPhone,
      artworkTitle: metadata.artworkTitle,
      artworkPrice: artwork.price,
      invoiceNumber: invoiceNumberFormatted,
      language: metadata.language,
    });

    // Send email to buyer
    await resend.emails.send({
      from: process.env.ARTIST_EMAIL || 'noreply@kunart.netlify.app',
      to: metadata.customerEmail,
      subject: buyerEmail.subject,
      html: buyerEmail.html,
      text: buyerEmail.text,
      attachments: [
        {
          filename: `${invoiceNumberFormatted}.pdf`,
          content: invoicePDF,
        },
      ],
    });

    console.log('Buyer email sent');

    // Send email to artist
    await resend.emails.send({
      from: process.env.ARTIST_EMAIL || 'noreply@kunart.netlify.app',
      to: process.env.ARTIST_EMAIL || '',
      subject: artistEmail.subject,
      html: artistEmail.html,
      text: artistEmail.text,
      attachments: [
        {
          filename: `${invoiceNumberFormatted}.pdf`,
          content: invoicePDF,
        },
      ],
    });

    console.log('Artist email sent');

    // Mark artwork as sold
    await github.markArtworkAsSold(metadata.artworkId, metadata.artworkTitle);
    console.log('Artwork marked as sold');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Payment processed successfully',
        invoiceNumber: invoiceNumberFormatted,
      }),
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process payment' }),
    };
  }
};

export { handler };
