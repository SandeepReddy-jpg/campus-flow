import React from 'react';
import { ThemeType } from '../types';
import { Sun, Moon } from 'lucide-react';

interface ThemeControllerProps {
  theme: ThemeType;
  onToggleTheme: () => void;
  className?: string;
  compact?: boolean;
}

export const ThemeController: React.FC<ThemeControllerProps> = ({
  theme,
  onToggleTheme,
  className = '',
  compact = false,
}) => {
  const isDark = theme === 'dark' || theme === 'minimalist';

  if (compact) {
    return (
      <button
        type="button"
        onClick={onToggleTheme}
        id="theme-controller-compact-btn"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-brandBlack text-xs font-headline font-bold uppercase transition-all shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer ${
          isDark
            ? 'bg-[#1e1f24] text-volt border-white/80'
            : 'bg-[#ffcc00] text-brandBlack'
        } ${className}`}
        title={`Current mode: ${isDark ? 'Dark Mode' : 'Light Mode'}. Click to toggle theme.`}
        aria-label={`Toggle light and dark mode. Currently in ${isDark ? 'Dark Mode' : 'Light Mode'}`}
      >
        {isDark ? (
          <>
            <Moon className="w-3.5 h-3.5 text-volt" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-brandBlack" />
            <span>Light</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div
      id="theme-controller"
      className={`inline-flex items-center p-0.5 border-2 border-brandBlack bg-white dark:bg-[#18191e] dark:border-white/70 shadow-brutal-sm font-headline ${className}`}
      role="group"
      aria-label="Theme Controller: Switch between Light and Dark mode"
    >
      <button
        type="button"
        id="theme-btn-light"
        onClick={() => {
          if (isDark) onToggleTheme();
        }}
        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
          !isDark
            ? 'bg-[#ffcc00] text-brandBlack shadow-brutal-xs border border-brandBlack'
            : 'text-slate-700 hover:text-brandBlack dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Switch to Neo-Brutalist Light Mode"
        aria-pressed={!isDark}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        type="button"
        id="theme-btn-dark"
        onClick={() => {
          if (!isDark) onToggleTheme();
        }}
        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
          isDark
            ? 'bg-brandBlack text-volt dark:bg-volt dark:text-brandBlack shadow-brutal-xs border border-brandBlack dark:border-white'
            : 'text-slate-700 hover:text-brandBlack hover:bg-slate-100'
        }`}
        title="Switch to Neo-Brutalist Dark Mode"
        aria-pressed={isDark}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
};
