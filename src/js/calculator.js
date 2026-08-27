import { DRIVEWAY_PRESETS, SERVICE_ADDONS, BUSINESS_INFO } from '../data/mockData.js';

let selectedPresetId = '2-car-standard';
let isCustomMode = false;
let customWidth = 20;
let customLength = 24;
let selectedAddonIds = new Set();

let onQuoteChangedCallback = null;

export function initCalculator({ onBookQuote, onPrintQuote }) {
  const container = document.getElementById('calculator-mount');
  if (!container) return;

  renderCalculator(container, onBookQuote, onPrintQuote);
}

export function getCurrentCalculation() {
  const sqft = isCustomMode
    ? customWidth * customLength
    : (DRIVEWAY_PRESETS.find(p => p.id === selectedPresetId)?.sqft || 480);

  const rate = BUSINESS_INFO.serviceRateSqFt;
  const drivewayCost = Math.round(sqft * rate * 100) / 100;
  const selectedAddonsList = SERVICE_ADDONS.filter(a => selectedAddonIds.has(a.id));
  const addonsTotal = selectedAddonsList.reduce((acc, curr) => acc + curr.price, 0);
  const walkwaySaved = BUSINESS_INFO.walkwayValue;
  const totalPrice = Math.round((drivewayCost + addonsTotal) * 100) / 100;

  return {
    drivewaySqft: sqft,
    ratePerSqft: rate,
    drivewayCost: drivewayCost,
    includeFreeWalkway: true,
    walkwayValueSaved: walkwaySaved,
    selectedAddons: selectedAddonsList,
    totalPrice: totalPrice,
    totalSavings: walkwaySaved,
    presetId: isCustomMode ? undefined : selectedPresetId,
  };
}

