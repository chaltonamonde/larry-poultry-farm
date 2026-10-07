export type ProductCategory =
  | 'all'
  | 'eggs'
  | 'broilers'
  | 'layers'
  | 'kienyeji'
  | 'chicks'
  | 'feeds'
  | 'manure';

export type ProductAvailability = 'in-stock' | 'limited' | 'pre-order';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  priceKes: number;
  pricePlaceholderLabel?: string;
  packSize: string;
  availability: ProductAvailability;
  stockCountApprox?: number;
  minOrder: number;
  unit: string;
  description: string;
  keyFeatures: string[];
  imageUrl: string;
  isPopular?: boolean;
  depositRequiredPercent?: number; // E.g. 30% for chicks
  frequentlyBoughtTogetherId?: string; // Cross-sell ID
  isPlaceholderData?: boolean;
}

export interface ChickBatch {
  id: string;
  breedName: string;
  breedCode: string;
  hatchDateFormatted: string;
  hatchDateRaw: string;
  availableQty: number;
  minOrderQty: number;
  pricePerChickKes: number;
  depositPercent: number;
  vaccinationStatus: string[];
  status: 'open' | 'few-left' | 'sold-out';
  broodingDifficulty: 'Beginner' | 'Intermediate';
  notes: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isPreOrder?: boolean;
  batchId?: string;
}

export interface DeliveryTown {
  id: string;
  name: string;
  county: string;
  feeKes: number;
  estimatedTransit: string;
  isFarmPickup?: boolean;
}

export interface WholesaleQuoteForm {
  fullName: string;
  businessName: string;
  businessType: 'Hotel/Restaurant' | 'Supermarket' | 'School/Institution' | 'Caterer' | 'Retail Shop' | 'Other';
  phone: string;
  email: string;
  deliveryTown: string;
  weeklyEggCrates: number;
  weeklyDressedBroilers: number;
  standingOrderFrequency: 'One-off' | 'Weekly' | 'Bi-weekly' | 'Monthly';
  specialRequirements: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Vaccination' | 'Feeding' | 'Housing' | 'Biosecurity' | 'Brooding';
  readingTimeMinutes: number;
  summary: string;
  publishedDate: string;
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
}

export interface CustomerReview {
  id: string;
  authorName: string;
  roleOrBusiness: string;
  location: string;
  rating: number;
  comment: string;
  verifiedOrder: string;
  isPlaceholder: boolean; // Marked placeholder as per prompt rules
}

export type ThemeMode = 'dark-grey' | 'dark-green';

export type ActivePage =
  | 'home'
  | 'shop'
  | 'chicks'
  | 'wholesale'
  | 'cart'
  | 'advice'
  | 'about'
  | 'contact'
  | 'policies';
