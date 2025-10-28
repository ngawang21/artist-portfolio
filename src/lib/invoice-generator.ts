import PDFDocument from 'pdfkit';

export interface InvoiceData {
  invoiceNumber: number;
  date: Date;
  customerName: string;
  customerAddress?: string;
  artworkTitle: string;
  artworkYear: number;
  artworkDimensions: string;
  price: number;
  language: 'en' | 'fr';
}

export function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Artist information (header)
      doc.fontSize(16).font('Helvetica-Bold').text('Dempa Tsang Kunga', { align: 'left' });
      doc.fontSize(10).font('Helvetica').text('- Entrepreneur individuel', { continued: true });
      doc.moveDown(2);

      // Date (top right)
      const formattedDate = formatDate(data.date, data.language);
      doc.fontSize(10).text(formattedDate, 400, 50, { align: 'right' });

      // Artist details
      doc.fontSize(10).font('Helvetica');
      doc.text('9 rue Léopold Sédar Senghor', 50, 100);
      doc.text('91000 Evry Courcouronnes');
      doc.moveDown();
      doc.text('N° Siret : 929 714 483 00013');
      doc.text('N° Sécurité Sociale : 299119921618054');
      doc.text('Tél : +33 (0)6 63 16 37 69');
      doc.moveDown(2);

      // Horizontal line
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Customer information
      const customerLabel = data.language === 'fr' ? 'Nom du client :' : 'Customer name:';
      doc.fontSize(10).font('Helvetica-Bold').text(customerLabel, 50, doc.y);
      doc.font('Helvetica').text(data.customerName, 150, doc.y - 12);
      
      if (data.customerAddress) {
        const addressLines = data.customerAddress.split('\n');
        addressLines.forEach(line => {
          doc.text(line, 150, doc.y);
        });
      }
      doc.moveDown(2);

      // Horizontal line
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(2);

      // Invoice title
      const invoiceTitle = data.language === 'fr' ? 'Facture' : 'Invoice';
      const invoiceNumberFormatted = `Facture${String(data.invoiceNumber).padStart(3, '0')}`;
      doc.fontSize(14).font('Helvetica-Bold').text(`${invoiceTitle} : n° ${invoiceNumberFormatted}`, { align: 'center' });
      doc.moveDown(2);

      // Horizontal line
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Table header
      const descriptionLabel = data.language === 'fr' ? 'Description' : 'Description';
      const quantityLabel = data.language === 'fr' ? 'Quantité' : 'Quantity';
      
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text(descriptionLabel, 50, doc.y);
      doc.text(quantityLabel, 450, doc.y - 12, { align: 'right' });
      doc.moveDown();

      // Horizontal line
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Artwork details
      doc.fontSize(10).font('Helvetica');
      const paintingLabel = data.language === 'fr' ? 'Peinture' : 'Painting';
      doc.text(paintingLabel);
      
      const artworkDescription = data.language === 'fr'
        ? `Peinture à huile "${data.artworkTitle}", réalisée en ${data.artworkYear}. Dimensions de la toile : ${data.artworkDimensions}`
        : `Oil painting "${data.artworkTitle}", created in ${data.artworkYear}. Canvas dimensions: ${data.artworkDimensions}`;
      
      doc.text(artworkDescription, 50, doc.y, { width: 400 });
      doc.text('1', 450, doc.y - 40, { align: 'right' });
      doc.moveDown(3);

      // Total price
      const totalLabel = data.language === 'fr' ? 'Prix forfaitaire' : 'Total price';
      doc.text(totalLabel, 350, doc.y);
      doc.text(`${data.price} €`, 450, doc.y - 12, { align: 'right' });
      doc.moveDown(5);

      // Footer text
      doc.fontSize(10).font('Helvetica');
      doc.text('1,1% à la charge du diffuseur', { align: 'center' });
      doc.moveDown(2);

      const taxNote = data.language === 'fr'
        ? 'Arrête la présente facture à la somme de Cent euros.'
        : `Total amount: ${numberToWords(data.price, data.language)} euros.`;
      doc.text(taxNote, { align: 'center' });
      
      doc.text('T.V.A. non applicable, article 293-B du code général des impôts.', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function formatDate(date: Date, language: 'en' | 'fr'): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  if (language === 'fr') {
    return `${day}/${month}/${year}`;
  } else {
    return `${month}/${day}/${year}`;
  }
}

function numberToWords(num: number, language: 'en' | 'fr'): string {
  // Simple implementation for common amounts
  // For production, use a library like number-to-words
  const words: { [key: number]: { en: string; fr: string } } = {
    100: { en: 'One hundred', fr: 'Cent' },
    200: { en: 'Two hundred', fr: 'Deux cents' },
    500: { en: 'Five hundred', fr: 'Cinq cents' },
    1000: { en: 'One thousand', fr: 'Mille' },
    1500: { en: 'One thousand five hundred', fr: 'Mille cinq cents' },
    1800: { en: 'One thousand eight hundred', fr: 'Mille huit cents' },
    2000: { en: 'Two thousand', fr: 'Deux mille' },
    2100: { en: 'Two thousand one hundred', fr: 'Deux mille cent' },
    2200: { en: 'Two thousand two hundred', fr: 'Deux mille deux cents' },
    2400: { en: 'Two thousand four hundred', fr: 'Deux mille quatre cents' },
    2800: { en: 'Two thousand eight hundred', fr: 'Deux mille huit cents' },
  };

  if (words[num]) {
    return words[num][language];
  }

  // Fallback to number
  return num.toString();
}
