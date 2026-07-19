import { DEFAULT_LOCALE, type Locale } from '../consts';

const en = {
  'skip.content': 'Skip to content',

  'nav.home': 'Home',
  'nav.works': 'Works',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close',

  'home.viewWorks': 'View works',
  'home.about': 'About the artist',
  'home.scroll': 'Scroll',

  'works.title': 'Works',
  'works.intro': 'Paintings and works on paper, by year of production.',
  'works.view': 'View',
  'works.sold': 'Sold',
  'works.views': 'views',
  'works.empty': 'New works are on their way.',

  'year.label': 'Year',
  'year.browse': 'Browse by year',

  'lightbox.close': 'Close',
  'lightbox.prev': 'Previous image',
  'lightbox.next': 'Next image',

  'about.title': 'About',
  'about.statement': 'Statement',
  'about.biography': 'Biography',
  'about.exhibitions': 'Exhibitions',
  'about.viewExhibition': 'View exhibition',
  'about.cta': 'Get in touch',

  'contact.title': 'Contact',
  'contact.intro':
    'For acquisitions, commissions, or a studio visit, send a note — I read every message.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.required': 'required',
  'contact.send': 'Send message',
  'contact.success':
    'Thank you — your message has been sent. A confirmation with your reference is on its way to your inbox.',
  'contact.error': 'Something went wrong. Please email me directly at ',
  'contact.ph.name': 'Your name',
  'contact.ph.email': 'you@example.com',
  'contact.ph.message': 'Your message…',
  'contact.location': 'Based in',
  'contact.elsewhere': 'Or reach me directly',
  'contact.sent': 'Message sent',
  'contact.sendFail': 'Couldn’t send',
  'contact.reference': 'Reference',
  'contact.copy': 'Copy reference',
  'contact.copied': 'Copied',
  'contact.dismiss': 'Dismiss',

  'backToTop': 'Back to top',

  'footer.rights': 'All rights reserved.',

  'seo.basedIn': 'based in',
} as const;

const fr: Record<keyof typeof en, string> = {
  'skip.content': 'Aller au contenu',

  'nav.home': 'Accueil',
  'nav.works': 'Œuvres',
  'nav.about': 'À propos',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Fermer',

  'home.viewWorks': 'Voir les œuvres',
  'home.about': "À propos de l’artiste",
  'home.scroll': 'Défiler',

  'works.title': 'Œuvres',
  'works.intro': 'Peintures et œuvres sur papier, par année de production.',
  'works.view': 'Voir',
  'works.sold': 'Vendu',
  'works.views': 'vues',
  'works.empty': 'De nouvelles œuvres arrivent bientôt.',

  'year.label': 'Année',
  'year.browse': 'Naviguer par année',

  'lightbox.close': 'Fermer',
  'lightbox.prev': 'Image précédente',
  'lightbox.next': 'Image suivante',

  'about.title': 'À propos',
  'about.statement': 'Démarche',
  'about.biography': 'Biographie',
  'about.exhibitions': 'Expositions',
  'about.viewExhibition': "Voir l'exposition",
  'about.cta': 'Me contacter',

  'contact.title': 'Contact',
  'contact.intro':
    "Pour une acquisition, une commande ou une visite d’atelier, écrivez-moi — je lis chaque message.",
  'contact.name': 'Nom',
  'contact.email': 'E-mail',
  'contact.message': 'Message',
  'contact.required': 'obligatoire',
  'contact.send': 'Envoyer le message',
  'contact.success':
    'Merci — votre message a été envoyé. Une confirmation avec votre référence arrive dans votre boîte mail.',
  'contact.error': 'Une erreur est survenue. Écrivez-moi directement à ',
  'contact.ph.name': 'Votre nom',
  'contact.ph.email': 'vous@exemple.com',
  'contact.ph.message': 'Votre message…',
  'contact.location': 'Basée à',
  'contact.elsewhere': 'Ou contactez-moi directement',
  'contact.sent': 'Message envoyé',
  'contact.sendFail': 'Échec de l’envoi',
  'contact.reference': 'Référence',
  'contact.copy': 'Copier la référence',
  'contact.copied': 'Copié',
  'contact.dismiss': 'Fermer',

  'backToTop': 'Haut de page',

  'footer.rights': 'Tous droits réservés.',

  'seo.basedIn': 'basée à',
};

const ui: Record<Locale, Record<string, string>> = { en, fr };

export type UIKey = keyof typeof en;

export function getLangFromUrl(url: URL): Locale {
  const [, seg] = url.pathname.split('/');
  return seg === 'fr' ? 'fr' : 'en';
}

export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
  };
}

/** Prefix a root-relative path with the locale (no prefix for the default locale). */
export function localizePath(path: string, lang: Locale): string {
  const clean = '/' + path.replace(/^\/+/, '');
  if (lang === DEFAULT_LOCALE) return clean;
  return clean === '/' ? '/fr' : `/fr${clean}`;
}
