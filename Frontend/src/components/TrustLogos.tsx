import React, { useState } from 'react';
import { INSTITUTIONS } from '../data/mockData';

export const TrustLogos: React.FC = () => {
  const [selectedInst, setSelectedInst] = useState<string | null>(null);

  return (
    <section className="py-8 border-y-3 border-brandBlack bg-surface-container">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="h-0.5 w-12 bg-brandBlack" />
          <span className="text-xs font-black tracking-widest text-brandBlack uppercase font-headline">
            Trusted By Leading Institutions
          </span>
          <div className="h-0.5 w-12 bg-brandBlack" />
        </div>

        {/* Academic Emblems & Names in stark monochrome cards */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
          {INSTITUTIONS.map((inst) => (
            <button
              key={inst.name}
              type="button"
              onClick={() => setSelectedInst(selectedInst === inst.name ? null : inst.name)}
              className={`px-5 py-2.5 border-2 border-brandBlack font-black text-xs sm:text-sm tracking-wider uppercase font-headline text-brandBlack flex items-center gap-2 cursor-pointer transition-all duration-150 ${
                selectedInst === inst.name
                  ? 'bg-brandBlack text-white shadow-brutal translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white hover:bg-volt hover:-translate-y-0.5 hover:shadow-brutal shadow-brutal-sm active:translate-y-0.5 active:shadow-none'
              }`}
              title={`${inst.name} - ${inst.type} (${inst.location})`}
            >
              <span
                className="w-2.5 h-2.5 shrink-0 border border-brandBlack"
                style={{ backgroundColor: selectedInst === inst.name ? '#d4ff00' : inst.color }}
              />
              <span>{inst.name}</span>
            </button>
          ))}
        </div>

        {selectedInst && (
          <div className="text-center text-xs font-bold text-slate-700 bg-white max-w-md mx-auto p-2 border border-brandBlack shadow-brutal-sm">
            {INSTITUTIONS.find((i) => i.name === selectedInst)?.name} operates CampusFlow across{' '}
            {INSTITUTIONS.find((i) => i.name === selectedInst)?.type} departments in{' '}
            {INSTITUTIONS.find((i) => i.name === selectedInst)?.location}.
          </div>
        )}
      </div>
    </section>
  );
};
