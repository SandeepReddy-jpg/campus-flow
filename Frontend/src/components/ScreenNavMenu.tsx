import React from 'react';
import { ScreenType, RoleType } from '../types';
import { LayoutDashboard, GraduationCap, Users, Briefcase, ShieldCheck, ChevronRight, Search } from 'lucide-react';

interface ScreenNavMenuProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenFullView: (role: RoleType) => void;
  onOpenSearch?: () => void;
  searchShortcutText?: string;
}

export const ScreenNavMenu: React.FC<ScreenNavMenuProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenFullView,
  onOpenSearch,
  searchShortcutText = 'Ctrl+K',
}) => {
  const screens: { id: ScreenType; label: string; role?: RoleType; icon: React.ReactNode; num: string; color: string }[] = [
    {
      id: 'OVERVIEW',
      label: 'All Screens & Hub',
      icon: <LayoutDashboard className="w-4 h-4" />,
      num: '00',
      color: '#ffcc00',
    },
    {
      id: 'STUDENT',
      label: 'Student Screen',
      role: 'STUDENT',
      icon: <GraduationCap className="w-4 h-4" />,
      num: '01',
      color: '#ffcc00',
    },
    {
      id: 'FACULTY',
      label: 'Faculty Screen',
      role: 'FACULTY',
      icon: <Users className="w-4 h-4" />,
      num: '02',
      color: '#ffdad6',
    },
    {
      id: 'PLACEMENT',
      label: 'Placement Screen',
      role: 'PLACEMENT',
      icon: <Briefcase className="w-4 h-4" />,
      num: '03',
      color: '#d6e3ff',
    },
    {
      id: 'ADMIN',
      label: 'Admin Screen',
      role: 'ADMIN',
      icon: <ShieldCheck className="w-4 h-4" />,
      num: '04',
      color: '#d4ff00',
    },
  ];

  return (
    <nav
      aria-label="Screen Navigation Menu"
      className="sticky top-20 z-40 w-full bg-[#f2ede5] border-b-3 border-brandBlack shadow-sm py-2.5 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left Section Label */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 bg-[#e63b2e] border border-brandBlack animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider font-headline text-brandBlack">
            Active Screen Menu:
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-white border border-brandBlack text-slate-700">
            {activeScreen === 'OVERVIEW' ? 'OVERVIEW' : `${activeScreen} VIEW`}
          </span>
        </div>

        {/* Screen Links Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {screens.map((screen) => {
            const isActive = activeScreen === screen.id;

            return (
              <button
                key={screen.id}
                type="button"
                id={`screen-nav-${screen.id.toLowerCase()}`}
                onClick={() => onSelectScreen(screen.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 border-2 text-xs font-headline uppercase font-bold tracking-tight transition-all duration-150 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-brandBlack text-white border-brandBlack shadow-brutal-sm translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white text-brandBlack border-brandBlack hover:bg-[#fff9e6] hover:border-brandBlack hover:shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none'
                }`}
                title={`Switch to ${screen.label}`}
              >
                {/* Active Indicator Pip */}
                {isActive && (
                  <span
                    className="w-2 h-2 rounded-none shrink-0"
                    style={{ backgroundColor: screen.color }}
                  />
                )}

                <span className="shrink-0">{screen.icon}</span>

                <span className="whitespace-nowrap">{screen.label}</span>

                {/* Number Badge */}
                <span
                  className={`text-[9px] font-mono px-1 py-0.2 border transition-colors ${
                    isActive
                      ? 'bg-white text-brandBlack border-white font-black'
                      : 'bg-[#f5f0e8] text-slate-600 border-brandBlack group-hover:bg-brandBlack group-hover:text-white'
                  }`}
                >
                  {screen.num}
                </span>

                {/* VISUAL ACTIVE BADGE */}
                {isActive && (
                  <span className="hidden lg:inline-block text-[8px] font-black uppercase tracking-widest bg-volt text-brandBlack px-1.5 py-0.2 border border-brandBlack ml-1">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Link: Expand Screen if a specific role is active */}
        <div className="shrink-0 flex items-center justify-end gap-2">
          {onOpenSearch && (
            <button
              type="button"
              id="screen-nav-search-btn"
              onClick={onOpenSearch}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-[#ffcc00] border-2 border-brandBlack text-brandBlack text-xs font-headline font-bold uppercase transition-all shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              title={`Global Search (${searchShortcutText})`}
            >
              <Search className="w-3.5 h-3.5 text-brandBlack" strokeWidth={2.5} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[9px] font-mono font-bold bg-[#f5f0e8] px-1 border border-brandBlack">
                {searchShortcutText}
              </kbd>
            </button>
          )}

          {activeScreen !== 'OVERVIEW' && (
            <button
              type="button"
              onClick={() => onOpenFullView(activeScreen as RoleType)}
              className="btn-brutal inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-volt text-brandBlack text-xs font-black uppercase font-headline transition-all cursor-pointer"
            >
              <span>Full Screen</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
