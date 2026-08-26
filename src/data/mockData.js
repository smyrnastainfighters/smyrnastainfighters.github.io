export const BUSINESS_INFO = {
  name: "Smyrna Stain Fighters",
  tagline: "Eco-Friendly Rotary Driveway Pressure Washing",
  email: "smyrnastainfighters@gmail.com",
  location: "Smyrna & Vinings, GA (Cobb County)",
  serviceRateSqFt: 0.45,
  freeWalkwayIncluded: true,
  walkwayValue: 55,
  pressureRating: "3,400 PSI Commercial Rotary System",
  solutionType: "100% Plant-Safe Biodegradable Citrus Bio-Enzyme",
  paymentPolicy: "$0 Upfront • Pay upon 100% inspection satisfaction",
  paymentMethods: ["Cash", "Venmo", "Zelle", "Check"],
  hours: "Mon - Sat: 8:00 AM - 7:00 PM (Flexible Weekend Slots Available)"
};

export const DRIVEWAY_PRESETS = [
  {
    id: '1-car-compact',
    name: '1-Car Compact / Townhome',
    description: 'Single car straight driveway (Approx. 12ft × 20ft)',
    dimensions: '12 ft × 20 ft',
    sqft: 240,
    baseCost: 108.00,
    popular: false,
    recommendedFor: 'Townhomes & single parking pads'
  },
  {
    id: '2-car-standard',
    name: '2-Car Standard Suburban',
    description: 'Most common Smyrna suburban home driveway (Approx. 20ft × 24ft)',
    dimensions: '20 ft × 24 ft',
    sqft: 480,
    baseCost: 216.00,
    popular: true,
    recommendedFor: 'Subdivisions & 2-car garage homes'
  },
  {
    id: '2-car-long',
    name: '2-Car Extended / Sloped',
    description: 'Deeper setback or hill incline driveway (Approx. 20ft × 34ft)',
    dimensions: '20 ft × 34 ft',
    sqft: 680,
    baseCost: 306.00,
    popular: false,
    recommendedFor: 'Setback lots & long driveways'
  },
  {
    id: '3-car-executive',
    name: '3-Car Triple / Turnaround',
    description: 'Large driveway with turnaround pad or 3-car garage (Approx. 26ft × 36ft+)',
    dimensions: '26 ft × 36 ft+',
    sqft: 950,
    baseCost: 427.50,
    popular: false,
    recommendedFor: 'Estate homes & 3-car garages'
  }
];

export const SERVICE_ADDONS = [
  {
    id: 'oil-deep-treatment',
    name: 'Deep Motor Oil Stain Pre-Extraction',
    description: 'Microbial bio-enzyme citrus penetration to lift embedded automotive fluids & engine drips.',
    price: 35.00,
    unit: 'treatment',
    selected: false
  },
  {
    id: 'front-porch-wash',
    name: 'Front Covered Porch & Entry Steps Scrub',
    description: 'Rotary scrubbing of concrete/brick front porch floor, front steps, and entryway threshold.',
    price: 45.00,
    unit: 'porch',
    selected: false
  },
  {
    id: 'back-patio-clean',
    name: 'Rear Backyard Concrete Patio Wash (up to 200 sq.ft)',
    description: 'Clean-water rotary wash of rear outdoor patio pad for outdoor living & BBQ areas.',
    price: 75.00,
    unit: 'patio',
    selected: false
  }
];

export const STAINS_GUIDE = [
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

export const ZIP_AREAS = [
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

export const FAQ_LIST = [
  {
    id: 'faq-1',
    question: 'How is the $0.45 per sq. ft. rate calculated?',
    answer: 'We measure the exact length and width of your driveway concrete surface and multiply by $0.45. For example, a standard 2-car suburban driveway (480 sq. ft.) is exactly $216.00 with ZERO hidden equipment fees.',
    highlight: '$0.45/sq.ft Flat Rate'
  },
  {
    id: 'faq-2',
    question: 'Is the free front walkway cleaning really 100% free?',
    answer: 'Yes! Every paid driveway pressure wash automatically includes complimentary rotary deep cleaning of your front walkway (from driveway apron to your front steps)—an instant $55 savings.',
    highlight: '$55 Free Bonus'
  },
  {
    id: 'faq-3',
    question: 'Will your cleaning chemicals harm my grass, flowerbeds, or dogs?',
    answer: 'No. We strictly use 100% biodegradable, phosphate-free citrus bio-surfactants. We never dump raw bleach or toxic acids onto your property, ensuring zero burn to surrounding lawns, turf, hydrangeas, or pet paws.',
    highlight: '100% Plant & Pet Safe'
  },
  {
    id: 'faq-4',
    question: 'Do I have to pay upfront before you clean?',
    answer: 'Never. We require $0 deposit. You only pay after the cleaning is 100% complete and you personally inspect and approve the bright, spotless concrete finish.',
    highlight: '$0 Upfront Deposit'
  },
  {
    id: 'faq-5',
    question: 'How do I book and what information is needed in the email?',
    answer: 'Simply email us at smyrnastainfighters@gmail.com or click any "Book via Email" button on this site. Include your Smyrna address, preferred service date/time slot, and approximate driveway size. We reply promptly to confirm your slot.',
    highlight: 'Direct Email Booking'
  }
];
