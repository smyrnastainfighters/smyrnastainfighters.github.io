import './index.css';
import { BUSINESS_INFO, FAQ_LIST } from './data/mockData.js';
import { initBeforeAfter } from './js/beforeAfter.js';
import { initCalculator } from './js/calculator.js';
import { initVisualizer } from './js/visualizer.js';
import { initNeighborhoodCalculator } from './js/neighborhood.js';
import { initStainGuide } from './js/stainGuide.js';
import { initServiceArea } from './js/serviceArea.js';
import { initChecklist } from './js/checklist.js';
import { openBookingModal, closeBookingModal, openPrintModal, closePrintModal } from './js/modals.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-drawer');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile drawer when clicking anchor links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

  // 2. Global Booking Modal Triggers
  document.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', () => {
      openBookingModal();
    });
  });

  // Modal Backdrop Click Handlers
  document.getElementById('booking-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'booking-modal-overlay') {
      closeBookingModal();
    }
  });

  document.getElementById('print-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'print-modal-overlay') {
      closePrintModal();
    }
  });

  // 3. Initialize Interactive Hero Before/After Slider
  initBeforeAfter();

  // 4. Render FAQ Accordion
  renderFaqSection();

  // 5. Initialize Interactive Features
  initCalculator({
    onBookQuote: (quote) => openBookingModal(quote),
    onPrintQuote: (quote) => openPrintModal(quote),
  });

  initVisualizer({
    onBookQuote: (quote) => openBookingModal(quote),
  });

  initNeighborhoodCalculator({
    onBookGroup: (quote) => openBookingModal(quote),
  });

  initStainGuide();

  initServiceArea({
    onBookArea: () => openBookingModal(),
  });

  initChecklist();
});

function renderFaqSection() {
  const faqMount = document.getElementById('faq-accordion-container') || document.getElementById('faq-mount');
  if (!faqMount) return;

  faqMount.innerHTML = `
    <div class="space-y-3">
      ${FAQ_LIST.map(faq => `
        <div class="faq-item border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/80 shadow-md transition-all">
          <button
            type="button"
            class="faq-toggle w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base cursor-pointer hover:bg-slate-900 transition-colors"
          >
            <span class="font-['Space_Grotesk']">${faq.question}</span>
            <span class="faq-icon text-emerald-400 text-lg transition-transform font-mono font-normal">▼</span>
          </button>
          <div class="faq-body hidden px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 space-y-2.5">
            <p class="leading-relaxed">${faq.answer}</p>
            <span class="inline-block text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-500/30">
              Key Note: ${faq.highlight}
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  faqMount.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const body = item?.querySelector('.faq-body');
      const icon = item?.querySelector('.faq-icon');
      
      const isClosed = body?.classList.contains('hidden');
      
      // Close all others
      faqMount.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
      faqMount.querySelectorAll('.faq-icon').forEach(i => i.textContent = '▼');

      if (isClosed) {
        body?.classList.remove('hidden');
        if (icon) icon.textContent = '▲';
      }
    });
  });
}

