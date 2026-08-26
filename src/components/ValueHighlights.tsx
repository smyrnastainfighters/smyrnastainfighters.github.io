import React from 'react';
import { DollarSign, Leaf, ShieldCheck, Sparkles, Award, CheckCircle, Users, Mail } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export const ValueHighlights: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Why Neighbors Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Honest Values. Professional Clean.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We are proud to provide the best value in the neighborhood with upfront pricing, eco-safe care, and a 100% satisfaction promise.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. $0.45 Price */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Affordable & Fair
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 font-['Space_Grotesk']">
                $0.45 / Sq. Foot
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear, straightforward pricing. No franchise fees, no surprise trip charges, and no high-pressure upselling. What we calculate is what you pay.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Save 40%+ vs franchises
            </div>
          </div>

          {/* 2. Free Walkway */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/70 rounded-2xl p-6 border-2 border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-600/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 bg-amber-300 px-2.5 py-0.5 rounded-full">
                $55 Value Included Free
              </span>
              <h3 className="text-xl font-bold text-emerald-950 mt-2 mb-2 font-['Space_Grotesk']">
                FREE Walkway Clean
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                Your driveway leads directly to your front porch! We power scrub your front entrance walkway free of charge with every paid driveway clean.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-700" /> $0 Bonus with every clean
            </div>
          </div>

          {/* 3. Plant Friendly */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
                Eco & Landscape Safe
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 font-['Space_Grotesk']">
                Plant-Safe Detergents
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We protect your flowerbeds, shrubs, and lawn using 100% biodegradable citrus-based cleaners. Safe for pet paws, worms, and your yard.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-semibold text-teal-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-600" /> Zero harsh bleach or acids
            </div>
          </div>

          {/* 4. Pay After Completion */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                100% Risk Free
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 font-['Space_Grotesk']">
                Pay After Satisfaction
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero deposits or upfront card charges. We do the work, you inspect the spotless concrete with us, and you only pay when you are completely satisfied!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-600" /> Cash, Venmo, Zelle, Check
            </div>
          </div>

        </div>

        {/* Youth-Run Business Story Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
              <Users className="w-3.5 h-3.5" />
              <span>Supporting Hardworking Youth</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
              Proudly Youth-Operated Local Business
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When you hire Smyrna Stain Fighters, you get commercial rotary cleaning power, respectful customer care, and a community business dedicated to doing the job right.
            </p>
          </div>
          <div className="shrink-0 text-center sm:text-right bg-slate-800/80 p-4 rounded-xl border border-slate-700 w-full sm:w-auto">
            <span className="text-xs text-slate-400 block">Direct Email:</span>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="text-base sm:text-lg font-extrabold text-emerald-400 hover:text-emerald-300 block font-['Space_Grotesk']"
            >
              {BUSINESS_INFO.email}
            </a>
            <span className="text-[11px] text-slate-400 block mt-0.5">Quick email replies</span>
          </div>
        </div>

      </div>
    </section>
  );
};
