export interface DrivewayPreset {
  id: string;
  name: string;
  cars: string;
  sqft: number;
  dimensions: string;
  description: string;
  popular?: boolean;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  isFreeWithDriveway?: boolean;
  unit: string;
  description: string;
}

export interface QuoteCalculation {
  drivewaySqft: number;
  ratePerSqft: number;
  drivewayCost: number;
  includeFreeWalkway: boolean;
  walkwayValueSaved: number;
  selectedAddons: {
    id: string;
    name: string;
    price: number;
  }[];
  totalPrice: number;
  totalSavings: number;
  groupDiscountPercent?: number;
  groupDiscountAmount?: number;
}

export interface BookingFormState {
  email: string;
  streetAddress: string;
  neighborhoodOrZip: string;
  drivewayPresetId: string;
  customSqft: number;
  hasWaterSpigot: boolean;
  includeFreeWalkway: boolean;
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'afternoon' | 'weekend' | 'flexible';
  notes: string;
  neighborHomes?: {
    address: string;
    estimatedSqft: number;
  }[];
  isGroupBooking?: boolean;
}

export interface BookingSubmission extends BookingFormState {
  id: string;
  createdAt: string;
  estimatedCost: number;
  estimatedSavings: number;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  highlight?: string;
}

export interface StainInfo {
  id: string;
  name: string;
  category: string;
  appearance: string;
  cause: string;
  standardRisk: string;
  ourEcoSolution: string;
  expectedResult: string;
  severity: 'Moderate' | 'High' | 'Severe';
}

export interface ZipAreaInfo {
  zip: string;
  name: string;
  primaryArea: string;
  responseTime: string;
  status: 'Available' | 'High Demand' | 'Extended Service';
}
