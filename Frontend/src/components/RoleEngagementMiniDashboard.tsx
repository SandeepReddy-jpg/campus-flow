import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { RoleType } from '../types';
import { TrendingUp, Activity, Sparkles, Calendar, Download } from 'lucide-react';
import { downloadRoleActivityReportCSV } from '../utils/exportCsv';

interface RoleEngagementMiniDashboardProps {
  role: RoleType;
  onFeedback?: (msg: string) => void;
}

interface EngagementDataPoint {
  period: string;
  engagement: number;
  benchmark: number;
  hours?: number;
  activityCount?: number;
}

const ROLE_METRICS_DATA: Record<
  RoleType,
  {
    weekly: EngagementDataPoint[];
    monthly: EngagementDataPoint[];
    title: string;
    description: string;
    currentScore: string;
    trend: string;
    highlightLabel: string;
    highlightValue: string;
    secondaryLabel: string;
    secondaryValue: string;
  }
> = {
  STUDENT: {
    title: 'Student Academic Engagement Index',
    description:
      'Continuous tracking of coursework study hours, problem sets submitted, and lecture attendance.',
    currentScore: '94.8%',
    trend: '+16.8% vs Start of Term',
    highlightLabel: 'Active Study Time',
    highlightValue: '28.4 hrs/wk',
    secondaryLabel: 'Assignment Velocity',
    secondaryValue: '100% On-Time',
    weekly: [
      { period: 'Wk 1', engagement: 78, benchmark: 72, hours: 18 },
      { period: 'Wk 2', engagement: 81, benchmark: 73, hours: 21 },
      { period: 'Wk 3', engagement: 85, benchmark: 74, hours: 24 },
      { period: 'Wk 4', engagement: 83, benchmark: 75, hours: 22 },
      { period: 'Wk 5', engagement: 89, benchmark: 76, hours: 26 },
      { period: 'Wk 6', engagement: 92, benchmark: 78, hours: 29 },
      { period: 'Wk 7', engagement: 91, benchmark: 79, hours: 27 },
      { period: 'Wk 8', engagement: 95, benchmark: 80, hours: 31 },
    ],
    monthly: [
      { period: 'Sem 1', engagement: 82, benchmark: 75 },
      { period: 'Sem 2', engagement: 84, benchmark: 76 },
      { period: 'Sem 3', engagement: 87, benchmark: 78 },
      { period: 'Sem 4', engagement: 89, benchmark: 79 },
      { period: 'Sem 5', engagement: 91, benchmark: 80 },
      { period: 'Sem 6', engagement: 93, benchmark: 82 },
      { period: 'Sem 7', engagement: 94, benchmark: 83 },
      { period: 'Sem 8', engagement: 95, benchmark: 84 },
    ],
  },
  FACULTY: {
    title: 'Faculty Pedagogy & Mentorship Engagement',
    description:
      'Lecture delivery consistency, student evaluation turnaround time, and interactive office hours.',
    currentScore: '96.2%',
    trend: '+8.4% Efficiency Gain',
    highlightLabel: 'Review Turnaround',
    highlightValue: '1.4 Days Avg',
    secondaryLabel: 'Office Hour Load',
    secondaryValue: '18 hrs/wk',
    weekly: [
      { period: 'Wk 1', engagement: 84, benchmark: 80 },
      { period: 'Wk 2', engagement: 86, benchmark: 81 },
      { period: 'Wk 3', engagement: 88, benchmark: 81 },
      { period: 'Wk 4', engagement: 91, benchmark: 82 },
      { period: 'Wk 5', engagement: 89, benchmark: 83 },
      { period: 'Wk 6', engagement: 94, benchmark: 84 },
      { period: 'Wk 7', engagement: 95, benchmark: 84 },
      { period: 'Wk 8', engagement: 97, benchmark: 85 },
    ],
    monthly: [
      { period: 'Sem 1', engagement: 85, benchmark: 80 },
      { period: 'Sem 2', engagement: 87, benchmark: 81 },
      { period: 'Sem 3', engagement: 90, benchmark: 82 },
      { period: 'Sem 4', engagement: 92, benchmark: 83 },
      { period: 'Sem 5', engagement: 93, benchmark: 84 },
      { period: 'Sem 6', engagement: 95, benchmark: 85 },
      { period: 'Sem 7', engagement: 96, benchmark: 85 },
      { period: 'Sem 8', engagement: 97, benchmark: 86 },
    ],
  },
  PLACEMENT: {
    title: 'Corporate Placement & Drive Engagement',
    description:
      'Corporate recruiter interactions, candidate interview clearance velocity, and student pipeline activity.',
    currentScore: '97.5%',
    trend: '+21.5% Placement Speed',
    highlightLabel: 'Drives Coordinated',
    highlightValue: '38 Companies',
    secondaryLabel: 'Offers Released',
    secondaryValue: '482 Verified',
    weekly: [
      { period: 'Wk 1', engagement: 74, benchmark: 70 },
      { period: 'Wk 2', engagement: 78, benchmark: 72 },
      { period: 'Wk 3', engagement: 84, benchmark: 74 },
      { period: 'Wk 4', engagement: 88, benchmark: 76 },
      { period: 'Wk 5', engagement: 86, benchmark: 77 },
      { period: 'Wk 6', engagement: 93, benchmark: 80 },
      { period: 'Wk 7', engagement: 95, benchmark: 81 },
      { period: 'Wk 8', engagement: 98, benchmark: 82 },
    ],
    monthly: [
      { period: 'Sem 1', engagement: 76, benchmark: 72 },
      { period: 'Sem 2', engagement: 80, benchmark: 74 },
      { period: 'Sem 3', engagement: 85, benchmark: 76 },
      { period: 'Sem 4', engagement: 88, benchmark: 78 },
      { period: 'Sem 5', engagement: 91, benchmark: 80 },
      { period: 'Sem 6', engagement: 94, benchmark: 81 },
      { period: 'Sem 7', engagement: 96, benchmark: 83 },
      { period: 'Sem 8', engagement: 98, benchmark: 84 },
    ],
  },
  ADMIN: {
    title: 'Campus Operations & Institutional Engagement',
    description:
      'Cross-department governance adoption, LMS automation workflows, and institutional SLA uptime.',
    currentScore: '98.9%',
    trend: '+12.1% Institutional Velocity',
    highlightLabel: 'SLA Uptime',
    highlightValue: '99.98%',
    secondaryLabel: 'Active Depts',
    secondaryValue: '24 / 24 Online',
    weekly: [
      { period: 'Wk 1', engagement: 89, benchmark: 84 },
      { period: 'Wk 2', engagement: 90, benchmark: 85 },
      { period: 'Wk 3', engagement: 92, benchmark: 86 },
      { period: 'Wk 4', engagement: 93, benchmark: 87 },
      { period: 'Wk 5', engagement: 94, benchmark: 87 },
      { period: 'Wk 6', engagement: 96, benchmark: 88 },
      { period: 'Wk 7', engagement: 97, benchmark: 89 },
      { period: 'Wk 8', engagement: 99, benchmark: 90 },
    ],
    monthly: [
      { period: 'Sem 1', engagement: 88, benchmark: 83 },
      { period: 'Sem 2', engagement: 90, benchmark: 85 },
      { period: 'Sem 3', engagement: 92, benchmark: 86 },
      { period: 'Sem 4', engagement: 94, benchmark: 87 },
      { period: 'Sem 5', engagement: 95, benchmark: 88 },
      { period: 'Sem 6', engagement: 96, benchmark: 89 },
      { period: 'Sem 7', engagement: 98, benchmark: 89 },
      { period: 'Sem 8', engagement: 99, benchmark: 90 },
    ],
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border-2 border-brandBlack shadow-brutal-sm p-2.5 font-headline text-xs">
      <div className="font-mono font-bold text-[11px] text-slate-600 pb-1 border-b border-slate-200 uppercase">
        Period: {label}
      </div>
      <div className="space-y-1 mt-1.5">
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 font-bold" style={{ color: entry.color }}>
              <span className="w-2 h-2 inline-block border border-brandBlack" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-mono font-black">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RoleEngagementMiniDashboard: React.FC<RoleEngagementMiniDashboardProps> = ({
  role,
  onFeedback,
}) => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const roleConfig = ROLE_METRICS_DATA[role];
  const chartData = viewMode === 'weekly' ? roleConfig.weekly : roleConfig.monthly;

  return (
    <div
      id="role-engagement-mini-dashboard"
      className="card-brutal p-5 sm:p-6 bg-white border-3 border-brandBlack shadow-brutal-lg transition-all"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-brandBlack">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#d4ff00] border border-brandBlack text-[10px] font-black uppercase font-headline tracking-wide mb-1">
            <Activity className="w-3 h-3 text-brandBlack" />
            <span>Active Academic Engagement Dashboard</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black uppercase font-headline text-brandBlack">
            {roleConfig.title}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5 max-w-2xl">
            {roleConfig.description}
          </p>
        </div>

        {/* View Mode Switcher & Download Activity Report */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div
            className="inline-flex items-center p-0.5 border-2 border-brandBlack bg-[#faf7f2] shadow-brutal-xs"
            role="group"
            aria-label="Time Horizon"
          >
            <button
              type="button"
              id="engagement-view-weekly-btn"
              onClick={() => {
                setViewMode('weekly');
                onFeedback?.(`Showing 8-Week engagement metrics for ${role}`);
              }}
              className={`px-2.5 py-1 text-[11px] font-headline font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'weekly'
                  ? 'bg-brandBlack text-volt shadow-brutal-xs'
                  : 'text-brandBlack hover:bg-white'
              }`}
            >
              8-Week Cycle
            </button>
            <button
              type="button"
              id="engagement-view-monthly-btn"
              onClick={() => {
                setViewMode('monthly');
                onFeedback?.(`Showing Multi-Semester historical metrics for ${role}`);
              }}
              className={`px-2.5 py-1 text-[11px] font-headline font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'monthly'
                  ? 'bg-brandBlack text-white shadow-brutal-xs'
                  : 'text-brandBlack hover:bg-white'
              }`}
            >
              Semesters
            </button>
          </div>

          <button
            type="button"
            id="mini-dashboard-download-report-btn"
            onClick={() => {
              downloadRoleActivityReportCSV(role);
              onFeedback?.(`Downloaded ${role} Activity Report (.csv)`);
            }}
            className="btn-brutal px-3 py-1.5 bg-[#d4ff00] hover:bg-volt text-brandBlack font-headline text-[11px] font-black uppercase flex items-center gap-1.5 cursor-pointer border-2 border-brandBlack shadow-brutal-xs hover:shadow-brutal transition-all"
            title="Download full activity report and engagement metrics as CSV"
          >
            <Download className="w-3.5 h-3.5 text-brandBlack stroke-[2.5]" />
            <span>Download Activity Report</span>
          </button>
        </div>
      </div>

      {/* Metric Quick-Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b-2 border-brandBlack">
        <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack">
          <div className="text-[10px] font-headline font-black uppercase text-slate-600">
            Active Engagement
          </div>
          <div className="text-xl sm:text-2xl font-black font-headline text-[#0055ff] mt-0.5">
            {roleConfig.currentScore}
          </div>
          <div className="text-[10px] font-mono font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{roleConfig.trend}</span>
          </div>
        </div>

        <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack">
          <div className="text-[10px] font-headline font-black uppercase text-slate-600">
            {roleConfig.highlightLabel}
          </div>
          <div className="text-xl sm:text-2xl font-black font-headline text-brandBlack mt-0.5">
            {roleConfig.highlightValue}
          </div>
          <div className="text-[10px] font-mono text-slate-600 mt-0.5">Top 5% Cohort</div>
        </div>

        <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack">
          <div className="text-[10px] font-headline font-black uppercase text-slate-600">
            {roleConfig.secondaryLabel}
          </div>
          <div className="text-xl sm:text-2xl font-black font-headline text-[#111111] mt-0.5">
            {roleConfig.secondaryValue}
          </div>
          <div className="text-[10px] font-mono text-emerald-700 mt-0.5">Validated SLA</div>
        </div>

        <div className="p-3 bg-[#ffcc00] border-2 border-brandBlack">
          <div className="text-[10px] font-headline font-black uppercase text-brandBlack">
            Target Benchmark
          </div>
          <div className="text-xl sm:text-2xl font-black font-headline text-brandBlack mt-0.5">
            80.0%
          </div>
          <div className="text-[10px] font-mono font-black text-brandBlack mt-0.5">
            Surpassing by +14.8%
          </div>
        </div>
      </div>

      {/* Simple Line Graph using Recharts */}
      <div className="pt-4">
        <div className="flex items-center justify-between text-xs font-headline font-black uppercase text-slate-700 mb-2">
          <span>
            {viewMode === 'weekly' ? 'Weekly Active Trend (Weeks 1 to 8)' : 'Semester Historical Trajectory'}
          </span>
          <span className="text-[10px] font-mono text-slate-500 lowercase">
            updated live via campus event bus
          </span>
        </div>

        {/* Chart Container */}
        <div className="w-full h-56 min-w-0" style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 12, right: 16, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd4" vertical={false} />
              <XAxis
                dataKey="period"
                stroke="#111111"
                fontSize={11}
                tickLine={false}
                fontFamily="JetBrains Mono, monospace"
                dy={6}
              />
              <YAxis
                stroke="#111111"
                fontSize={11}
                tickLine={false}
                domain={[65, 100]}
                fontFamily="JetBrains Mono, monospace"
                dx={-4}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                iconType="plainline"
                formatter={(value: string) => (
                  <span className="font-headline text-[11px] font-black uppercase tracking-wide text-brandBlack">
                    {value}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                name="Active Engagement"
                stroke="#0055ff"
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#ffcc00', stroke: '#111111', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#d4ff00', stroke: '#111111', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                name="Institutional Benchmark"
                stroke="#e63b2e"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
