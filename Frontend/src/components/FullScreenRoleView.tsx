import React, { useState } from 'react';
import { RoleType, ThemeType, SignedInUser } from '../types';
import {
  ArrowLeft,
  Box,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  Briefcase,
  Sparkles,
  TrendingUp,
  FileText,
  Users,
  Building,
  Bell,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Compass,
} from 'lucide-react';
import { AI_ASSISTANT_PRESETS, STUDENT_ACCOUNTS, SEEDED_SUBJECTS, FACULTY_INFO, FACULTY_ROSTER, PENDING_GRADING, WEEKLY_TIMETABLE } from '../data/mockData';
import { downloadAdminMetricsCSV, downloadRoleActivityReportCSV } from '../utils/exportCsv';
import { RoleEngagementMiniDashboard } from './RoleEngagementMiniDashboard';
import { QuickTourTooltip, TourStep } from './QuickTourTooltip';
import { RecentActivityPanel, RoleActivityItem } from './RecentActivityPanel';
import { RoleQuickActionsFloating } from './RoleQuickActionsFloating';

interface FullScreenRoleViewProps {
  role: RoleType;
  theme?: ThemeType;
  onClose: () => void;
  onSwitchRole: (role: RoleType) => void;
  onFeedback?: (msg: string) => void;
  onOpenSearch?: () => void;
  searchShortcutText?: string;
  signedInUser?: SignedInUser | null;
  activeStudentEmail?: string;
  onSelectStudent?: (email: string) => void;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'role-switcher',
    targetId: 'tour-role-switcher',
    badge: 'NAVIGATION',
    title: 'Workspace Role Switcher',
    description:
      'Seamlessly switch between Student, Faculty, Placement, and Admin workspaces with live role-tailored views and persistent preferences.',
    hint: 'Keyboard: Press ESC at any time to return to the campus overview.',
  },
  {
    id: 'engagement-dashboard',
    targetId: 'tour-engagement-dashboard',
    badge: 'ACADEMIC METRICS',
    title: 'Active Academic Engagement Mini Dashboard',
    description:
      'Live Recharts line graph tracking weekly velocity, moving averages, and institutional benchmarks across 8-Week and Multi-Semester cycles.',
    hint: 'Hover over graph data points to inspect detailed weekly percentage breakdowns.',
  },
  {
    id: 'download-activity-report',
    targetId: 'tour-download-report',
    badge: 'CSV REPORT EXPORT',
    title: 'Client-Side Activity Report Download',
    description:
      'Instantly generate and download an offline-ready RFC-4180 CSV report of engagement metrics, weekly trajectories, and role logs.',
    hint: 'Fast client-side export formatted specifically for your active role.',
  },
  {
    id: 'core-workspace',
    targetId: 'tour-core-workspace',
    badge: 'OPERATIONS',
    title: 'Core Role Operations & Workflows',
    description:
      'Interactive role-specific modules: track coursework and deadlines, evaluate student submissions, manage placement recruitment, and audit governance.',
    hint: 'Switch between overview tabs, inspect grade averages, and track deliverables.',
  },
  {
    id: 'ai-copilot',
    targetId: 'tour-ai-copilot',
    badge: 'AI COPILOT',
    title: 'CampusFlow AI Academic Assistant',
    description:
      'Instant contextual AI copilot ready to answer syllabus queries, draft placement interview answers, summarize policies, and provide guidance.',
    hint: 'Click any suggested prompt or type custom inquiries for instant advice.',
  },
];

