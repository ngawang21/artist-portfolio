export interface EmailData {
  customerName: string;
  artworkTitle: string;
  artworkPrice: number;
  invoiceNumber: string;
  language: 'en' | 'fr';
}

export function getBuyerEmailTemplate(data: EmailData): { subject: string; html: string; text: string } {
  if (data.language === 'fr') {
    return {
      subject: `Confirmation d'achat - ${data.artworkTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .artwork-details { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #2c3e50; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .button { display: inline-block; padding: 10px 20px; background-color: #2c3e50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Merci pour votre achat !</h1>
            </div>
            <div class="content">
              <p>Cher(e) ${data.customerName},</p>
              
              <p>Nous vous confirmons la réception de votre paiement pour l'œuvre suivante :</p>
              
              <div class="artwork-details">
                <h2>${data.artworkTitle}</h2>
                <p><strong>Prix :</strong> ${data.artworkPrice} €</p>
                <p><strong>Numéro de facture :</strong> ${data.invoiceNumber}</p>
              </div>
              
              <p>Votre facture est jointe à cet e-mail.</p>
              
              <p>Nous vous contacterons prochainement pour organiser la livraison de votre œuvre.</p>
              
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              
              <p>Cordialement,<br>
              Dempa Tsang Kunga<br>
              Artiste<br>
              +33 (0)6 63 16 37 69</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Dempa Tsang Kunga - Tous droits réservés</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merci pour votre achat !

Cher(e) ${data.customerName},

Nous vous confirmons la réception de votre paiement pour l'œuvre suivante :

${data.artworkTitle}
Prix : ${data.artworkPrice} €
Numéro de facture : ${data.invoiceNumber}

Votre facture est jointe à cet e-mail.

Nous vous contacterons prochainement pour organiser la livraison de votre œuvre.

Si vous avez des questions, n'hésitez pas à nous contacter.

Cordialement,
Dempa Tsang Kunga
Artiste
+33 (0)6 63 16 37 69
      `,
    };
  } else {
    return {
      subject: `Purchase Confirmation - ${data.artworkTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .artwork-details { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #2c3e50; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .button { display: inline-block; padding: 10px 20px; background-color: #2c3e50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank you for your purchase!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.customerName},</p>
              
              <p>We confirm receipt of your payment for the following artwork:</p>
              
              <div class="artwork-details">
                <h2>${data.artworkTitle}</h2>
                <p><strong>Price:</strong> €${data.artworkPrice}</p>
                <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
              </div>
              
              <p>Your invoice is attached to this email.</p>
              
              <p>We will contact you shortly to arrange delivery of your artwork.</p>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>
              Dempa Tsang Kunga<br>
              Artist<br>
              +33 (0)6 63 16 37 69</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Dempa Tsang Kunga - All rights reserved</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Thank you for your purchase!

Dear ${data.customerName},

We confirm receipt of your payment for the following artwork:

${data.artworkTitle}
Price: €${data.artworkPrice}
Invoice Number: ${data.invoiceNumber}

Your invoice is attached to this email.

We will contact you shortly to arrange delivery of your artwork.

If you have any questions, please don't hesitate to contact us.

Best regards,
Dempa Tsang Kunga
Artist
+33 (0)6 63 16 37 69
      `,
    };
  }
}

export function getArtistEmailTemplate(data: EmailData & { customerEmail: string; customerPhone: string }): { subject: string; html: string; text: string } {
  const lang = data.language === 'fr' ? 'fr' : 'en';
  
  if (lang === 'fr') {
    return {
      subject: `Nouvelle vente - ${data.artworkTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #27ae60; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .details { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #27ae60; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Nouvelle vente !</h1>
            </div>
            <div class="content">
              <p>Félicitations ! Vous avez vendu une œuvre.</p>
              
              <div class="details">
                <h2>Détails de la vente</h2>
                <p><strong>Œuvre :</strong> ${data.artworkTitle}</p>
                <p><strong>Prix :</strong> ${data.artworkPrice} €</p>
                <p><strong>Numéro de facture :</strong> ${data.invoiceNumber}</p>
              </div>
              
              <div class="details">
                <h2>Informations client</h2>
                <p><strong>Nom :</strong> ${data.customerName}</p>
                <p><strong>Email :</strong> ${data.customerEmail}</p>
                <p><strong>Téléphone :</strong> ${data.customerPhone}</p>
              </div>
              
              <p>La facture est jointe à cet e-mail.</p>
              
              <p>L'œuvre a été automatiquement marquée comme vendue sur le site.</p>
            </div>
            <div class="footer">
              <p>Notification automatique du système de vente</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎉 Nouvelle vente !

Félicitations ! Vous avez vendu une œuvre.

Détails de la vente :
- Œuvre : ${data.artworkTitle}
- Prix : ${data.artworkPrice} €
- Numéro de facture : ${data.invoiceNumber}

Informations client :
- Nom : ${data.customerName}
- Email : ${data.customerEmail}
- Téléphone : ${data.customerPhone}

La facture est jointe à cet e-mail.

L'œuvre a été automatiquement marquée comme vendue sur le site.
      `,
    };
  } else {
    return {
      subject: `New Sale - ${data.artworkTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #27ae60; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .details { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #27ae60; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Sale!</h1>
            </div>
            <div class="content">
              <p>Congratulations! You have sold an artwork.</p>
              
              <div class="details">
                <h2>Sale Details</h2>
                <p><strong>Artwork:</strong> ${data.artworkTitle}</p>
                <p><strong>Price:</strong> €${data.artworkPrice}</p>
                <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
              </div>
              
              <div class="details">
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> ${data.customerName}</p>
                <p><strong>Email:</strong> ${data.customerEmail}</p>
                <p><strong>Phone:</strong> ${data.customerPhone}</p>
              </div>
              
              <p>The invoice is attached to this email.</p>
              
              <p>The artwork has been automatically marked as sold on the website.</p>
            </div>
            <div class="footer">
              <p>Automatic notification from the sales system</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎉 New Sale!

Congratulations! You have sold an artwork.

Sale Details:
- Artwork: ${data.artworkTitle}
- Price: €${data.artworkPrice}
- Invoice Number: ${data.invoiceNumber}

Customer Information:
- Name: ${data.customerName}
- Email: ${data.customerEmail}
- Phone: ${data.customerPhone}

The invoice is attached to this email.

The artwork has been automatically marked as sold on the website.
      `,
    };
  }
}
