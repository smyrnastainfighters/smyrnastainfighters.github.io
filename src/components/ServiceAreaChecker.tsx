import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, Clock, Mail, ShieldCheck } from 'lucide-react';
import { ZIP_AREAS, BUSINESS_INFO } from '../data/mockData';

interface ServiceAreaCheckerProps {
  onOpenBooking: () => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZip, setSelectedZip] = useState<string>('30080');

  const filteredAreas = ZIP_AREAS.filter((area) =>
    area.zip.includes(searchQuery) ||
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.primaryArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const matchedArea = ZIP_AREAS.find((a) => a.zip === selectedZip) || ZIP_AREAS[0];

  return (
    <section id="service-area-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Service Territory Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Smyrna & Vinings Service Area Checker
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            We are locally based in Smyrna, GA and provide rapid email turnaround and flexible weekend & afternoon time slots across all Cobb County neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Zip Code Search & List (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Zip Code (e.g. 30080, 30082) or Neighborhood name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-slate-50"
              />
            </div>

            {/* Zip Cards */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredAreas.length > 0 ? (
                filteredAreas.map((area) => {
                  const isSelected = area.zip === selectedZip;
                  return (
                    <button
                      key={area.zip}
                      type="button"
                      onClick={() => setSelectedZip(area.zip)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 text-base">
                            {area.zip}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            area.status === 'Available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {area.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                          {area.name}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-emerald-700 block">Active Route</span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs">No direct match for "{searchQuery}". We often service neighboring Smyrna/Cobb borders upon request!</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-emerald-700 font-bold mt-2 hover:underline cursor-pointer"
                  >
                    View All Active Zip Codes
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Coverage Status Details Card (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-white font-['Space_Grotesk'] text-lg">
                  Coverage Confirmation: {matchedArea.zip}
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                Guaranteed Service Area
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Primary Sector</span>
                <p className="text-lg font-bold text-white font-['Space_Grotesk']">{matchedArea.name}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Response Window</span>
                  </div>
                  <p className="text-xs font-bold text-white">{matchedArea.responseTime}</p>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Free Walkway Eligibility</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-400">100% Free with Driveway</p>
                </div>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <p className="font-bold text-white">Smyrna Local Convenience:</p>
                <p className="leading-relaxed">
                  We live and operate right here in Smyrna. That means no long-distance contractor fuel surcharges, fast email dispatch, and respectful care for our neighbors' lawns and driveways.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Check Availability & Book in {matchedArea.zip}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
