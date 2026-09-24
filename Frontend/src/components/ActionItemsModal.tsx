import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  BookOpen,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { RoleType } from '../types';
import { downloadRoleActivityReportCSV } from '../utils/exportCsv';

interface ActionItem {
  id: string;
  title: string;
  course: string;
  category: 'Overdue' | 'Mentorship' | 'Remedial';
  impact: string;
  recommendedAction: string;
  resolved: boolean;
}

interface ActionItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullScreenRole?: (role: RoleType) => void;
  onFeedback?: (msg: string) => void;
}

const INITIAL_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'ACT-ENG-01',
    title: 'Resolve Overdue Lab Deliverables (CS-401 Distributed Systems)',
    course: 'CS-401 • Raft Consensus Protocol Lab #4',
    category: 'Overdue',
    impact: '18 students in Cohort B missed soft milestone; contributing -8.2% to engagement score.',
    recommendedAction: 'Dispatch automated SMS/email reminder and grant 24-hour grace window.',
    resolved: false,
  },
  {
    id: 'ACT-ENG-02',
    title: 'Schedule Faculty Office Hour Check-in (Dr. Aris Thorne)',
    course: 'CS-401 • Systems Architecture Office Hours',
    category: 'Mentorship',
    impact: 'Low attendance in past 2 recitation sessions; students flagged ambiguity on Raft leader election.',
    recommendedAction: 'Schedule 45-minute interactive review recitation for Thursday 3:00 PM.',
    resolved: false,
  },
  {
    id: 'ACT-ENG-03',
    title: 'Push Interactive Practice Problem Set to Mobile LMS',
    course: 'CS-409 • Compiler Architecture & LLVM IR',
    category: 'Remedial',
    impact: '14 students spent < 2.5 hrs on asynchronous material this week.',
    recommendedAction: 'Deploy 5-question micro-quiz to boost lecture comprehension velocity.',
    resolved: false,
  },
];

