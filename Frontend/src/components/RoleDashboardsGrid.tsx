import React, { useState } from 'react';
import { RoleType } from '../types';
import { STUDENT_APPLICATIONS, PLACEMENT_DRIVES } from '../data/mockData';
import { ExternalLink, Printer, Download, AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import { downloadAdminMetricsCSV } from '../utils/exportCsv';
import { ActionItemsModal } from './ActionItemsModal';

interface RoleDashboardsGridProps {
  activeRole?: RoleType;
  onSelectRole: (role: RoleType) => void;
  onOpenQuickLink: (title: string) => void;
  onOpenFullScreenRole: (role: RoleType) => void;
  onFeedback?: (msg: string) => void;
}

export const RoleDashboardsGrid: React.FC<RoleDashboardsGridProps> = ({
  activeRole,
  onSelectRole,
  onOpenQuickLink,
  onOpenFullScreenRole,
  onFeedback,
}) => {
  const [isActionItemsOpen, setIsActionItemsOpen] = useState(false);
  return (
    <section className="py-24 px-6 bg-surface-container border-t-3 border-brandBlack" id="dashboards">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading & Pill */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-brandBlack shadow-brutal-sm text-xs font-black uppercase tracking-wider font-headline">
            <span className="w-2 h-2 bg-tertiary" />
            ROLE-BASED SCREENS & DASHBOARDS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-brandBlack tracking-tight font-headline">
            One platform. Four tailored experiences.
          </h2>

          <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
            CampusFlow adapts to every role, so students, faculty, placements, and admins get the
            right insights and tools—right when they need them.
          </p>

          {/* Physical Documentation & Print Action */}
          <div className="pt-2 flex items-center justify-center gap-3 no-print">
            <button
              type="button"
              id="print-dashboards-report-btn"
              onClick={() => {
                onFeedback?.('Formatting clean printer-friendly campus documentation...');
                window.print();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-volt border-2 border-brandBlack text-xs font-black uppercase font-headline shadow-brutal-sm hover:shadow-brutal transition-all cursor-pointer"
              title="Print clean campus role specifications"
            >
              <Printer className="w-4 h-4 text-brandBlack" />
              <span>Print Campus Specification Report</span>
            </button>
          </div>
        </div>

        {/* Print-Only Document Header */}
        <div className="hidden print-only mb-6 pb-4 border-b-2 border-brandBlack">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black uppercase font-headline text-brandBlack">
                CAMPUSFLOW™ MULTI-ROLE SPECIFICATION AUDIT REPORT
              </h1>
              <p className="text-xs font-mono text-slate-700 mt-1">
                Institutional Academic Infrastructure & Workflows Overview
              </p>
            </div>
            <div className="text-right text-[10px] font-mono text-slate-700">
              <div>ACADEMIC YEAR: 2026–2027</div>
              <div>DOCUMENT STATUS: APPROVED</div>
              <div>CLASSIFICATION: OFFICIAL CAMPUS ARCHITECTURE</div>
            </div>
          </div>
        </div>

        {/* Subtle Indicator: Active Academic Engagement Variance Alert */}
        <div
          id="engagement-variance-alert-banner"
          className="p-4 bg-[#fff9eb] border-3 border-brandBlack shadow-brutal-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 bg-[#fee2e2] border-2 border-brandBlack text-[#b91c1c] shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-[#fee2e2] text-[#b91c1c] border border-[#b91c1c] text-[10px] font-headline font-black uppercase">
                  Engagement Metric Variance Alert
                </span>
                <span className="text-xs font-headline font-black uppercase text-brandBlack">
                  Active Academic Engagement Index Dropped Below 30-Day Average
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Student cohort engagement index is currently <strong>14.0% below</strong> the 30-day baseline (<strong>74.2%</strong> vs <strong>88.2%</strong>). 3 critical recovery actions identified.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="dashboards-view-action-items-btn"
              onClick={() => {
                setIsActionItemsOpen(true);
                onFeedback?.('Opened Academic Engagement Action Items checklist');
              }}
              className="btn-brutal px-3.5 py-2 bg-brandBlack text-volt hover:bg-[#1f2937] text-xs font-headline font-black uppercase tracking-wide flex items-center gap-1.5 cursor-pointer shadow-brutal-xs hover:shadow-brutal transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-volt" />
              <span>Review Action Items (3)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Column Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: Student */}
          <div
            id="card-student-screen"
            className={`card-brutal p-5 flex flex-col justify-between space-y-5 transition-all duration-200 ${
              activeRole === 'STUDENT'
                ? 'ring-4 ring-brandBlack bg-[#fffef5] shadow-brutal-xl scale-[1.02]'
                : 'hover:-translate-y-1 hover:shadow-brutal-lg'
            }`}
          >
            <div className="space-y-2 pb-3 border-b-2 border-brandBlack">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase bg-primary-container px-2 py-0.5 border border-brandBlack font-headline">
                  Student Screen
                </span>
                {activeRole === 'STUDENT' ? (
                  <span className="text-[10px] font-black uppercase bg-brandBlack text-volt px-1.5 py-0.5 border border-brandBlack animate-pulse">
                    ● ACTIVE
                  </span>
                ) : (
                  <span className="text-xs font-bold font-mono">01/04</span>
                )}
              </div>
              <h3 className="text-2xl font-black uppercase text-brandBlack font-headline">
                Student
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Track academics, opportunities and growth.
              </p>
            </div>

            {/* Profile Progress Mini Card */}
            <div className="p-3 bg-surface-low border-2 border-brandBlack space-y-2">
              <span className="text-xs font-black uppercase text-brandBlack font-headline">
                Profile Progress
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border-2 border-brandBlack flex items-center justify-center font-black text-xs font-headline shadow-brutal-sm">
                  72%
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-brandBlack">Keep going!</div>
                  <div className="text-[10px] font-medium text-slate-600 leading-tight">
                    Complete profile to unlock opportunities.
                  </div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase font-headline">
                <span>My Applications</span>
                <button
                  type="button"
                  onClick={() => onOpenQuickLink('Applications')}
                  className="text-tertiary underline cursor-pointer text-xs"
                >
                  View all
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {STUDENT_APPLICATIONS.map((app) => (
                  <div
                    key={app.id}
                    className="p-2 bg-surface-low border border-brandBlack flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-brandBlack">{app.role}</div>
                      <div className="text-[10px] text-slate-600">{app.company}</div>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 border border-brandBlack ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Metric Variance Indicator */}
            <div className="p-2.5 bg-[#fff4e5] border-2 border-brandBlack flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#b91c1c] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                <span className="text-[11px] font-mono font-bold">Engagement -14% vs 30d</span>
              </div>
              <button
                type="button"
                id="student-card-action-items-link"
                onClick={() => {
                  setIsActionItemsOpen(true);
                  onFeedback?.('Opened Academic Engagement Action Items checklist');
                }}
                className="font-headline font-black text-[10px] text-brandBlack hover:text-[#b91c1c] underline uppercase cursor-pointer"
              >
                Action Items →
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="p-3 bg-surface-bright border-2 border-brandBlack text-xs">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 font-headline">
                Upcoming
              </div>
              <div className="text-xs font-black uppercase text-brandBlack mt-0.5">
                Career Fair 2025
              </div>
              <div className="text-[10px] font-mono text-slate-600">May 20, 10:00 AM</div>
            </div>

            {/* Interactive launch button */}
            <button
              type="button"
              onClick={() => {
                onSelectRole('STUDENT');
                onOpenFullScreenRole('STUDENT');
                onFeedback?.('Opened Student Screen in full-screen view');
              }}
              className="btn-brutal no-print w-full py-2 bg-white hover:bg-[#ffcc00] font-headline text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Student Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 2: Faculty */}
          <div
            id="card-faculty-screen"
            className={`card-brutal p-5 flex flex-col justify-between space-y-5 transition-all duration-200 ${
              activeRole === 'FACULTY'
                ? 'ring-4 ring-brandBlack bg-[#fffef5] shadow-brutal-xl scale-[1.02]'
                : 'hover:-translate-y-1 hover:shadow-brutal-lg'
            }`}
          >
            <div className="space-y-2 pb-3 border-b-2 border-brandBlack">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase bg-secondary-container px-2 py-0.5 border border-brandBlack font-headline">
                  Faculty Screen
                </span>
                {activeRole === 'FACULTY' ? (
                  <span className="text-[10px] font-black uppercase bg-brandBlack text-volt px-1.5 py-0.5 border border-brandBlack animate-pulse">
                    ● ACTIVE
                  </span>
                ) : (
                  <span className="text-xs font-bold font-mono">02/04</span>
                )}
              </div>
              <h3 className="text-2xl font-black uppercase text-brandBlack font-headline">
                Faculty
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Guide students, manage courses and drive outcomes.
              </p>
            </div>

            {/* Course Overview Graph Box */}
            <div className="p-3 bg-surface-low border-2 border-brandBlack space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Course Overview
                  </span>
                  <span className="text-xs font-black block text-brandBlack">Design Thinking</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 border border-brandBlack">
                  Spring '25
                </span>
              </div>

              {/* Step Chart Visual */}
              <div className="h-10 w-full flex items-end">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 40">
                  <polyline
                    fill="none"
                    points="0,35 25,18 50,28 75,10 100,5"
                    stroke="#111111"
                    strokeWidth="3"
                  />
                  <circle cx="100" cy="5" fill="#e63b2e" r="4" stroke="#111111" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Student Progress */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold uppercase font-headline">
                <span>Student Progress</span>
                <button
                  type="button"
                  onClick={() => onOpenQuickLink('Student Grading')}
                  className="text-tertiary underline cursor-pointer text-xs"
                >
                  View all
                </button>
              </div>

              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-brandBlack mb-0.5">
                    <span>Aarav Sharma</span>
                    <span>88%</span>
                  </div>
                  <div className="h-2 bg-white border border-brandBlack">
                    <div className="w-[88%] h-full bg-secondary" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold text-brandBlack mb-0.5">
                    <span>Diya Patel</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-white border border-brandBlack">
                    <div className="w-[95%] h-full bg-primary-container" />
                  </div>
                </div>
              </div>
            </div>

            {/* At a Glance Metrics */}
            <div className="grid grid-cols-3 gap-1.5 text-center pt-2 border-t-2 border-brandBlack">
              <div className="p-1.5 bg-surface-low border border-brandBlack">
                <div className="text-base font-black text-brandBlack font-headline">24</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Advisees</div>
              </div>
              <div className="p-1.5 bg-surface-low border border-brandBlack">
                <div className="text-base font-black text-brandBlack font-headline">3</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Courses</div>
              </div>
              <div className="p-1.5 bg-surface-low border border-brandBlack">
                <div className="text-base font-black text-brandBlack font-headline">7</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Tasks</div>
              </div>
            </div>

            {/* Subtle Metric Variance Indicator */}
            <div className="p-2.5 bg-[#fff4e5] border-2 border-brandBlack flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#b91c1c] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                <span className="text-[11px] font-mono font-bold">SLA Alert: Turnaround Lag</span>
              </div>
              <button
                type="button"
                id="faculty-card-action-items-link"
                onClick={() => {
                  setIsActionItemsOpen(true);
                  onFeedback?.('Opened Academic Engagement Action Items checklist');
                }}
                className="font-headline font-black text-[10px] text-brandBlack hover:text-[#b91c1c] underline uppercase cursor-pointer"
              >
                Action Items →
              </button>
            </div>

            {/* Interactive launch button */}
            <button
              type="button"
              onClick={() => {
                onSelectRole('FACULTY');
                onOpenFullScreenRole('FACULTY');
                onFeedback?.('Opened Faculty Screen in full-screen view');
              }}
              className="btn-brutal no-print w-full py-2 bg-white hover:bg-[#ffdad6] font-headline text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Faculty Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 3: Placement */}
          <div
            id="card-placement-screen"
            className={`card-brutal p-5 flex flex-col justify-between space-y-5 transition-all duration-200 ${
              activeRole === 'PLACEMENT'
                ? 'ring-4 ring-brandBlack bg-[#fffef5] shadow-brutal-xl scale-[1.02]'
                : 'hover:-translate-y-1 hover:shadow-brutal-lg'
            }`}
          >
            <div className="space-y-2 pb-3 border-b-2 border-brandBlack">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase bg-tertiary-container px-2 py-0.5 border border-brandBlack font-headline">
                  Placement Screen
                </span>
                {activeRole === 'PLACEMENT' ? (
                  <span className="text-[10px] font-black uppercase bg-brandBlack text-volt px-1.5 py-0.5 border border-brandBlack animate-pulse">
                    ● ACTIVE
                  </span>
                ) : (
                  <span className="text-xs font-bold font-mono">03/04</span>
                )}
              </div>
              <h3 className="text-2xl font-black uppercase text-brandBlack font-headline">
                Placement
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Manage drives, track placements and build connections.
              </p>
            </div>

            {/* Placement Season Progress */}
            <div className="p-3 bg-surface-low border-2 border-brandBlack space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-700 uppercase">
                <span>Placement Season</span>
                <span>2024 – 25</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-brandBlack font-headline">68%</span>
                <span className="text-[10px] font-bold text-slate-600">428 / 630 Placed</span>
              </div>
              <div className="w-full h-2.5 bg-white border border-brandBlack overflow-hidden">
                <div className="w-[68%] h-full bg-tertiary" />
              </div>
            </div>

            {/* Upcoming Drives */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase font-headline">
                <span>Upcoming Drives</span>
                <button
                  type="button"
                  onClick={() => onOpenQuickLink('Placement Drives')}
                  className="text-tertiary underline cursor-pointer text-xs"
                >
                  View all
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {PLACEMENT_DRIVES.slice(0, 2).map((drive) => (
                  <div
                    key={drive.id}
                    className="p-2 bg-surface-low border border-brandBlack flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-brandBlack">{drive.company}</div>
                      <div className="text-[10px] text-slate-600">{drive.date}</div>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 border border-brandBlack ${
                        drive.type === 'On Campus' ? 'bg-white' : 'bg-volt'
                      }`}
                    >
                      {drive.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-1.5 text-center pt-2 border-t-2 border-brandBlack">
              <div className="p-1.5 bg-surface-low border border-brandBlack">
                <div className="text-base font-black text-brandBlack font-headline">112</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Companies</div>
              </div>
              <div className="p-1.5 bg-surface-low border border-brandBlack">
                <div className="text-base font-black text-brandBlack font-headline">28</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Drives</div>
              </div>
              <div className="p-1.5 bg-surface-low border border-brandBlack">
                <div className="text-base font-black text-brandBlack font-headline">315</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Offers</div>
              </div>
            </div>

            {/* Interactive launch button */}
            <button
              type="button"
              onClick={() => {
                onSelectRole('PLACEMENT');
                onOpenFullScreenRole('PLACEMENT');
                onFeedback?.('Opened Placement Screen in full-screen view');
              }}
              className="btn-brutal no-print w-full py-2 bg-white hover:bg-[#d6e3ff] font-headline text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Placement Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 4: Admin */}
          <div
            id="card-admin-screen"
            className={`card-brutal p-5 flex flex-col justify-between space-y-5 transition-all duration-200 ${
              activeRole === 'ADMIN'
                ? 'ring-4 ring-brandBlack bg-[#fffef5] shadow-brutal-xl scale-[1.02]'
                : 'hover:-translate-y-1 hover:shadow-brutal-lg'
            }`}
          >
            <div className="space-y-2 pb-3 border-b-2 border-brandBlack">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase bg-volt px-2 py-0.5 border border-brandBlack font-headline">
                  Admin Screen
                </span>
                {activeRole === 'ADMIN' ? (
                  <span className="text-[10px] font-black uppercase bg-brandBlack text-volt px-1.5 py-0.5 border border-brandBlack animate-pulse">
                    ● ACTIVE
                  </span>
                ) : (
                  <span className="text-xs font-bold font-mono">04/04</span>
                )}
              </div>
              <h3 className="text-2xl font-black uppercase text-brandBlack font-headline">
                Admin
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Oversee operations, users and platform health.
              </p>
            </div>

            {/* Platform Overview Mini KPI */}
            <div className="p-3 bg-surface-low border-2 border-brandBlack space-y-2">
              <span className="text-[11px] font-black uppercase text-brandBlack font-headline">
                Platform Overview
              </span>
              <div className="grid grid-cols-4 gap-1 text-center pt-1">
                <div>
                  <div className="text-xs font-black text-brandBlack">2,842</div>
                  <div className="text-[7px] font-bold text-slate-600 uppercase">Users</div>
                </div>
                <div>
                  <div className="text-xs font-black text-secondary">1,932</div>
                  <div className="text-[7px] font-bold text-slate-600 uppercase">Active</div>
                </div>
                <div>
                  <div className="text-xs font-black text-brandBlack">24</div>
                  <div className="text-[7px] font-bold text-slate-600 uppercase">Depts</div>
                </div>
                <div>
                  <div className="text-xs font-black text-tertiary">18</div>
                  <div className="text-[7px] font-bold text-slate-600 uppercase">Integ.</div>
                </div>
              </div>
            </div>

            {/* System Activity Sparkline */}
            <div className="p-3 bg-white border-2 border-brandBlack space-y-2 text-xs">
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-700">
                <span>System Activity</span>
                <span>Last 7 days ▾</span>
              </div>
              <div className="h-8 flex items-end">
                <svg className="w-full h-7 overflow-visible" viewBox="0 0 100 30">
                  <polyline
                    fill="none"
                    points="0,25 15,18 30,22 45,10 60,19 75,8 90,14 100,5"
                    stroke="#0055ff"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Tasks & Approvals */}
            <div className="space-y-1.5 text-xs pt-2 border-t-2 border-brandBlack">
              <div className="flex justify-between text-[11px] font-bold uppercase font-headline">
                <span>Tasks & Approvals</span>
                <button
                  type="button"
                  onClick={() => onOpenQuickLink('Approvals')}
                  className="no-print text-tertiary underline cursor-pointer text-[10px]"
                >
                  View all
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>Approve Event Request</span>
                <span className="px-1.5 py-0.2 bg-primary-container border border-brandBlack">
                  2 pending
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>Review New Integration</span>
                <span className="px-1.5 py-0.2 bg-primary-container border border-brandBlack">
                  1 pending
                </span>
              </div>
            </div>

            {/* Interactive launch buttons */}
            <div className="space-y-2 no-print">
              <button
                type="button"
                id="admin-card-export-csv-btn"
                onClick={() => {
                  downloadAdminMetricsCSV();
                  onFeedback?.('Exported Admin dashboard activity and engagement metrics (.csv)');
                }}
                className="btn-brutal w-full py-1.5 bg-[#d4ff00] hover:bg-volt font-headline text-[11px] font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer border-2 border-brandBlack shadow-brutal-sm hover:shadow-brutal transition-all"
                title="Download Dashboard Activity and Engagement Metrics as CSV"
              >
                <Download className="w-3.5 h-3.5 text-brandBlack" />
                <span>Export Metrics (.CSV)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectRole('ADMIN');
                  onOpenFullScreenRole('ADMIN');
                  onFeedback?.('Opened Admin Screen in full-screen view');
                }}
                className="btn-brutal w-full py-2 bg-white hover:bg-volt font-headline text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Admin Screen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Academic Engagement Action Items Intervention Modal */}
      <ActionItemsModal
        isOpen={isActionItemsOpen}
        onClose={() => setIsActionItemsOpen(false)}
        onOpenFullScreenRole={onOpenFullScreenRole}
        onFeedback={onFeedback}
      />
    </section>
  );
};
