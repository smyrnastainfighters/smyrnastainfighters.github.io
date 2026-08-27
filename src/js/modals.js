import { BUSINESS_INFO, DRIVEWAY_PRESETS, SERVICE_ADDONS } from '../data/mockData.js';

let bookingState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  customSqft: 480,
  preferredDate: '',
  preferredTime: 'morning',
  includeFreeWalkway: true,
  hasWaterSpigot: true,
  notes: '',
  quote: null,
};

let printableQuote = null;

export function openBookingModal(initialQuote) {
  if (initialQuote) {
    bookingState.quote = initialQuote;
    bookingState.customSqft = initialQuote.drivewaySqft || 480;
    bookingState.includeFreeWalkway = initialQuote.includeFreeWalkway !== undefined ? initialQuote.includeFreeWalkway : true;
  }
  renderBookingModal();
  document.getElementById('booking-modal-overlay')?.classList.remove('hidden');
}

export function closeBookingModal() {
  document.getElementById('booking-modal-overlay')?.classList.add('hidden');
}

export function openPrintModal(quote) {
  printableQuote = quote;
  renderPrintModal();
  document.getElementById('print-modal-overlay')?.classList.remove('hidden');
}

export function closePrintModal() {
  document.getElementById('print-modal-overlay')?.classList.add('hidden');
}

