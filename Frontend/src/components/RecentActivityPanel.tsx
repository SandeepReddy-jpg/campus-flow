import React from 'react';
import { RoleType } from '../types';
import {
  History,
  Compass,
  Calendar,
  MessageSquare,
  FileDown,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export interface RoleActivityItem {
  id: string;
  role: RoleType;
  action: string;
  category: 'Navigation' | 'Calendar' | 'Message' | 'Export' | 'System' | 'Tour';
  timestamp: string;
  details?: string;
}

interface RecentActivityPanelProps {
  role: RoleType;
  activities: RoleActivityItem[];
  onClear?: () => void;
  onSelectAction?: (activity: RoleActivityItem) => void;
  className?: string;
  compact?: boolean;
}

export const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({
  role,
  activities,
  onClear,
  onSelectAction,
  className = '',
  compact = false,
}) => {
  // Show up to the last 5 navigation actions
  const displayActivities = activities.slice(0, 5);

  const getCategoryBadge = (cat: RoleActivityItem['category']) => {
    switch (cat) {
      case 'Navigation':
        return {
          bg: 'bg-primary-container text-brandBlack',
          icon: <Compass className="w-3 h-3 text-brandBlack" />,
          label: 'NAV',
        };
      case 'Calendar':
        return {
          bg: 'bg-volt text-brandBlack',
          icon: <Calendar className="w-3 h-3 text-brandBlack" />,
          label: 'CAL',
        };
      case 'Message':
        return {
          bg: 'bg-secondary-container text-brandBlack',
          icon: <MessageSquare className="w-3 h-3 text-brandBlack" />,
          label: 'MSG',
        };
      case 'Export':
        return {
          bg: 'bg-tertiary-container text-brandBlack',
          icon: <FileDown className="w-3 h-3 text-brandBlack" />,
          label: 'EXP',
        };
      case 'Tour':
        return {
          bg: 'bg-[#e8e3da] text-brandBlack',
          icon: <Sparkles className="w-3 h-3 text-brandBlack" />,
          label: 'TOUR',
        };
      case 'System':
      default:
        return {
          bg: 'bg-slate-200 text-slate-800',
          icon: <History className="w-3 h-3 text-slate-800" />,
          label: 'SYS',
        };
    }
  };

  return (
    <div
      id="recent-activity-panel-container"
      className={`card-brutal p-4 bg-white dark:bg-[#181920] border-3 border-brandBlack dark:border-[#363a45] shadow-brutal-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-brandBlack dark:border-[#363a45]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brandBlack text-volt flex items-center justify-center border border-brandBlack dark:border-white">
            <History className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-headline font-black text-xs uppercase tracking-wider text-brandBlack dark:text-white">
            Recent Activity
          </h3>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-[#f5f0e8] dark:bg-[#121318] text-slate-700 dark:text-slate-300 border border-brandBlack dark:border-[#363a45]">
            Last 5 Actions • {role}
          </span>
        </div>

        {onClear && activities.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] font-mono font-bold uppercase text-slate-500 hover:text-[#e63b2e] dark:hover:text-[#ff6b6b] flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset recent action history"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Activities Compact List */}
      {displayActivities.length === 0 ? (
        <div className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
          No navigation actions logged yet.
        </div>
      ) : (
        <ul className="space-y-1.5" role="list">
          {displayActivities.map((item, idx) => {
            const badge = getCategoryBadge(item.category);
            return (
              <li
                key={item.id || idx}
                onClick={() => onSelectAction?.(item)}
                className={`group flex items-center justify-between gap-2 p-2 border-2 border-brandBlack dark:border-[#363a45] bg-[#faf7f2] dark:bg-[#131419] hover:bg-white dark:hover:bg-[#1e2029] hover:translate-x-0.5 transition-all ${
                  onSelectAction ? 'cursor-pointer' : ''
                }`}
                title={item.details || item.action}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* Category Pill */}
                  <div
                    className={`shrink-0 flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-black font-mono uppercase border border-brandBlack dark:border-white/40 ${badge.bg}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>

                  {/* Action Description */}
                  <div className="min-w-0">
                    <p className="text-xs font-bold font-headline text-brandBlack dark:text-slate-100 truncate group-hover:text-[#0055ff] dark:group-hover:text-volt transition-colors">
                      {item.action}
                    </p>
                    {item.details && !compact && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>

                {/* Timestamp & Icon */}
                <div className="shrink-0 flex items-center gap-1.5 text-right pl-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {item.timestamp}
                  </span>
                  {idx === 0 && (
                    <span className="w-1.5 h-1.5 bg-volt border border-brandBlack shrink-0 animate-pulse" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Footer Info */}
      <div className="mt-2.5 pt-2 border-t border-dashed border-slate-300 dark:border-[#2d313c] flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
        <span>Real-time session audit</span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-[#00aa44]" />
          <span>Synced</span>
        </span>
      </div>
    </div>
  );
};
