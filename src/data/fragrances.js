/**
 * Luxury Fragrance Collection Data
 * 
 * Everything in the showcase dynamically renders from this data config.
 * To add a new perfume product to the experience, simply append a new object to this array.
 */

export const FRAGRANCES = [
  {
    slug: 'oud-imperial',
    name: 'Oud Impérial',
    tagline: 'An Ode to Smoked Agarwood & Golden Amber',
    description:
      'Distilled from centenary agarwood, this enigmatic creation unfurls with smoldering resin and rare spices. A velvety heart of leather and golden amber yields an intoxicating, long-lasting sillage.',
    notes: {
      top: ['Kashmiri Saffron', 'Wild Nutmeg', 'Incense Smoke'],
      heart: ['Centenary Agarwood', 'Dark Leather', 'Labdanum'],
      base: ['Black Amber', 'Bourbon Patchouli', 'Benzoin Tears'],
    },
    bgColor: '#120c06',
    accentColor: '#c99742',
    silhouette: 'rectangular',
    price: '$340',
    size: '50ml',
    image: null,
  },
  {
    slug: 'rose-crepuscule',
    name: 'Rose Crépuscule',
    tagline: 'Velvet Damask Petals Veiled in Twilight',
    description:
      'Harvested at dusk when its perfume is most intoxicating, velvet Damask rose is enlivened by bright pink pepper. Beneath the crimson petals lies a sensual undercurrent of smoky incense and cashmere wood.',
    notes: {
      top: ['Sparkling Pink Pepper', 'Dewy Violet Leaf', 'Italian Bergamot'],
      heart: ['Damask Rose Absolue', 'Midnight Jasmine', 'Orris Butter'],
      base: ['Smoked Sandalwood', 'Cashmere Musk', 'Ambergris'],
    },
    bgColor: '#16080e',
    accentColor: '#e26d85',
    silhouette: 'round',
    price: '$310',
    size: '50ml',
    image: null,
  },
  {
    slug: 'cedre-blanc',
    name: 'Cèdre Blanc',
    tagline: 'Frosted Minerals & Solitary Alpine Woods',
    description:
      'An invigorating rush of crisp Calabrian bergamot evokes frozen mountain peaks swept by morning mist. White Atlas cedarwood and cool mineral aldehydes settle into a refined, crystalline trail.',
    notes: {
      top: ['Calabrian Bergamot', 'Crushed Juniper Berry', 'Mineral Aldehydes'],
      heart: ['White Atlas Cedar', 'French Clary Sage', 'White Pine'],
      base: ['Haitian Vetiver', 'Clean Amber', 'Silver Birch'],
    },
    bgColor: '#081214',
    accentColor: '#4eb8a9',
    silhouette: 'slim',
    price: '$290',
    size: '50ml',
    image: null,
  },
  {
    slug: 'santal-nocturne',
    name: 'Santal Nocturne',
    tagline: 'Creamy Spiced Sandalwood & Intimate Tonka',
    description:
      'Warm green cardamom and cracked black pepper open this seductive nocturnal voyage into rich woods. Rich Australian Mysore sandalwood melts into creamy Madagascar vanilla and smoky tonka bean.',
    notes: {
      top: ['Green Cardamom', 'Cracked Black Pepper', 'Sweet Ginger'],
      heart: ['Mysore Sandalwood', 'Smoked Papyrus', 'Cedar Leaves'],
      base: ['Madagascar Vanilla', 'Roasted Tonka Bean', 'Velvet Cashmeran'],
    },
    bgColor: '#170f08',
    accentColor: '#e08e45',
    silhouette: 'faceted',
    price: '$325',
    size: '50ml',
    image: null,
  },
];

export default FRAGRANCES;
