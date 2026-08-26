import { PREPARATION_CHECKLIST } from '../data/mockData.js';

let completedItems = new Set();

export function initChecklist() {
  const container = document.getElementById('checklist-mount');
  if (!container) return;

  renderChecklist(container);
}

function renderChecklist(container) {
  const totalCount = PREPARATION_CHECKLIST.length;
  const doneCount = completedItems.size;
  const percent = Math.round((doneCount / totalCount) * 100);

  container.innerHTML = `
    <div class="bg-slate-950/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
      
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Day-Of-Service Ready</span>
          <h3 class="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] mt-0.5">
            Pre-Service Homeowner Checklist
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">
            Follow these 5 simple steps on cleaning day so our youth team can begin washing immediately without delay.
          </p>
        </div>

        <!-- Progress Tracker & Actions -->
        <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div class="text-right">
            <span class="text-xs font-bold text-slate-300 font-mono">${doneCount} of ${totalCount} Done (${percent}%)</span>
            <div class="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div class="h-full bg-emerald-400 transition-all duration-300" style="width: ${percent}%"></div>
            </div>
          </div>

          <button
            type="button"
            id="checklist-print-btn"
            class="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            title="Print checklist"
          >
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span class="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-3">
        ${PREPARATION_CHECKLIST.map(item => {
          const isChecked = completedItems.has(item.id);
          return `
            <div
              data-item-id="${item.id}"
              class="checklist-card p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                isChecked
                  ? 'bg-emerald-950/40 border-emerald-500/70'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }"
            >
              <div class="w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center shrink-0 ${
                isChecked ? 'bg-emerald-400 text-slate-950 font-bold' : 'border-2 border-slate-700 bg-slate-900'
              }">
                ${isChecked ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M5 13l4 4L19 7"></path></svg>` : ''}
              </div>

              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h4 class="text-xs sm:text-sm font-bold font-['Space_Grotesk'] ${isChecked ? 'text-emerald-300 line-through text-slate-400' : 'text-white'}">
                    ${item.title}
                  </h4>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.category === 'Essential' ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }">
                    ${item.category}
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">${item.description}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.checklist-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-item-id');
      if (completedItems.has(id)) {
        completedItems.delete(id);
      } else {
        completedItems.add(id);
      }
      renderChecklist(container);
    });
  });

  document.getElementById('checklist-print-btn')?.addEventListener('click', () => {
    window.print();
  });
}
