import { ZIP_AREAS } from '../data/mockData.js';

let searchQuery = '';

export function initServiceArea({ onBookArea }) {
  const container = document.getElementById('service-area-mount');
  if (!container) return;

  renderServiceArea(container, onBookArea);
}

function renderServiceArea(container, onBookArea) {
  const filtered = ZIP_AREAS.filter(area => 
    area.zip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.primaryArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  container.innerHTML = `
    <div class="bg-slate-950/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
      
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
            Smyrna & Vinings Core Service Territory
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">
            Check your local Cobb County zip code for service availability & priority dispatch.
          </p>
        </div>

        <!-- Search Input -->
        <div class="w-full sm:w-72">
          <input
            type="text"
            id="zip-search-input"
            value="${searchQuery}"
            placeholder="Search zip (e.g. 30080) or neighborhood..."
            class="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          />
        </div>
      </div>

      <!-- Zip Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${filtered.length > 0 ? filtered.map(area => `
          <div class="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 hover:bg-slate-900 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3 shadow-md">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-black text-emerald-400 font-mono tracking-tight">${area.zip}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  ${area.status}
                </span>
              </div>
              <h4 class="text-xs sm:text-sm font-bold text-white mt-1 font-['Space_Grotesk']">${area.name}</h4>
              <p class="text-[11px] text-slate-400 mt-0.5">${area.primaryArea}</p>
            </div>

            <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span class="text-[11px] font-semibold text-emerald-300">⚡ ${area.responseTime}</span>
              <button
                type="button"
                data-zip="${area.zip}"
                class="zip-book-btn text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                Book Zip
              </button>
            </div>
          </div>
        `).join('') : `
          <div class="col-span-full py-8 text-center text-slate-400 text-xs">
            <p>No zip code matches "<strong>${searchQuery}</strong>".</p>
            <p class="mt-1">We service all of Smyrna & Vinings! Email us directly to confirm your location.</p>
          </div>
        `}
      </div>

    </div>
  `;

  // Attach search listener
  const input = document.getElementById('zip-search-input');
  if (input) {
    input.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderServiceArea(container, onBookArea);
    });
  }

  container.querySelectorAll('.zip-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (onBookArea) {
        onBookArea();
      }
    });
  });
}
