import { FarmOrder, FarmTransaction, CustomerInquiryMessage, WholesaleLeadRecord, FlockHealthMetrics } from '../types';

export const INITIAL_FARM_ORDERS: FarmOrder[] = [
  {
    id: 'LPF-9042',
    createdAt: 'Today, 08:35 AM',
    customerName: 'Dr. Kevin Mwangi',
    customerPhone: '+254 722 419 820',
    customerEmail: 'kmwangi@consulting.co.ke',
    deliveryTown: 'Nairobi (Westlands / Parklands)',
    estateAddress: 'Rhapta Road, Court 4, House 12',
    deliveryNotes: 'Gate code 4490. Leave at security desk if in morning surgery.',
    items: [
      {
        productId: 'eggs-grade-a',
        name: 'Fresh Farm Eggs (Grade A Large Brown)',
        packSize: 'Full Crate (30 Eggs)',
        quantity: 3,
        unitPriceKes: 480,
        totalKes: 1440
      },
      {
        productId: 'broilers-dressed',
        name: 'Prime Dressed Broiler Chicken (Whole)',
        packSize: '1.4kg - 1.6kg Vacuum Sealed',
        quantity: 4,
        unitPriceKes: 580,
        totalKes: 2320
      }
    ],
    subtotalKes: 3760,
    deliveryFeeKes: 250,
    grandTotalKes: 4010,
    status: 'in-transit',
    paymentMethod: 'mpesa',
    paymentStatus: 'paid-mpesa',
    mpesaReceiptCode: 'QKL882941X',
    driverName: 'Juma Dispatch Rider 02',
    driverPhone: '+254 711 902 334',
    trackingNotes: 'Dispatched 09:15 AM via cold-box motorbike transit.'
  },
  {
    id: 'LPF-9039',
    createdAt: 'Today, 07:15 AM',
    customerName: 'Mama Brian Wanjiku',
    customerPhone: '+254 713 882 104',
    deliveryTown: 'Kiambu Town',
    estateAddress: 'Kirigiti Ridge, Near Total Energies',
    deliveryNotes: 'Call before reaching the junction.',
    items: [
      {
        productId: 'kienyeji-live',
        name: 'Pure Kienyeji Mature Rooster / Hen',
        packSize: 'Live Bird (1.8kg - 2.2kg)',
        quantity: 2,
        unitPriceKes: 1200,
        totalKes: 2400
      },
      {
        productId: 'chicks-kuroiler',
        name: 'Day-Old Kuroiler Dual-Purpose Chicks',
        packSize: 'Box of 50 Chicks',
        quantity: 1,
        unitPriceKes: 6250,
        totalKes: 6250,
        isPreOrder: true
      }
    ],
    subtotalKes: 8650,
    deliveryFeeKes: 0,
    grandTotalKes: 8650,
    status: 'processing',
    paymentMethod: 'mpesa',
    paymentStatus: 'paid-mpesa',
    mpesaReceiptCode: 'QKL773104B',
    driverName: 'Farm Van 01 (Driver Peter)',
    trackingNotes: 'Chicks boxed with heating pads and stress-pack electrolyte water.'
  },
  {
    id: 'LPF-9035',
    createdAt: 'Yesterday, 04:40 PM',
    customerName: 'Chef Andre Otieno (Serena Brasserie)',
    customerPhone: '+254 720 334 912',
    customerEmail: 'catering@andrehospitality.com',
    deliveryTown: 'Nairobi CBD',
    estateAddress: 'Kenyatta Avenue, Service Bay 3',
    deliveryNotes: 'Delivery must have batch slaughter temperature certificate attached.',
    items: [
      {
        productId: 'broilers-dressed',
        name: 'Prime Dressed Broiler Chicken (Whole)',
        packSize: '1.4kg - 1.6kg Vacuum Sealed',
        quantity: 25,
        unitPriceKes: 580,
        totalKes: 14500
      },
      {
        productId: 'eggs-grade-a',
        name: 'Fresh Farm Eggs (Grade A Large Brown)',
        packSize: 'Full Crate (30 Eggs)',
        quantity: 15,
        unitPriceKes: 480,
        totalKes: 7200
      }
    ],
    subtotalKes: 21700,
    deliveryFeeKes: 0,
    grandTotalKes: 21700,
    status: 'delivered',
    paymentMethod: 'bank',
    paymentStatus: 'paid-bank',
    mpesaReceiptCode: 'STANBIC-RTGS-89102',
    driverName: 'Refrigerated Truck KDA 402P',
    trackingNotes: 'Delivered and signed by Receiving Officer Charles.'
  },
  {
    id: 'LPF-9028',
    createdAt: 'Yesterday, 02:10 PM',
    customerName: 'Beatrice Chebet',
    customerPhone: '+254 734 501 928',
    deliveryTown: 'Nairobi (Karen / Langata)',
    estateAddress: 'Mbagathi Way, Karen Plains, Gate 7',
    deliveryNotes: 'Pay on delivery cash or M-Pesa Till upon bird inspection.',
    items: [
      {
        productId: 'kienyeji-live',
        name: 'Pure Kienyeji Mature Rooster / Hen',
        packSize: 'Live Bird (1.8kg - 2.2kg)',
        quantity: 4,
        unitPriceKes: 1200,
        totalKes: 4800
      }
    ],
    subtotalKes: 4800,
    deliveryFeeKes: 350,
    grandTotalKes: 5150,
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'paid-mpesa',
    mpesaReceiptCode: 'QKL664918C',
    trackingNotes: 'Paid via Buy Goods Till at gate.'
  },
  {
    id: 'LPF-9022',
    createdAt: 'Yesterday, 11:20 AM',
    customerName: 'Patrick Nderitu',
    customerPhone: '+254 712 990 411',
    deliveryTown: 'Ruiru Main Farm Gate',
    estateAddress: 'Farm Gate Collection Point, Kamiti Road',
    deliveryNotes: 'Customer coming with pickup truck for feed and manure.',
    items: [
      {
        productId: 'feeds-starter',
        name: 'High-Protein Broiler Starter Crumbs (22% CP)',
        packSize: '50kg Bag',
        quantity: 4,
        unitPriceKes: 3850,
        totalKes: 15400
      },
      {
        productId: 'manure-compost',
        name: 'Composted Pure Poultry Manure (Nitrogen-Rich)',
        packSize: '50kg Gunny Sack',
        quantity: 10,
        unitPriceKes: 450,
        totalKes: 4500
      }
    ],
    subtotalKes: 19900,
    deliveryFeeKes: 0,
    grandTotalKes: 19900,
    status: 'delivered',
    paymentMethod: 'mpesa',
    paymentStatus: 'paid-mpesa',
    mpesaReceiptCode: 'QKL551029P',
    trackingNotes: 'Loaded onto pickup KBZ 912K by storekeeper James.'
  },
  {
    id: 'LPF-9018',
    createdAt: 'Oct 06, 2026',
    customerName: 'Grace Achieng',
    customerPhone: '+254 701 445 678',
    deliveryTown: 'Thika Town',
    estateAddress: 'Section 9, Opp Chania Boys',
    deliveryNotes: 'Morning delivery preferred before 10 AM.',
    items: [
      {
        productId: 'eggs-kienyeji',
        name: 'Free-Range Kienyeji Eggs (High Yolk Pigment)',
        packSize: 'Full Crate (30 Eggs)',
        quantity: 5,
        unitPriceKes: 650,
        totalKes: 3250
      }
    ],
    subtotalKes: 3250,
    deliveryFeeKes: 300,
    grandTotalKes: 3550,
    status: 'pending',
    paymentMethod: 'mpesa',
    paymentStatus: 'paid-mpesa',
    mpesaReceiptCode: 'QKL440192A',
    trackingNotes: 'Awaiting packing for Wednesday morning Thika delivery run.'
  }
];

