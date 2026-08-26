import { DrivewayPreset, ServiceAddon, FaqItem, StainInfo, ZipAreaInfo } from '../types';

export const BUSINESS_INFO = {
  name: "Smyrna Stain Fighters",
  shortName: "Smyrna Stain Fighters",
  tagline: "Eco-Friendly Driveway Cleaning • Plant-Safe Care • Smyrna, GA",
  businessType: "Youth-Operated Neighborhood Cleaning Service",
  businessStory: "Smyrna Stain Fighters is a hardworking, youth-run local exterior cleaning service dedicated to keeping Smyrna driveways and walkways spotless. We use professional commercial-grade rotary surface washers and 100% plant-safe citrus detergents. All bookings and quotes are handled directly and promptly via email, with zero upfront deposit—you only pay after the job is done and you are 100% satisfied!",
  email: "smyrnastainfighters@gmail.com",
  serviceRateSqFt: 0.45,
  serviceArea: "Smyrna, Vinings & Surrounding Neighborhoods",
  scheduleNote: "Weekday afternoons (3:30 PM - 7:30 PM) & All Day Weekends (8:00 AM - 6:00 PM). Full-time seasonal schedule available!",
  paymentMethods: ["Cash upon inspection", "Venmo", "Zelle", "Check"],
  specialOfferBanner: "🔥 FREE Front Walkway Wash included with every paid Driveway cleaning ($55 Value)!",
};

export const DRIVEWAY_PRESETS: DrivewayPreset[] = [
  {
    id: '1-car',
    name: '1-Car Compact Driveway',
    cars: '1 Car Length',
    sqft: 240,
    dimensions: 'approx. 12ft × 20ft',
    description: 'Ideal for townhomes, carports, or single-vehicle parking pads.',
  },
  {
    id: '2-car-standard',
    name: 'Standard 2-Car Driveway',
    cars: '2 Cars Wide / Standard',
    sqft: 480,
    dimensions: 'approx. 20ft × 24ft',
    description: 'Our most common neighborhood size. Fits two vehicles comfortably.',
    popular: true,
  },
  {
    id: '2-car-long',
    name: 'Extended 2-Car Driveway',
    cars: '2-3 Cars Long',
    sqft: 680,
    dimensions: 'approx. 18ft × 38ft',
    description: 'Great for setback homes with longer parking lanes or side extensions.',
  },
  {
    id: '3-car-large',
    name: '3-Car Executive / Turnaround',
    cars: '3+ Cars Wide',
    sqft: 950,
    dimensions: 'approx. 28ft × 34ft',
    description: 'Spacious multi-vehicle driveways, basketball court areas, or aprons.',
  },
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'walkway-clean',
    name: 'Front Entry Walkway Cleaning',
    price: 0,
    isFreeWithDriveway: true,
    unit: 'Complimentary Bonus',
    description: 'Pressure wash from driveway to your front doorstep. FREE with any paid driveway clean (Normally $55)!',
  },
  {
    id: 'patio-rinse',
    name: 'Back Patio / Porch Add-on',
    price: 45,
    unit: 'up to 200 sq.ft',
    description: 'Plant-safe wash for your backyard concrete or paver patio while we are on site.',
  },
  {
    id: 'oil-deep-treatment',
    name: 'Heavy Oil Stain Degreaser Treatment',
    price: 20,
    unit: 'targeted spots',
    description: 'Eco-enzymatic pre-soak for persistent motor oil or transmission fluid spots.',
  },
];

export const GUARANTEES = [
  {
    id: 'price',
    title: '$0.45 / Sq. Ft. Flat Rate',
    description: 'No hidden setup fees or contractor markups. What you calculate is what you pay.',
    icon: 'Calculator',
    badge: 'Affordable & Fair',
  },
  {
    id: 'plants',
    title: '100% Plant & Lawn Safe',
    description: 'We use biodegradable, phosphate-free citrus detergents. Your grass, flowerbeds, and shrubs stay lush and protected.',
    icon: 'Leaf',
    badge: 'Garden Safe',
  },
  {
    id: 'pay-after',
    title: 'Pay AFTER Full Satisfaction',
    description: 'Zero upfront deposit required. We walk through the clean together — you only pay once you are 100% thrilled.',
    icon: 'ShieldCheck',
    badge: 'Risk Free',
  },
  {
    id: 'free-walkway',
    title: 'FREE Walkway Cleaning Included',
    description: 'Your front walkway up to the door is washed complimentary with any paid driveway service. A $55 instant saving!',
    icon: 'Sparkles',
    badge: '$0 Free Bonus',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Site Prep & Plant Protection',
    description: 'We inspect the surface, remove debris, and thoroughly pre-hydrate adjacent lawns, garden borders, and shrubs with freshwater to shield root systems.',
  },
  {
    step: '02',
    title: 'Plant-Safe Citrus Pre-Treatment',
    description: 'Application of biodegradable, phosphate-free citrus cleaning solution that breaks down organic grime, mildew, and road film without hazardous bleach acids.',
  },
  {
    step: '03',
    title: 'Commercial Rotary Scrubbing',
    description: 'Dual-nozzle 16-inch rotary surface cleaners at 3,400 PSI deliver uniform, streak-free deep agitation across every square inch of concrete.',
  },
  {
    step: '04',
    title: 'Clean Water Rinse & Walkthrough',
    description: 'Complete rinse down to street runoff gutters, including your complimentary front walkway. You inspect the clean in person before any payment is made.',
  },
];

