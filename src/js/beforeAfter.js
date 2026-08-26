// Interactive Before & After Driveway Transformation Slider
export function initBeforeAfter() {
  const container = document.getElementById('hero-before-after-container');
  const slider = document.getElementById('before-after-slider');
  const afterLayer = document.getElementById('after-layer');
  const handle = document.getElementById('slider-handle');

  if (!container || !slider || !afterLayer || !handle) return;

  let isDragging = false;

  const updatePosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percentage = (x / rect.width) * 100;

    slider.value = percentage;
    afterLayer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    handle.style.left = `${percentage}%`;
  };

  slider.addEventListener('input', (e) => {
    const val = e.target.value;
    afterLayer.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
    handle.style.left = `${val}%`;
  });

  const onStart = (e) => {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const onEnd = () => {
    isDragging = false;
  };

  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  container.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onEnd);

  // Preset Stain Mode Switchers
  const stainButtons = document.querySelectorAll('.stain-preset-btn');
  const stainDescription = document.getElementById('stain-preset-desc');
  const beforeConcrete = document.getElementById('before-concrete-art');

  const stainThemes = {
    mildew: {
      desc: "5 Years of Georgia Black Mold, Mildew & Tree Tannins",
      bgClass: "from-stone-900 via-emerald-950/80 to-slate-900",
      accent: "bg-emerald-950/60"
    },
    clay: {
      desc: "Cobb County Runoff: Deep Georgia Red Clay Oxide Intrusion",
      bgClass: "from-amber-950 via-orange-950/90 to-stone-900",
      accent: "bg-orange-900/60"
    },
    oil: {
      desc: "Driveway Parking Bay: Motor Oil, Brake Dust & Dark Tire Tracks",
      bgClass: "from-slate-950 via-zinc-900 to-neutral-900",
      accent: "bg-slate-950/80"
    }
  };

  stainButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-stain-type');
      stainButtons.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-800/80', 'text-slate-300');
      });
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');
      btn.classList.add('bg-emerald-500', 'text-slate-950', 'font-bold');

      if (stainThemes[type] && stainDescription && beforeConcrete) {
        stainDescription.textContent = stainThemes[type].desc;
        beforeConcrete.className = `absolute inset-0 bg-gradient-to-tr ${stainThemes[type].bgClass} opacity-95 flex items-center justify-center transition-all duration-300`;
      }
    });
  });
}
