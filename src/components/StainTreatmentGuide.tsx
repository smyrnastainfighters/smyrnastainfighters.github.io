import React, { useState } from 'react';
import { AlertCircle, ShieldAlert, Sparkles, Leaf, CheckCircle2, ChevronRight, Droplets, Info } from 'lucide-react';
import { STAINS_GUIDE } from '../data/mockData';

export const StainTreatmentGuide: React.FC = () => {
  const [selectedStainId, setSelectedStainId] = useState<string>(STAINS_GUIDE[0].id);

  const selectedStain = STAINS_GUIDE.find((s) => s.id === selectedStainId) || STAINS_GUIDE[0];

  return (
    <section id="stain-guide-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Plant-Safe Exterior Chemistry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Stain Diagnosis & Treatment Guide
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            See how our 100% plant-safe citrus solutions eliminate stubborn Georgia stains without using destructive acids or bleaching chemicals that scorch lawns and gardens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stain Selector Buttons (Left 4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
              Common Concrete Stains
            </span>

            {STAINS_GUIDE.map((stain) => {
              const isSelected = stain.id === selectedStainId;
              return (
                <button
                  key={stain.id}
                  type="button"
                  onClick={() => setSelectedStainId(stain.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500'
                      : 'bg-slate-100/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        stain.severity === 'Severe'
                          ? 'bg-rose-100 text-rose-800'
                          : stain.severity === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {stain.category}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold font-['Space_Grotesk'] ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                      {stain.name}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-emerald-600 translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Analysis Card (Right 8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {selectedStain.category}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-['Space_Grotesk']">
                  {selectedStain.name}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block">Expected Clean Rate:</span>
                <span className="text-sm font-bold text-emerald-700 font-['Space_Grotesk']">{selectedStain.expectedResult}</span>
              </div>
            </div>

            {/* Appearance & Cause */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Visual Symptoms</span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {selectedStain.appearance}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Root Environmental Cause</span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {selectedStain.cause}
                </p>
              </div>
            </div>

            {/* Side-by-Side Comparison: Harsh Risk vs Our Eco Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Conventional Contractor Risk */}
              <div className="bg-rose-50/70 rounded-xl p-5 border border-rose-200 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider font-['Space_Grotesk']">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Conventional Contractor Hazard</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                  {selectedStain.standardRisk}
                </p>
                <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-1 pt-1">
                  ✕ Risk of lawn browning, soil poisoning, or surface etching
                </div>
              </div>

              {/* Smyrna Stain Fighters Eco Method */}
              <div className="bg-emerald-50/80 rounded-xl p-5 border-2 border-emerald-400 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider font-['Space_Grotesk']">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>Smyrna Stain Fighters Eco Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {selectedStain.ourEcoSolution}
                </p>
                <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Plant, Turf, and Pet Paw Safe
                </div>
              </div>

            </div>

            {/* Bottom note */}
            <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-soak freshwater irrigation is performed on all surrounding turf before and after any treatment.</span>
              </div>
              <span className="font-bold text-emerald-400 font-['Space_Grotesk'] shrink-0">$0.45/sq.ft Flat</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
