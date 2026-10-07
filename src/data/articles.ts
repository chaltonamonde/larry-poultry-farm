import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'vaccination-guide-kenya',
    slug: 'essential-poultry-vaccination-schedule-kenya',
    title: 'Complete Poultry Vaccination Schedule for Kenyan Farmers (0 to 18 Weeks)',
    category: 'Vaccination',
    readingTimeMinutes: 6,
    summary: 'Preventing devastating viral outbreaks like Newcastle, Gumboro (IBD), and Fowl Pox requires a strict vaccination calendar calibrated to Kenyan regional disease pressures.',
    publishedDate: 'October 2026',
    sections: [
      {
        heading: 'Why Strict Vaccination Timing Matters in East Africa',
        content: 'In Kenya, viral infections such as Newcastle Disease and Infectious Bursal Disease (Gumboro) can wipe out 80% to 100% of an unimmunized flock within 48 to 72 hours. Vaccination does not cure sick birds; it primes the immature immune system of chicks before wild field exposure.',
        bulletPoints: [
          'Day 1 (Hatchery): Marek’s Disease (Sub-Q injection) + Newcastle Disease (Lasota eye drop)',
          'Day 7: Gumboro (IBD) intermediate strain in clean, non-chlorinated water with skimmed milk stabilizer',
          'Day 14: Newcastle Disease booster (Lasota or Clone 30)',
          'Day 21: Gumboro 2nd booster (vital for maternal antibody decay windows)',
          'Week 6 to 8: Fowl Pox (Wing web puncture method)',
          'Week 10: Fowl Typhoid injectable vaccine',
          'Week 16 to 18: Deworming and ND repeat prior to first egg drop'
        ]
      },
      {
        heading: 'Handling Vaccines: Cold Chain Integrity',
        content: 'Live vaccines are sensitive to heat and chlorine. Always transport vaccines in a cooler box packed with ice blocks. Never reconstitute vaccines with treated municipal tap water containing chlorine, as chlorine kills live virus antigens immediately. Use distilled water or mix 2g skimmed milk powder per liter of tap water 30 minutes before mixing the vaccine.'
      }
    ]
  },
  {
    id: 'feeding-nutrition-guide',
    slug: 'broiler-layer-feeding-stages-growth',
    title: 'Poultry Nutrition in Kenya: From Starter Mash to Layers & Broiler Feeds',
    category: 'Feeding',
    readingTimeMinutes: 5,
    summary: 'Feed accounts for 70% of total poultry production costs in Kenya. Learn exact feed conversion ratios, phase-feeding schedules, and how to avoid stunted growth.',
    publishedDate: 'October 2026',
    sections: [
      {
        heading: 'The 3-Phase Broiler Feeding Regimen',
        content: 'To achieve 2.0kg live broiler body weights in under 38 days, follow precise nutritional transitions:',
        bulletPoints: [
          'Chick Starter (Days 0–14): 21–22% Crude Protein with coccidiostat. Feed ad-libitum to stimulate digestive organ development.',
          'Broiler Grower (Days 15–28): 19–20% Crude Protein. Focuses on bone frame and muscular flesh expansion.',
          'Broiler Finisher (Days 29–Slaughter): 18% Crude Protein with high metabolizable energy for fat marbling and weight density.'
        ]
      },
      {
        heading: 'Maximizing Egg Production in Layers & Kienyeji',
        content: 'For layer hens, calcium balance is critical. Introduce Layers Mash when egg laying hits 5% in the flock. Supplement with coarse oyster shells or limestone grit in the late afternoon, as 80% of eggshell calcification occurs overnight in the hen oviduct.'
      }
    ]
  },
  {
    id: 'biosecurity-best-practices',
    slug: 'farm-biosecurity-preventing-poultry-diseases',
    title: 'Farm Biosecurity: 7 Practical Rules That Keep Disease Off Your Kenyan Farm',
    category: 'Biosecurity',
    readingTimeMinutes: 5,
    summary: 'A single contaminated pair of boots can introduce disease that wipes out months of hard investment. Here is the daily biosecurity protocol used at Larry Poultry Farm.',
    publishedDate: 'October 2026',
    sections: [
      {
        heading: 'Perimeter and Visitor Control',
        content: 'Wild birds, wandering neighborhood dogs, and unauthorized farm visitors are the top vectors for bacterial and viral contamination.',
        bulletPoints: [
          'Maintain deep disinfectant footbaths (e.g. virucidal solutions) at every shed entrance, refreshed every 3 days.',
          'Provide dedicated farm boots and dust coats for attendants; never wear outdoor boots inside poultry houses.',
          'Bird-proof mesh netting (maximum 1-inch wire mesh) prevents wild doves and sparrows from stealing feed and introducing mites.',
          'Operate an "All-In, All-Out" batch system with a mandatory 14-day dry rest period between flocks.'
        ]
      }
    ]
  },
  {
    id: 'housing-ventilation-kenya',
    slug: 'poultry-house-construction-ventilation-kenya',
    title: 'Poultry Housing & Ventilation: Keeping Flocks Cool in Kenyan Climates',
    category: 'Housing',
    readingTimeMinutes: 4,
    summary: 'How to design open-sided poultry sheds that maximize fresh air flow, reduce ammonia accumulation, and keep litter bone-dry even during heavy rains.',
    publishedDate: 'October 2026',
    sections: [
      {
        heading: 'East-to-West House Orientation',
        content: 'Construct your poultry shed with its longitudinal axis facing East to West. This prevents direct morning and late afternoon sun from shining straight into the side walls, which causes deadly heat stress in broilers and drops egg yield in layers.',
        bulletPoints: [
          'Side walls should have a low 2-foot masonry dwarf wall, with the remaining 5 to 6 feet covered in wire mesh for natural cross-ventilation.',
          'Litter management: Maintain 3 to 4 inches of dry pine wood shavings. Remove wet spots around nipple drinkers daily to prevent coccidiosis.',
          'Roof overhang: Ensure at least a 3-foot overhang to stop driving torrential rain from wetting interior bedding.'
        ]
      }
    ]
  }
];