export const INITIAL_TRANSACTIONS: FarmTransaction[] = [
  {
    id: 'TXN-4091',
    date: 'Today, 09:12 AM',
    type: 'income',
    category: 'Retail Eggs',
    description: 'Online M-Pesa STK Order #LPF-9042 (Dr. Mwangi)',
    amountKes: 4010,
    paymentChannel: 'M-Pesa STK',
    referenceCode: 'QKL882941X',
    recordedBy: 'M-Pesa Daraja Gateway',
    orderId: 'LPF-9042'
  },
  {
    id: 'TXN-4090',
    date: 'Today, 08:30 AM',
    type: 'expense',
    category: 'Logistics & Fuel',
    description: 'Fuel for delivery motorbikes & farm van (TotalEnergies Ruiru)',
    amountKes: 4500,
    paymentChannel: 'M-Pesa Paybill',
    referenceCode: 'QKL881029F',
    recordedBy: 'Logistics Lead Juma'
  },
  {
    id: 'TXN-4089',
    date: 'Today, 07:20 AM',
    type: 'income',
    category: 'Day-Old Chicks',
    description: 'Deposit for Kuroiler Chicks batch #LPF-9039 (Mama Brian)',
    amountKes: 8650,
    paymentChannel: 'M-Pesa STK',
    referenceCode: 'QKL773104B',
    recordedBy: 'M-Pesa Daraja Gateway',
    orderId: 'LPF-9039'
  },
  {
    id: 'TXN-4088',
    date: 'Yesterday, 05:00 PM',
    type: 'income',
    category: 'Wholesale B2B',
    description: 'Serena Brasserie standing order settlement (Chef Andre)',
    amountKes: 21700,
    paymentChannel: 'Bank Transfer',
    referenceCode: 'STANBIC-RTGS-89102',
    recordedBy: 'Accountant Wanja',
    orderId: 'LPF-9035'
  },
  {
    id: 'TXN-4087',
    date: 'Yesterday, 03:45 PM',
    type: 'expense',
    category: 'Feed Procurement',
    description: 'Unga Farm Care purchase: 40 bags Layers Complete Mash',
    amountKes: 138000,
    paymentChannel: 'Bank Transfer',
    referenceCode: 'EFT-UNGA-09214',
    recordedBy: 'Farm Manager Chalton'
  },
  {
    id: 'TXN-4086',
    date: 'Yesterday, 02:30 PM',
    type: 'income',
    category: 'Kienyeji Live',
    description: 'Farm gate sale 4 mature roosters (Beatrice Chebet)',
    amountKes: 5150,
    paymentChannel: 'Cash / Farm Gate',
    referenceCode: 'QKL664918C',
    recordedBy: 'Sales Rep Mercy'
  },
  {
    id: 'TXN-4085',
    date: 'Yesterday, 10:15 AM',
    type: 'expense',
    category: 'Vaccines & Vet',
    description: 'Dr. Omondi (Veterinarian): Gumboro booster + Lasota cold chain kit',
    amountKes: 9800,
    paymentChannel: 'M-Pesa Paybill',
    referenceCode: 'QKL550291V',
    recordedBy: 'Farm Manager Chalton'
  },
  {
    id: 'TXN-4084',
    date: 'Oct 06, 2026',
    type: 'expense',
    category: 'Utilities & Generator',
    description: 'Backup generator diesel (60L) for automated incubators',
    amountKes: 11400,
    paymentChannel: 'M-Pesa Paybill',
    referenceCode: 'QKL449102D',
    recordedBy: 'Operations Tech Samuel'
  },
  {
    id: 'TXN-4083',
    date: 'Oct 06, 2026',
    type: 'expense',
    category: 'Gas & Heating',
    description: 'Eco-charcoal briquettes (12 bags) for brooder heating units',
    amountKes: 7200,
    paymentChannel: 'Cash / Farm Gate',
    referenceCode: 'RCPT-ECO-3104',
    recordedBy: 'Operations Tech Samuel'
  },
  {
    id: 'TXN-4082',
    date: 'Oct 05, 2026',
    type: 'income',
    category: 'Retail Eggs',
    description: 'Weekend farm gate egg pickups (18 crates)',
    amountKes: 8640,
    paymentChannel: 'M-Pesa STK',
    referenceCode: 'QKL339180W',
    recordedBy: 'Sales Rep Mercy'
  }
];

