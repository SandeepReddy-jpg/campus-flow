import React, { useState } from 'react';
import { ChevronDown, Box, Bell, Menu, X, Check, Monitor, Sparkles, Search, Printer, FileDown } from 'lucide-react';
import { RoleType, ScreenType, ThemeType } from '../types';
import { ThemeController } from './ThemeController';

interface NavbarProps {
  onRequestDemo: () => void;
  onLoginClick: (role?: RoleType) => void;
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenSearch?: () => void;
  searchShortcutText?: string;
  theme?: ThemeType;
  onToggleTheme?: () => void;
  onFeedback?: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestDemo,
  onLoginClick,
  activeScreen,
  onSelectScreen,
  onOpenSearch,
  searchShortcutText = 'Ctrl+K',
  theme = 'brutalist',
  onToggleTheme,
  onFeedback,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const screensList: { id: ScreenType; label: string; role?: RoleType; badge: string; color: string }[] = [
    { id: 'OVERVIEW', label: 'All Screens & Hub', badge: 'OVERVIEW', color: 'bg-[#ffcc00]' },
    { id: 'STUDENT', label: 'Student Workspace', role: 'STUDENT', badge: '01 STUDENT', color: 'bg-[#ffcc00]' },
    { id: 'FACULTY', label: 'Faculty Suite', role: 'FACULTY', badge: '02 FACULTY', color: 'bg-[#ffdad6]' },
    { id: 'PLACEMENT', label: 'Placement Cell', role: 'PLACEMENT', badge: '03 PLACEMENT', color: 'bg-[#d6e3ff]' },
    { id: 'ADMIN', label: 'Campus Governance', role: 'ADMIN', badge: '04 ADMIN', color: 'bg-[#d4ff00]' },
  ];

