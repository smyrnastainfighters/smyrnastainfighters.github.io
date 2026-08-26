import React, { useState } from 'react';
import { Sparkles, DollarSign, Clock, Droplets, CheckCircle, ArrowRight, ShieldAlert, Maximize2, Car } from 'lucide-react';
import { QuoteCalculation } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface DrivewayVisualizerProps {
  onSelectQuote: (quote: QuoteCalculation) => void;
}

type DrivewayShape = 'straight' | 'l-shape' | 'wide-pad' | 'circular';

export const DrivewayVisualizer: React.FC<DrivewayVisualizerProps> = ({ onSelectQuote }) => {
  const [shape, setShape] = useState<DrivewayShape>('straight');
  const [length, setLength] = useState<number>(30); // feet
  const [width, setWidth] = useState<number>(18);  // feet
  const [carCount, setCarCount] = useState<number>(2);

  // Compute calculated square footage based on shape
  let calculatedSqft = length * width;
  if (shape === 'l-shape') {
    calculatedSqft = Math.round(length * width * 1.35);
  } else if (shape === 'circular') {
    calculatedSqft = Math.round(length * width * 1.45);
  }

  const rate = BUSINESS_INFO.serviceRateSqFt;
  const cost = Math.round(calculatedSqft * rate * 100) / 100;
  const walkwaySavings = 55;
  const estimatedMins = Math.max(35, Math.round((calculatedSqft / 500) * 55));
  const estimatedGallons = Math.round((calculatedSqft / 500) * 120);

  const handleApplyToBooking = () => {
    const quote: QuoteCalculation = {
      drivewaySqft: calculatedSqft,
      ratePerSqft: rate,
      drivewayCost: cost,
      includeFreeWalkway: true,
      walkwayValueSaved: walkwaySavings,
      selectedAddons: [],
      totalPrice: cost,
      totalSavings: walkwaySavings,
    };
    onSelectQuote(quote);
  };

  return (
    <section id="visualizer-section" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Interactive Layout & Math Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Driveway Dimension & Scale Visualizer
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Adjust your driveway dimensions to see live square footage calculations, estimated cleaning time, and your exact $0.45/sq.ft price with complimentary front walkway washing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 space-y-6">
            
            {/* Shape Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5">
                1. Select Driveway Layout
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setShape('straight'); setWidth(18); setLength(28); }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold cursor-pointer ${
                    shape === 'straight'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-white font-['Space_Grotesk']">Standard Straight</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Direct 2-car straight lane</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setShape('l-shape'); setWidth(20); setLength(34); }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold cursor-pointer ${
                    shape === 'l-shape'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-white font-['Space_Grotesk']">L-Shape / Turnaround</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">With side parking pad</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setShape('wide-pad'); setWidth(26); setLength(32); }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold cursor-pointer ${
                    shape === 'wide-pad'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-white font-['Space_Grotesk']">3-Car Wide Pad</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Triple garage width</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setShape('circular'); setWidth(22); setLength(38); }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold cursor-pointer ${
                    shape === 'circular'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-white font-['Space_Grotesk']">Courtyard / Apron</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Setback executive layout</span>
                </button>
              </div>
            </div>

            {/* Dimension Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-700">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-1.5">
                  <span>Driveway Length:</span>
                  <span className="text-emerald-400 font-mono text-sm">{length} feet</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="1"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>15 ft (Short)</span>
                  <span>35 ft (Standard)</span>
                  <span>60 ft (Estate)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-1.5">
                  <span>Driveway Width:</span>
                  <span className="text-emerald-400 font-mono text-sm">{width} feet</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>10 ft (1-Car)</span>
                  <span>20 ft (2-Car)</span>
                  <span>40 ft (3+ Car)</span>
                </div>
              </div>
            </div>

            {/* Vehicle Capacity Indicator */}
            <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-400" />
                Vehicle Capacity:
              </span>
              <span className="font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                {calculatedSqft < 350 ? '1 Vehicle' : calculatedSqft < 650 ? '2-3 Vehicles' : calculatedSqft < 900 ? '3-4 Vehicles' : '4+ Vehicles / RV'}
              </span>
            </div>

            {/* Summary Action */}
            <div className="pt-3 border-t border-slate-700">
              <button
                type="button"
                onClick={handleApplyToBooking}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98 cursor-pointer"
              >
                <span>Book This Custom Scale (${cost.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Includes FREE Front Walkway Wash ($55 value) • $0 deposit required
              </p>
            </div>

          </div>

          {/* Interactive SVG Rendering & Metric Display (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Visual Blueprint */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 relative overflow-hidden shadow-inner">
              
              {/* Header inside canvas */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-emerald-400 font-bold uppercase">Live Layout CAD Preview</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{length}ft × {width}ft • {shape.toUpperCase()}</span>
              </div>

              {/* Blueprint SVG */}
              <div className="py-6 flex items-center justify-center min-h-[260px]">
                <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto drop-shadow-md select-none">
                  <defs>
                    {/* Concrete Texture Pattern */}
                    <pattern id="concrete-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="#1e293b" />
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.75" />
                    </pattern>
                    <pattern id="lawn-grass" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect width="10" height="10" fill="#064e3b" />
                      <circle cx="5" cy="5" r="0.75" fill="#047857" opacity="0.4" />
                    </pattern>
                  </defs>

                  {/* Lawn Background */}
                  <rect x="10" y="10" width="380" height="220" rx="10" fill="url(#lawn-grass)" stroke="#065f46" strokeWidth="1.5" />

                  {/* House / Garage Foundation Top Banner */}
                  <rect x="60" y="15" width="280" height="35" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                  <text x="200" y="36" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                    RESIDENCE / 2-CAR GARAGE DOORS
                  </text>

                  {/* Free Walkway to Front Porch */}
                  <path d="M 270 50 L 270 95 L 295 95 L 295 50" fill="#059669" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="282" y="76" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                    FREE WALKWAY
                  </text>

                  {/* Driveway Concrete Area based on shape */}
                  {shape === 'straight' && (
                    <g>
                      <rect x="110" y="50" width="150" height="155" rx="3" fill="url(#concrete-grid)" stroke="#10b981" strokeWidth="2" />
                      {/* Expansion Joints */}
                      <line x1="185" y1="50" x2="185" y2="205" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                      <line x1="110" y1="125" x2="260" y2="125" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                      {/* Car guides */}
                      <rect x="125" y="70" width="45" height="75" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="147" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Vehicle 1</text>
                      
                      <rect x="195" y="70" width="45" height="75" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="217" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Vehicle 2</text>
                    </g>
                  )}

                  {shape === 'l-shape' && (
                    <g>
                      <path d="M 110 50 L 260 50 L 260 205 L 170 205 L 170 140 L 110 140 Z" fill="url(#concrete-grid)" stroke="#10b981" strokeWidth="2" />
                      <line x1="215" y1="50" x2="215" y2="205" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                      <rect x="180" y="70" width="45" height="75" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="202" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Vehicle 1</text>
                      <rect x="120" y="65" width="45" height="65" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="142" y="102" fill="#38bdf8" fontSize="8" textAnchor="middle">Turnaround</text>
                    </g>
                  )}

                  {shape === 'wide-pad' && (
                    <g>
                      <rect x="80" y="50" width="210" height="155" rx="3" fill="url(#concrete-grid)" stroke="#10b981" strokeWidth="2" />
                      <line x1="150" y1="50" x2="150" y2="205" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                      <line x1="220" y1="50" x2="220" y2="205" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                      <rect x="95" y="70" width="40" height="75" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="115" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Car 1</text>
                      <rect x="165" y="70" width="40" height="75" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="185" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Car 2</text>
                      <rect x="235" y="70" width="40" height="75" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                      <text x="255" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Car 3</text>
                    </g>
                  )}

                  {shape === 'circular' && (
                    <g>
                      <path d="M 80 205 C 80 100, 290 100, 290 205 L 240 205 C 240 140, 130 140, 130 205 Z" fill="url(#concrete-grid)" stroke="#10b981" strokeWidth="2" />
                      <circle cx="185" cy="170" r="30" fill="url(#lawn-grass)" stroke="#065f46" strokeWidth="1" />
                      <text x="185" y="173" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">ISLAND</text>
                    </g>
                  )}

                  {/* Street Apron & Curb line */}
                  <rect x="60" y="205" width="280" height="15" fill="#334155" stroke="#64748b" strokeWidth="1" />
                  <text x="200" y="216" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">
                    STREET APRON RUNOFF
                  </text>
                </svg>
              </div>

              {/* Plant Safety Shield Callout inside preview */}
              <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  Adjacent Lawn & Flowerbeds Protected by 100% Biodegradable Citrus Pre-Rinse
                </span>
                <span className="font-mono text-[11px] text-emerald-300 font-bold hidden sm:inline">0% Harsh Bleach</span>
              </div>
            </div>

            {/* Calculated Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Area</span>
                <p className="text-xl font-extrabold text-white font-['Space_Grotesk'] mt-0.5">{calculatedSqft} <span className="text-xs font-normal text-slate-400">sq.ft</span></p>
              </div>

              <div className="bg-emerald-950/80 rounded-xl p-3.5 border border-emerald-700/80 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">Clean Price</span>
                <p className="text-xl font-black text-emerald-300 font-['Space_Grotesk'] mt-0.5">${cost.toFixed(2)}</p>
              </div>

              <div className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Walkway Bonus</span>
                <p className="text-xl font-extrabold text-amber-300 font-['Space_Grotesk'] mt-0.5">+$55 <span className="text-xs font-normal text-amber-200">FREE</span></p>
              </div>

              <div className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Estimated Time</span>
                <p className="text-xl font-extrabold text-white font-['Space_Grotesk'] mt-0.5">~{estimatedMins} <span className="text-xs font-normal text-slate-400">min</span></p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
