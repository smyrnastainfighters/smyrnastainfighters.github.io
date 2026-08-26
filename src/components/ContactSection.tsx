import React, { useState } from 'react';
import { 
  Mail, MapPin, Clock, 
  CreditCard, CheckCircle2, Copy, Check, Sparkles, Send 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleQuickEmailSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);

    const emailSubject = encodeURIComponent(subject || 'Driveway Cleaning Inquiry - Smyrna Stain Fighters');
    const emailBody = encodeURIComponent(`From: ${userEmail}\n\nMessage:\n${message}\n\nSent to: ${BUSINESS_INFO.email}`);
    
    // Trigger mailto
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setSentSuccess(false);
      setUserEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-slate-900 text-white scroll-mt-20 relative overflow-hidden">
      
      {/* Glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <Mail className="w-3.5 h-3.5" />
            <span>Email-Only Contact & Bookings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Contact Smyrna Stain Fighters
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We handle all inquiries, quotes, and scheduling directly and promptly via email. Send us your address and questions anytime.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Email and Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Email Card */}
            <div className="bg-slate-800/95 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Business Email</h3>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=Driveway Cleaning Inquiry - Smyrna Stain Fighters`}
                    className="text-xl sm:text-2xl font-bold text-white hover:text-emerald-400 font-['Space_Grotesk'] block mt-1 transition-colors break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct email inbox for all quotes, bookings, and customer questions.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${BUSINESS_INFO.email}?subject=Driveway Cleaning Inquiry - Smyrna Stain Fighters&body=Hello Smyrna Stain Fighters,%0D%0A%0D%0AI would like to get an estimate for cleaning my driveway.%0D%0AMy Address:%20%0D%0AApproximate Size (e.g. 2-Car / Sq. Ft.):%20%0D%0A%0D%0AThank you!`}
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm text-center transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Email App</span>
                </a>
                
                <button
                  onClick={handleCopyEmail}
                  className="py-2.5 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied Address!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Operating Hours & Neighborhoods */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Service Hours:</strong>
                  <span className="text-slate-400">{BUSINESS_INFO.scheduleNote}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-700/60">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Service Area:</strong>
                  <span className="text-slate-400">{BUSINESS_INFO.serviceArea}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-700/60">
                <CreditCard className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Accepted Payment Methods (Pay After Service):</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {BUSINESS_INFO.paymentMethods.map((method, idx) => (
                      <span key={idx} className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-xs">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Email Dispatch Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800 rounded-2xl p-6 sm:p-7 border border-slate-700 shadow-xl space-y-4">
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded mb-1">
                  <Sparkles className="w-3 h-3" /> Direct Email Dispatch
                </div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Send an Email Message
                </h3>
                <p className="text-xs text-slate-400">
                  Have a question about pricing, scheduling, or plant-safe detergents? Write to us below.
                </p>
              </div>

              {sentSuccess ? (
                <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-200 p-5 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-bold text-sm">Email Draft Created!</p>
                  <p className="text-xs text-emerald-300">
                    Your inquiry was directed to {BUSINESS_INFO.email}. We will review and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickEmailSend} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. resident@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Subject / Property Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Driveway quote for Oakridge Terrace"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Message or Questions *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Hello Smyrna Stain Fighters, I would like an estimate for cleaning my driveway this weekend..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Email to Smyrna Stain Fighters</span>
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-slate-700 text-center">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Or Click Here to Open the Full Email Booking Form with Instant Estimate →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
