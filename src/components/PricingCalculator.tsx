import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Check, Info, ShieldCheck, ArrowRight, DollarSign, Plus, RotateCcw, FileText } from 'lucide-react';
import { DRIVEWAY_PRESETS, SERVICE_ADDONS, BUSINESS_INFO } from '../data/mockData';
import { QuoteCalculation } from '../types';

interface PricingCalculatorProps {
  onSelectQuote: (quote: QuoteCalculation, presetId?: string) => void;
  onOpenPrintEstimate?: (quote: QuoteCalculation) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSelectQuote, onOpenPrintEstimate }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('2-car-standard');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customWidth, setCustomWidth] = useState<number>(20);
  const [customLength, setCustomLength] = useState<number>(24);
  const [includeFreeWalkway, setIncludeFreeWalkway] = useState<boolean>(true);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['walkway-clean']);

  // Active SqFt
  const activeSqft = useMemo(() => {
    if (isCustomMode) {
      return customWidth * customLength;
    }
    const preset = DRIVEWAY_PRESETS.find((p) => p.id === selectedPresetId);
    return preset ? preset.sqft : 480;
  }, [isCustomMode, selectedPresetId, customWidth, customLength]);

  // Rate
  const ratePerSqft = BUSINESS_INFO.serviceRateSqFt; // $0.45
  const drivewayCost = Math.round(activeSqft * ratePerSqft * 100) / 100;

  // Addons total
  const selectedAddonsList = useMemo(() => {
    return SERVICE_ADDONS.filter((addon) => selectedAddonIds.includes(addon.id));
  }, [selectedAddonIds]);

  const addonsCost = useMemo(() => {
    return selectedAddonsList.reduce((acc, addon) => acc + (addon.isFreeWithDriveway ? 0 : addon.price), 0);
  }, [selectedAddonsList]);

  const walkwayValueSaved = includeFreeWalkway ? 55 : 0;
  const totalPrice = drivewayCost + addonsCost;
  const totalSavings = walkwayValueSaved;

  const currentCalculation: QuoteCalculation = {
    drivewaySqft: activeSqft,
    ratePerSqft,
    drivewayCost,
    includeFreeWalkway,
    walkwayValueSaved,
    selectedAddons: selectedAddonsList.map((a) => ({ id: a.id, name: a.name, price: a.price })),
    totalPrice,
    totalSavings,
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    setIsCustomMode(false);
  };

  const toggleAddon = (addonId: string) => {
    if (addonId === 'walkway-clean') {
      setIncludeFreeWalkway(!includeFreeWalkway);
      if (selectedAddonIds.includes('walkway-clean')) {
        setSelectedAddonIds(selectedAddonIds.filter((id) => id !== 'walkway-clean'));
      } else {
        setSelectedAddonIds([...selectedAddonIds, 'walkway-clean']);
      }
      return;
    }

    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  return (
    <section id="calculator-section" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Instant Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Calculate Your Driveway Cleaning Cost
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Guaranteed flat rate of <strong className="text-emerald-700 font-bold">$0.45 per sq. foot</strong>. Pick your driveway size or enter custom measurements below for an immediate quote!
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Preset & Dimension Selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mode Tabs (Standard Presets vs Custom Dimensions) */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  !isCustomMode
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard Driveway Sizes
              </button>
              <button
                type="button"
                onClick={() => setIsCustomMode(true)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  isCustomMode
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Custom Dimensions (L × W)
              </button>
            </div>

            {/* Presets Cards */}
            {!isCustomMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DRIVEWAY_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  const estimatedRate = (preset.sqft * ratePerSqft).toFixed(2);
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all relative ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {preset.popular && (
                        <span className="absolute -top-2.5 right-4 bg-emerald-700 text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                            {preset.cars}
                          </p>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">
                            {preset.name}
                          </h3>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {preset.description} ({preset.dimensions})
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                          {preset.sqft} sq. ft.
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-slate-500 block text-[11px]">Driveway only</span>
                          <span className="text-base font-extrabold text-slate-900 font-['Space_Grotesk']">
                            ${estimatedRate}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Custom Dimension Sliders */
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-900">
                      Driveway Width (feet)
                    </label>
                    <span className="text-base font-extrabold text-emerald-700 font-['Space_Grotesk'] bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      {customWidth} ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={40}
                    step={1}
                    value={customWidth}
                    onChange={(e) => setCustomWidth(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>8 ft (narrow single)</span>
                    <span>20 ft (standard 2-car)</span>
                    <span>40 ft (wide 3+ car)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-900">
                      Driveway Length (feet)
                    </label>
                    <span className="text-base font-extrabold text-emerald-700 font-['Space_Grotesk'] bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      {customLength} ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={1}
                    value={customLength}
                    onChange={(e) => setCustomLength(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>10 ft (short apron)</span>
                    <span>25 ft (average)</span>
                    <span>80 ft (long setback)</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Calculated Total Surface Area:</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {customWidth} × {customLength} = <span className="text-emerald-700 font-extrabold">{customWidth * customLength} sq. ft.</span>
                  </span>
                </div>
              </div>
            )}

            {/* Addons & Free Walkway Special Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Special Promotion & Optional Add-ons</span>
              </h3>

              <div className="space-y-2.5">
                {SERVICE_ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  const isFree = addon.isFreeWithDriveway;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer rounded-xl p-3.5 sm:p-4 border transition-all flex items-center justify-between gap-3 ${
                        isFree
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 shadow-xs'
                          : isChecked
                          ? 'bg-slate-50 border-emerald-500 ring-1 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              {addon.name}
                            </span>
                            {isFree && (
                              <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                                FREE Included ($55 Value)
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {isFree ? (
                          <div className="space-y-0.5">
                            <span className="text-xs text-slate-400 line-through block">$55.00</span>
                            <span className="text-sm font-black text-emerald-700 uppercase font-['Space_Grotesk']">
                              $0.00 FREE
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                            +${addon.price}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Quote Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
              
              {/* Subtle green glow accent */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Instant Quote Summary
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Estimated Cleaning Cost
                  </h3>
                </div>
                <div className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  $0.45 / sq.ft
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3.5 my-5 text-xs sm:text-sm">
                
                <div className="flex justify-between items-center text-slate-300">
                  <span>
                    Driveway Surface ({activeSqft} sq. ft. × $0.45)
                  </span>
                  <span className="font-semibold text-white font-['Space_Grotesk'] text-sm">
                    ${drivewayCost.toFixed(2)}
                  </span>
                </div>

                {includeFreeWalkway && (
                  <div className="flex justify-between items-center text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Front Walkway Clean Bonus
                    </span>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 line-through mr-1.5">$55.00</span>
                      <span className="font-bold text-emerald-300 uppercase font-['Space_Grotesk']">
                        $0.00 FREE
                      </span>
                    </div>
                  </div>
                )}

                {selectedAddonsList
                  .filter((a) => !a.isFreeWithDriveway)
                  .map((addon) => (
                    <div key={addon.id} className="flex justify-between items-center text-slate-300">
                      <span>{addon.name}</span>
                      <span className="font-semibold text-white font-['Space_Grotesk'] text-sm">
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  ))}

                <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800 text-xs">
                  <span>Plant-Friendly Citrus Detergent</span>
                  <span className="text-emerald-400 font-medium">Included ($0)</span>
                </div>

                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Full Surface Rotary Power Scrub</span>
                  <span className="text-emerald-400 font-medium">Included ($0)</span>
                </div>

              </div>

              {/* Total Box */}
              <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 my-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Total Estimate:</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Total Savings:</span>
                      <span className="text-sm font-bold text-amber-400">
                        Saved ${totalSavings.toFixed(2)}!
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees Reminder */}
              <div className="space-y-2 mb-6 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% Satisfaction or $0 Owed</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  You only pay after the cleaning is finished and you inspect the spotless results. Zero deposit required.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onSelectQuote(currentCalculation, isCustomMode ? undefined : selectedPresetId)}
                  className="w-full py-4 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition-all cursor-pointer"
                >
                  <span>Book This Clean at ${totalPrice.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                {onOpenPrintEstimate && (
                  <button
                    type="button"
                    onClick={() => onOpenPrintEstimate(currentCalculation)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View / Print Official Estimate PDF Sheet</span>
                  </button>
                )}
              </div>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-400">
                  Instant response • Flexible weekday & weekend times
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
