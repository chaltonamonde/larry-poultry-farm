import { ChickBatch } from '../types';

export const CHICK_BATCHES: ChickBatch[] = [
  {
    id: 'batch-2026-10-18',
    breedName: 'Improved Kienyeji (Kari / Kuroiler)',
    breedCode: 'IK-OCT-B1',
    hatchDateFormatted: 'Friday, 18th October 2026',
    hatchDateRaw: '2026-10-18',
    availableQty: 450,
    minOrderQty: 25,
    pricePerChickKes: 120,
    depositPercent: 30, // KES 36 deposit per chick
    vaccinationStatus: ["Marek's Disease (Sub-Q)", "Newcastle Disease (ND Lasota Eye Drop)"],
    status: 'few-left',
    broodingDifficulty: 'Beginner',
    notes: 'High demand batch. Early morning dispatch from farm hatchery. Delivery available across Nairobi, Kiambu, and Nakuru routes.'
  },
  {
    id: 'batch-2026-10-25',
    breedName: 'Cobb 500 Fast Broilers',
    breedCode: 'CB-OCT-B2',
    hatchDateFormatted: 'Friday, 25th October 2026',
    hatchDateRaw: '2026-10-25',
    availableQty: 1200,
    minOrderQty: 50,
    pricePerChickKes: 115,
    depositPercent: 30, // KES 34.50 deposit per chick
    vaccinationStatus: ["Marek's Disease (HVT)", "Infectious Bronchitis Spray"],
    status: 'open',
    broodingDifficulty: 'Intermediate',
    notes: 'Ideal for 35-day commercial broiler turnaround. Starter feeds can be bundled at checkout.'
  },
  {
    id: 'batch-2026-11-04',
    breedName: 'Isa Brown Commercial Layers',
    breedCode: 'IB-NOV-B1',
    hatchDateFormatted: 'Monday, 4th November 2026',
    hatchDateRaw: '2026-11-04',
    availableQty: 800,
    minOrderQty: 50,
    pricePerChickKes: 135,
    depositPercent: 30, // KES 40.50 deposit per chick
    vaccinationStatus: ["Marek's Disease (Dual strain)", "Newcastle Disease Clone 30"],
    status: 'open',
    broodingDifficulty: 'Intermediate',
    notes: '100% pullets (females). Feather-sexed with certified high hatchability lines.'
  },
  {
    id: 'batch-2026-11-15',
    breedName: 'Kenbro Dual Purpose',
    breedCode: 'KB-NOV-B2',
    hatchDateFormatted: 'Friday, 15th November 2026',
    hatchDateRaw: '2026-11-15',
    availableQty: 600,
    minOrderQty: 25,
    pricePerChickKes: 125,
    depositPercent: 30,
    vaccinationStatus: ["Marek's Disease", "ND+IB Initial"],
    status: 'open',
    broodingDifficulty: 'Beginner',
    notes: 'Robust free-range plumage. Exceptional disease resistance in Kenyan rustic environments.'
  }
];
