import React from 'react';

interface CTASectionProps {
  onRequestDemo: () => void;
  onExplore: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onRequestDemo, onExplore }) => {
  return (
    <section className="py-28 px-6 relative overflow-hidden" id="cta">
      <div className="max-w-5xl mx-auto bg-brandBlack border-4 border-brandBlack p-8 sm:p-14 shadow-brutal-xl text-center space-y-8 text-white relative">
        {/* Racing Accents inside CTA */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-volt" />

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-brandBlack border-2 border-white text-xs font-black uppercase tracking-wider font-headline">
            GET STARTED NOW
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-headline leading-none">
            Ready to unify your campus?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto pt-2">
            CampusFlow brings every department, system, and workflow into one intelligent platform.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            id="cta-request-demo-btn"
            onClick={onRequestDemo}
            className="btn-brutal w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-black uppercase tracking-wider text-brandBlack bg-volt hover:bg-white font-headline cursor-pointer"
          >
            Request a Demo
          </button>

          <button
            type="button"
            id="cta-explore-btn"
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-volt transition-colors py-3 px-6 border-2 border-white/40 hover:border-white font-headline cursor-pointer"
          >
            <span>Explore the platform</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
