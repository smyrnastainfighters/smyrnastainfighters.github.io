import React from 'react';
import { ShieldCheck, CheckCircle2, Droplets, Wrench, Sparkles, Award } from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

export const ServiceProcess: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>Commercial Quality Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Our 4-Step Professional Cleaning Process
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Every driveway and walkway service follows strict commercial standards to guarantee a streak-free clean while fully protecting your landscaping.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 hover:border-emerald-500/60 transition-all flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-emerald-400 font-['Space_Grotesk']">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-700/80 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    {index === 0 && <Droplets className="w-4 h-4" />}
                    {index === 1 && <Sparkles className="w-4 h-4" />}
                    {index === 2 && <Wrench className="w-4 h-4" />}
                    {index === 3 && <ShieldCheck className="w-4 h-4" />}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Standardized Procedure</span>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment & Eco Standards Callout */}
        <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-['Space_Grotesk']">
              Commercial Rotary Washers
            </h4>
            <p className="text-xs text-slate-300">
              16-inch dual-nozzle rotating surface cleaners guarantee uniform, streak-free deep agitation across concrete with zero zebra lines.
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-['Space_Grotesk']">
              100% Plant & Lawn Safe
            </h4>
            <p className="text-xs text-slate-300">
              Biodegradable, phosphate-free citrus solutions pre-tested to ensure zero chemical burning to turf, shrubs, flowers, or pet paws.
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-['Space_Grotesk']">
              Pay Only After Full Inspection
            </h4>
            <p className="text-xs text-slate-300">
              Zero upfront deposit required. Payment is collected only after you walk the completed driveway and are 100% satisfied.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
