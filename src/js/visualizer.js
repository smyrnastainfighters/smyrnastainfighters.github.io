import { BUSINESS_INFO } from '../data/mockData.js';

const DRIVEWAY_SHAPES = [
  { id: 'straight', name: 'Straight Standard', defaultWidth: 20, defaultLength: 24, desc: 'Single or 2-car straight driveway pad' },
  { id: 'lshape', name: 'L-Shape / Turnaround', defaultWidth: 24, defaultLength: 32, desc: 'Driveway with a side parking or turn cutout' },
  { id: 'threecar', name: '3-Car Wide Apron', defaultWidth: 28, defaultLength: 34, desc: 'Expansive 3-bay suburban garage layout' },
  { id: 'circular', name: 'Courtyard / Horseshoe', defaultWidth: 32, defaultLength: 40, desc: 'Large loop or broad courtyard apron' },
];

let selectedShape = 'straight';
let visualizerWidth = 20;
let visualizerLength = 24;

export function initVisualizer({ onBookQuote }) {
  const container = document.getElementById('visualizer-mount');
  if (!container) return;

  renderVisualizer(container, onBookQuote);
}

function renderVisualizer(container, onBookQuote) {
  let sqft = visualizerWidth * visualizerLength;
  if (selectedShape === 'lshape') sqft = Math.round(sqft * 0.85);
  if (selectedShape === 'circular') sqft = Math.round(sqft * 0.9);

  const cost = Math.round(sqft * BUSINESS_INFO.serviceRateSqFt * 100) / 100;
  const estimatedHours = (sqft / 350).toFixed(1);
  const vehicleCount = Math.max(1, Math.round(sqft / 220));

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- Controls Column -->
      <div class="lg:col-span-5 space-y-6">
        <div>
          <label class="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-2">
            1. Select Driveway Shape Profile
          </label>
          <div class="grid grid-cols-2 gap-2.5">
            ${DRIVEWAY_SHAPES.map(shape => `
              <button
                type="button"
                data-shape="${shape.id}"
                class="shape-btn p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedShape === shape.id
                    ? 'border-emerald-400 bg-emerald-950/50 text-white ring-1 ring-emerald-400/50 shadow-md font-bold'
                    : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }"
              >
                <div class="text-xs font-bold text-white">${shape.name}</div>
                <div class="text-[10px] text-slate-400 leading-tight mt-0.5">${shape.desc}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Slider Controls -->
        <div class="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <div>
            <div class="flex justify-between items-center text-xs font-bold mb-1.5">
              <span class="text-slate-300">Driveway Width (feet)</span>
              <span class="text-emerald-400 font-mono text-sm">${visualizerWidth} ft</span>
            </div>
            <input
              type="range"
              id="vis-width-slider"
              min="10"
              max="40"
              step="1"
              value="${visualizerWidth}"
              class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          <div>
            <div class="flex justify-between items-center text-xs font-bold mb-1.5">
              <span class="text-slate-300">Driveway Length (feet)</span>
              <span class="text-emerald-400 font-mono text-sm">${visualizerLength} ft</span>
            </div>
            <input
              type="range"
              id="vis-length-slider"
              min="16"
              max="60"
              step="1"
              value="${visualizerLength}"
              class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>

        <!-- Metric badges -->
        <div class="grid grid-cols-3 gap-2.5 text-center">
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Area</span>
            <span class="text-base font-extrabold text-white font-['Space_Grotesk']">${sqft} sq.ft</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Est. Clean Time</span>
            <span class="text-base font-extrabold text-emerald-400 font-['Space_Grotesk']">~${estimatedHours} hrs</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Vehicle Capacity</span>
            <span class="text-base font-extrabold text-white font-['Space_Grotesk']">~${vehicleCount} Cars</span>
          </div>
        </div>

        <button
          type="button"
          id="vis-book-btn"
          class="w-full py-3.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <span>Book This Driveway Size ($${cost.toFixed(2)})</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>

      </div>

      <!-- SVG CAD Canvas Render Column -->
      <div class="lg:col-span-7 bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden">
        
        <!-- Architectural grid lines overlay -->
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div class="relative z-10 w-full flex flex-col items-center justify-center">
          
          <!-- Garage House Silhouette Representation -->
          <div class="w-48 sm:w-64 h-10 bg-slate-900 rounded-t-lg border-t-2 border-x-2 border-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-300 font-mono">
            🏠 2-3 Bay Home Garage
          </div>

          <!-- Dynamic Driveway SVG Model -->
          <div class="w-full max-w-sm flex items-center justify-center my-3">
            <svg viewBox="0 0 300 240" class="w-full max-h-56 drop-shadow-[0_0_25px_rgba(16,185,129,0.2)]">
              <!-- Concrete Driveway Polygon -->
              ${getDrivewaySvgShape(selectedShape)}

              <!-- Walkway connection line -->
              <path d="M 190 60 L 250 60 L 250 140" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" fill="none" stroke-dasharray="4 2" />
              
              <!-- Walkway badge label -->
              <rect x="175" y="40" width="115" height="18" rx="4" fill="#78350f" />
              <text x="232" y="52" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">FREE Walkway Included</text>

              <!-- Dimension Annotations -->
              <text x="150" y="210" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">${visualizerWidth} FT WIDE</text>
              <text x="50" y="110" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace" transform="rotate(-90 50 110)">${visualizerLength} FT LONG</text>
            </svg>
          </div>

          <!-- Live CAD Spec Overlay -->
          <div class="bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2 text-center text-xs flex items-center gap-4 text-slate-300">
            <div>
              <span class="text-slate-500 text-[10px] block font-bold">TOTAL AREA</span>
              <span class="text-emerald-400 font-mono font-bold">${sqft} SQ.FT</span>
            </div>
            <div class="h-6 w-px bg-slate-700"></div>
            <div>
              <span class="text-slate-500 text-[10px] block font-bold">FLAT RATE</span>
              <span class="text-white font-mono font-bold">$0.45/SQ.FT</span>
            </div>
            <div class="h-6 w-px bg-slate-700"></div>
            <div>
              <span class="text-slate-500 text-[10px] block font-bold">TOTAL COST</span>
              <span class="text-emerald-400 font-mono font-bold">$${cost.toFixed(2)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  // Attach Event Listeners
  attachVisualizerEvents(container, onBookQuote);
}

function getDrivewaySvgShape(shape) {
  switch (shape) {
    case 'lshape':
      return `
        <defs>
          <linearGradient id="concreteGradL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <polygon points="100,20 200,20 200,100 240,100 240,190 100,190" fill="url(#concreteGradL)" stroke="#10b981" stroke-width="2" stroke-linejoin="round" />
      `;
    case 'threecar':
      return `
        <defs>
          <linearGradient id="concreteGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <polygon points="70,20 230,20 250,190 50,190" fill="url(#concreteGrad3)" stroke="#10b981" stroke-width="2" stroke-linejoin="round" />
      `;
    case 'circular':
      return `
        <defs>
          <linearGradient id="concreteGradC" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <path d="M 60 190 C 60 40, 240 40, 240 190 L 195 190 C 195 90, 105 90, 105 190 Z" fill="url(#concreteGradC)" stroke="#10b981" stroke-width="2" stroke-linejoin="round" />
      `;
    case 'straight':
    default:
      return `
        <defs>
          <linearGradient id="concreteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <polygon points="90,20 210,20 220,190 80,190" fill="url(#concreteGrad)" stroke="#10b981" stroke-width="2" stroke-linejoin="round" />
      `;
  }
}

function attachVisualizerEvents(container, onBookQuote) {
  // Shape buttons
  container.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = btn.getAttribute('data-shape');
      if (s) {
        selectedShape = s;
        const config = DRIVEWAY_SHAPES.find(item => item.id === s);
        if (config) {
          visualizerWidth = config.defaultWidth;
          visualizerLength = config.defaultLength;
        }
        renderVisualizer(container, onBookQuote);
      }
    });
  });

  // Width & Length Sliders
  const wSlider = container.querySelector('#vis-width-slider');
  const lSlider = container.querySelector('#vis-length-slider');

  wSlider?.addEventListener('input', (e) => {
    visualizerWidth = parseInt(e.target.value, 10);
    renderVisualizer(container, onBookQuote);
  });

  lSlider?.addEventListener('input', (e) => {
    visualizerLength = parseInt(e.target.value, 10);
    renderVisualizer(container, onBookQuote);
  });

  // Booking button
  container.querySelector('#vis-book-btn')?.addEventListener('click', () => {
    let sqft = visualizerWidth * visualizerLength;
    if (selectedShape === 'lshape') sqft = Math.round(sqft * 0.85);
    if (selectedShape === 'circular') sqft = Math.round(sqft * 0.9);

    const cost = Math.round(sqft * BUSINESS_INFO.serviceRateSqFt * 100) / 100;

    if (onBookQuote) {
      onBookQuote({
        drivewaySqft: sqft,
        ratePerSqft: BUSINESS_INFO.serviceRateSqFt,
        drivewayCost: cost,
        includeFreeWalkway: true,
        walkwayValueSaved: BUSINESS_INFO.walkwayValue,
        selectedAddons: [],
        totalPrice: cost,
        totalSavings: BUSINESS_INFO.walkwayValue,
      });
    }
  });
}
