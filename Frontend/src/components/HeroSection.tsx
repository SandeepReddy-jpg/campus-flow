import React from 'react';
import { ArrowUpDown, Shield, BarChart3 } from 'lucide-react';
import { InteractivePortal } from './InteractivePortal';
import { RoleType } from '../types';

interface HeroSectionProps {
  onRequestDemo: () => void;
  onExplore: () => void;
  activeRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  onOpenQuickLink: (title: string) => void;
  onFeedback?: (msg: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestDemo,
  onExplore,
  activeRole,
  onRoleChange,
  onOpenQuickLink,
  onFeedback,
}) => {
  return (
    <section className="pt-12 pb-20 lg:pt-20 lg:pb-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Hero Left Text Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-brandBlack shadow-brutal-sm text-xs font-bold uppercase tracking-wider font-headline">
            <span className="w-2.5 h-2.5 bg-[#e63b2e] rounded-none" />
            <span>The Academic Operating System</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase text-brandBlack leading-[1.05] tracking-tight font-headline">
              One Campus.
              <br />
              Every Workflow.
              <br />
              <span className="inline-block bg-primary-container px-3 py-1 border-3 border-brandBlack shadow-brutal mt-1">
                Perfectly Connected.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-medium max-w-xl leading-relaxed pt-2">
              CampusFlow unifies every academic and administrative workflow across one intelligent
              platform—so nothing slips through the cracks.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              id="hero-request-demo-btn"
              onClick={onRequestDemo}
              className="btn-brutal inline-flex items-center gap-3 px-7 py-3.5 text-base font-bold uppercase tracking-wider text-white bg-brandBlack hover:bg-brandBlack hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 cursor-pointer font-headline transition-all"
            >
              <span>Request a Demo</span>
              <span className="w-6 h-6 rounded bg-volt text-brandBlack flex items-center justify-center font-black">
                →
              </span>
            </button>

            <button
              type="button"
              id="hero-explore-btn"
              onClick={onExplore}
              className="btn-brutal inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-brandBlack bg-white hover:bg-primary-container hover:-translate-y-0.5 hover:shadow-brutal font-headline cursor-pointer transition-all"
            >
              <span>Explore the platform</span>
              <span>↓</span>
            </button>
          </div>

          {/* Feature Bullet List */}
          <div className="pt-4 space-y-3 max-w-lg">
            {/* Bullet 1 */}
            <div
              onClick={() => {
                onRoleChange('STUDENT');
                onFeedback?.('Active portal switched to Student Workspace');
              }}
              className={`flex items-start gap-3.5 p-3.5 border-3 border-brandBlack transition-all group cursor-pointer ${
                activeRole === 'STUDENT'
                  ? 'bg-[#fff9e6] shadow-brutal translate-x-1'
                  : 'bg-white shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 hover:bg-surface-bright'
              }`}
            >
              <div className="p-2 bg-primary-container border-2 border-brandBlack text-brandBlack shrink-0 font-bold group-hover:rotate-6 transition-transform">
                <ArrowUpDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase font-headline text-brandBlack">
                    Unified Workflows
                  </h2>
                  {activeRole === 'STUDENT' && (
                    <span className="text-[9px] font-black uppercase bg-brandBlack text-white px-1.5 py-0.2">
                      Viewing
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 font-medium mt-0.5 leading-normal">
                  Streamline processes across academics, administration, and student services.
                </p>
              </div>
            </div>

            {/* Bullet 2 */}
            <div
              onClick={() => {
                onRoleChange('FACULTY');
                onFeedback?.('Active portal switched to Faculty Suite');
              }}
              className={`flex items-start gap-3.5 p-3.5 border-3 border-brandBlack transition-all group cursor-pointer ${
                activeRole === 'FACULTY'
                  ? 'bg-[#fff0ee] shadow-brutal translate-x-1'
                  : 'bg-white shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 hover:bg-surface-bright'
              }`}
            >
              <div className="p-2 bg-tertiary-container border-2 border-brandBlack text-brandBlack shrink-0 font-bold group-hover:rotate-6 transition-transform">
                <Shield className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase font-headline text-brandBlack">
                    Role-Based Access
                  </h2>
                  {activeRole === 'FACULTY' && (
                    <span className="text-[9px] font-black uppercase bg-brandBlack text-white px-1.5 py-0.2">
                      Viewing
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 font-medium mt-0.5 leading-normal">
                  Secure, contextual experiences for every role on campus.
                </p>
              </div>
            </div>

            {/* Bullet 3 */}
            <div
              onClick={() => {
                onRoleChange('ADMIN');
                onFeedback?.('Active portal switched to Admin Governance');
              }}
              className={`flex items-start gap-3.5 p-3.5 border-3 border-brandBlack transition-all group cursor-pointer ${
                activeRole === 'ADMIN'
                  ? 'bg-[#f4ffe6] shadow-brutal translate-x-1'
                  : 'bg-white shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 hover:bg-surface-bright'
              }`}
            >
              <div className="p-2 bg-secondary-container border-2 border-brandBlack text-brandBlack shrink-0 font-bold group-hover:rotate-6 transition-transform">
                <BarChart3 className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase font-headline text-brandBlack">
                    Real-Time Insights
                  </h2>
                  {activeRole === 'ADMIN' && (
                    <span className="text-[9px] font-black uppercase bg-brandBlack text-white px-1.5 py-0.2">
                      Viewing
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 font-medium mt-0.5 leading-normal">
                  Dashboards and analytics that help you make smarter decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Right Column: High-Contrast Bauhaus Dashboard Mockup */}
        <div className="lg:col-span-6">
          <InteractivePortal
            activeRole={activeRole}
            onRoleChange={(role) => {
              onRoleChange(role);
              onFeedback?.(`Active portal switched to ${role} screen`);
            }}
            onOpenQuickLink={onOpenQuickLink}
            onFeedback={onFeedback}
          />
        </div>
      </div>
    </section>
  );
};
