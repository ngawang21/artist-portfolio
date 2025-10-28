export const languages = {
  en: 'English',
  fr: 'Français',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'home.hero.title': 'Contemporary Art from Paris',
    'home.hero.subtitle': 'Explore unique paintings and artworks',
    'home.featured': 'Featured Artworks',
    'gallery.title': 'Gallery',
    'gallery.dimensions': 'Dimensions',
    'gallery.price': 'Price',
    'gallery.buy': 'Buy Now',
    'gallery.buyNow': 'Buy Now',
    'gallery.sold': 'Sold',
    'about.title': 'About the Artist',
    'about.exhibitions': 'Exhibitions',
    'about.statement': 'Artist Statement',
    'contact.title': 'Get in Touch',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'footer.rights': 'All rights reserved',
    'footer.follow': 'Follow',
    'checkout.title': 'Checkout',
    'checkout.artworkDetails': 'Artwork Details',
    'checkout.customerInfo': 'Customer Information',
    'checkout.name': 'Full Name',
    'checkout.email': 'Email Address',
    'checkout.phone': 'Phone Number',
    'checkout.address': 'Address (Optional)',
    'checkout.proceedToPayment': 'Proceed to Payment',
    'checkout.total': 'Total',
    'success.title': 'Payment Successful!',
    'success.message': 'Thank you for your purchase. You will receive a confirmation email shortly.',
    'success.invoiceNumber': 'Invoice Number',
    'success.backToGallery': 'Back to Gallery',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.gallery': 'Galerie',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'home.hero.title': 'Art Contemporain de Paris',
    'home.hero.subtitle': 'Découvrez des peintures et œuvres uniques',
    'home.featured': 'Œuvres en vedette',
    'gallery.title': 'Galerie',
    'gallery.dimensions': 'Dimensions',
    'gallery.price': 'Prix',
    'gallery.buy': 'Acheter',
    'gallery.sold': 'Vendu',
    'about.title': 'À propos de l\'artiste',
    'about.exhibitions': 'Expositions',
    'about.statement': 'Déclaration de l\'artiste',
    'contact.title': 'Contactez-nous',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.success': 'Message envoyé avec succès!',
    'footer.rights': 'Tous droits réservés',
    'footer.follow': 'Suivez',
    'checkout.title': 'Paiement',
    'checkout.artworkDetails': 'Détails de l\'œuvre',
    'checkout.customerInfo': 'Informations client',
    'checkout.name': 'Nom complet',
    'checkout.email': 'Adresse e-mail',
    'checkout.phone': 'Numéro de téléphone',
    'checkout.address': 'Adresse (Optionnel)',
    'checkout.proceedToPayment': 'Procéder au paiement',
    'checkout.total': 'Total',
    'success.title': 'Paiement réussi !',
    'success.message': 'Merci pour votre achat. Vous recevrez un e-mail de confirmation sous peu.',
    'success.invoiceNumber': 'Numéro de facture',
    'success.backToGallery': 'Retour à la galerie',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

