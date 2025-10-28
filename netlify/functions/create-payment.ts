import { Handler } from '@netlify/functions';
import { createMollieClient } from '@mollie/api-client';

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { artworkId, name, email, phone, address, language } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!artworkId || !name || !email || !phone || !language) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Get artwork data from the request or fetch from content
    // For now, we'll need to pass the price and title from the frontend
    // In a real scenario, you'd fetch this from your content collection
    const artworkData = JSON.parse(event.body || '{}');
    
    if (!artworkData.price || !artworkData.title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing artwork data' }),
      };
    }

    // Initialize Mollie client
    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY || '',
    });

    // Create payment
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: artworkData.price.toFixed(2),
      },
      description: `Artwork: ${artworkData.title}`,
      redirectUrl: `${process.env.SITE_URL || 'https://kunart.netlify.app'}${language === 'fr' ? '/fr' : ''}/success?paymentId={id}`,
      webhookUrl: `${process.env.SITE_URL || 'https://kunart.netlify.app'}/.netlify/functions/payment-webhook`,
      metadata: {
        artworkId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address || '',
        language,
        artworkTitle: artworkData.title,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutUrl: payment.getCheckoutUrl(),
        paymentId: payment.id,
      }),
    };
  } catch (error) {
    console.error('Payment creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment' }),
    };
  }
};

export { handler };