function renderBookingModal() {
  const modalContainer = document.getElementById('booking-modal-container');
  if (!modalContainer) return;

  const baseCost = Math.round(bookingState.customSqft * BUSINESS_INFO.serviceRateSqFt * 100) / 100;
  const discountMultiplier = bookingState.quote?.groupDiscountPercent ? (1 - bookingState.quote.groupDiscountPercent / 100) : 1;
  const totalCost = Math.round((bookingState.quote ? bookingState.quote.totalPrice : baseCost * discountMultiplier) * 100) / 100;
  const totalSavings = (bookingState.includeFreeWalkway ? 55 : 0) + (bookingState.quote?.groupDiscountAmount || 0);

  modalContainer.innerHTML = `
    <div class="bg-slate-950 text-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800 max-h-[90vh] flex flex-col">
      
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-emerald-950 to-slate-900 text-white p-6 sm:p-7 flex items-center justify-between border-b border-slate-800">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Fast Email Scheduling</span>
          <h3 class="text-xl sm:text-2xl font-black font-['Space_Grotesk'] mt-0.5">Book Driveway Cleaning</h3>
          <p class="text-xs text-slate-300 mt-1">Pay after 100% satisfaction • Direct email to ${BUSINESS_INFO.email}</p>
        </div>
        <button
          type="button"
          id="close-booking-btn"
          class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-slate-700"
        >✕</button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs">
        
        <!-- Live summary banner inside modal -->
        <div class="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-inner">
          <div>
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Estimated Driveway Area</span>
            <span class="text-lg font-black text-emerald-400 font-['Space_Grotesk']">${bookingState.customSqft} sq. ft.</span>
          </div>
          <div class="text-right">
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Service Total</span>
            <span class="text-xl font-black text-white font-['Space_Grotesk']">$${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <form id="booking-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-300 block mb-1">Your Full Name *</label>
              <input
                type="text"
                id="form-name"
                required
                value="${bookingState.name}"
                placeholder="Jane Smith"
                class="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="font-bold text-slate-300 block mb-1">Your Email Address *</label>
              <input
                type="email"
                id="form-email"
                required
                value="${bookingState.email}"
                placeholder="jane@example.com"
                class="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-300 block mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                id="form-phone"
                value="${bookingState.phone}"
                placeholder="(404) 555-0199"
                class="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="font-bold text-slate-300 block mb-1">Smyrna / Vinings Street Address *</label>
              <input
                type="text"
                id="form-address"
                required
                value="${bookingState.address}"
                placeholder="1234 King Springs Rd, Smyrna, GA 30082"
                class="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="font-bold text-slate-300 block mb-1">Preferred Service Date</label>
              <input
                type="date"
                id="form-date"
                value="${bookingState.preferredDate}"
                class="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="font-bold text-slate-300 block mb-1">Preferred Time Window</label>
              <select
                id="form-time"
                class="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                <option value="morning" ${bookingState.preferredTime === 'morning' ? 'selected' : ''}>Morning (8:00 AM - 12:00 PM)</option>
                <option value="afternoon" ${bookingState.preferredTime === 'afternoon' ? 'selected' : ''}>Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="evening" ${bookingState.preferredTime === 'evening' ? 'selected' : ''}>Late Afternoon (4:00 PM - 7:00 PM)</option>
              </select>
            </div>
          </div>

          <!-- Walkway & Spigot options -->
          <div class="space-y-2 pt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="form-walkway"
                ${bookingState.includeFreeWalkway ? 'checked' : ''}
                class="w-4 h-4 rounded text-emerald-400 accent-emerald-400"
              />
              <span class="text-slate-200 font-semibold">Include FREE Front Walkway Wash ($55 Value Bonus)</span>
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="form-spigot"
                ${bookingState.hasWaterSpigot ? 'checked' : ''}
                class="w-4 h-4 rounded text-emerald-400 accent-emerald-400"
              />
              <span class="text-slate-200 font-semibold">Exterior freshwater garden hose spigot is available on site</span>
            </label>
          </div>

          <div>
            <label class="font-bold text-slate-300 block mb-1">Notes or Special Stain Concerns (Optional)</label>
            <textarea
              id="form-notes"
              rows="2"
              placeholder="e.g., Heavy red clay runoff near front porch, oil drip under left bay..."
              class="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >${bookingState.notes}</textarea>
          </div>

          <!-- Submit Buttons -->
          <div class="pt-3 space-y-2">
            <button
              type="submit"
              class="w-full py-4 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Send Booking Request to ${BUSINESS_INFO.email}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </button>
            <p class="text-center text-[11px] text-slate-400">
              Clicking will prepare an official pre-filled email to Smyrna Stain Fighters. You will review it before sending!
            </p>
          </div>
        </form>

      </div>
    </div>
  `;

  // Attach form events
  document.getElementById('close-booking-btn')?.addEventListener('click', closeBookingModal);

  document.getElementById('booking-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const phone = document.getElementById('form-phone').value;
    const address = document.getElementById('form-address').value;
    const date = document.getElementById('form-date').value || 'First Available Slot';
    const time = document.getElementById('form-time').value;
    const walkway = document.getElementById('form-walkway').checked;
    const spigot = document.getElementById('form-spigot').checked ? 'Yes' : 'No';
    const notes = document.getElementById('form-notes').value;

    const subject = encodeURIComponent(`Driveway Cleaning Booking Request - ${address}`);
    const body = encodeURIComponent(
`Hello Smyrna Stain Fighters,

I would like to request a driveway cleaning booking for my property:

CUSTOMER DETAILS:
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}
• Address: ${address}

SERVICE ESTIMATE:
• Driveway Area: ${bookingState.customSqft} sq. ft.
• Service Rate: $0.45 / sq. ft.
• Front Walkway Cleaning: ${walkway ? 'Included FREE ($55 Saved)' : 'None'}
• Estimated Total: $${totalCost.toFixed(2)} (Pay after 100% satisfaction)
• Water Spigot Available: ${spigot}

SCHEDULE:
• Preferred Date: ${date}
• Time Window: ${time}
• Notes / Specific Stains: ${notes || 'Standard clean'}

Please confirm availability and booking details. Thank you!`
    );

    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  });
}

