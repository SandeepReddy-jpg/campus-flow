import React from 'react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-surface-container border-t-3 border-brandBlack">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black tracking-widest text-brandBlack uppercase font-headline bg-white px-3 py-1 border-2 border-brandBlack shadow-brutal-sm inline-block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-brandBlack tracking-tight font-headline">
            Trusted by modern institutions.
          </h2>
          <p className="text-slate-700 font-medium text-sm sm:text-base max-w-xl mx-auto">
            See how CampusFlow helps campuses streamline opportunities and empower students.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.author}
              className="card-brutal p-8 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <span className="text-5xl font-black text-brandBlack leading-none block select-none">
                  “
                </span>
                <p className="text-sm font-medium text-brandBlack leading-relaxed">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t-2 border-brandBlack">
                <div
                  className={`w-11 h-11 ${t.colorClass} border-2 border-brandBlack flex items-center justify-center font-black text-brandBlack text-sm shrink-0 shadow-brutal-sm`}
                >
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-brandBlack font-headline">
                    {t.author}
                  </h4>
                  <p className="text-xs font-bold text-slate-600">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
