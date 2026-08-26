import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ValueHighlights } from './components/ValueHighlights';
import { PricingCalculator } from './components/PricingCalculator';
import { DrivewayVisualizer } from './components/DrivewayVisualizer';
import { NeighborhoodDiscountCalculator } from './components/NeighborhoodDiscountCalculator';
import { ServiceProcess } from './components/ServiceProcess';
import { StainTreatmentGuide } from './components/StainTreatmentGuide';
import { ServiceAreaChecker } from './components/ServiceAreaChecker';
import { PreparationChecklist } from './components/PreparationChecklist';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PrintableEstimateModal } from './components/PrintableEstimateModal';
import { QuoteCalculation } from './types';
import { Mail, Calculator, Maximize2 } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteCalculation | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(undefined);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printQuote, setPrintQuote] = useState<QuoteCalculation | null>(null);

  const handleOpenBooking = (quote?: QuoteCalculation) => {
    if (quote) {
      setSelectedQuote(quote);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectQuote = (quote: QuoteCalculation, presetId?: string) => {
    setSelectedQuote(quote);
    setSelectedPresetId(presetId);
    setIsBookingOpen(true);
  };

  const handleOpenPrintEstimate = (quote: QuoteCalculation) => {
    setPrintQuote(quote);
    setIsPrintModalOpen(true);
  };

  const handleClosePrintEstimate = () => {
    setIsPrintModalOpen(false);
  };

  const handleProceedFromPrintToBooking = () => {
    setIsPrintModalOpen(false);
    if (printQuote) {
      setSelectedQuote(printQuote);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] pb-14 sm:pb-0">
      {/* Navigation Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onScrollToCalculator={handleScrollToCalculator}
        onScrollToContact={handleScrollToContact}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <HeroBanner
          onOpenBooking={() => handleOpenBooking()}
          onScrollToCalculator={handleScrollToCalculator}
          onScrollToContact={handleScrollToContact}
        />

        {/* 2. Core Value Pillars ($0.45/sq.ft, Plant Safe, Pay After, Free Walkway) */}
        <ValueHighlights />

        {/* 3. Interactive Pricing & Sq.Ft Calculator */}
        <PricingCalculator
          onSelectQuote={handleSelectQuote}
          onOpenPrintEstimate={handleOpenPrintEstimate}
        />

        {/* 4. Driveway Dimension & Layout Scale Visualizer (CAD/SVG Engine) */}
        <DrivewayVisualizer
          onSelectQuote={handleSelectQuote}
        />

        {/* 5. Clean With Your Neighbor 10% Multi-Home Discount Calculator */}
        <NeighborhoodDiscountCalculator
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Professional 4-Step Commercial Cleaning Workflow */}
        <ServiceProcess />

        {/* 7. Stain Diagnosis & Eco-Citrus Treatment Guide */}
        <StainTreatmentGuide />

        {/* 8. Smyrna & Vinings Service Area & Zip Code Checker */}
        <ServiceAreaChecker
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Pre-Service Homeowner Preparation Checklist */}
        <PreparationChecklist />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Direct Email Contact & Inquiries */}
        <ContactSection
          onOpenBooking={() => handleOpenBooking()}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onScrollToCalculator={handleScrollToCalculator}
      />

      {/* Booking & Estimate Request Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialQuote={selectedQuote}
        initialPresetId={selectedPresetId}
      />

      {/* Printable / Downloadable Official Estimate Modal */}
      <PrintableEstimateModal
        isOpen={isPrintModalOpen}
        onClose={handleClosePrintEstimate}
        quote={printQuote}
        onProceedToBooking={handleProceedFromPrintToBooking}
      />

      {/* Floating Bottom Email Quick Contact Bar on Mobile */}
      <aside aria-label="Quick booking actions" className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:hidden shadow-lg flex items-center justify-between gap-2">
        <button
          onClick={handleScrollToCalculator}
          className="flex-1 py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-emerald-700" />
          <span>Calculator</span>
        </button>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-[1.5] py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Book via Email</span>
        </button>
      </aside>
    </div>
  );
}