export const INITIAL_MESSAGES: CustomerInquiryMessage[] = [
  {
    id: 'MSG-301',
    date: 'Today, 08:50 AM',
    senderName: 'David Kariuki',
    senderPhone: '+254 728 119 443',
    senderEmail: 'david.kariuki@gmail.com',
    subject: 'Bulk Chick Order to Nakuru County',
    message: 'Hello Larry Farm, I am looking to establish a poultry unit in Nakuru with 500 Kuroiler chicks. Do you provide regional delivery crates with temperature sensors, or should I arrange collection from your Ruiru farm?',
    source: 'contact-form',
    status: 'unread',
    isStarred: true
  },
  {
    id: 'MSG-300',
    date: 'Today, 07:40 AM',
    senderName: 'Chef Michael (Radisson Blue)',
    senderPhone: '+254 719 402 115',
    senderEmail: 'culinary@radissonkenya.com',
    subject: 'Weekly Dressed Broiler Supply (Grade A)',
    message: 'We require 120 dressed broilers weekly delivered every Thursday morning at 6:30 AM to our Upper Hill cold room. Please send standard corporate quotation and halal slaughter verification.',
    source: 'contact-form',
    status: 'unread',
    isStarred: true
  },
  {
    id: 'MSG-299',
    date: 'Yesterday, 04:15 PM',
    senderName: 'Faith Muthoni',
    senderPhone: '+254 722 901 882',
    subject: 'Point of Lay Vaccination Certificate',
    message: 'I want to purchase 100 Point of Lay pullets next week. Can you confirm if the Newcastle and Coryza vaccines are already administered? Looking forward to your prompt response.',
    source: 'whatsapp-click',
    status: 'read',
    replyNotes: 'Replied on WhatsApp with official vaccination schedule sheet.'
  },
  {
    id: 'MSG-298',
    date: 'Yesterday, 11:30 AM',
    senderName: 'Peter Otieno',
    senderPhone: '+254 703 612 900',
    subject: 'Organic Manure Truckload Request',
    message: 'Do you offer tipper lorry delivery for dried composted poultry manure to avocado orchards in Murang’a? Need approx 4 tonnes.',
    source: 'contact-form',
    status: 'replied',
    replyNotes: 'Shared contact for our partnered 7-tonne canter transport.'
  }
];

