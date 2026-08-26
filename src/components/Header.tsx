import React, { useState } from 'react';
import { Mail, Sparkles, Calendar, Calculator, Maximize2, Users, MapPin, Menu, X, CheckSquare, Droplets } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
  onScrollToContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onScrollToCalculator, onScrollToContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-banner */}
      <div className="bg-emerald-700 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 bg-emerald-600 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">
          <Sparkles className="w-3 h-3 text-amber-300" /> Free Bonus
        </span>
        <span>
          <strong>FREE Front Walkway Wash</strong> with any paid driveway clean! • <strong>$0.45/sq.ft</strong> • Plant-Friendly Citrus
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight font-['Space_Grotesk']">
                {BUSINESS_INFO.name}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Youth-Run Service
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              $0.45/sq.ft • Free Walkway • Pay After Satisfaction • Smyrna, GA
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
          <button
            onClick={onScrollToCalculator}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Calculator
          </button>
          <button
            onClick={() => scrollToSection('visualizer-section')}
            className="hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3 text-emerald-600" />
            Visualizer
          </button>
          <button
            onClick={() => scrollToSection('neighborhood-discount-section')}
            className="hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Users className="w-3 h-3 text-emerald-600" />
            Neighbor 10% Off
          </button>
          <button
            onClick={() => scrollToSection('stain-guide-section')}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Stain Guide
          </button>
          <button
            onClick={() => scrollToSection('service-area-section')}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Service Area
          </button>
          <button
            onClick={() => scrollToSection('checklist-section')}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Prep Checklist
          </button>
        </nav>

        {/* Quick actions & Contact */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onScrollToContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            title="Email Smyrna Stain Fighters"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold">{BUSINESS_INFO.email}</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-700/20 active:scale-98 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book via Email</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 text-sm font-semibold text-slate-700 shadow-lg">
          <button
            onClick={() => { setMobileMenuOpen(false); onScrollToCalculator(); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Pricing Calculator</span>
          </button>
          <button
            onClick={() => scrollToSection('visualizer-section')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 flex items-center gap-2"
          >
            <Maximize2 className="w-4 h-4 text-emerald-600" />
            <span>Driveway Scale Visualizer</span>
          </button>
          <button
            onClick={() => scrollToSection('neighborhood-discount-section')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Neighbor 10% Group Savings</span>
          </button>
          <button
            onClick={() => scrollToSection('stain-guide-section')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 flex items-center gap-2"
          >
            <Droplets className="w-4 h-4 text-emerald-600" />
            <span>Stain Diagnosis Guide</span>
          </button>
          <button
            onClick={() => scrollToSection('service-area-section')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Service Area & Zip Codes</span>
          </button>
          <button
            onClick={() => scrollToSection('checklist-section')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 flex items-center gap-2"
          >
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Pre-Service Prep Checklist</span>
          </button>
        </div>
      )}
    </header>
  );
};
