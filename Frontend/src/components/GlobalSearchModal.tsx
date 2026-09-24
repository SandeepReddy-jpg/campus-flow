import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  LayoutDashboard,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  Command,
  FileText,
  Building,
  Printer,
  Zap,
  Download,
} from 'lucide-react';
import { RoleType, ScreenType, ThemeType } from '../types';
import { downloadAdminMetricsCSV } from '../utils/exportCsv';

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: 'Screens' | 'Actions' | 'Courses' | 'Workflows' | 'Resources';
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenType) => void;
  onRequestDemo: () => void;
  onOpenLogin: (role?: RoleType) => void;
  onOpenFullScreen: (role: RoleType) => void;
  onOpenQuickLink: (title: string) => void;
  searchShortcutText?: string;
  theme?: ThemeType;
  onToggleTheme?: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectScreen,
  onRequestDemo,
  onOpenLogin,
  onOpenFullScreen,
  onOpenQuickLink,
  searchShortcutText = 'Ctrl+K',
  theme = 'brutalist',
  onToggleTheme,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const allItems: SearchResultItem[] = useMemo(() => [
    // 1. Screens
    {
      id: 'screen-overview',
      title: 'Overview & Hub (All Screens)',
      description: 'Main composite landing, architecture overview, and executive hub',
      category: 'Screens',
      badge: 'SCREEN 00',
      icon: <LayoutDashboard className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onSelectScreen('OVERVIEW');
        onClose();
      },
    },
    {
      id: 'screen-student',
      title: 'Student Screen & Workspace',
      description: 'Aarav Mehta profile, semester GPA 8.94, AI Copilot, deadlines',
      category: 'Screens',
      badge: 'SCREEN 01',
      icon: <GraduationCap className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onSelectScreen('STUDENT');
        onClose();
      },
    },
    {
      id: 'screen-faculty',
      title: 'Faculty Screen & Course Suite',
      description: 'Dr. Meera Iyer portal, 3 active courses, syllabus generator, attendance',
      category: 'Screens',
      badge: 'SCREEN 02',
      icon: <Users className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onSelectScreen('FACULTY');
        onClose();
      },
    },
    {
      id: 'screen-placement',
      title: 'Placement Screen & Drive Command',
      description: 'Arjun Nair cell, 88.4% placement rate, 42 active recruiters, drives',
      category: 'Screens',
      badge: 'SCREEN 03',
      icon: <Briefcase className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onSelectScreen('PLACEMENT');
        onClose();
      },
    },
    {
      id: 'screen-admin',
      title: 'Admin Governance Screen',
      description: 'Prof. Sharma suite, 99.98% uptime, compliance checks, audit trail',
      category: 'Screens',
      badge: 'SCREEN 04',
      icon: <ShieldCheck className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onSelectScreen('ADMIN');
        onClose();
      },
    },

    // 2. Actions
    {
      id: 'action-toggle-theme',
      title: theme === 'minimalist' ? 'Switch to Neo-Brutalist Aesthetic' : 'Switch to Minimalist / Clean High-Contrast Mode',
      description: theme === 'minimalist' ? 'Enable bold Bauhaus borders, drop-shadows, and high-impact color blocks' : 'Enable clean, subtle borders, soft elevations, and refined minimalist spacing',
      category: 'Actions',
      badge: 'THEME',
      icon: theme === 'minimalist' ? <Zap className="w-4 h-4 text-brandBlack" /> : <Sparkles className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onToggleTheme?.();
        onClose();
      },
    },
    {
      id: 'action-export-admin-csv',
      title: 'Export Admin Activity & Metrics (CSV)',
      description: 'Download administrator dashboard metrics, user engagement stats, and governance audit trail as CSV',
      category: 'Actions',
      badge: 'CSV EXPORT',
      icon: <Download className="w-4 h-4 text-brandBlack" />,
      action: () => {
        downloadAdminMetricsCSV();
        onClose();
      },
    },
    {
      id: 'action-print-report',
      title: 'Print Campus Specification Report',
      description: 'Format role dashboards into clean, printer-friendly document layout and launch print dialog',
      category: 'Actions',
      badge: 'PRINT',
      icon: <Printer className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onClose();
        setTimeout(() => {
          window.print();
        }, 150);
      },
    },
    {
      id: 'action-demo',
      title: 'Request a Campus Demo',
      description: 'Schedule a tailored walkthrough with a CampusFlow solutions engineer',
      category: 'Actions',
      badge: 'BOOKING',
      icon: <Building className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onRequestDemo();
        onClose();
      },
    },
    {
      id: 'action-login',
      title: 'Switch Role Persona / Log In',
      description: 'Authenticate as Student, Faculty, Placement Officer, or Administrator',
      category: 'Actions',
      badge: 'AUTH',
      icon: <Users className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenLogin();
        onClose();
      },
    },
    {
      id: 'action-fullscreen-student',
      title: 'Full-Screen Student Workspace',
      description: 'Launch deep-dive interactive student dashboard with course modules',
      category: 'Actions',
      badge: 'WORKSPACE',
      icon: <ArrowRight className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenFullScreen('STUDENT');
        onClose();
      },
    },

    // 3. Courses & Workflows
    {
      id: 'course-cs402',
      title: 'CS402: Distributed Systems',
      description: 'Lab 4 Consensus protocols due in 2 days. 34/35 points current average',
      category: 'Courses',
      badge: 'COURSE',
      icon: <BookOpen className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenQuickLink('Course Dashboard');
        onClose();
      },
    },
    {
      id: 'course-cs481',
      title: 'CS481: Compiler Design',
      description: 'Project Phase 2 parser & AST generation. Due Friday 11:59 PM',
      category: 'Courses',
      badge: 'COURSE',
      icon: <BookOpen className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenQuickLink('Course Dashboard');
        onClose();
      },
    },
    {
      id: 'course-hs302',
      title: 'HS302: Ethics in Technology',
      description: 'Case study analysis: Autonomous algorithmic accountability',
      category: 'Courses',
      badge: 'COURSE',
      icon: <BookOpen className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenQuickLink('Course Dashboard');
        onClose();
      },
    },
    {
      id: 'workflow-ai-copilot',
      title: 'AI Study Copilot & Question Engine',
      description: 'Ask instant queries across syllabus, notes, and academic schedules',
      category: 'Workflows',
      badge: 'AI POWERED',
      icon: <Sparkles className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onSelectScreen('STUDENT');
        onClose();
      },
    },

    // 4. Resources
    {
      id: 'res-timetable',
      title: 'Academic Timetable & Lecture Hall Routing',
      description: 'Weekly schedule grid with physical classroom and virtual links',
      category: 'Resources',
      badge: 'UTILITY',
      icon: <Calendar className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenQuickLink('Timetable');
        onClose();
      },
    },
    {
      id: 'res-grades',
      title: 'Semester Grades & CGPA Breakdown',
      description: 'Official verified transcripts, grade history, and department rankings',
      category: 'Resources',
      badge: 'RECORDS',
      icon: <FileText className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenQuickLink('Grades');
        onClose();
      },
    },
    {
      id: 'res-hub',
      title: 'Digital Resources Hub & Library Catalog',
      description: 'IEEE Xplore, ACM Digital Library, and campus laboratory access passes',
      category: 'Resources',
      badge: 'LIBRARY',
      icon: <BookOpen className="w-4 h-4 text-brandBlack" />,
      action: () => {
        onOpenQuickLink('Resources Hub');
        onClose();
      },
    },
  ], [onSelectScreen, onRequestDemo, onOpenLogin, onOpenFullScreen, onOpenQuickLink, onClose]);

  // Filter items based on search input
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const clean = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(clean) ||
        item.description.toLowerCase().includes(clean) ||
        item.category.toLowerCase().includes(clean) ||
        item.badge?.toLowerCase().includes(clean)
    );
  }, [allItems, query]);

  // Ensure selectedIndex stays in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow key and enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view when selected via arrow keys
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#faf7f2] border-3 border-brandBlack shadow-brutal-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Global Search and Command Palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Header Banner */}
        <div className="h-2 w-full racing-stripe border-b-2 border-brandBlack" />

        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 bg-white border-b-3 border-brandBlack flex items-center gap-3">
          <Search className="w-5 h-5 text-brandBlack shrink-0" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search screens, actions, courses, resources..."
            className="flex-1 text-sm sm:text-base font-bold text-brandBlack placeholder-slate-400 bg-transparent border-none outline-none font-headline tracking-wide"
            aria-label="Search input"
          />

          <div className="flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs font-mono font-bold px-1.5 py-0.5 border border-slate-300 hover:border-brandBlack hover:bg-[#e8e3da] text-slate-600 cursor-pointer"
                title="Clear search query"
              >
                CLEAR
              </button>
            )}

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-black px-2 py-1 bg-surface-high border-2 border-brandBlack text-brandBlack">
              <Command className="w-3 h-3" />
              <span>{searchShortcutText}</span>
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1 border-2 border-brandBlack hover:bg-[#e63b2e] hover:text-white transition-colors cursor-pointer"
              aria-label="Close search"
              title="Close [Esc]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters Quick Chips */}
        <div className="px-4 py-2 bg-surface-low border-b-2 border-brandBlack flex items-center justify-between text-xs overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-black uppercase text-slate-500 font-headline">
              Quick Filter:
            </span>
            {['All', 'Screens', 'Actions', 'Courses', 'Workflows', 'Resources'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setQuery(cat === 'All' ? '' : cat.toLowerCase())}
                className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border transition-all cursor-pointer ${
                  (cat === 'All' && !query) || query.toLowerCase() === cat.toLowerCase()
                    ? 'bg-brandBlack text-white border-brandBlack shadow-brutal-sm'
                    : 'bg-white text-brandBlack border-brandBlack hover:bg-[#ffcc00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono font-bold text-slate-600 shrink-0 ml-2">
            {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
          </span>
        </div>

        {/* Search Results List */}
        <div
          ref={listRef}
          className="max-h-80 sm:max-h-96 overflow-y-auto p-3 space-y-1.5 bg-[#faf7f2] divide-y-0"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-surface-high border-2 border-brandBlack flex items-center justify-center font-mono font-bold text-slate-500">
                ?
              </div>
              <p className="text-sm font-bold font-headline uppercase text-brandBlack">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                Try searching for "Student", "Faculty", "Placement", "Demo", or "CS402".
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id}
                  id={`search-item-${item.id}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 border-2 border-brandBlack flex items-center justify-between gap-3 cursor-pointer transition-all duration-100 ${
                    isSelected
                      ? 'bg-primary-container shadow-brutal translate-x-1'
                      : 'bg-white hover:bg-[#fff9e6]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 border-2 border-brandBlack flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white shadow-brutal-sm' : 'bg-surface-high'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-brandBlack font-headline uppercase truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-white border border-brandBlack text-brandBlack shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 hidden sm:inline">
                      {item.category}
                    </span>
                    <span
                      className={`text-xs font-black p-1 border border-brandBlack ${
                        isSelected ? 'bg-brandBlack text-white' : 'bg-surface-high text-brandBlack'
                      }`}
                    >
                      ↵
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Keyboard Navigation Hints */}
        <div className="p-3 bg-white border-t-3 border-brandBlack flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#f5f0e8] border border-brandBlack text-brandBlack">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-[#f5f0e8] border border-brandBlack text-brandBlack">↓</kbd>
              <span className="text-[11px] ml-1">Navigate</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#f5f0e8] border border-brandBlack text-brandBlack">Enter</kbd>
              <span className="text-[11px] ml-1">Select</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#f5f0e8] border border-brandBlack text-brandBlack">Esc</kbd>
              <span className="text-[11px] ml-1">Close</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:block">
            Keyboard accessible • Neo-brutalist navigation
          </div>
        </div>
      </div>
    </div>
  );
};