function renderPrintModal() {
  const container = document.getElementById('print-modal-container');
  if (!container || !printableQuote) return;

  const q = printableQuote;
  const quoteNumber = `SSF-${Math.floor(100000 + Math.random() * 900000)}`;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  container.innerHTML = `
    <div class="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-300 max-h-[90vh] flex flex-col">
      
      <!-- Modal Top Controls (Hidden in print) -->
      <div class="bg-slate-900 text-white p-4 px-6 flex items-center justify-between print:hidden">
        <span class="text-xs font-bold text-emerald-400">Official Estimate Sheet</span>
        <div class="flex items-center gap-3">
          <button
            type="button"
            id="trigger-print-btn"
            class="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span>Print / Save as PDF</span>
          </button>
          <button
            type="button"
            id="close-print-btn"
            class="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
          >✕</button>
        </div>
      </div>

      <!-- Printable Document Paper -->
      <div class="p-8 sm:p-10 overflow-y-auto space-y-6 flex-1 text-slate-800 font-sans print:p-0">
        
        <!-- Header -->
        <div class="flex justify-between items-start border-b-2 border-slate-900 pb-6">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-950 font-['Space_Grotesk']">${BUSINESS_INFO.name}</h1>
            <p class="text-xs text-slate-600 font-medium">${BUSINESS_INFO.tagline}</p>
            <p class="text-xs text-slate-500 mt-1">📧 ${BUSINESS_INFO.email} • 📍 ${BUSINESS_INFO.location}</p>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-slate-500 uppercase block">Estimate No.</span>
            <span class="text-sm font-mono font-bold text-slate-900">${quoteNumber}</span>
            <span class="text-xs text-slate-500 block mt-1">Date: ${today}</span>
            <span class="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">Valid for 30 Days</span>
          </div>
        </div>

        <!-- Line Item Breakdown -->
        <div>
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Service Scope Breakdown</h2>
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-300 text-slate-600 uppercase text-[10px]">
                <th class="py-2">Item Description</th>
                <th class="py-2 text-right">Quantity / Area</th>
                <th class="py-2 text-right">Rate</th>
                <th class="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr>
                <td class="py-3">
                  <div class="font-bold text-slate-900">Commercial Rotary Driveway Pressure Wash</div>
                  <div class="text-[11px] text-slate-500">100% Biodegradable Plant-Safe Citrus Treatment & 3,400 PSI Uniform Clean</div>
                </td>
                <td class="py-3 text-right font-mono">${q.drivewaySqft} sq.ft</td>
                <td class="py-3 text-right font-mono">$0.45</td>
                <td class="py-3 text-right font-mono font-bold">$${q.drivewayCost.toFixed(2)}</td>
              </tr>
              <tr class="bg-emerald-50/60">
                <td class="py-3">
                  <div class="font-bold text-emerald-950">Complimentary Front Walkway Cleaning Bonus</div>
                  <div class="text-[11px] text-emerald-800">Driveway apron to front entrance threshold</div>
                </td>
                <td class="py-3 text-right font-mono text-emerald-900">1 Walkway</td>
                <td class="py-3 text-right font-mono text-slate-400 line-through">$55.00</td>
                <td class="py-3 text-right font-mono font-bold text-emerald-700">FREE ($0.00)</td>
              </tr>
              ${q.selectedAddons ? q.selectedAddons.map(a => `
                <tr>
                  <td class="py-3">
                    <div class="font-bold text-slate-900">${a.name}</div>
                    <div class="text-[11px] text-slate-500">${a.description}</div>
                  </td>
                  <td class="py-3 text-right font-mono">1 Item</td>
                  <td class="py-3 text-right font-mono">$${a.price.toFixed(2)}</td>
                  <td class="py-3 text-right font-mono font-bold">$${a.price.toFixed(2)}</td>
                </tr>
              `).join('') : ''}
            </tbody>
          </table>
        </div>

        <!-- Total Box -->
        <div class="flex justify-end pt-4 border-t-2 border-slate-900">
          <div class="w-64 space-y-2 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Driveway Subtotal:</span>
              <span class="font-mono font-bold">$${q.drivewayCost.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-emerald-700 font-bold">
              <span>Walkway Value Saved:</span>
              <span class="font-mono">-$55.00</span>
            </div>
            <div class="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-300 font-['Space_Grotesk']">
              <span>Total Quote:</span>
              <span class="text-emerald-700 font-mono">$${q.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Terms & Guarantee -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
          <p class="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Pledge of Service & Quality Guarantee:</p>
          <p>• <strong>$0 Upfront Deposit:</strong> You pay nothing until service completion and your personal 100% inspection approval.</p>
          <p>• <strong>100% Plant & Lawn Safety:</strong> All solutions are eco-friendly, phosphate-free citrus bio-enzymes that preserve grass, bushes, and pets.</p>
          <p>• <strong>Payment Methods Accepted:</strong> Cash, Venmo, Zelle, or Check upon satisfactory completion.</p>
        </div>

      </div>

    </div>
  `;

  document.getElementById('close-print-btn')?.addEventListener('click', closePrintModal);
  document.getElementById('trigger-print-btn')?.addEventListener('click', () => window.print());
}
