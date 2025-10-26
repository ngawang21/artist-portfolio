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

