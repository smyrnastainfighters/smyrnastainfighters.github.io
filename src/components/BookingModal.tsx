import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, CheckCircle2, Calendar, Mail, MapPin, 
  DollarSign, ShieldCheck, Send, Copy, Check
} from 'lucide-react';
import { BUSINESS_INFO, DRIVEWAY_PRESETS } from '../data/mockData';
import { BookingFormState, BookingSubmission, QuoteCalculation } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuote?: QuoteCalculation | null;
  initialPresetId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialQuote,
  initialPresetId,
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    email: '',
    streetAddress: '',
    neighborhoodOrZip: 'Smyrna, GA',
    drivewayPresetId: initialPresetId || '2-car-standard',
    customSqft: initialQuote ? initialQuote.drivewaySqft : 480,
    hasWaterSpigot: true,
    includeFreeWalkway: true,
    preferredDate: '',
    preferredTimeSlot: 'afternoon',
    notes: '',
  });

  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initial quote when opened
  useEffect(() => {
    if (initialQuote) {
      setFormData((prev) => ({
        ...prev,
        customSqft: initialQuote.drivewaySqft,
        drivewayPresetId: initialPresetId || prev.drivewayPresetId,
        includeFreeWalkway: initialQuote.includeFreeWalkway,
      }));
    }
  }, [initialQuote, initialPresetId]);

  if (!isOpen) return null;

  // Rate calculation
  const baseCost = Math.round(formData.customSqft * BUSINESS_INFO.serviceRateSqFt * 100) / 100;
  const discountMultiplier = initialQuote?.groupDiscountPercent ? (1 - initialQuote.groupDiscountPercent / 100) : 1;
  const calculatedCost = Math.round((initialQuote ? initialQuote.totalPrice : baseCost * discountMultiplier) * 100) / 100;
  const calculatedSavings = (formData.includeFreeWalkway ? 55 : 0) + (initialQuote?.groupDiscountAmount || 0);

  const generateEmailBody = (booking: BookingSubmission | BookingFormState, cost: number) => {
    const groupDiscountLine = initialQuote?.groupDiscountPercent 
      ? `• Neighborhood Group Discount: ${initialQuote.groupDiscountPercent}% OFF Applied (-$${initialQuote.groupDiscountAmount?.toFixed(2)})\n` 
      : '';

    return `Hello Smyrna Stain Fighters,

I would like to request a driveway cleaning booking for my property:

SERVICE DETAILS:
• Address: ${booking.streetAddress}, ${booking.neighborhoodOrZip}
• Estimated Driveway Area: ${booking.customSqft} sq. ft.
• Service Rate: $0.45 / sq. ft.
• Front Walkway Cleaning: ${booking.includeFreeWalkway ? 'Included FREE ($55 Saved)' : 'None'}
${groupDiscountLine}• Estimated Total: $${cost.toFixed(2)} (Pay upon full satisfaction after completion)
• Outdoor Water Spigot Available: ${booking.hasWaterSpigot ? 'Yes' : 'No'}

PREFERRED SCHEDULE:
• Preferred Date: ${booking.preferredDate || 'Earliest available'}
• Preferred Time Window: ${booking.preferredTimeSlot}

CUSTOMER CONTACT:
• Reply Email: ${booking.email}
• Special Notes / Specific Stains: ${booking.notes || 'None'}

Thank you!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newSubmission: BookingSubmission = {
      ...formData,
      id: 'SSF-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
      estimatedCost: calculatedCost,
      estimatedSavings: calculatedSavings,
      status: 'pending',
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('ssf_driveway_bookings') || '[]');
      localStorage.setItem('ssf_driveway_bookings', JSON.stringify([newSubmission, ...existing]));
    } catch (err) {
      console.error('Storage error:', err);
    }

    setTimeout(() => {
      setSubmittedBooking(newSubmission);
      setIsSubmitting(false);

      // Auto-trigger mailto client
      const subject = encodeURIComponent(`Driveway Cleaning Booking Request - ${formData.streetAddress || 'Smyrna'}`);
      const body = encodeURIComponent(generateEmailBody(newSubmission, calculatedCost));
      const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoUrl;
    }, 400);
  };

  const handleCopyEmailText = () => {
    if (!submittedBooking) return;
    const body = generateEmailBody(submittedBooking, submittedBooking.estimatedCost);
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                Email-Only Booking • $0.45/sq.ft
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] mt-1 text-white">
              {submittedBooking ? 'Booking Email Prepared!' : 'Request a Driveway Clean via Email'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
              {submittedBooking 
                ? `Sent to ${BUSINESS_INFO.email} • We respond promptly via email!`
                : "No deposit needed • 100% plant-safe • Free front walkway wash"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          
          {submittedBooking ? (
            /* Success State */
            <div className="space-y-6 text-center py-2">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                  Email Booking Request Prepared!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your request has been drafted to <strong className="text-emerald-700 font-semibold">{BUSINESS_INFO.email}</strong>. 
                  We will reply to <strong className="text-slate-800">{submittedBooking.email}</strong> with your scheduled wash confirmation.
                </p>
              </div>

              {/* Estimate Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Service Address:</span>
                  <span className="font-semibold text-slate-900">{submittedBooking.streetAddress}, {submittedBooking.neighborhoodOrZip}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Driveway Area:</span>
                  <span className="font-semibold text-slate-900">{submittedBooking.customSqft} sq. ft.</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-100/60 p-1.5 rounded">
                  <span>Front Walkway Clean:</span>
                  <span className="uppercase">100% FREE ($55 Saved)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Preferred Timing:</span>
                  <span className="font-semibold text-slate-900">
                    {submittedBooking.preferredDate || 'Earliest available'} ({submittedBooking.preferredTimeSlot})
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">Estimated Total:</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-['Space_Grotesk']">
                    ${submittedBooking.estimatedCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Direct Email Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <p className="text-xs text-slate-500 font-medium">Email Dispatch Options:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(`Driveway Cleaning Booking Request - ${submittedBooking.streetAddress}`)}&body=${encodeURIComponent(generateEmailBody(submittedBooking, submittedBooking.estimatedCost))}`}
                    className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Launch Email App</span>
                  </a>
                  
                  <button
                    onClick={handleCopyEmailText}
                    className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Email Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pay after reminder */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 max-w-md mx-auto text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Zero upfront deposit. You only pay after the clean is finished and inspected!</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Done & Close Window
                </button>
              </div>

            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Driveway Size Selection Row */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                    Driveway Size & Rate ($0.45/sq.ft)
                  </label>
                  <span className="text-sm font-extrabold text-emerald-800 font-['Space_Grotesk']">
                    ${calculatedCost.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DRIVEWAY_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          drivewayPresetId: preset.id,
                          customSqft: preset.sqft,
                        }));
                      }}
                      className={`p-2 rounded-lg text-left border transition-all text-xs cursor-pointer ${
                        formData.customSqft === preset.sqft
                          ? 'bg-white border-emerald-600 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500'
                          : 'bg-white/60 border-emerald-200/80 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <span className="block font-bold">{preset.name.split(' ')[0]}</span>
                      <span className="text-[11px] text-slate-500">{preset.sqft} sq ft</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <label className="text-xs text-slate-700 font-medium">
                    Or specify custom Sq. Ft:
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={5000}
                    step={10}
                    value={formData.customSqft}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, customSqft: Number(e.target.value) }))
                    }
                    className="w-24 px-2.5 py-1 text-xs font-bold rounded-md bg-white border border-emerald-300 text-slate-900 focus:outline-emerald-600"
                  />
                  <span className="text-xs text-slate-500">
                    × $0.45 = <strong className="text-emerald-800">${calculatedCost.toFixed(2)}</strong>
                  </span>
                </div>

                {/* Free Walkway Checkbox */}
                <div className="pt-2 border-t border-emerald-200 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeFreeWalkway}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, includeFreeWalkway: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Include FREE Front Walkway Clean ($55 Value)
                    </span>
                  </label>
                  <span className="text-xs font-extrabold text-emerald-700 uppercase bg-emerald-200/80 px-2 py-0.5 rounded">
                    $0.00 FREE
                  </span>
                </div>
              </div>

              {/* Email & Address Fields */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  Email Contact & Location
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. homeowner@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-0.5">All booking confirmations & quotes are sent to this email.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Neighborhood / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smyrna, GA / Vinings"
                      value={formData.neighborhoodOrZip}
                      onChange={(e) => setFormData((prev) => ({ ...prev, neighborhoodOrZip: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address for Service *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1234 Oakridge Terrace"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, streetAddress: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              {/* Timing & Scheduling */}
              <div className="space-y-3.5 pt-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Preferred Schedule & Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Time Window
                    </label>
                    <select
                      value={formData.preferredTimeSlot}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferredTimeSlot: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
                    >
                      <option value="afternoon">Weekday Afternoon (3:30 PM - 7:30 PM)</option>
                      <option value="morning">Weekend Morning (8:00 AM - 12:00 PM)</option>
                      <option value="weekend">Weekend Afternoon (12:00 PM - 6:00 PM)</option>
                      <option value="flexible">Anytime / Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.hasWaterSpigot}
                      onChange={(e) => setFormData((prev) => ({ ...prev, hasWaterSpigot: e.target.checked }))}
                      className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                    />
                    <span>Accessible outdoor water hose spigot is available on property</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Notes or Specific Stains (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Tough oil stains near left parking spot, gate access info..."
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              {/* Guarantees Badge */}
              <div className="bg-slate-100 rounded-xl p-3 flex items-center justify-between text-xs text-slate-700 border border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Zero upfront deposit:</strong> 100% satisfaction guarantee. Pay only after service completion.</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Preparing Email Request...</span>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Send Email Booking Request (Est: ${calculatedCost.toFixed(2)})</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Sends directly to {BUSINESS_INFO.email} • Prompt email reply
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
