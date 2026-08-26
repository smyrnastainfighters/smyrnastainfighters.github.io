import { STAINS_GUIDE } from '../data/mockData.js';

let activeStainId = 'black-algae';

export function initStainGuide() {
  const container = document.getElementById('stain-guide-mount');
  if (!container) return;

  renderStainGuide(container);
}

function renderStainGuide(container) {
  const activeStain = STAINS_GUIDE.find(s => s.id === activeStainId) || STAINS_GUIDE[0];

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left selector buttons -->
      <div class="lg:col-span-4 space-y-2.5">
        <label class="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">
          Select Common Concrete Stain Type
        </label>
        ${STAINS_GUIDE.map(stain => `
          <button
            type="button"
            data-stain-id="${stain.id}"
            class="stain-btn w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              activeStain.id === stain.id
                ? 'bg-emerald-950/60 text-white border-emerald-400 shadow-md ring-1 ring-emerald-400/50 font-bold'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }"
          >
            <div>
              <div class="text-xs sm:text-sm font-bold text-white font-['Space_Grotesk']">${stain.name}</div>
              <div class="text-[11px] ${activeStain.id === stain.id ? 'text-emerald-300' : 'text-slate-400'}">${stain.category}</div>
            </div>
            <span class="text-xs font-bold px-2 py-0.5 rounded-full ${
              activeStain.id === stain.id
                ? 'bg-emerald-400 text-slate-950'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }">
              ${stain.severity}
            </span>
          </button>
        `).join('')}
      </div>

      <!-- Right detailed comparison card -->
      <div class="lg:col-span-8 bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">${activeStain.category}</span>
            <h3 class="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] mt-0.5">
              ${activeStain.name}
            </h3>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
            ✓ ${activeStain.expectedResult}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span class="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">Visual Appearance:</span>
            <p class="text-slate-300 leading-relaxed">${activeStain.appearance}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span class="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">Root Cause in Georgia:</span>
            <p class="text-slate-300 leading-relaxed">${activeStain.cause}</p>
          </div>
        </div>

        <!-- Comparative treatment breakdown -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div class="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-2">
            <div class="flex items-center gap-2 text-rose-300 font-bold text-xs">
              <span>⚠️</span>
              <span>Conventional Contractor Method</span>
            </div>
            <p class="text-xs text-rose-200/90 leading-relaxed">${activeStain.standardRisk}</p>
          </div>

          <div class="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-600/60 space-y-2">
            <div class="flex items-center gap-2 text-emerald-300 font-bold text-xs">
              <span>🌱</span>
              <span>Smyrna Stain Fighters 100% Eco Citrus Method</span>
            </div>
            <p class="text-xs text-emerald-100 leading-relaxed font-medium">${activeStain.ourEcoSolution}</p>
          </div>

        </div>

      </div>

    </div>
  `;

  // Attach listener
  container.querySelectorAll('.stain-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeStainId = btn.getAttribute('data-stain-id');
      renderStainGuide(container);
    });
  });
}
