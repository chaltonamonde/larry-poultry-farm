import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- EGGS ---
  {
    id: 'prod-kienyeji-eggs-crate',
    name: 'Farm-Fresh Kienyeji Eggs (Crate of 30)',
    slug: 'kienyeji-eggs-crate-30',
    category: 'eggs',
    priceKes: 550,
    pricePlaceholderLabel: 'Farm Fresh Direct',
    packSize: 'Standard Crate (30 Eggs)',
    availability: 'in-stock',
    stockCountApprox: 180,
    minOrder: 1,
    unit: 'crate',
    description: 'Freshly gathered daily from our free-range improved Kienyeji flock. Deep golden yolks, thick whites, and strong shells. Natural grain and greens diet without synthetic colorants.',
    keyFeatures: [
      'Collected & graded within 24 hours of dispatch',
      'Rich golden-orange yolks from pasture foraging',
      'Sturdy egg trays with protective outer wrap for zero transit breakages',
      'Available for retail and weekly restaurant standing orders'
    ],
    imageUrl: './images/fresh-eggs.jpg',
    isPopular: true,
    frequentlyBoughtTogetherId: 'prod-chick-starter-50kg',
    isPlaceholderData: false
  },
  {
    id: 'prod-table-eggs-crate',
    name: 'Commercial Table Eggs (Crate of 30)',
    slug: 'commercial-table-eggs-crate',
    category: 'eggs',
    priceKes: 420,
    pricePlaceholderLabel: 'Farm Gate Price',
    packSize: 'Standard Crate (30 Eggs)',
    availability: 'in-stock',
    stockCountApprox: 320,
    minOrder: 1,
    unit: 'crate',
    description: 'Uniform, clean commercial table eggs from our young Isa Brown layers. High calcium shell strength, ideal for bakeries, hotels, schools, and household breakfast use.',
    keyFeatures: [
      'Graded medium-to-large sizes (58g - 63g)',
      'High yolk-to-white ratio for fluffy pastries & cakes',
      'Candled and checked for zero micro-cracks',
      'Discounted tiered pricing for orders above 20 crates'
    ],
    imageUrl: './images/fresh-eggs.jpg',
    isPopular: false
  },
  {
    id: 'prod-fertilized-eggs-crate',
    name: 'Fertilized Hatching Eggs (Crate of 30)',
    slug: 'fertilized-kienyeji-hatching-eggs',
    category: 'eggs',
    priceKes: 900,
    pricePlaceholderLabel: 'Hatchery Direct',
    packSize: 'Foam Cushioned Crate (30 Eggs)',
    availability: 'limited',
    stockCountApprox: 24,
    minOrder: 1,
    unit: 'crate',
    description: 'High-fertility hatching eggs selected from parent stock with 1:6 rooster-to-hen mating ratio. Verified candling fertility rate above 85%. Shipped with maximum care for incubator loading.',
    keyFeatures: [
      'Parent stock vaccinated against Newcastle, Gumboro & Bronchitis',
      'Never washed; natural protective bloom intact',
      'Stored under strictly regulated 16°C cool holding room',
      'Not older than 5 days at dispatch date'
    ],
    imageUrl: './images/fresh-eggs.jpg',
    isPopular: false
  },

  // --- DAY-OLD CHICKS ---
  {
    id: 'prod-chicks-kienyeji',
    name: 'Improved Kienyeji Day-Old Chicks (Kari / Kuroiler)',
    slug: 'improved-kienyeji-day-old-chicks',
    category: 'chicks',
    priceKes: 120,
    pricePlaceholderLabel: 'Hatchery Vaccinated',
    packSize: 'Ventilated Carton (50 or 100 Chicks)',
    availability: 'pre-order',
    stockCountApprox: 1200,
    minOrder: 25,
    unit: 'chick',
    description: 'Hardy dual-purpose chicks known for rapid growth, high disease resistance, and excellent dual production of meat and eggs. Ideal for both free-range and semi-intensive Kenyan farming.',
    keyFeatures: [
      'Marek’s and Newcastle vaccinated at day 0 in our hatchery',
      'Vigorous, alert, and dried in sanitized hatching chambers',
      'Free brooding guide booklet provided with every order',
      '30% deposit secures your hatch date reservation'
    ],
    imageUrl: './images/day-old-chicks.jpg',
    isPopular: true,
    depositRequiredPercent: 30,
    frequentlyBoughtTogetherId: 'prod-chick-starter-50kg'
  },
  {
    id: 'prod-chicks-broiler-cobb',
    name: 'Cobb 500 Broiler Day-Old Chicks',
    slug: 'cobb-500-broiler-chicks',
    category: 'chicks',
    priceKes: 115,
    pricePlaceholderLabel: 'Fast FCR Strain',
    packSize: 'Standard Hatchery Carton (50 Chicks)',
    availability: 'pre-order',
    stockCountApprox: 1500,
    minOrder: 50,
    unit: 'chick',
    description: 'The world-standard broiler breed for feed conversion efficiency and uniform breast meat yield. Reaches 1.8kg - 2.2kg live weight within 33 to 38 days under standard broiler management.',
    keyFeatures: [
      'Outstanding feed conversion ratio (1.55 - 1.65 FCR)',
      'High early survivability with certified hatchery biosecurity',
      'Pre-vaccinated for Marek’s disease',
      'Scheduled fortnightly hatch runs'
    ],
    imageUrl: './images/day-old-chicks.jpg',
    depositRequiredPercent: 30,
    frequentlyBoughtTogetherId: 'prod-chick-starter-50kg'
  },
  {
    id: 'prod-chicks-isa-brown',
    name: 'Isa Brown Commercial Layer Chicks',
    slug: 'isa-brown-layer-chicks',
    category: 'chicks',
    priceKes: 135,
    pricePlaceholderLabel: 'Vaccinated Pullet Chicks',
    packSize: 'Hatchery Crate (50 Chicks)',
    availability: 'pre-order',
    stockCountApprox: 800,
    minOrder: 50,
    unit: 'chick',
    description: 'Renowned for record laying capacity of up to 320+ high-quality brown eggs per year. Docile temperament, low feed consumption per egg produced, and prolonged laying persistence.',
    keyFeatures: [
      '100% feather/vent sexed females',
      'Peak egg production between 24 and 70 weeks',
      'Vaccinated at hatch against Marek’s disease',
      'Detailed feeding and lighting timetable supplied'
    ],
    imageUrl: './images/day-old-chicks.jpg',
    depositRequiredPercent: 30
  },

  // --- BROILERS & MEAT ---
  {
    id: 'prod-whole-dressed-broiler',
    name: 'Whole Dressed Fresh Broiler (1.5kg - 1.8kg)',
    slug: 'whole-dressed-fresh-broiler',
    category: 'broilers',
    priceKes: 580,
    pricePlaceholderLabel: 'Farm-Fresh Dressed',
    packSize: 'Vacuum Sealed / Food-Grade Pouch (1 Bird)',
    availability: 'in-stock',
    stockCountApprox: 95,
    minOrder: 1,
    unit: 'bird',
    description: 'Plump, tender, and hygienically dressed in our dedicated poultry processing unit. Cleaned, thoroughly chilled, and packed with gizzard, neck, and heart included inside.',
    keyFeatures: [
      '100% hormone-free and raised on balanced grain feeds',
      'Hygienic slaughter and ice-chilled within minutes',
      'Tender meat that cooks quickly without stringiness',
      'Same-day delivery across Nairobi, Kiambu, and Ruiru'
    ],
    imageUrl: './images/hero-poultry.jpg',
    isPopular: true
  },
  {
    id: 'prod-live-broiler-mature',
    name: 'Live Heavy Farm Broiler (2.0kg - 2.4kg)',
    slug: 'live-heavy-farm-broiler',
    category: 'broilers',
    priceKes: 530,
    pricePlaceholderLabel: 'Live Weight Farm Gate',
    packSize: 'Live Bird (Farm Gate / Crated Delivery)',
    availability: 'in-stock',
    stockCountApprox: 210,
    minOrder: 2,
    unit: 'bird',
    description: 'Healthy, active live broilers raised in airy, well-ventilated sheds. Perfect for caterers, home barbecues, or custom slaughtering according to your religious or dietary preference.',
    keyFeatures: [
      'Broad breast development and firm thighs',
      'Weighed live before crate loading',
      'Delivery available in sanitized poultry transport crates',
      'Wholesale quotes available for batches over 50 birds'
    ],
    imageUrl: './images/hero-poultry.jpg'
  },

  // --- KIENYEJI CHICKEN ---
  {
    id: 'prod-mature-kienyeji-cockerel',
    name: 'Mature Kienyeji Rooster / Cockerel (Live 2.5kg+)',
    slug: 'mature-kienyeji-cockerel-rooster',
    category: 'kienyeji',
    priceKes: 1100,
    pricePlaceholderLabel: 'Prime Live Cock',
    packSize: 'Live Prime Rooster',
    availability: 'in-stock',
    stockCountApprox: 45,
    minOrder: 1,
    unit: 'bird',
    description: 'Prime free-range improved Kienyeji roosters with vibrant plumage and firm muscle. Ideal for traditional family celebrations, breeding stock, or authentic rich Kenyan chicken stew.',
    keyFeatures: [
      'Rich, authentic free-range flavor and firm bone structure',
      'Full biosecurity deworming and vaccination up to date',
      'Excellent as breeding roosters for smallholder improvement',
      'Farm gate inspection welcome'
    ],
    imageUrl: './images/kienyeji-flock.jpg',
    isPopular: true
  },
  {
    id: 'prod-mature-kienyeji-dressed',
    name: 'Dressed Improved Kienyeji Chicken (Whole Bird)',
    slug: 'dressed-improved-kienyeji-chicken',
    category: 'kienyeji',
    priceKes: 950,
    pricePlaceholderLabel: 'Cleaned Whole Bird',
    packSize: 'Chilled Sealed Pouch (Approx 1.4kg - 1.7kg)',
    availability: 'limited',
    stockCountApprox: 28,
    minOrder: 1,
    unit: 'bird',
    description: 'Cleanly dressed free-range chicken offering deep natural flavor, yellow skin fat, and lean firm meat for stews that hold together without breaking down during slow cooking.',
    keyFeatures: [
      'Cleanly defeathered with no pinfeathers remaining',
      'Traditional deep poultry aroma preferred across Kenya',
      'Chilled and ready for marination or immediate cooking',
      'Packed with edible giblets included'
    ],
    imageUrl: './images/kienyeji-flock.jpg'
  },

  // --- LAYERS & PULLETS ---
  {
    id: 'prod-pullets-point-of-lay',
    name: 'Point-of-Lay Pullets (17-18 Weeks Old)',
    slug: 'point-of-lay-pullets-17-weeks',
    category: 'layers',
    priceKes: 780,
    pricePlaceholderLabel: 'Vaccinated Point of Lay',
    packSize: 'Live Pullet in Delivery Crate',
    availability: 'limited',
    stockCountApprox: 150,
    minOrder: 10,
    unit: 'pullet',
    description: 'Ready-to-lay Isa Brown and Improved Kienyeji pullets that begin dropping eggs within 10 to 20 days. Completely vaccinated against all major diseases, saving you brooding risks.',
    keyFeatures: [
      'Comprehensive veterinary vaccination certificate provided',
      'Uniform body weight (1.4kg - 1.5kg) ideal for laying start',
      'Dewormed and de-beaked safely for optimal flock harmony',
      'Immediate cashflow for egg producers without brooding downtime'
    ],
    imageUrl: './images/kienyeji-flock.jpg',
    depositRequiredPercent: 20
  },
  {
    id: 'prod-spent-layers-stewing',
    name: 'Spent Layer Hens (Live Stewing Chicken)',
    slug: 'spent-layers-live-stewing-chicken',
    category: 'layers',
    priceKes: 480,
    pricePlaceholderLabel: 'Rich Broth Flavor',
    packSize: 'Live Bird (Minimum 5 birds)',
    availability: 'in-stock',
    stockCountApprox: 120,
    minOrder: 5,
    unit: 'bird',
    description: 'Mature layer hens at the end of their primary egg cycle. Firm, flavorful meat that makes rich, savory broth and classic African stew recipes.',
    keyFeatures: [
      'Affordable high-protein meat option for families and events',
      'Heavy body weight averaging 1.9kg to 2.2kg',
      'Sold in batches for catering and home bulk freezers',
      'Live or dressed on pre-order request'
    ],
    imageUrl: './images/kienyeji-flock.jpg'
  },

  // --- FEEDS ---
  {
    id: 'prod-chick-starter-50kg',
    name: 'High-Protein Chick Starter Mash (50kg Bag)',
    slug: 'chick-starter-mash-50kg',
    category: 'feeds',
    priceKes: 3450,
    pricePlaceholderLabel: '21% Crude Protein',
    packSize: 'Woven Polypropylene 50kg Bag',
    availability: 'in-stock',
    stockCountApprox: 85,
    minOrder: 1,
    unit: 'bag',
    description: 'Formulated with 21% crude protein, amino acids, and coccidiostat to give day-old chicks the strongest immune foundation, rapid bone growth, and minimum early mortality.',
    keyFeatures: [
      '21% crude protein with essential lysine and methionine',
      'Includes active prebiotic enzymes for gut health',
      'Fine, uniform grind easy for tiny beaks to ingest',
      'Recommended for day 1 to day 21'
    ],
    imageUrl: './images/hero-poultry.jpg'
  },
  {
    id: 'prod-layers-mash-50kg',
    name: 'Premium High-Calcium Layers Mash (50kg Bag)',
    slug: 'layers-complete-mash-50kg',
    category: 'feeds',
    priceKes: 3300,
    pricePlaceholderLabel: '3.8% Bio-Calcium',
    packSize: '50kg Moisture-Resistant Sack',
    availability: 'in-stock',
    stockCountApprox: 60,
    minOrder: 1,
    unit: 'bag',
    description: 'Complete layer diet with 17% crude protein and 3.8% bio-available calcium. Keeps hens laying consistently with smooth, hard egg shells and rich yolk pigment.',
    keyFeatures: [
      '3.8% calcium carbonate for rock-hard eggshells',
      'Optimized energy balance to avoid liver fat buildup',
      'No antibiotic growth promoters added',
      'Ensures continuous 80%+ lay rate in healthy flocks'
    ],
    imageUrl: './images/hero-poultry.jpg'
  },

  // --- MANURE ---
  {
    id: 'prod-organic-poultry-manure-50kg',
    name: 'Cured Organic Poultry Manure (50kg Bag)',
    slug: 'cured-poultry-manure-50kg',
    category: 'manure',
    priceKes: 300,
    pricePlaceholderLabel: 'Aged Organic Fertilizer',
    packSize: '50kg Recycled Polypropylene Sack',
    availability: 'in-stock',
    stockCountApprox: 340,
    minOrder: 5,
    unit: 'bag',
    description: 'Composted, sun-dried pure poultry droppings mixed with organic wood shavings. Packed with slow-release nitrogen, phosphorus, and potassium for horticulture, coffee, and vegetables.',
    keyFeatures: [
      'Aged and cured to eliminate root-burn risks',
      'Rich in slow-release organic nitrogen (NPK 3-2-2)',
      'Improves soil moisture retention and microbial activity',
      'Bulk tipper lorry loads (5 to 10 tonnes) available upon inquiry'
    ],
    imageUrl: './images/hero-poultry.jpg'
  }
];
