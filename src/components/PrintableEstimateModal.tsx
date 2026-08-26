import React from 'react';
import { X, Printer, Mail, Download, CheckCircle2, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { QuoteCalculation } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface PrintableEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: QuoteCalculation | null;
  onProceedToBooking: () => void;
}

export const PrintableEstimateModal: React.FC<PrintableEstimateModalProps> = ({
  isOpen,
  onClose,
  quote,
  onProceedToBooking,
}) => {
  if (!isOpen || !quote) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const quoteId = `SSF-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar (Non-Printable Actions) */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-sm font-['Space_Grotesk']">Official Cleaning Estimate Sheet</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Estimate Sheet Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 font-sans print:p-0 print:m-0">
          
          {/* Official Letterhead */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5">
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
                {BUSINESS_INFO.name}
              </h1>
              <p className="text-xs text-slate-600 font-medium">{BUSINESS_INFO.tagline}</p>
              <p className="text-xs text-emerald-700 font-bold mt-1">Direct Email: {BUSINESS_INFO.email}</p>
              <p className="text-[11px] text-slate-500">Smyrna & Vinings, Cobb County, GA</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Itemized Estimate</span>
              <p className="font-mono text-sm font-bold text-slate-900">{quoteId}</p>
              <p className="text-xs text-slate-500 mt-1">Date: {todayStr}</p>
              <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                Valid for 30 Days
              </span>
            </div>
          </div>

          {/* Service Scope Summary */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Service Target</span>
              <span className="font-bold text-slate-900 text-sm">Concrete Driveway & Walkway</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Standard Rate</span>
              <span className="font-bold text-slate-900 text-sm font-mono">$0.45 / Square Foot</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Deposit Required</span>
              <span className="font-bold text-emerald-700 text-sm font-['Space_Grotesk']">$0.00 (Pay After Clean)</span>
            </div>
          </div>

          {/* Itemized Line Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Service Description</th>
                  <th className="p-3 text-center">Unit / Scale</th>
                  <th className="p-3 text-right">Standard Price</th>
                  <th className="p-3 text-right">Your Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">Commercial Rotary Driveway Pressure Wash</p>
                    <span className="text-[11px] text-slate-500">
                      Dual-nozzle rotary scrubbing, plant-safe citrus pre-treatment & clean water rinse
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono">{quote.drivewaySqft} sq.ft</td>
                  <td className="p-3 text-right font-mono">${(quote.drivewaySqft * 0.45).toFixed(2)}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    ${(quote.drivewaySqft * 0.45).toFixed(2)}
                  </td>
                </tr>

                {/* Free Walkway Line Item */}
                <tr className="bg-emerald-50/50">
                  <td className="p-3">
                    <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Front Entry Walkway Cleaning (Complimentary)
                    </p>
                    <span className="text-[11px] text-emerald-700">
                      Bonus deep wash from driveway apron to front porch doorstep
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-emerald-800">Front Path</td>
                  <td className="p-3 text-right font-mono text-slate-400 line-through">$55.00</td>
                  <td className="p-3 text-right font-mono font-black text-emerald-700">$0.00 (FREE)</td>
                </tr>

                {/* Selected Addons */}
                {quote.selectedAddons.map((addon) => (
                  <tr key={addon.id}>
                    <td className="p-3 font-medium text-slate-900">{addon.name}</td>
                    <td className="p-3 text-center text-slate-500">Service Addon</td>
                    <td className="p-3 text-right font-mono">${addon.price.toFixed(2)}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">${addon.price.toFixed(2)}</td>
                  </tr>
                ))}

                {/* Neighborhood discount if applicable */}
                {quote.groupDiscountAmount && quote.groupDiscountAmount > 0 && (
                  <tr className="bg-amber-50">
                    <td className="p-3 font-bold text-amber-950">
                      10% Multi-Home Neighborhood Group Discount
                    </td>
                    <td className="p-3 text-center text-amber-800">10% Off</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right font-mono font-bold text-amber-900">
                      -${quote.groupDiscountAmount.toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Box */}
          <div className="flex justify-end">
            <div className="w-full sm:w-72 bg-slate-900 text-white rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Standard Value:</span>
                <span className="font-mono">${(quote.totalPrice + quote.totalSavings).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-400 font-bold">
                <span>Total Savings Included:</span>
                <span className="font-mono">-${quote.totalSavings.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline">
                <span className="text-sm font-bold">Final Price Owed:</span>
                <span className="text-2xl font-black text-emerald-400 font-['Space_Grotesk']">
                  ${quote.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Protection & Plant-Safe Pledge */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs text-slate-600">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Smyrna Stain Fighters 100% Satisfaction & Landscape Safety Pledge:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-600">
              <li><strong>Zero Upfront Payment:</strong> You pay $0.00 until the job is completed and you personally inspect the spotless results.</li>
              <li><strong>100% Plant-Safe:</strong> All detergents are biodegradable, phosphate-free citrus formulas that protect your grass, flowerbeds, and pets.</li>
              <li><strong>Accepted Payment Methods:</strong> Cash, Venmo, Zelle, or Check upon inspection.</li>
            </ul>
          </div>

        </div>

        {/* Modal Bottom Actions (Non-Printable) */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-slate-500">
            Email booking required • Fast scheduling confirmation
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={onProceedToBooking}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Book This Estimate via Email</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
