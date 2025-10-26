export interface Artwork {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  image: string;
  dimensions: string;
  price: number;
  currency: string;
  sold: boolean;
  featured: boolean;
  year: number;
  medium: string;
  mollieLink?: string;
}

export const artworks: Artwork[] = [
  {
    id: '1',
    title: {
      en: 'Parisian Sunset',
      fr: 'Coucher de soleil parisien',
    },
    description: {
      en: 'A vibrant depiction of the Eiffel Tower at sunset, capturing the golden hour magic of Paris.',
      fr: 'Une représentation vibrante de la Tour Eiffel au coucher du soleil, capturant la magie de l\'heure dorée à Paris.',
    },
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    dimensions: '80 × 60 cm',
    price: 1200,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2024,
    medium: 'Oil on canvas',
    mollieLink: 'https://www.mollie.com/checkout/test-link-1',
  },
  {
    id: '2',
    title: {
      en: 'Seine Reflections',
      fr: 'Reflets de la Seine',
    },
    description: {
      en: 'Abstract interpretation of light dancing on the Seine river waters.',
      fr: 'Interprétation abstraite de la lumière dansant sur les eaux de la Seine.',
    },
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
    dimensions: '100 × 70 cm',
    price: 1800,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2024,
    medium: 'Acrylic on canvas',
    mollieLink: 'https://www.mollie.com/checkout/test-link-2',
  },
  {
    id: '3',
    title: {
      en: 'Montmartre Morning',
      fr: 'Matin à Montmartre',
    },
    description: {
      en: 'Early morning light illuminating the charming streets of Montmartre.',
      fr: 'La lumière du petit matin illuminant les charmantes rues de Montmartre.',
    },
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    dimensions: '70 × 50 cm',
    price: 950,
    currency: 'EUR',
    sold: true,
    featured: false,
    year: 2023,
    medium: 'Watercolor on paper',
  },
  {
    id: '4',
    title: {
      en: 'Abstract Emotions',
      fr: 'Émotions abstraites',
    },
    description: {
      en: 'A bold exploration of color and form expressing raw human emotion.',
      fr: 'Une exploration audacieuse de la couleur et de la forme exprimant l\'émotion humaine brute.',
    },
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    dimensions: '120 × 90 cm',
    price: 2500,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2024,
    medium: 'Mixed media on canvas',
    mollieLink: 'https://www.mollie.com/checkout/test-link-4',
  },
  {
    id: '5',
    title: {
      en: 'Urban Poetry',
      fr: 'Poésie urbaine',
    },
    description: {
      en: 'Contemporary take on Parisian architecture and urban life.',
      fr: 'Vision contemporaine de l\'architecture parisienne et de la vie urbaine.',
    },
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    dimensions: '90 × 60 cm',
    price: 1400,
    currency: 'EUR',
    sold: false,
    featured: false,
    year: 2024,
    medium: 'Oil on canvas',
    mollieLink: 'https://www.mollie.com/checkout/test-link-5',
  },
  {
    id: '6',
    title: {
      en: 'Garden Dreams',
      fr: 'Rêves de jardin',
    },
    description: {
      en: 'Inspired by the Luxembourg Gardens in spring bloom.',
      fr: 'Inspiré par les Jardins du Luxembourg en floraison printanière.',
    },
    image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80',
    dimensions: '75 × 55 cm',
    price: 1100,
    currency: 'EUR',
    sold: false,
    featured: false,
    year: 2023,
    medium: 'Acrylic on canvas',
    mollieLink: 'https://www.mollie.com/checkout/test-link-6',
  },
];

