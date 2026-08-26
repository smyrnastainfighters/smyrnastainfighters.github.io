import React from 'react';
import { Sparkles, Mail, MapPin, ShieldCheck, Leaf, DollarSign } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface FooterProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Overview */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-lg font-['Space_Grotesk'] tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Neighborhood eco-friendly pressure washing proudly operated by hardworking local youth. Providing honest hard work, $0.45/sq.ft rates, plant-safe detergents, and pay-after-satisfaction service in Smyrna, GA.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-emerald-400">
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                $0.45 / Sq. Ft.
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-amber-400">
                FREE Walkway Clean
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                100% Plant-Safe
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                Pay After Inspection
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-['Space_Grotesk']">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onScrollToCalculator}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Price Estimator ($0.45/sq.ft)
                </button>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-emerald-400 transition-colors">
                  Contact Information & Email
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Email Booking Request
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-emerald-400 hover:text-emerald-300 font-bold block"
                >
                  Email: {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Email Contact */}
          <div className="md:col-span-4 space-y-3 text-xs sm:text-sm">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-['Space_Grotesk']">
              Email & Location
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white font-semibold break-all">
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.serviceArea}</span>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Email Quote & Book</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Pay-After-Satisfaction Guaranteed</span> • <span>Plant & Pet Safe</span> • <span>Email-Only Booking</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
