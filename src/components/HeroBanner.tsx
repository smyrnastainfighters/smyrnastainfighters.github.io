import React from 'react';
import { Sparkles, Leaf, ShieldCheck, DollarSign, Mail, ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeroBannerProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
  onScrollToContact: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenBooking, onScrollToCalculator, onScrollToContact }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800">
      {/* Refined subtle ambient gradients */}
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Youth-Operated Local Cleaning Service • Smyrna, GA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-['Space_Grotesk']">
              Professional Driveway Cleaning.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 block sm:inline">
                Eco-Friendly & Guaranteed.
              </span>
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Commercial-grade rotary pressure washing for spotless, streak-free concrete. Run by hardworking Smyrna youth with a flat rate of{' '}
              <strong className="text-emerald-400 font-bold">$0.45 / sq. ft.</strong>,{' '}
              <strong className="text-white font-semibold">100% plant-safe citrus detergents</strong>, and zero payment required until you inspect the clean.
            </p>

            {/* 4 Feature Badges in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-snug">$0.45 / Sq. Ft. Flat Rate</h2>
                  <p className="text-xs text-slate-400">Transparent math with no hidden setup fees or contractor markups.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/90 to-teal-950/80 border border-emerald-600/80 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-emerald-200 flex items-center gap-1.5">
                    FREE Walkway Wash
                    <span className="text-[10px] uppercase font-extrabold bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded">Save $55</span>
                  </h2>
                  <p className="text-xs text-emerald-300">Complimentary front entry walkway wash included with every driveway clean.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-snug">100% Plant & Lawn Safe</h2>
                  <p className="text-xs text-slate-400">Biodegradable citrus detergents protect flowerbeds, turf & pets.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-snug">Pay AFTER Full Satisfaction</h2>
                  <p className="text-xs text-slate-400">$0 upfront deposit. Pay only after you personally inspect the results.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <span>Calculate Instant Price</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToContact}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Email Us: {BUSINESS_INFO.email}</span>
              </button>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Email-only direct scheduling
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> $0 deposit required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free walkway included
              </span>
            </div>

          </div>

          {/* Right Column: Business Overview & Direct Rate Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 shadow-2xl p-6 sm:p-7 relative backdrop-blur-xs">
              
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-black text-lg flex items-center justify-center shadow-md">
                    SSF
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight font-['Space_Grotesk']">{BUSINESS_INFO.name}</h2>
                    <p className="text-xs text-emerald-400 font-medium">{BUSINESS_INFO.businessType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    <Award className="w-3.5 h-3.5" /> Commercial Grade
                  </div>
                </div>
              </div>

              {/* Service commitment */}
              <div className="my-4 bg-slate-900/80 rounded-xl p-4 text-xs sm:text-sm text-slate-300 italic border-l-4 border-emerald-500 leading-relaxed">
                "{BUSINESS_INFO.businessStory}"
              </div>

              {/* Price Callout Banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl p-4 my-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-emerald-100 font-medium uppercase tracking-wider">Direct Driveway Rate</p>
                    <p className="text-2xl sm:text-3xl font-black font-['Space_Grotesk']">$0.45 <span className="text-xs font-normal text-emerald-100">/ sq. foot</span></p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-xs rounded-lg px-3 py-1.5 text-right">
                    <p className="text-[11px] text-emerald-100 font-medium">Front Walkway</p>
                    <p className="text-sm font-extrabold text-amber-300 uppercase">100% FREE</p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-500/50 flex items-center justify-between text-xs text-emerald-100">
                  <span>Standard 2-Car (~480 sq ft)</span>
                  <span className="font-bold text-white text-sm font-['Space_Grotesk']">approx. $216.00</span>
                </div>
              </div>

              {/* Quick Contact & Action */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Cleaning via Email</span>
                </button>
                <div className="grid grid-cols-1 gap-2 text-center text-xs">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=Driveway Cleaning Quote Request - Smyrna Stain Fighters&body=Hello Smyrna Stain Fighters,%0D%0A%0D%0AI would like a driveway cleaning quote for my home.%0D%0AAddress:%20%0D%0AApproximate Driveway Size / Car Spaces:%20%0D%0APreferred Date/Time:%20%0D%0A%0D%0AThank you!`}
                    className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Direct Email: {BUSINESS_INFO.email}</span>
                  </a>
                </div>
              </div>

              {/* Footer reassurance */}
              <p className="text-[11px] text-slate-400 text-center mt-3">
                No deposit needed • Payment collected only after you inspect the clean
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
