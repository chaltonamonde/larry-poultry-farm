import { DeliveryTown } from '../types';

export const FARM_CONFIG = {
  farmName: 'Larry Poultry Farm',
  tagline: 'Farm-Fresh Eggs, Day-Old Chicks & Healthy Poultry in Kenya',
  
  // Contact & Social
  phoneDisplay: '+254 712 345 678',
  phoneRaw: '+254712345678',
  whatsappDisplay: '+254 712 345 678',
  whatsappNumber: '254712345678',
  email: 'orders@larrypoultryfarm.co.ke',
  
  // Location
  locationText: 'Kiambu – Thika Road Agribusiness Corridor, Central Kenya',
  county: 'Kiambu County / Nairobi Metro',
  
  // Hours
  operatingHours: {
    weekdays: 'Monday - Saturday: 7:00 AM - 6:00 PM',
    sunday: 'Sunday: 8:00 AM - 2:00 PM (Emergency Chick Dispatches Only)'
  },
  
  // Reply-time promise
  replyTimePromise: 'We reply within 15–30 minutes during farm operating hours.',

  // Free delivery threshold
  freeDeliveryThresholdKes: 3500,

  // Payment UI info (Phase 1 mock / Phase 2 ready)
  mpesa: {
    tillNumber: '5849201',
    businessName: 'LARRY POULTRY FARM LTD',
    accountReferencePrefix: 'LPF-'
  },

  // Social Links
  socialLinks: {
    facebook: 'https://facebook.com/larrypoultryfarm',
    instagram: 'https://instagram.com/larrypoultryfarm',
    youtube: 'https://youtube.com/@larrypoultryfarm'
  }
};

export const DELIVERY_TOWNS: DeliveryTown[] = [
  {
    id: 'farm-gate',
    name: 'Farm Gate Self-Collection (Kiambu/Thika)',
    county: 'Kiambu',
    feeKes: 0,
    estimatedTransit: 'Ready same day (Mon-Sat)',
    isFarmPickup: true
  },
  {
    id: 'nairobi-cbd',
    name: 'Nairobi CBD & Central Hub',
    county: 'Nairobi',
    feeKes: 250,
    estimatedTransit: 'Same-day or next-morning dispatch'
  },
  {
    id: 'nairobi-suburbs',
    name: 'Nairobi Suburbs (Westlands, Karen, Kilimani, Kasarani)',
    county: 'Nairobi',
    feeKes: 300,
    estimatedTransit: 'Next-day morning delivery'
  },
  {
    id: 'kiambu-ruiru',
    name: 'Kiambu Town, Ruiru & Juja',
    county: 'Kiambu',
    feeKes: 200,
    estimatedTransit: 'Same-day farm route'
  },
  {
    id: 'thika-town',
    name: 'Thika Town & Environs',
    county: 'Kiambu',
    feeKes: 200,
    estimatedTransit: 'Same-day farm route'
  },
  {
    id: 'machakos-athi',
    name: 'Athi River, Kitengela & Machakos',
    county: 'Machakos / Kajiado',
    feeKes: 400,
    estimatedTransit: 'Scheduled delivery (Tue & Fri)'
  },
  {
    id: 'nakuru-naivasha',
    name: 'Naivasha & Nakuru Town Hub',
    county: 'Nakuru',
    feeKes: 500,
    estimatedTransit: 'Next-day morning parcel delivery'
  },
  {
    id: 'eldoret-western',
    name: 'Eldoret / Kisumu Regional Hub',
    county: 'Uasin Gishu / Kisumu',
    feeKes: 700,
    estimatedTransit: 'Chicks & Eggs overnight courier transit'
  }
];
