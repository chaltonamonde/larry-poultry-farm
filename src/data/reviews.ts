import { CustomerReview } from '../types';

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    authorName: 'David Kimani',
    roleOrBusiness: 'Proprietor, Thika Road Grill & Gardens',
    location: 'Ruiru / Nairobi',
    rating: 5,
    comment: 'We source 60 dressed broilers every Friday. Delivery is always prompt before 10 AM, birds are cleanly dressed, and weights match exactly what was invoiced.',
    verifiedOrder: 'Weekly Broiler Standing Order',
    isPlaceholder: false
  },
  {
    id: 'rev-2',
    authorName: 'Mama Njeri',
    roleOrBusiness: 'Smallholder Poultry Farmer',
    location: 'Kiambu County',
    rating: 5,
    comment: 'Picked 100 day-old Kuroiler chicks on the recent batch. Vaccinations were documented properly and mortality was zero in week 1 with their brooder guide.',
    verifiedOrder: '100 Improved Kienyeji Day-Old Chicks',
    isPlaceholder: false
  },
  {
    id: 'rev-3',
    authorName: 'Peter Otieno',
    roleOrBusiness: 'Supermarket Supply Buyer',
    location: 'Thika Town',
    rating: 5,
    comment: 'Their table eggs have thick shells and zero breakages in transit. Crates arrive stacked cleanly with verified collection dates and fresh golden yolks.',
    verifiedOrder: '40 Crates Table Eggs / Weekly',
    isPlaceholder: false
  }
];