export const FullScreenRoleView: React.FC<FullScreenRoleViewProps> = ({
  role,
  theme,
  onClose,
  onSwitchRole,
  onFeedback,
  onOpenSearch,
  searchShortcutText = 'Ctrl+K',
  signedInUser = null,
  activeStudentEmail,
  onSelectStudent,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiChatInput, setAiChatInput] = useState('');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  // Active seeded student account shown on the STUDENT screen.
  const activeStudent =
    STUDENT_ACCOUNTS.find((s) => s.email === activeStudentEmail) ?? STUDENT_ACCOUNTS[0];
  const studentDisplayName =
    signedInUser && signedInUser.role === 'STUDENT' ? signedInUser.name : activeStudent.name;
  const studentDisplayRoll =
    signedInUser && signedInUser.role === 'STUDENT' ? signedInUser.roll : activeStudent.roll;

  // Tracks the last 5 navigation actions within that role
  const [recentActivities, setRecentActivities] = useState<RoleActivityItem[]>(() => {
    return [
      { id: 'act-1', role, action: `Opened ${role} Workspace Overview`, category: 'Navigation', timestamp: 'Just now' },
      { id: 'act-2', role, action: 'Inspected Academic Engagement Velocity', category: 'System', timestamp: '3m ago' },
      { id: 'act-3', role, action: 'Checked Academic Calendar & Milestones', category: 'Calendar', timestamp: '9m ago' },
      { id: 'act-4', role, action: 'Synced Institutional Benchmarks', category: 'System', timestamp: '21m ago' },
      { id: 'act-5', role, action: 'Downloaded Activity Report CSV', category: 'Export', timestamp: '45m ago' },
    ];
  });

  const logNavigationAction = (
    action: string,
    category: RoleActivityItem['category'] = 'Navigation',
    details?: string
  ) => {
    const newActivity: RoleActivityItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      role,
      action,
      category,
      timestamp: 'Just now',
      details,
    };
    setRecentActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
  };

  const handleClearRecentActivities = () => {
    setRecentActivities([]);
    onFeedback?.('Cleared recent navigation history');
  };

  const handleNavigateTab = (tabId: string) => {
    setActiveTab(tabId);
    logNavigationAction(`Navigated to ${tabId.toUpperCase()} section`, 'Navigation');
    onFeedback?.(`Opened ${tabId.toUpperCase()} view`);
  };

  const handleToggleTour = () => {
    if (isTourOpen) {
      setIsTourOpen(false);
      logNavigationAction('Exited Workspace Quick Tour', 'Tour');
      onFeedback?.('Exited workspace quick tour');
    } else {
      setIsTourOpen(true);
      setTourStepIndex(0);
      logNavigationAction('Launched Workspace Quick Tour', 'Tour');
      onFeedback?.(`Started ${role} Workspace Quick Tour (Step 1 of ${TOUR_STEPS.length})`);
    }
  };

  const handleNextTourStep = () => {
    if (tourStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = tourStepIndex + 1;
      setTourStepIndex(nextIdx);
      onFeedback?.(`Tour step ${nextIdx + 1} of ${TOUR_STEPS.length}: ${TOUR_STEPS[nextIdx].title}`);
    } else {
      setIsTourOpen(false);
      onFeedback?.('Completed Quick Tour! You are ready to explore the workspace.');
    }
  };

  const handlePrevTourStep = () => {
    if (tourStepIndex > 0) {
      const prevIdx = tourStepIndex - 1;
      setTourStepIndex(prevIdx);
      onFeedback?.(`Tour step ${prevIdx + 1} of ${TOUR_STEPS.length}: ${TOUR_STEPS[prevIdx].title}`);
    }
  };

  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'ai'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: 'Hello! I am your CampusFlow AI Academic Copilot. How can I help with your coursework, deadlines, or placements today?',
      time: '10:00 AM',
    },
  ]);

  const handleSendAi = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text, time: now };
    setChatMessages((prev) => [...prev, userMsg]);
    setAiChatInput('');

    setTimeout(() => {
      const response =
        AI_ASSISTANT_PRESETS[text] ||
        `⚡ CampusFlow AI generated guidance: Verified across course syllabus and lecture archives. Recommended next step is reviewing Week 6 practice problem sets.`;
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai' as const, text: response, time: 'Just now' },
      ]);
    }, 400);
  };

  return (
    <div
      id="fullscreen-role-container"
      className="min-h-screen bg-[#f5f0e8] text-[#111111] font-body selection:bg-[#ffcc00]"
    >
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-white border-b-3 border-brandBlack shadow-brutal-sm">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-brutal inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ffcc00] text-xs font-black uppercase font-headline cursor-pointer hover:bg-[#d4ff00]"
              title="Return to main page (Escape)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
              <kbd className="text-[9px] font-mono font-black ml-0.5 px-1.5 py-0.2 bg-white border border-brandBlack">
                ESC
              </kbd>
            </button>

            <div className="h-6 w-0.5 bg-brandBlack hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#111111] text-white flex items-center justify-center font-bold text-xs border border-brandBlack">
                CF
              </div>
              <span className="font-headline font-black text-sm uppercase tracking-tight hidden md:inline">
                {role} Operating Environment
              </span>
            </div>
          </div>

          {/* Right actions: Search & Role Switcher */}
          <div className="flex items-center gap-3">
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border-2 border-brandBlack hover:bg-[#d4ff00] hover:-translate-y-0.5 shadow-brutal-sm text-xs font-headline font-bold uppercase transition-all cursor-pointer"
                title={`Search & Commands (${searchShortcutText})`}
              >
                <span>Search</span>
                <kbd className="text-[10px] font-mono font-bold bg-[#f5f0e8] px-1 border border-brandBlack">
                  {searchShortcutText}
                </kbd>
              </button>
            )}

            {/* Quick Tour Toggle Button */}
            <button
              type="button"
              id="fullscreen-quick-tour-btn"
              onClick={handleToggleTour}
              className={`btn-brutal inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-headline font-bold uppercase transition-all cursor-pointer ${
                isTourOpen
                  ? 'bg-volt border-2 border-brandBlack text-brandBlack shadow-brutal-sm ring-2 ring-brandBlack'
                  : 'bg-white hover:bg-volt border-2 border-brandBlack text-brandBlack shadow-brutal-xs hover:shadow-brutal-sm'
              }`}
              title="Toggle Interactive Quick Tour for this workspace"
            >
              <Compass className={`w-3.5 h-3.5 ${isTourOpen ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isTourOpen ? 'Exit Tour' : 'Quick Tour'}</span>
            </button>

            {/* Client-Side Download Activity Report Button */}
            <button
              type="button"
              id="tour-download-report"
              onClick={() => {
                downloadRoleActivityReportCSV(role);
                logNavigationAction(`Downloaded ${role} Activity Report CSV`, 'Export');
                onFeedback?.(`Downloaded ${role} Activity & Engagement Report (.csv)`);
              }}
              className="btn-brutal inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d4ff00] hover:bg-volt border-2 border-brandBlack text-brandBlack font-headline text-xs font-black uppercase shadow-brutal-xs hover:shadow-brutal transition-all cursor-pointer"
              title={`Download ${role} Activity and Engagement Report as CSV`}
            >
              <Download className="w-3.5 h-3.5 text-brandBlack stroke-[2.5]" />
              <span className="hidden md:inline">Download Activity Report</span>
              <span className="md:hidden">Export CSV</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase font-headline text-slate-600 dark:text-slate-300 hidden xl:inline">
                Switch Screen:
              </span>
              <div id="tour-role-switcher" className="flex items-center gap-1 bg-[#eee9e0] dark:bg-[#15161c] p-1 border-2 border-brandBlack dark:border-[#363a45]">
                {(['STUDENT', 'FACULTY', 'PLACEMENT', 'ADMIN'] as RoleType[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      onSwitchRole(r);
                      logNavigationAction(`Switched role workspace to ${r}`, 'Navigation');
                      onFeedback?.(`Screen switched to ${r} environment`);
                    }}
                    className={`role-pill-animated px-2.5 py-1 text-xs font-bold uppercase tracking-wider font-headline cursor-pointer transition-all ${
                      role === r
                        ? 'bg-brandBlack text-white dark:bg-volt dark:text-brandBlack shadow-brutal-sm'
                        : 'text-brandBlack dark:text-slate-300 hover:bg-white dark:hover:bg-[#22242e] hover:shadow-brutal-sm'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Mini Dashboard: Active Academic Engagement Metrics (Recharts Line Graph) */}
        <div id="tour-engagement-dashboard">
          <RoleEngagementMiniDashboard role={role} onFeedback={onFeedback} />
        </div>

        {/* Role Workspaces Container */}
        <div id="tour-core-workspace" className="space-y-8">
          {/* ======================= STUDENT SCREEN ======================= */}
          {role === 'STUDENT' && (
          <div className="space-y-8">
            {/* Student Banner — signed-in / selected seeded account */}
            <div className="card-brutal p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffcc00] border border-brandBlack text-[11px] font-black uppercase font-headline mb-2">
                  Student Portal • {activeStudent.program} • Sem {activeStudent.semester}
                </div>
                <h1 className="text-3xl font-black uppercase font-headline text-brandBlack">
                  Welcome back, {studentDisplayName}
                </h1>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Roll: {studentDisplayRoll} • Branch {activeStudent.branch} • Skills: {activeStudent.skills.join(', ')}
                </p>
                {onSelectStudent && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {STUDENT_ACCOUNTS.map((s) => (
                      <button
                        key={s.email}
                        type="button"
                        onClick={() => {
                          onSelectStudent(s.email);
                          onFeedback?.(`Switched student account to ${s.name}`);
                        }}
                        className={`px-2.5 py-1 text-[11px] font-black uppercase font-headline border-2 border-brandBlack cursor-pointer transition-all ${
                          s.email === activeStudent.email
                            ? 'bg-brandBlack text-white'
                            : 'bg-white hover:bg-[#ffcc00]'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-brandBlack">{activeStudent.cgpa.toFixed(1)}</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">CGPA</div>
                </div>
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-[#0055ff]">{activeStudent.attendancePct}%</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Attendance</div>
                </div>
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-[#e63b2e]">{activeStudent.creditsDone}</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Credits Done</div>
                </div>
              </div>
            </div>

            {/* Student Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Courses & Deadlines */}
              <div className="lg:col-span-8 space-y-6">
                {/* Active Courses — seeded subjects */}
                <div className="card-brutal p-6 bg-white space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-brandBlack">
                    <h2 className="font-headline font-black text-lg uppercase text-brandBlack flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-brandBlack" />
                      Enrolled Subjects (Sem {activeStudent.semester})
                    </h2>
                    <span className="text-xs font-bold font-mono bg-[#eee9e0] px-2 py-0.5 border border-brandBlack">
                      {SEEDED_SUBJECTS.length} Subjects
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SEEDED_SUBJECTS.map((subject) => (
                      <div key={subject.code} className="p-4 bg-[#faf7f2] border-2 border-brandBlack space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono font-bold text-slate-600">{subject.code} • {subject.credits} cr</span>
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-[#d4ff00] border border-brandBlack">
                            Grade {activeStudent.grades[subject.code] ?? '—'}
                          </span>
                        </div>
                        <div className="font-headline font-black text-sm uppercase text-brandBlack">
                          {subject.name}
                        </div>
                        <div className="text-[11px] text-slate-600">{subject.teacher} • {subject.schedule}</div>
                        <div className="pt-2 flex justify-between text-[11px] font-bold border-t border-slate-300">
                          <span>{subject.dueLabel}:</span>
                          <span className="text-[#e63b2e]">{subject.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placement Applications Status */}
                <div className="card-brutal p-6 bg-white space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-brandBlack">
                    <h2 className="font-headline font-black text-lg uppercase text-brandBlack flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-brandBlack" />
                      Placement & Internship Tracker
                    </h2>
                    <span className="text-xs font-bold text-[#0055ff] underline cursor-pointer">
                      Explore 18 More Open Drives
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-headline font-black text-sm uppercase text-brandBlack">
                          Goldman Sachs — Software Engineering Analyst
                        </div>
                        <div className="text-xs text-slate-600">Drive Date: May 21 • On Campus • CTC: ₹24 LPA</div>
                      </div>
                      <span className="self-start sm:self-center px-3 py-1 bg-[#d4ff00] border-2 border-brandBlack text-xs font-black uppercase font-headline">
                        Shortlisted for Round 2
                      </span>
                    </div>

                    <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-headline font-black text-sm uppercase text-brandBlack">
                          Microsoft — Cloud Solution Architect
                        </div>
                        <div className="text-xs text-slate-600">Drive Date: May 24 • Virtual • CTC: ₹28 LPA</div>
                      </div>
                      <span className="self-start sm:self-center px-3 py-1 bg-[#d6e3ff] border-2 border-brandBlack text-xs font-black uppercase font-headline">
                        Application Submitted
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Assistant Chat */}
              <div className="lg:col-span-4 space-y-6">
                <div id="tour-ai-copilot" className="card-brutal p-5 bg-[#ffcc00] border-3 border-brandBlack space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b-2 border-brandBlack">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brandBlack fill-brandBlack" />
                      <h3 className="font-headline font-black text-sm uppercase text-brandBlack">
                        AI Study Copilot
                      </h3>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-brandBlack text-[#d4ff00] border border-brandBlack">
                      Online
                    </span>
                  </div>

                  {/* Chat messages */}
                  <div className="h-64 overflow-y-auto space-y-3 p-3 bg-white border-2 border-brandBlack text-xs">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-2.5 border border-brandBlack ${
                          msg.sender === 'user'
                            ? 'bg-[#d6e3ff] ml-4 text-brandBlack'
                            : 'bg-[#faf7f2] mr-4 text-slate-800'
                        }`}
                      >
                        <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                          {msg.sender === 'user' ? 'Aarav (You)' : 'CampusFlow AI'} • {msg.time}
                        </div>
                        <div className="font-medium text-xs leading-relaxed">{msg.text}</div>
                      </div>
                    ))}
                  </div>

                  {/* Preset quick chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Summarize notes', 'Study plan', 'Quiz'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleSendAi(chip)}
                        className="text-[10px] px-2 py-1 bg-white border border-brandBlack font-black text-brandBlack hover:bg-[#d4ff00] transition-colors cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Chat input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={aiChatInput}
                      onChange={(e) => setAiChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendAi(aiChatInput);
                      }}
                      placeholder="Ask anything about courses..."
                      className="w-full bg-white border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none shadow-brutal-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendAi(aiChatInput)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-brandBlack font-black hover:text-[#0055ff] p-1 text-xs"
                    >
                      ➔
                    </button>
                  </div>
                </div>

                {/* Timetable Quick Glance */}
                <div className="card-brutal p-5 bg-white space-y-3">
                  <h3 className="font-headline font-black text-xs uppercase text-brandBlack border-b-2 border-brandBlack pb-2 flex items-center justify-between">
                    <span>Today's Schedule</span>
                    <span className="text-slate-500 text-[10px]">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    {(() => {
                      const i = new Date().getDay();
                      const day = i === 0 ? null : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i - 1];
                      const slots = day ? WEEKLY_TIMETABLE.filter((s) => s.day === day) : [];
                      return slots.length > 0 ? (
                        slots.map((slot) => (
                          <div key={slot.id} className="p-2 bg-[#faf7f2] border border-brandBlack flex justify-between">
                            <div>
                              <div className="font-bold text-brandBlack">
                                {slot.code} {slot.type}
                              </div>
                              <div className="text-[10px] text-slate-600">{slot.room} • {slot.subject}</div>
                            </div>
                            <span className="font-mono font-bold text-slate-700">{slot.start}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 bg-[#faf7f2] border border-brandBlack text-slate-500 font-medium">
                          Weekend — no scheduled classes.
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= FACULTY SCREEN ======================= */}
        {role === 'FACULTY' && (
          <div className="space-y-8">
            <div className="card-brutal p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffdad6] border border-brandBlack text-[11px] font-black uppercase font-headline mb-2">
                  Faculty Suite • {FACULTY_INFO.department}
                </div>
                <h1 className="text-3xl font-black uppercase font-headline text-brandBlack">
                  {FACULTY_INFO.name}
                </h1>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  {FACULTY_INFO.designation} • {FACULTY_INFO.id} • {FACULTY_INFO.advisees} Advisees
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {SEEDED_SUBJECTS.map((s) => (
                    <span key={s.code} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#faf7f2] border border-brandBlack">
                      {s.code}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-brandBlack">{FACULTY_INFO.courses}</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Subjects</div>
                </div>
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-[#e63b2e]">{FACULTY_INFO.advisees}</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Students</div>
                </div>
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-[#ffcc00]">{PENDING_GRADING.length}</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">To Grade</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="card-brutal p-6 bg-white space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-brandBlack">
                    <h2 className="font-headline font-black text-lg uppercase text-brandBlack">
                      CS202 Operating Systems — Grading Roster
                    </h2>
                    <span className="text-xs font-bold font-mono bg-[#d4ff00] px-2 py-0.5 border border-brandBlack">
                      Class Avg: 86%
                    </span>
                  </div>

                  {/* Student grading roster */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#eee9e0] border-b-2 border-brandBlack font-headline font-black uppercase text-[11px]">
                        <tr>
                          <th className="p-2 border border-brandBlack">Student Name</th>
                          <th className="p-2 border border-brandBlack">Roll #</th>
                          <th className="p-2 border border-brandBlack">Attendance</th>
                          <th className="p-2 border border-brandBlack">Assignment</th>
                          <th className="p-2 border border-brandBlack">Marks</th>
                          <th className="p-2 border border-brandBlack">Status</th>
                        </tr>
                      </thead>
                      <tbody className="font-medium">
                        {FACULTY_ROSTER.map((row, i) => (
                          <tr key={`graded-${i}`} className={`border-b border-brandBlack ${i % 2 ? 'bg-[#faf7f2]' : 'bg-white'}`}>
                            <td className="p-2 border border-brandBlack font-bold">{row.name}</td>
                            <td className="p-2 border border-brandBlack font-mono">{row.roll}</td>
                            <td className="p-2 border border-brandBlack text-emerald-700 font-bold">{row.attendancePct}%</td>
                            <td className="p-2 border border-brandBlack">{row.assignment}</td>
                            <td className="p-2 border border-brandBlack font-bold">{row.marks}</td>
                            <td className="p-2 border border-brandBlack">
                              <span className="px-1.5 py-0.5 bg-[#d4ff00] border border-brandBlack font-black text-[10px]">
                                Graded
                              </span>
                            </td>
                          </tr>
                        ))}
                        {PENDING_GRADING.map((row, i) => (
                          <tr key={`pending-${i}`} className="border-b border-brandBlack bg-[#fff4e5]">
                            <td className="p-2 border border-brandBlack font-bold">{row.student}</td>
                            <td className="p-2 border border-brandBlack font-mono">{row.roll}</td>
                            <td className="p-2 border border-brandBlack text-slate-500 font-bold">—</td>
                            <td className="p-2 border border-brandBlack">{row.assignment} (due {row.due})</td>
                            <td className="p-2 border border-brandBlack font-bold">Not submitted</td>
                            <td className="p-2 border border-brandBlack">
                              <span className="px-1.5 py-0.5 bg-[#ffcc00] border border-brandBlack font-black text-[10px]">
                                Needs Grading
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card-brutal p-6 bg-white space-y-4">
                  <h3 className="font-headline font-black text-base uppercase text-brandBlack border-b-2 border-brandBlack pb-2">
                    Student Advisee Alerts
                  </h3>
                  <div className="p-3 bg-[#ffdad6] border-2 border-brandBlack space-y-1 text-xs">
                    <div className="font-black uppercase text-brandBlack font-headline">
                      Grading Reminder: Subnetting Worksheet
                    </div>
                    <p className="text-slate-800">
                      2 submissions pending review for CS204 (due Oct 20) — Aarav Sharma and Diya Patel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div id="tour-ai-copilot" className="card-brutal p-4 bg-[#ffdad6] border-2 border-brandBlack space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b-2 border-brandBlack">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brandBlack" />
                      <h4 className="font-headline font-black text-xs uppercase text-brandBlack">
                        AI Faculty Copilot
                      </h4>
                    </div>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-brandBlack text-white">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-800 leading-snug">
                    Auto-generated rubrics ready for CS202 Assignment 2. 2 advisees on track for distinction this semester.
                  </p>
                </div>

                <div className="card-brutal p-5 bg-white space-y-3">
                  <h3 className="font-headline font-black text-xs uppercase text-brandBlack border-b-2 border-brandBlack pb-2">
                    Office Hours Today
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-[#faf7f2] border border-brandBlack">
                      <div className="font-bold">03:30 PM — Aarav Sharma</div>
                      <div className="text-[10px] text-slate-600">DBMS Doubt Session</div>
                    </div>
                    <div className="p-2 bg-[#faf7f2] border border-brandBlack">
                      <div className="font-bold">04:15 PM — Diya Patel</div>
                      <div className="text-[10px] text-slate-600">ML Project Guidance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= PLACEMENT SCREEN ======================= */}
        {role === 'PLACEMENT' && (
          <div className="space-y-8">
            <div className="card-brutal p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#d6e3ff] border border-brandBlack text-[11px] font-black uppercase font-headline mb-2">
                  Training & Placement Cell • Season 2024-25
                </div>
                <h1 className="text-3xl font-black uppercase font-headline text-brandBlack">
                  Arjun Nair, Placement Officer
                </h1>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Managing Campus Recruitment Drives, Industry Partnerships & CTC Analytics
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-[#0055ff]">68%</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Placement Rate</div>
                </div>
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-brandBlack">₹18.4 LPA</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Avg CTC</div>
                </div>
                <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                  <div className="text-xl font-black font-headline text-[#d4ff00] bg-black px-2">₹54 LPA</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600">Highest CTC</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="card-brutal p-6 bg-white space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-brandBlack">
                    <h2 className="font-headline font-black text-lg uppercase text-brandBlack">
                      Active Corporate Recruitment Pipeline
                    </h2>
                    <button
                      type="button"
                      className="btn-brutal px-3 py-1 bg-[#d4ff00] text-xs font-black uppercase font-headline cursor-pointer"
                    >
                      + Schedule New Drive
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-[#faf7f2] border-2 border-brandBlack flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-black text-sm uppercase text-brandBlack">
                            Goldman Sachs
                          </span>
                          <span className="px-2 py-0.5 bg-white border border-brandBlack text-[10px] font-bold">
                            On Campus
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">Date: May 21, 2025 • Eligible: CSE, ECE, IT</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-brandBlack">42 Shortlisted</div>
                        <div className="text-[10px] text-slate-500 font-bold">₹24 - 32 LPA</div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#faf7f2] border-2 border-brandBlack flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-black text-sm uppercase text-brandBlack">
                            Microsoft
                          </span>
                          <span className="px-2 py-0.5 bg-[#d4ff00] border border-brandBlack text-[10px] font-bold">
                            Virtual
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">Date: May 24, 2025 • All Engineering Branches</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-brandBlack">85 Registered</div>
                        <div className="text-[10px] text-slate-500 font-bold">₹28 - 45 LPA</div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#faf7f2] border-2 border-brandBlack flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-black text-sm uppercase text-brandBlack">
                            McKinsey & Company
                          </span>
                          <span className="px-2 py-0.5 bg-white border border-brandBlack text-[10px] font-bold">
                            On Campus
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">Date: May 28, 2025 • Business & Engineering</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-brandBlack">Slots Open</div>
                        <div className="text-[10px] text-slate-500 font-bold">₹22 - 30 LPA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div id="tour-ai-copilot" className="card-brutal p-4 bg-[#d6e3ff] border-2 border-brandBlack space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b-2 border-brandBlack">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brandBlack" />
                      <h4 className="font-headline font-black text-xs uppercase text-brandBlack">
                        AI Placement Matcher
                      </h4>
                    </div>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-brandBlack text-volt">
                      Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-800 leading-snug">
                    Ranked 86 eligible candidates for Goldman Sachs shortlist based on CGPA and technical skill tags.
                  </p>
                </div>

                <div className="card-brutal p-5 bg-white space-y-3">
                  <h3 className="font-headline font-black text-xs uppercase text-brandBlack border-b-2 border-brandBlack pb-2">
                    Drive Checklist
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-[#faf7f2] border border-brandBlack">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Resume verification for Goldman Sachs batch</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#faf7f2] border border-brandBlack">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Auditorium booking confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#faf7f2] border border-brandBlack">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Offer letter dispatch for Phase 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= ADMIN SCREEN ======================= */}
        {role === 'ADMIN' && (
          <div className="space-y-8">
            <div className="card-brutal p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-volt border border-brandBlack text-[11px] font-black uppercase font-headline mb-2">
                  Campus Administration & Governance
                </div>
                <h1 className="text-3xl font-black uppercase font-headline text-brandBlack">
                  Central Campus Operations
                </h1>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Institution ID: CAMPUS-IN-1092 • 24 Departments • 18 External Integrations Active
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                    <div className="text-xl font-black font-headline text-brandBlack">2,842</div>
                    <div className="text-[9px] uppercase font-bold text-slate-600">Total Users</div>
                  </div>
                  <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                    <div className="text-xl font-black font-headline text-[#0055ff]">18</div>
                    <div className="text-[9px] uppercase font-bold text-slate-600">Integrations</div>
                  </div>
                  <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack text-center min-w-[100px]">
                    <div className="text-xl font-black font-headline text-emerald-700">99.98%</div>
                    <div className="text-[9px] uppercase font-bold text-slate-600">SLA Uptime</div>
                  </div>
                </div>

                <button
                  type="button"
                  id="admin-export-csv-btn"
                  onClick={() => {
                    downloadAdminMetricsCSV();
                    onFeedback?.('Exported Admin dashboard activity and engagement metrics (.csv)');
                  }}
                  className="btn-brutal px-4 py-3 bg-volt hover:bg-[#d4ff00] text-brandBlack font-headline text-xs font-black uppercase flex items-center gap-2 cursor-pointer shadow-brutal-sm hover:shadow-brutal transition-all"
                  title="Download Dashboard Activity and Engagement Metrics as CSV"
                >
                  <Download className="w-4 h-4 text-brandBlack stroke-[2.5]" />
                  <span>Export Metrics (CSV)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="card-brutal p-6 bg-white space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-brandBlack">
                    <h2 className="font-headline font-black text-lg uppercase text-brandBlack">
                      System Tasks & Approvals
                    </h2>
                    <span className="text-xs font-bold font-mono bg-[#ffcc00] px-2 py-0.5 border border-brandBlack">
                      3 Pending Actions
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs uppercase font-headline">
                          Approve Annual Hackathon Event Budget
                        </div>
                        <div className="text-[10px] text-slate-600">Submitted by Student Council • ₹1,50,000</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#d4ff00] border border-brandBlack font-black text-xs font-headline uppercase hover:bg-black hover:text-white transition-colors">
                          Approve
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-[#faf7f2] border-2 border-brandBlack flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs uppercase font-headline">
                          Authorize Moodle 4.2 LMS Sync Integration
                        </div>
                        <div className="text-[10px] text-slate-600">OAuth Scopes: Gradebook Read/Write</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#d4ff00] border border-brandBlack font-black text-xs font-headline uppercase hover:bg-black hover:text-white transition-colors">
                          Authorize
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit Trail */}
                <div className="card-brutal p-6 bg-white space-y-3">
                  <div className="flex justify-between items-center border-b-2 border-brandBlack pb-2">
                    <h3 className="font-headline font-black text-base uppercase text-brandBlack">
                      Real-Time Security & Compliance Log
                    </h3>
                    <button
                      type="button"
                      id="admin-export-audit-csv-btn"
                      onClick={() => {
                        downloadAdminMetricsCSV();
                        onFeedback?.('Exported Admin dashboard activity and engagement metrics (.csv)');
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#faf7f2] hover:bg-volt border border-brandBlack text-[11px] font-black uppercase font-headline cursor-pointer transition-colors shadow-brutal-xs"
                      title="Download Activity and Engagement Metrics as CSV"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-brandBlack" />
                      <span>Export Log (CSV)</span>
                    </button>
                  </div>
                  <div className="font-mono text-[11px] space-y-1 text-slate-700 bg-[#faf7f2] p-3 border border-brandBlack">
                    <div>[2025-05-18 10:14:02] AUTH: Successful SSO login for Dean Dr. Meera Iyer (IP: 10.2.4.12)</div>
                    <div>[2025-05-18 09:45:18] BACKUP: Automated encrypted DB snapshot completed (6.2 GB)</div>
                    <div>[2025-05-18 08:30:00] CRON: Batch attendance reconciliation verified for 24 departments</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div id="tour-ai-copilot" className="card-brutal p-4 bg-volt border-2 border-brandBlack space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b-2 border-brandBlack">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brandBlack" />
                      <h4 className="font-headline font-black text-xs uppercase text-brandBlack">
                        AI Governance Auditor
                      </h4>
                    </div>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-brandBlack text-volt">
                      Realtime
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-800 leading-snug">
                    All 24 department audit logs reconciled with zero anomalies. Campus network bandwidth operating at 34% capacity.
                  </p>
                </div>

                <div className="card-brutal p-5 bg-white space-y-3">
                  <h3 className="font-headline font-black text-xs uppercase text-brandBlack border-b-2 border-brandBlack pb-2">
                    Connected Campus Services
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 bg-[#faf7f2] border border-brandBlack">
                      <span className="font-bold">Student ERP</span>
                      <span className="text-emerald-700 font-black text-[10px]">CONNECTED</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#faf7f2] border border-brandBlack">
                      <span className="font-bold">Moodle / Canvas LMS</span>
                      <span className="text-emerald-700 font-black text-[10px]">CONNECTED</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#faf7f2] border border-brandBlack">
                      <span className="font-bold">Placement Portal</span>
                      <span className="text-emerald-700 font-black text-[10px]">CONNECTED</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#faf7f2] border border-brandBlack">
                      <span className="font-bold">Biometric Attendance</span>
                      <span className="text-emerald-700 font-black text-[10px]">CONNECTED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Quick Tour Guided Tooltip System */}
        <QuickTourTooltip
          isOpen={isTourOpen}
          stepIndex={tourStepIndex}
          steps={TOUR_STEPS}
          onNext={handleNextTourStep}
          onPrev={handlePrevTourStep}
          onClose={() => {
            setIsTourOpen(false);
            onFeedback?.('Closed Quick Tour');
          }}
          onJumpToStep={(idx) => setTourStepIndex(idx)}
          theme={theme}
        />
      </div>
    </div>
  );
};