function renderCalculator(container, onBookQuote, onPrintQuote) {
  const calc = getCurrentCalculation();

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Preset & Size Controls -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Mode Switcher: Standard Presets vs Custom Slider -->
        <div class="bg-slate-950 p-1.5 rounded-xl flex items-center gap-1 border border-slate-800">
          <button
            type="button"
            id="calc-mode-preset"
            class="flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${!isCustomMode ? 'bg-emerald-400 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-white'}"
          >
            Popular Driveway Presets
          </button>
          <button
            type="button"
            id="calc-mode-custom"
            class="flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${isCustomMode ? 'bg-emerald-400 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-white'}"
          >
            Custom Length × Width Slider
          </button>
        </div>

        ${!isCustomMode ? `
          <!-- Presets Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="presets-grid">
            ${DRIVEWAY_PRESETS.map(preset => {
              const isSelected = preset.id === selectedPresetId;
              return `
                <div
                  data-preset-id="${preset.id}"
                  class="preset-card relative p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/50'
                      : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-900/90'
                  }"
                >
                  ${preset.popular ? `
                    <span class="absolute -top-2.5 right-4 bg-emerald-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
                      Most Common
                    </span>
                  ` : ''}

                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <h4 class="font-bold text-white text-sm font-['Space_Grotesk']">
                        ${preset.name}
                      </h4>
                      <div class="w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-400 text-slate-950 font-bold' : 'border border-slate-700'}">
                        ${isSelected ? `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M5 13l4 4L19 7"></path></svg>` : ''}
                      </div>
                    </div>
                    <p class="text-xs text-slate-400 leading-snug">${preset.description}</p>
                    <div class="text-[11px] font-mono text-emerald-300 bg-slate-900 inline-block px-2 py-0.5 rounded border border-slate-800 font-semibold mt-1">
                      ${preset.sqft} sq.ft (${preset.dimensions})
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between">
                    <span class="text-xs text-slate-400">Base Clean Rate:</span>
                    <span class="text-lg font-black text-emerald-400 font-['Space_Grotesk']">
                      $${preset.baseCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <!-- Custom Slider Controls -->
          <div class="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-6">
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-xs font-bold uppercase text-slate-300">Driveway Width</label>
                <span class="text-sm font-extrabold text-emerald-400 font-mono" id="custom-width-label">${customWidth} ft</span>
              </div>
              <input
                type="range"
                id="custom-width-slider"
                min="10"
                max="40"
                step="1"
                value="${customWidth}"
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div class="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>10 ft (1 Car)</span>
                <span>20 ft (2 Car)</span>
                <span>40 ft (3+ Car)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-xs font-bold uppercase text-slate-300">Driveway Length</label>
                <span class="text-sm font-extrabold text-emerald-400 font-mono" id="custom-length-label">${customLength} ft</span>
              </div>
              <input
                type="range"
                id="custom-length-slider"
                min="15"
                max="60"
                step="1"
                value="${customLength}"
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div class="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>15 ft (Short)</span>
                <span>30 ft (Standard)</span>
                <span>60 ft (Estate)</span>
              </div>
            </div>

            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-400 font-semibold block">Calculated Total Area:</span>
                <span class="text-xl font-extrabold text-emerald-400 font-['Space_Grotesk']">${calc.drivewaySqft} sq. ft.</span>
              </div>
              <span class="text-xs font-mono font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                ${calc.drivewaySqft} × $0.45 = $${calc.drivewayCost.toFixed(2)}
              </span>
            </div>
          </div>
        `}

        <!-- Optional Add-On Services -->
        <div class="space-y-3 pt-2">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Optional Targeted Add-On Services
          </label>
          <div class="space-y-2.5">
            ${SERVICE_ADDONS.map(addon => {
              const isChecked = selectedAddonIds.has(addon.id);
              return `
                <div
                  data-addon-id="${addon.id}"
                  class="addon-item p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }"
                >
                  <div class="flex items-start gap-3 flex-1 pr-3">
                    <div class="w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 ${isChecked ? 'bg-emerald-400 text-slate-950 font-bold' : 'border border-slate-700'}">
                      ${isChecked ? `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M5 13l4 4L19 7"></path></svg>` : ''}
                    </div>
                    <div>
                      <h5 class="text-xs sm:text-sm font-bold text-white font-['Space_Grotesk']">${addon.name}</h5>
                      <p class="text-[11px] text-slate-400 leading-snug mt-0.5">${addon.description}</p>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-xs sm:text-sm font-extrabold text-emerald-400 font-['Space_Grotesk']">+$${addon.price.toFixed(2)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <!-- Right Column: Interactive Real-Time Summary Quote Ticket -->
      <div class="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 sticky top-24">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Transparent Pricing Engine</span>
            <h3 class="text-lg font-bold text-white font-['Space_Grotesk']">Your Instant Estimate</h3>
          </div>
          <span class="text-xs font-mono text-emerald-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
            $0.45 / sq. ft.
          </span>
        </div>

        <!-- Line itemization -->
        <div class="space-y-3 text-xs">
          <div class="flex justify-between items-center text-slate-300">
            <span>Driveway Area (${calc.drivewaySqft} sq.ft):</span>
            <span class="font-mono text-white font-semibold">$${calc.drivewayCost.toFixed(2)}</span>
          </div>

          <!-- Highlight Free Walkway -->
          <div class="flex justify-between items-center p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
            <span class="flex items-center gap-1.5 font-bold">
              <svg class="w-3.5 h-3.5 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              FREE Front Walkway Clean:
            </span>
            <div class="text-right font-mono">
              <span class="text-slate-500 line-through text-[11px] mr-1.5">$55.00</span>
              <span class="font-bold text-amber-300">$0.00</span>
            </div>
          </div>

          <!-- Addons items -->
          ${calc.selectedAddons.map(addon => `
            <div class="flex justify-between items-center text-slate-300">
              <span class="truncate pr-2">${addon.name}:</span>
              <span class="font-mono text-emerald-400 font-semibold shrink-0">+$${addon.price.toFixed(2)}</span>
            </div>
          `).join('')}
        </div>

        <!-- Total Price Box -->
        <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-2">
          <div class="flex justify-between items-baseline">
            <div>
              <span class="text-xs text-slate-400 block font-medium">Estimated Total Price:</span>
              <span class="text-3xl sm:text-4xl font-black text-emerald-400 font-['Space_Grotesk']">
                $${calc.totalPrice.toFixed(2)}
              </span>
            </div>
            <div class="text-right">
              <span class="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold px-2 py-0.5 rounded">
                Saved $${calc.totalSavings.toFixed(2)}
              </span>
            </div>
          </div>
          <p class="text-[11px] text-slate-400 pt-1">
            * Pay only after job is complete and inspected. $0 upfront deposit.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2.5 pt-2">
          <button
            type="button"
            id="calc-book-btn"
            class="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span>Book This Exact Setup</span>
          </button>

          <button
            type="button"
            id="calc-print-btn"
            class="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span>Print Itemized Estimate Sheet</span>
          </button>
        </div>

        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          <span>🛡️ 100% Plant & Lawn Safe</span>
          <span>•</span>
          <span>⚡ No Hidden Fees</span>
        </div>

      </div>
    </div>
  `;

  // Attach Event Listeners
  attachCalculatorEvents(container, onBookQuote, onPrintQuote);
}

function attachCalculatorEvents(container, onBookQuote, onPrintQuote) {
  // Mode Switchers
  const modePresetBtn = container.querySelector('#calc-mode-preset');
  const modeCustomBtn = container.querySelector('#calc-mode-custom');

  modePresetBtn?.addEventListener('click', () => {
    isCustomMode = false;
    renderCalculator(container, onBookQuote, onPrintQuote);
  });

  modeCustomBtn?.addEventListener('click', () => {
    isCustomMode = true;
    renderCalculator(container, onBookQuote, onPrintQuote);
  });

  // Preset Selection
  container.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-preset-id');
      if (pid) {
        selectedPresetId = pid;
        renderCalculator(container, onBookQuote, onPrintQuote);
      }
    });
  });

  // Slider Listeners
  const widthSlider = container.querySelector('#custom-width-slider');
  const lengthSlider = container.querySelector('#custom-length-slider');

  widthSlider?.addEventListener('input', (e) => {
    customWidth = parseInt(e.target.value, 10);
    renderCalculator(container, onBookQuote, onPrintQuote);
  });

  lengthSlider?.addEventListener('input', (e) => {
    customLength = parseInt(e.target.value, 10);
    renderCalculator(container, onBookQuote, onPrintQuote);
  });

  // Addon Toggles
  container.querySelectorAll('.addon-item').forEach(item => {
    item.addEventListener('click', () => {
      const aid = item.getAttribute('data-addon-id');
      if (aid) {
        if (selectedAddonIds.has(aid)) {
          selectedAddonIds.delete(aid);
        } else {
          selectedAddonIds.add(aid);
        }
        renderCalculator(container, onBookQuote, onPrintQuote);
      }
    });
  });

  // Action Buttons
  container.querySelector('#calc-book-btn')?.addEventListener('click', () => {
    if (onBookQuote) onBookQuote(getCurrentCalculation());
  });

  container.querySelector('#calc-print-btn')?.addEventListener('click', () => {
    if (onPrintQuote) onPrintQuote(getCurrentCalculation());
  });
}
