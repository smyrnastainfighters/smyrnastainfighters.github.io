import { BUSINESS_INFO } from '../data/mockData.js';

let homes = [
  { id: 1, label: 'Your Home (House #1)', sqft: 480 },
  { id: 2, label: "Next Door Neighbor (House #2)", sqft: 480 },
];

export function initNeighborhoodCalculator({ onBookGroup }) {
  const container = document.getElementById('neighborhood-mount');
  if (!container) return;

  renderNeighborhood(container, onBookGroup);
}

function renderNeighborhood(container, onBookGroup) {
  const totalSqft = homes.reduce((acc, h) => acc + h.sqft, 0);
  const standardCost = totalSqft * BUSINESS_INFO.serviceRateSqFt;
  const discountMultiplier = 0.90; // 10% off for neighbor bundle
  const discountedCost = standardCost * discountMultiplier;
  const totalSavings = standardCost - discountedCost;
  const freeWalkwaysSavings = homes.length * 55;

  container.innerHTML = `
    <div class="bg-slate-950/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
      
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
            ★ Street Coordination Bonus
          </span>
          <h3 class="text-xl sm:text-2xl font-black text-white mt-2 font-['Space_Grotesk']">
            Clean With Your Neighbors & Both Take 10% OFF
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            When you and your adjacent street neighbors schedule on the same service day, our equipment stays on your block—saving travel time and passing a direct 10% discount to everyone!
          </p>
        </div>

        <button
          type="button"
          id="add-neighbor-btn"
          class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 font-bold text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${homes.length >= 4 ? 'opacity-50 pointer-events-none' : ''}"
        >
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
          <span>Add Another Neighbor (+10% Off)</span>
        </button>
      </div>

      <!-- Neighbor Cards List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${homes.map((home, index) => {
          const homeBase = home.sqft * BUSINESS_INFO.serviceRateSqFt;
          const homeDiscounted = homeBase * 0.90;
          return `
            <div class="p-5 rounded-2xl border-2 border-slate-800 bg-slate-900/90 relative space-y-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white flex items-center gap-1.5 font-['Space_Grotesk']">
                  🏡 ${home.label}
                </span>
                ${index > 1 ? `
                  <button
                    type="button"
                    data-remove-id="${home.id}"
                    class="remove-neighbor-btn text-xs text-rose-400 hover:text-rose-300 font-bold p-1 cursor-pointer"
                    title="Remove home"
                  >✕</button>
                ` : ''}
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Driveway Size:</span>
                  <span class="font-mono text-emerald-400 font-bold">${home.sqft} sq.ft</span>
                </div>
                <input
                  type="range"
                  data-home-slider="${home.id}"
                  min="200"
                  max="1000"
                  step="20"
                  value="${home.sqft}"
                  class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div class="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span class="text-[10px] text-slate-500 line-through block">$${homeBase.toFixed(2)}</span>
                  <span class="text-xs font-bold text-emerald-400">10% Off Group Rate</span>
                </div>
                <span class="text-lg font-black text-white font-['Space_Grotesk']">
                  $${homeDiscounted.toFixed(2)}
                </span>
              </div>
              <div class="text-[10px] text-amber-300 font-bold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded text-center">
                + FREE Front Walkway Included
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Collective Group Summary Banner -->
      <div class="bg-gradient-to-r from-emerald-950 to-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
        <div class="space-y-1 text-center lg:text-left">
          <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Total Group Savings Summary</span>
          <div class="text-2xl sm:text-3xl font-black font-['Space_Grotesk']">
            ${homes.length} Homes Cleaned Same-Day
          </div>
          <p class="text-xs text-slate-300">
            Combined $${totalSavings.toFixed(2)} direct cash discount + $${freeWalkwaysSavings.toFixed(2)} in Free Front Walkway Washes!
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div class="text-center sm:text-right bg-slate-950/80 border border-slate-800 px-5 py-3 rounded-xl w-full sm:w-auto">
            <span class="text-[11px] text-slate-400 block font-semibold">Collective Group Total:</span>
            <span class="text-2xl sm:text-3xl font-black text-emerald-400 font-['Space_Grotesk']">
              $${discountedCost.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            id="book-group-btn"
            class="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Neighborhood Clean</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>

    </div>
  `;

  // Attach event listeners
  document.getElementById('add-neighbor-btn')?.addEventListener('click', () => {
    if (homes.length < 4) {
      homes.push({
        id: Date.now(),
        label: `Neighbor (House #${homes.length + 1})`,
        sqft: 480
      });
      renderNeighborhood(container, onBookGroup);
    }
  });

  container.querySelectorAll('.remove-neighbor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-remove-id'));
      homes = homes.filter(h => h.id !== id);
      renderNeighborhood(container, onBookGroup);
    });
  });

  container.querySelectorAll('[data-home-slider]').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const id = Number(slider.getAttribute('data-home-slider'));
      const home = homes.find(h => h.id === id);
      if (home) {
        home.sqft = Number(e.target.value);
        renderNeighborhood(container, onBookGroup);
      }
    });
  });

  document.getElementById('book-group-btn')?.addEventListener('click', () => {
    if (onBookGroup) {
      onBookGroup({
        drivewaySqft: totalSqft,
        ratePerSqft: BUSINESS_INFO.serviceRateSqFt,
        drivewayCost: discountedCost,
        includeFreeWalkway: true,
        walkwayValueSaved: freeWalkwaysSavings,
        selectedAddons: [],
        totalPrice: discountedCost,
        totalSavings: totalSavings + freeWalkwaysSavings,
        groupDiscountPercent: 10,
        groupDiscountAmount: totalSavings,
      });
    }
  });
}