  return (
    <>
      {/* Top Racing Stripe Accent Banner */}
      <div className="h-2 w-full racing-stripe border-b-2 border-brandBlack" />

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b-3 border-brandBlack bg-[#faf7f2]/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo"
            className="flex items-center gap-3 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onSelectScreen('OVERVIEW');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="CampusFlow — Back to Top"
          >
            <div className="w-11 h-11 bg-[#ffcc00] border-3 border-brandBlack flex items-center justify-center p-2 shadow-brutal-sm group-hover:rotate-6 group-hover:bg-[#d4ff00] group-hover:shadow-brutal transition-all duration-200">
              <Box className="w-6 h-6 text-[#111111]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-[#111111] font-headline uppercase group-hover:text-[#0055ff] transition-colors leading-none">
                CampusFlow
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                The Academic OS
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-headline text-[#111111]"
          >
            {/* Direct Link: Overview */}
            <button
              type="button"
              id="nav-overview-btn"
              onClick={() => onSelectScreen('OVERVIEW')}
              className={`px-3 py-1.5 border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'OVERVIEW'
                  ? 'border-brandBlack bg-brandBlack text-white shadow-brutal-sm'
                  : 'border-transparent hover:border-brandBlack hover:bg-[#e8e3da] text-brandBlack'
              }`}
            >
              <span>Overview</span>
              {activeScreen === 'OVERVIEW' && (
                <span className="w-1.5 h-1.5 bg-volt rounded-full" />
              )}
            </button>

            {/* Screens Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="nav-screens-dropdown-btn"
                onClick={() => toggleDropdown('screens')}
                className={`px-3 py-1.5 border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeScreen !== 'OVERVIEW' || openDropdown === 'screens'
                    ? 'border-brandBlack bg-[#ffcc00] text-brandBlack shadow-brutal-sm font-black'
                    : 'border-transparent hover:border-brandBlack hover:bg-[#e8e3da] text-brandBlack'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>
                  Screens: {activeScreen === 'OVERVIEW' ? 'Select Screen' : activeScreen}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    openDropdown === 'screens' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'screens' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border-3 border-brandBlack shadow-brutal-xl p-2.5 space-y-1.5 z-50">
                  <div className="px-2 py-1 text-[10px] font-black uppercase text-slate-500 font-headline border-b border-brandBlack/20">
                    Switch Active Screen View
                  </div>
                  {screensList.map((screen) => {
                    const isSelected = activeScreen === screen.id;
                    return (
                      <div
                        key={screen.id}
                        id={`nav-dropdown-${screen.id.toLowerCase()}`}
                        onClick={() => {
                          onSelectScreen(screen.id);
                          setOpenDropdown(null);
                        }}
                        className={`p-2.5 border-2 transition-all cursor-pointer text-xs font-bold flex items-center justify-between group ${
                          isSelected
                            ? 'border-brandBlack bg-brandBlack text-white shadow-brutal-sm'
                            : 'border-transparent hover:border-brandBlack hover:bg-[#fff9e6] text-brandBlack'
                        }`}
                      >
                        <div>
                          <div className="font-black font-headline uppercase flex items-center gap-1.5">
                            <span>{screen.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-volt" />}
                          </div>
                          <div className={`text-[10px] font-normal ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                            {screen.id === 'OVERVIEW'
                              ? 'Full landing & dashboard composite'
                              : `Dedicated ${screen.id.toLowerCase()} workflow`}
                          </div>
                        </div>

                        <span
                          className={`text-[9px] font-black font-mono px-1.5 py-0.5 border ${
                            isSelected
                              ? 'bg-volt text-brandBlack border-brandBlack'
                              : 'bg-white text-brandBlack border-brandBlack group-hover:bg-[#ffcc00]'
                          }`}
                        >
                          {screen.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Jump Link: Capabilities */}
            <a
              href="#features"
              id="nav-capabilities-link"
              className="px-3 py-1.5 border-2 border-transparent hover:border-brandBlack hover:bg-[#e8e3da] hover:-translate-y-0.5 transition-all text-brandBlack cursor-pointer"
            >
              Capabilities
            </a>

            {/* Jump Link: Tailored Dashboards */}
            <a
              href="#dashboards"
              id="nav-dashboards-link"
              className="px-3 py-1.5 border-2 border-transparent hover:border-brandBlack hover:bg-[#e8e3da] hover:-translate-y-0.5 transition-all text-brandBlack cursor-pointer"
            >
              Role Dashboards
            </a>

            {/* Jump Link: How It Works */}
            <a
              href="#how-it-works"
              id="nav-onboarding-link"
              className="px-3 py-1.5 border-2 border-transparent hover:border-brandBlack hover:bg-[#e8e3da] hover:-translate-y-0.5 transition-all text-brandBlack cursor-pointer"
            >
              How It Works
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Aesthetic Theme Controller */}
            {onToggleTheme && (
              <ThemeController
                theme={theme}
                onToggleTheme={onToggleTheme}
                className="hidden sm:inline-flex"
              />
            )}

            {onOpenSearch && (
              <button
                type="button"
                id="navbar-search-btn"
                onClick={onOpenSearch}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 border-2 border-brandBlack bg-white hover:bg-[#d4ff00] hover:-translate-y-0.5 hover:shadow-brutal-sm active:translate-y-0.5 active:shadow-none text-xs font-headline font-bold uppercase tracking-tight text-brandBlack transition-all cursor-pointer"
                title={`Open Global Search (${searchShortcutText})`}
              >
                <Search className="w-3.5 h-3.5 text-brandBlack" strokeWidth={2.5} />
                <span>Search</span>
                <kbd className="text-[10px] font-mono font-black px-1.5 py-0.5 bg-[#f5f0e8] border border-brandBlack text-brandBlack">
                  {searchShortcutText}
                </kbd>
              </button>
            )}

            {/* Printer Button: Signals exporting current view for documentation */}
            <button
              type="button"
              id="navbar-print-documentation-btn"
              onClick={() => {
                onFeedback?.('Exporting current view for documentation...');
                window.print();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-brandBlack bg-white hover:bg-volt hover:-translate-y-0.5 hover:shadow-brutal-sm active:translate-y-0.5 active:shadow-none text-xs font-headline font-bold uppercase tracking-tight text-brandBlack transition-all cursor-pointer"
              title="Print current view for physical or paper documentation (Ctrl+P)"
              aria-label="Print current view"
            >
              <Printer className="w-3.5 h-3.5 text-brandBlack stroke-[2.5]" />
              <span className="hidden xl:inline">Print</span>
            </button>

            {/* Save as PDF Button: Uses existing print-specific CSS media queries to generate & download a clean PDF report */}
            <button
              type="button"
              id="navbar-save-pdf-btn"
              onClick={() => {
                onFeedback?.('Generating clean PDF report... Select "Save as PDF" in the print destination dialog');
                window.print();
              }}
              className="btn-brutal inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-brandBlack bg-volt hover:bg-[#c2eb00] text-brandBlack font-headline text-xs font-black uppercase tracking-tight shadow-brutal-xs hover:shadow-brutal-sm active:translate-y-0.5 cursor-pointer transition-all"
              title="Save clean PDF report using existing print media queries"
              aria-label="Save current view as clean PDF report"
            >
              <FileDown className="w-3.5 h-3.5 text-brandBlack stroke-[2.5]" />
              <span className="hidden sm:inline">Save as PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              type="button"
              id="login-button"
              onClick={() => onLoginClick(activeScreen === 'OVERVIEW' ? 'STUDENT' : (activeScreen as RoleType))}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-headline text-[#111111] hover:text-[#e63b2e] transition-all px-3 py-2 border-2 border-transparent hover:border-brandBlack hover:bg-white hover:shadow-brutal-sm cursor-pointer"
            >
              <span>Log in</span>
            </button>

            <div className="hidden sm:block h-6 w-0.5 bg-brandBlack" />

            <button
              type="button"
              id="request-demo-top-btn"
              onClick={onRequestDemo}
              className="btn-brutal inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#111111] bg-[#ffcc00] hover:bg-[#d4ff00] hover:-translate-y-0.5 font-headline cursor-pointer transition-all"
            >
              <span>Request Demo</span>
              <span className="ml-1.5 text-base leading-none">→</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border-2 border-brandBlack bg-white shadow-brutal-sm hover:bg-[#ffcc00] cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-3 border-brandBlack bg-white p-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
            {onOpenSearch && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#fff9e6] border-2 border-brandBlack font-headline font-black text-xs uppercase text-brandBlack shadow-brutal-sm"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Global Search & Command</span>
                </div>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-brandBlack">
                  {searchShortcutText}
                </kbd>
              </button>
            )}

            <div className="space-y-1">
              <div className="font-black text-xs uppercase font-headline text-slate-600">
                Switch Screen View:
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {screensList.map((screen) => {
                  const isSelected = activeScreen === screen.id;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => {
                        onSelectScreen(screen.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-2 border-2 font-headline font-black text-xs uppercase text-left flex items-center justify-between ${
                        isSelected
                          ? 'bg-brandBlack text-white border-brandBlack shadow-brutal-sm'
                          : 'bg-[#faf7f2] text-brandBlack border-brandBlack hover:bg-[#ffcc00]'
                      }`}
                    >
                      <span className="truncate">{screen.label}</span>
                      {isSelected && <span className="w-2 h-2 bg-volt shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-bold uppercase text-xs border-b border-slate-100 hover:text-[#0055ff]"
              >
                Platform Capabilities
              </a>
              <a
                href="#dashboards"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-bold uppercase text-xs border-b border-slate-100 hover:text-[#0055ff]"
              >
                Role-Based Dashboards
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-bold uppercase text-xs border-b border-slate-100 hover:text-[#0055ff]"
              >
                How It Works
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {onToggleTheme && (
                <div className="flex items-center justify-between py-2 border-b border-slate-200">
                  <span className="text-xs font-bold font-headline uppercase text-slate-700">
                    Aesthetic Mode:
                  </span>
                  <ThemeController
                    theme={theme}
                    onToggleTheme={onToggleTheme}
                    compact
                  />
                </div>
              )}

              <button
                type="button"
                id="mobile-print-documentation-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onFeedback?.('Exporting current view for documentation...');
                  setTimeout(() => window.print(), 150);
                }}
                className="w-full py-2 font-bold uppercase text-xs border-2 border-brandBlack bg-white hover:bg-volt font-headline flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-brutal-xs"
              >
                <Printer className="w-3.5 h-3.5 text-brandBlack" />
                <span>Export / Print Documentation</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLoginClick(activeScreen === 'OVERVIEW' ? 'STUDENT' : (activeScreen as RoleType));
                }}
                className="w-full py-2.5 font-bold uppercase text-xs border-2 border-brandBlack bg-white hover:bg-[#faf7f2] font-headline"
              >
                Log in to Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestDemo();
                }}
                className="w-full btn-brutal py-2.5 font-black uppercase text-xs bg-[#ffcc00] hover:bg-[#d4ff00] text-brandBlack font-headline"
              >
                Request a Campus Demo
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