export const ActionItemsModal: React.FC<ActionItemsModalProps> = ({
  isOpen,
  onClose,
  onOpenFullScreenRole,
  onFeedback,
}) => {
  const [items, setItems] = useState<ActionItem[]>(INITIAL_ACTION_ITEMS);

  if (!isOpen) return null;

  const resolvedCount = items.filter((i) => i.resolved).length;
  const allResolved = resolvedCount === items.length;

  const handleToggleResolve = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.resolved;
          onFeedback?.(
            nextState
              ? `Resolved: ${item.title.slice(0, 32)}... (+4.6% estimated recovery)`
              : `Marked ${item.title.slice(0, 32)}... as pending`
          );
          return { ...item, resolved: nextState };
        }
        return item;
      })
    );
  };

  const handleReset = () => {
    setItems(INITIAL_ACTION_ITEMS);
    onFeedback?.('Reset engagement action items checklist');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="action-items-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#fffef8] border-3 border-brandBlack shadow-brutal-xl my-8 overflow-hidden z-10">
        {/* Top Header */}
        <div className="p-5 bg-white border-b-3 border-brandBlack flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#fee2e2] border-2 border-brandBlack text-[#b91c1c]">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#fee2e2] text-[#b91c1c] border border-[#b91c1c] text-[10px] font-headline font-black uppercase">
                  Metric Alert Intervention
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-600">
                  {resolvedCount}/{items.length} Action Items Resolved
                </span>
              </div>
              <h2
                id="action-items-title"
                className="text-xl sm:text-2xl font-black uppercase font-headline text-brandBlack mt-0.5"
              >
                Academic Engagement Recovery Plan
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 border-2 border-brandBlack text-brandBlack transition-all cursor-pointer shadow-brutal-xs hover:shadow-brutal"
            title="Close dialog (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metric Alert Context Banner */}
        <div className="p-4 bg-[#fff7ed] border-b-2 border-brandBlack grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-2.5 bg-white border border-brandBlack">
            <div className="text-[10px] font-headline font-bold uppercase text-slate-600">
              Current Engagement Index
            </div>
            <div className="text-xl font-black font-headline text-[#b91c1c]">74.2%</div>
            <div className="text-[10px] font-mono text-slate-600">-14.0% vs 30-Day Avg</div>
          </div>

          <div className="p-2.5 bg-white border border-brandBlack">
            <div className="text-[10px] font-headline font-bold uppercase text-slate-600">
              30-Day Rolling Benchmark
            </div>
            <div className="text-xl font-black font-headline text-brandBlack">88.2%</div>
            <div className="text-[10px] font-mono text-slate-600">Target: ≥ 80.0%</div>
          </div>

          <div className="p-2.5 bg-white border border-brandBlack">
            <div className="text-[10px] font-headline font-bold uppercase text-slate-600">
              Estimated Recovery
            </div>
            <div className="text-xl font-black font-headline text-[#0055ff]">
              +{resolvedCount * 4.6}%
            </div>
            <div className="text-[10px] font-mono text-slate-600">
              {allResolved ? 'Full Target Recovered' : 'Pending resolution'}
            </div>
          </div>
        </div>

        {/* Action Items List */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[50vh] overflow-y-auto">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 border-2 border-brandBlack transition-all ${
                item.resolved
                  ? 'bg-[#f0fdf4] opacity-85 shadow-none'
                  : 'bg-white shadow-brutal-sm hover:shadow-brutal'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-headline font-black uppercase px-2 py-0.5 border border-brandBlack ${
                        item.category === 'Overdue'
                          ? 'bg-[#fee2e2] text-[#991b1b]'
                          : item.category === 'Mentorship'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : 'bg-[#dbeafe] text-[#1e40af]'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      {item.course}
                    </span>
                    {item.resolved && (
                      <span className="text-[10px] font-headline font-black uppercase px-1.5 py-0.2 bg-[#bbf7d0] text-emerald-900 border border-brandBlack">
                        ✓ Action Executed
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-headline font-bold text-sm sm:text-base text-brandBlack ${
                      item.resolved ? 'line-through text-slate-600' : ''
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    <strong>Root Cause:</strong> {item.impact}
                  </p>

                  <div className="p-2 bg-[#faf7f2] border border-brandBlack text-xs text-slate-800 font-mono">
                    <strong>Recommended Action:</strong> {item.recommendedAction}
                  </div>
                </div>

                <div className="shrink-0 flex items-center sm:flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleResolve(item.id)}
                    className={`btn-brutal px-3 py-1.5 text-xs font-headline font-black uppercase flex items-center gap-1.5 cursor-pointer border-2 border-brandBlack transition-all ${
                      item.resolved
                        ? 'bg-white hover:bg-slate-100 text-slate-700'
                        : 'bg-[#ffcc00] hover:bg-volt text-brandBlack shadow-brutal-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{item.resolved ? 'Mark Pending' : 'Execute & Resolve'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t-3 border-brandBlack flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 bg-[#faf7f2] hover:bg-white border border-brandBlack text-xs font-headline font-bold uppercase flex items-center gap-1.5 cursor-pointer"
              title="Reset checklist"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Reset Checklist</span>
            </button>

            <button
              type="button"
              onClick={() => {
                downloadRoleActivityReportCSV('STUDENT');
                onFeedback?.('Downloaded Student Activity & Engagement Report (.csv)');
              }}
              className="px-3 py-1.5 bg-[#d4ff00] hover:bg-volt border-2 border-brandBlack text-brandBlack text-xs font-headline font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-brutal-xs hover:shadow-brutal transition-all"
              title="Download engagement logs as CSV"
            >
              <Download className="w-3.5 h-3.5 text-brandBlack stroke-[2.5]" />
              <span>Download Activity CSV</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onOpenFullScreenRole && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenFullScreenRole('STUDENT');
                }}
                className="btn-brutal px-4 py-2 bg-volt hover:bg-[#d4ff00] text-brandBlack border-2 border-brandBlack font-headline text-xs font-black uppercase flex items-center gap-1.5 shadow-brutal-sm cursor-pointer"
              >
                <span>Launch Student Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="btn-brutal px-4 py-2 bg-brandBlack text-white border-2 border-brandBlack font-headline text-xs font-black uppercase hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
