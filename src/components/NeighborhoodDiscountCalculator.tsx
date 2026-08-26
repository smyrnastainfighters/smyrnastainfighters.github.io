import React, { useState } from 'react';
import { Users, Sparkles, CheckCircle2, Mail, DollarSign, Plus, Trash2, ArrowRight, Home, Percent } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { QuoteCalculation } from '../types';

interface NeighborhoodDiscountCalculatorProps {
  onOpenBooking: (quote?: QuoteCalculation) => void;
}

export const NeighborhoodDiscountCalculator: React.FC<NeighborhoodDiscountCalculatorProps> = ({ onOpenBooking }) => {
  const [yourAddress, setYourAddress] = useState<string>('');
  const [yourSqft, setYourSqft] = useState<number>(480);
  
  const [neighbors, setNeighbors] = useState<Array<{ id: string; address: string; sqft: number }>>([
    { id: '1', address: 'Next Door Neighbor (e.g. 104 Oakridge)', sqft: 480 },
  ]);

  const rate = BUSINESS_INFO.serviceRateSqFt; // $0.45

  // Calculations
  const yourStandardCost = yourSqft * rate;
  const neighborsCostSum = neighbors.reduce((acc, n) => acc + (n.sqft * rate), 0);
  const totalStandardCombined = yourStandardCost + neighborsCostSum;

  // Group discount is 10% off for all participating homes when 2+ homes book on same block/day
  const hasGroupDiscount = neighbors.length >= 1;
  const discountRate = hasGroupDiscount ? 0.10 : 0.0;
  
  const yourDiscountedCost = yourStandardCost * (1 - discountRate);
  const yourSavings = yourStandardCost * discountRate;
  const combinedGroupSavings = totalStandardCombined * discountRate;
  const totalDiscountedCombined = totalStandardCombined - combinedGroupSavings;

  const handleAddNeighbor = () => {
    if (neighbors.length < 4) {
      setNeighbors([
        ...neighbors,
        { id: Date.now().toString(), address: '', sqft: 480 },
      ]);
    }
  };

  const handleRemoveNeighbor = (id: string) => {
    if (neighbors.length > 1) {
      setNeighbors(neighbors.filter((n) => n.id !== id));
    }
  };

  const handleUpdateNeighbor = (id: string, field: 'address' | 'sqft', value: string | number) => {
    setNeighbors(
      neighbors.map((n) => (n.id === id ? { ...n, [field]: value } : n))
    );
  };

  const handleBookGroup = () => {
    const quote: QuoteCalculation = {
      drivewaySqft: yourSqft,
      ratePerSqft: rate,
      drivewayCost: yourDiscountedCost,
      includeFreeWalkway: true,
      walkwayValueSaved: 55 * (neighbors.length + 1),
      selectedAddons: [],
      totalPrice: yourDiscountedCost,
      totalSavings: yourSavings + 55,
      groupDiscountPercent: 10,
      groupDiscountAmount: yourSavings,
    };
    onOpenBooking(quote);
  };

  return (
    <section id="neighborhood-discount-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5 text-emerald-700" />
            <span>Smyrna Neighborhood Group Savings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Clean With Your Neighbor & Save an Extra 10%
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            When 2 or more homes on the same street or subdivision schedule driveway cleaning on the same service day, every participating home receives an additional <strong className="text-slate-900 font-bold">10% discount</strong>!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Multi-Home Form Inputs (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            
            {/* Your Home */}
            <div className="bg-white rounded-xl p-5 border-2 border-emerald-500 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 font-['Space_Grotesk']">Your Home (Host Property)</h3>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  10% Group Rate Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Your Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 1200 Oakridge Terrace, Smyrna"
                    value={yourAddress}
                    onChange={(e) => setYourAddress(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Driveway Sq.Ft</label>
                  <select
                    value={yourSqft}
                    onChange={(e) => setYourSqft(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white cursor-pointer"
                  >
                    <option value={240}>1-Car (240 sq ft)</option>
                    <option value={480}>2-Car Standard (480 sq ft)</option>
                    <option value={680}>2-Car Long (680 sq ft)</option>
                    <option value={950}>3-Car Exec (950 sq ft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100 text-slate-600">
                <span>Your Individual Price: <span className="line-through text-slate-400">${yourStandardCost.toFixed(2)}</span></span>
                <span className="font-bold text-emerald-700 text-sm font-['Space_Grotesk']">
                  ${yourDiscountedCost.toFixed(2)} (Save ${yourSavings.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Participating Neighbors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-emerald-600" />
                  Adjacent Neighbor Homes ({neighbors.length} Added)
                </label>
                {neighbors.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddNeighbor}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Neighbor
                  </button>
                )}
              </div>

              {neighbors.map((neighbor, index) => {
                const standard = neighbor.sqft * rate;
                const disc = standard * 0.90;
                return (
                  <div key={neighbor.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {index + 2}
                        </div>
                        <span className="text-xs font-bold text-slate-800 font-['Space_Grotesk']">
                          Neighbor #{index + 1}
                        </span>
                      </div>
                      {neighbors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveNeighbor(neighbor.id)}
                          className="text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Neighbor address or street number"
                          value={neighbor.address}
                          onChange={(e) => handleUpdateNeighbor(neighbor.id, 'address', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <select
                          value={neighbor.sqft}
                          onChange={(e) => handleUpdateNeighbor(neighbor.id, 'sqft', Number(e.target.value))}
                          className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value={240}>1-Car (240 sq ft)</option>
                          <option value={480}>2-Car Standard (480 sq ft)</option>
                          <option value={680}>2-Car Long (680 sq ft)</option>
                          <option value={950}>3-Car Exec (950 sq ft)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] pt-1 text-slate-500">
                      <span>Neighbor Rate: <span className="line-through">${standard.toFixed(2)}</span></span>
                      <span className="font-bold text-emerald-700">${disc.toFixed(2)} with 10% group discount</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Group Savings Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white font-['Space_Grotesk'] text-lg">Group Savings Summary</h3>
              </div>
              <span className="text-xs font-extrabold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                {neighbors.length + 1} Homes Total
              </span>
            </div>

            {/* Savings Big Number */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total Combined Street Savings</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-['Space_Grotesk']">
                  ${combinedGroupSavings.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">total cash saved</span>
              </div>
              <p className="text-xs text-slate-300">
                Plus <strong className="text-amber-300 font-bold">${55 * (neighbors.length + 1)} in FREE walkway washes</strong> across all {neighbors.length + 1} homes!
              </p>
            </div>

            {/* Breakdown itemization */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300">
                <span>Standard Combined Value:</span>
                <span className="font-mono text-slate-400 line-through">${totalStandardCombined.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-emerald-400 font-bold">
                <span>10% Neighborhood Group Discount:</span>
                <span className="font-mono">-${combinedGroupSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-white font-bold text-sm">
                <span>Your Individual Cost:</span>
                <span className="font-mono text-emerald-300">${yourDiscountedCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Email booking action */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleBookGroup}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Reserve Multi-Home Discount via Email</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Zero deposit required. Each neighbor pays individually upon their own completed inspection.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