export const INITIAL_WHOLESALE_LEADS: WholesaleLeadRecord[] = [
  {
    id: 'WHL-501',
    date: 'Today, 08:10 AM',
    businessName: 'Sarova Stanley Hotel (Catering Dept)',
    contactPerson: 'Chef Executive Andre Njoroge',
    businessType: 'Hotel/Restaurant',
    phone: '+254 721 890 120',
    town: 'Nairobi CBD',
    weeklyEggsCrates: 60,
    weeklyBroilers: 150,
    estimatedWeeklyValueKes: 96000,
    standingOrderFrequency: 'Weekly Standing Order',
    specialRequirements: 'Whole dressed broilers strictly calibrated 1.4kg to 1.5kg, vacuum sealed in food-grade transparent pouches.',
    status: 'new'
  },
  {
    id: 'WHL-500',
    date: 'Yesterday, 02:40 PM',
    businessName: 'QuickMart Supermarket (Ruaka Branch)',
    contactPerson: 'Perishables Manager Agnes',
    businessType: 'Supermarket',
    phone: '+254 733 902 110',
    town: 'Ruaka',
    weeklyEggsCrates: 100,
    weeklyBroilers: 50,
    estimatedWeeklyValueKes: 64000,
    standingOrderFrequency: 'Weekly Standing Order',
    specialRequirements: 'Branded egg cartons of 6 and 12 eggs for retail shelf placement.',
    status: 'quote-sent',
    accountManagerNotes: 'Quote sent with 30-day payment terms agreement.'
  },
  {
    id: 'WHL-499',
    date: 'Oct 05, 2026',
    businessName: 'Braeburn International School',
    contactPerson: 'Head of Boarding Logistics John',
    businessType: 'School/Institution',
    phone: '+254 711 440 223',
    town: 'Nairobi (Karen / Langata)',
    weeklyEggsCrates: 45,
    weeklyBroilers: 90,
    estimatedWeeklyValueKes: 61200,
    standingOrderFrequency: 'Weekly Standing Order',
    specialRequirements: 'Bi-weekly delivery Monday and Thursday before 7:00 AM.',
    status: 'contract-active',
    accountManagerNotes: 'Active 1-year framework agreement.'
  }
];

export const INITIAL_FLOCK_METRICS: FlockHealthMetrics = {
  layersTotal: 2850,
  layingRatePercent: 89.4,
  eggsCollectedTodayCrates: 85,
  broilersActiveCount: 5200,
  broilersAvgWeightKg: 1.84,
  mortalityRatePercent: 1.2, // Elite tier (industry target < 3%)
  activeIncubatorEggs: 12400,
  feedStockBags: 92,
  brooderTempCelsius: 33.2,
  nextVaccineAlert: {
    batchCode: 'Batch #KB-402 (Kenbro)',
    vaccineName: 'Gumboro (IBD) Intermediate Plus',
    dueDate: 'Tomorrow, Oct 09',
    daysRemaining: 1
  }
};
