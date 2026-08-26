import React, { useState } from 'react';
import { ClipboardCheck, CheckSquare, Square, Printer, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import { PREPARATION_CHECKLIST, BUSINESS_INFO } from '../data/mockData';

export const PreparationChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(['prep-water']);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const resetAll = () => {
    setCheckedIds([]);
  };

  const checkAll = () => {
    setCheckedIds(PREPARATION_CHECKLIST.map((item) => item.id));
  };

  const progressPercent = Math.round((checkedIds.length / PREPARATION_CHECKLIST.length) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="checklist-section" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Homeowner Day-of-Service Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Pre-Service Preparation Checklist
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Follow this quick 5-point checklist before your cleaning appointment to ensure a seamless, streak-free wash and 100% protected landscaping.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
          
          {/* Progress Bar & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Readiness Progress: {progressPercent}%
                </span>
                {progressPercent === 100 && (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready for Wash!
                  </span>
                )}
              </div>
              <div className="w-48 sm:w-64 bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={checkAll}
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold cursor-pointer"
              >
                Mark All
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-slate-200 cursor-pointer"
                title="Reset checklist"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print Checklist
              </button>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {PREPARATION_CHECKLIST.map((item, index) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer select-none ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-600/80 text-white'
                      : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-emerald-400 focus:outline-none shrink-0"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold font-['Space_Grotesk'] ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Note */}
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 flex items-center justify-between gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              We supply all professional pressure washing hoses, rotary scrubbers, and eco detergents.
            </span>
            <span className="font-bold text-emerald-400 font-['Space_Grotesk'] shrink-0">
              Zero Upfront Deposit
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