export const STAINS_GUIDE: StainInfo[] = [
  {
    id: 'black-algae',
    name: 'Black Algae & Mildew (Gloeocapsa magma)',
    category: 'Biological Growth',
    appearance: 'Dark black streaks, slippery greenish-black coating across shaded areas.',
    cause: 'High Georgia humidity, oak canopy shade, and moisture accumulation on porous concrete pores.',
    standardRisk: 'Generic contractors blast high concentrations of harsh bleach/chlorine that burns grass lines and kills delicate hydrangeas.',
    ourEcoSolution: 'Targeted eco-friendly citrus biocides with deep rotary agitation that kills spores at the root without lawn run-off risk.',
    expectedResult: '99% bright concrete restoration, completely eliminating slippery slip hazards.',
    severity: 'High',
  },
  {
    id: 'red-clay',
    name: 'Georgia Red Clay & Silt Film',
    category: 'Mineral Soil',
    appearance: 'Rusty reddish-orange film embedded in driveway grooves and tire track lanes.',
    cause: 'Heavy Georgia rain washing iron-oxide clay onto concrete from sloped flowerbeds or construction.',
    standardRisk: 'Harsh muriatic acids etch the concrete cream layer, causing permanent rough pitting and surface dusting.',
    ourEcoSolution: 'Non-acidic surfactant wetting agents that lift iron-rich clay particles into suspension for balanced 3,400 PSI rinsing.',
    expectedResult: '95%+ removal of stubborn red clay discoloration without damaging concrete finish.',
    severity: 'Moderate',
  },
  {
    id: 'motor-oil',
    name: 'Vehicle Motor Oil & Fluid Drips',
    category: 'Petroleum Hydrocarbons',
    appearance: 'Dark circular patches, shiny oil halos where parked cars sit.',
    cause: 'Engine leaks, power steering fluid, oil filter drops penetrating micro-pores of concrete.',
    standardRisk: 'Flammable solvents or toxic caustic caustic soda that degrades soil and endangers household pets.',
    ourEcoSolution: 'Microbial bio-enzyme citrus degreaser that metabolizes deep hydrocarbon chains prior to hot agitation.',
    expectedResult: 'Dramatic lightning and lifting of deep oil saturation without toxic chemical residue.',
    severity: 'Severe',
  },
  {
    id: 'leaf-tannin',
    name: 'Tree Leaf & Acorn Tannin Stains',
    category: 'Organic Pigment',
    appearance: 'Brown leaf silhouettes and speckled circular tannin rings from wet fallen leaves.',
    cause: 'Wet pine straw, water oaks, and sweetgum leaves releasing natural acidic tannic acid during autumn/spring rains.',
    standardRisk: 'Aggressive wand pressure that gouges lines ("wand scars") into concrete surfaces.',
    ourEcoSolution: 'Plant-derived organic cleaner combined with uniform dual-nozzle 16-inch spinning surface cleaners.',
    expectedResult: '100% full lift of all leaf outlines and brown organic shadowing.',
    severity: 'Moderate',
  },
  {
    id: 'fertilizer-rust',
    name: 'Fertilizer Pellet Rust Specks',
    category: 'Iron Oxide',
    appearance: 'Hundreds of tiny orange/brown rust dots scattered after lawn fertilization.',
    cause: 'Iron pellets from lawn fertilizer bouncing onto damp concrete and oxidizing with moisture.',
    standardRisk: 'Toxic oxalic acid that kills earthworms and causes white halo discolorations.',
    ourEcoSolution: 'Targeted chelation cleaner that bonds with iron particles safely for low-pressure extraction.',
    expectedResult: 'Complete disappearance of scatter specks across the entire driveway apron.',
    severity: 'Moderate',
  },
];

