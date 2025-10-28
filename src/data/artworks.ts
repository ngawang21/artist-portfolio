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
      en: 'Slow Erosion Landscape',
      fr: 'Paysage de lente érosion',
    },
    description: {
      en: 'A contemplative exploration of urban landscapes where familiar spaces transform into dreamlike passages. Oil, Pigment and Collage on canvas.',
      fr: 'Une exploration contemplative des paysages urbains où les espaces familiers se transforment en passages oniriques. Huile, Pigment et Collage sur toile.',
    },
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    dimensions: '75 × 140 cm',
    price: 1800,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2022,
    medium: 'Oil, Pigment and Collage on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '2',
    title: {
      en: 'One, No One, and One Hundred Thousand',
      fr: '«Un, personne et cent mille»',
    },
    description: {
      en: 'Inspired by Luigi Pirandello\'s novel, this work explores the multiplicity of identity - how each person is perceived differently by others while remaining fundamentally alone with themselves.',
      fr: 'Inspiré par le roman de Luigi Pirandello, cette œuvre explore la multiplicité de l\'identité - comment chaque personne est perçue différemment par les autres tout en restant fondamentalement seule face à elle-même.',
    },
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    dimensions: '75 × 140 cm',
    price: 2000,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2023,
    medium: 'Oil and Pigment on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '3',
    title: {
      en: 'A Glimpse Outside',
      fr: 'A glimpse outside',
    },
    description: {
      en: 'A window into liminal spaces where reality dissolves into contemplation, capturing suspended moments between day and night.',
      fr: 'Une fenêtre sur les espaces liminaux où la réalité se dissout dans la contemplation, capturant des moments suspendus entre jour et nuit.',
    },
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
    dimensions: '75 × 140 cm',
    price: 2200,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2024,
    medium: 'Oil on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '4',
    title: {
      en: 'Between Two Worlds',
      fr: 'Entre deux mondes',
    },
    description: {
      en: 'An exploration of the threshold between the tangible and the imaginary, where familiar becomes strange and the visible dialogues with the suggested.',
      fr: 'Une exploration du seuil entre le tangible et l\'imaginaire, où le familier devient étrange et le visible dialogue avec le suggéré.',
    },
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
    dimensions: '75 × 140 cm',
    price: 2200,
    currency: 'EUR',
    sold: false,
    featured: false,
    year: 2024,
    medium: 'Oil and Pigment on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '5',
    title: {
      en: 'Fluctuating Images',
      fr: 'Images fluctuantes',
    },
    description: {
      en: 'Layered textures and transparencies create atmospheres where calm gives way to unease, exploring the boundaries between reality and dream.',
      fr: 'Des textures et transparences superposées créent des atmosphères où le calme laisse place à l\'inquiétude, explorant les frontières entre réalité et rêve.',
    },
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
    dimensions: '75 × 140 cm',
    price: 2100,
    currency: 'EUR',
    sold: false,
    featured: false,
    year: 2024,
    medium: 'Acrylic and Oil on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '6',
    title: {
      en: 'Weeping Willow',
      fr: 'Saule pleureur',
    },
    description: {
      en: 'A large-scale work exploring nature as a liminal space between reality and dream, where organic forms dissolve into atmospheric color.',
      fr: 'Une œuvre de grande envergure explorant la nature comme espace liminal entre réalité et rêve, où les formes organiques se dissolvent dans la couleur atmosphérique.',
    },
    image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80',
    dimensions: '97 × 172 cm',
    price: 2800,
    currency: 'EUR',
    sold: false,
    featured: true,
    year: 2024,
    medium: 'Acrylic and Oil on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '7',
    title: {
      en: 'What Remains',
      fr: 'Ce qui reste',
    },
    description: {
      en: 'Combining textile and painting techniques to explore memory and presence, questioning what persists when everything else fades.',
      fr: 'Combinant techniques textiles et picturales pour explorer la mémoire et la présence, questionnant ce qui persiste quand tout le reste s\'estompe.',
    },
    image: 'https://images.unsplash.com/photo-1578926078261-dd5583b5f0e6?w=800&q=80',
    dimensions: '116 × 83 cm',
    price: 2400,
    currency: 'EUR',
    sold: false,
    featured: false,
    year: 2024,
    medium: 'Embroidery and Oil on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
  {
    id: '8',
    title: {
      en: 'Drown it out, drown me out',
      fr: 'Drown it out, drown me out',
    },
    description: {
      en: 'Deep blues and layered textures evoke submersion and introspection, creating an immersive atmosphere of solitude and contemplation.',
      fr: 'Des bleus profonds et des textures superposées évoquent la submersion et l\'introspection, créant une atmosphère immersive de solitude et de contemplation.',
    },
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    dimensions: '75 × 140 cm',
    price: 2000,
    currency: 'EUR',
    sold: false,
    featured: false,
    year: 2023,
    medium: 'Acrylic and Oil on canvas',
    mollieLink: 'https://my.mollie.com/checkout/test-mode',
  },
];
