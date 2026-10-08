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
  | 'policies'
  | 'admin';

/* -------------------------------------------------------------
   ADMIN & ERP SYSTEM TYPES (Finances, Orders, Batches, Messages)
---------------------------------------------------------------- */

export type OrderStatus = 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid-mpesa' | 'pending-cod' | 'paid-bank' | 'refunded';

export interface OrderItem {
  productId: string;
  name: string;
  packSize: string;
  quantity: number;
  unitPriceKes: number;
  totalKes: number;
  isPreOrder?: boolean;
}

export interface FarmOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryTown: string;
  estateAddress: string;
  deliveryNotes?: string;
  items: OrderItem[];
  subtotalKes: number;
  deliveryFeeKes: number;
  grandTotalKes: number;
  status: OrderStatus;
  paymentMethod: 'mpesa' | 'cod' | 'bank';
  paymentStatus: PaymentStatus;
  mpesaReceiptCode?: string;
  driverName?: string;
  driverPhone?: string;
  trackingNotes?: string;
}

export type TransactionType = 'income' | 'expense';

export interface FarmTransaction {
  id: string;
  date: string;
  type: TransactionType;
  category: string;
  description: string;
  amountKes: number;
  paymentChannel: 'M-Pesa STK' | 'M-Pesa Paybill' | 'Bank Transfer' | 'Cash / Farm Gate';
  referenceCode: string;
  recordedBy: string;
  orderId?: string;
}

export interface CustomerInquiryMessage {
  id: string;
  date: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  subject: string;
  message: string;
  source: 'contact-form' | 'whatsapp-click' | 'order-note' | 'direct';
  status: 'unread' | 'read' | 'replied' | 'archived';
  isStarred?: boolean;
  replyNotes?: string;
}

export interface WholesaleLeadRecord {
  id: string;
  date: string;
  businessName: string;
  contactPerson: string;
  businessType: string;
  phone: string;
  town: string;
  weeklyEggsCrates: number;
  weeklyBroilers: number;
  estimatedWeeklyValueKes: number;
  standingOrderFrequency: string;
  specialRequirements?: string;
  status: 'new' | 'quote-sent' | 'contract-active' | 'declined';
  accountManagerNotes?: string;
}

export interface FlockHealthMetrics {
  layersTotal: number;
  layingRatePercent: number;
  eggsCollectedTodayCrates: number;
  broilersActiveCount: number;
  broilersAvgWeightKg: number;
  mortalityRatePercent: number;
  activeIncubatorEggs: number;
  feedStockBags: number;
  brooderTempCelsius: number;
  nextVaccineAlert: {
    batchCode: string;
    vaccineName: string;
    dueDate: string;
    daysRemaining: number;
  };
}