export const ZIP_AREAS: ZipAreaInfo[] = [
  {
    zip: '30080',
    name: 'Downtown Smyrna / Market Village / Williams Park',
    primaryArea: 'Core Smyrna',
    responseTime: 'Within 24 Hours • Priority Booking',
    status: 'Available',
  },
  {
    zip: '30082',
    name: 'King Springs / Forest Hills / Bennett Woods',
    primaryArea: 'Southwest Smyrna',
    responseTime: 'Within 24 Hours • Priority Booking',
    status: 'Available',
  },
  {
    zip: '30081',
    name: 'Campbell High / Windy Hill / Smyrna East',
    primaryArea: 'East Smyrna',
    responseTime: 'Within 24-48 Hours',
    status: 'Available',
  },
  {
    zip: '30339',
    name: 'Vinings / Cumberland / Paces Mill Area',
    primaryArea: 'Vinings / Cumberland',
    responseTime: 'Within 24-48 Hours',
    status: 'High Demand',
  },
  {
    zip: '30126',
    name: 'Mableton North / Smyrna Borders',
    primaryArea: 'Smyrna Perimeter',
    responseTime: 'Within 48 Hours',
    status: 'Available',
  },
];

export const PREPARATION_CHECKLIST = [
  {
    id: 'prep-water',
    title: 'Outdoor Hose Spigot Check',
    description: 'Ensure an exterior freshwater hose spigot is turned on and accessible for our supply connection.',
    category: 'Essential',
  },
  {
    id: 'prep-cars',
    title: 'Relocate Parked Vehicles',
    description: 'Park cars inside the garage or on the street during the appointment window so the entire concrete surface is open.',
    category: 'Essential',
  },
  {
    id: 'prep-doors',
    title: 'Close Garage Doors & Low Windows',
    description: 'Ensure garage roll-up doors and ground-level porch windows are fully shut to prevent moisture ingress.',
    category: 'Recommended',
  },
  {
    id: 'prep-pets',
    title: 'Keep Pets Indoors During Cleaning',
    description: 'Keep friendly dogs and cats inside the home while our commercial machines are running for safety.',
    category: 'Safety',
  },
  {
    id: 'prep-gates',
    title: 'Unlock Front Walkway & Side Gates',
    description: 'Provide clear walking access to your front walkway entrance and exterior water spigots.',
    category: 'Access',
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does the $0.45 per sq.ft pricing work?',
    answer: 'It is simple, transparent math with zero hidden fees. Measure or estimate your driveway length and width (e.g. a 20ft × 24ft driveway is 480 sq.ft × $0.45 = $216.00). If you are not sure of exact dimensions, use our calculator or we will measure on arrival before starting.',
    highlight: '$0.45 / sq.ft flat rate',
  },
  {
    id: 'faq-2',
    question: 'Is the walkway cleaning really 100% free?',
    answer: 'Yes! When you book a driveway clean, Smyrna Stain Fighters includes the connecting front walkway from the driveway up to your front porch free of charge as a neighborhood courtesy.',
    highlight: '$55 value included FREE',
  },
  {
    id: 'faq-3',
    question: 'How do bookings and communications work?',
    answer: 'All inquiries, quotes, and booking confirmations are managed exclusively via email at smyrnastainfighters@gmail.com. Simply send your address and preferred dates through our email booking form or email us directly, and we will reply promptly with confirmation.',
    highlight: '100% Email-Based Booking',
  },
  {
    id: 'faq-4',
    question: 'Will the cleaning solutions hurt my lawn, flowers, or pets?',
    answer: 'Not at all. We strictly use eco-friendly, biodegradable, pet-safe and plant-friendly detergents without harsh bleach acid that can scorch grass or kill surrounding landscaping. We also pre-wet all adjacent vegetation with freshwater before and after cleaning.',
    highlight: '100% Biodegradable & Plant-Safe',
  },
  {
    id: 'faq-5',
    question: 'When and how do I pay?',
    answer: 'You never pay in advance! We only ask for payment AFTER the job is 100% complete and you have inspected the concrete. We accept Cash, Venmo, Zelle, or Personal Check upon your full satisfaction.',
    highlight: 'Zero upfront deposit',
  },
  {
    id: 'faq-6',
    question: 'What do I need to prepare before service arrives?',
    answer: 'Just two quick things: ensure all vehicles and obstacles are moved off the driveway, and make sure an outdoor garden hose spigot is accessible for the water supply line.',
    highlight: 'Accessible outdoor hose spigot',
  },
  {
    id: 'faq-7',
    question: 'What equipment is used?',
    answer: 'We use commercial 3400 PSI pressure units paired with dual-nozzle 16-inch rotary surface scrubbers. This ensures smooth, uniform cleaning with zero zebra striping or surface gouging.',
    highlight: 'Professional Rotary Surface Washer',
  },
];
