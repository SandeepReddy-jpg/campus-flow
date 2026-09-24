import React, { useState } from 'react';
import { RoleType } from '../types';
import {
  Zap,
  X,
  MessageSquare,
  Calendar,
  LifeBuoy,
  Send,
  FileCheck,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface RoleQuickActionsFloatingProps {
  role: RoleType;
  onNavigateTab?: (tabId: string) => void;
  onRecordActivity?: (action: string, category: 'Navigation' | 'Calendar' | 'Message' | 'Export' | 'System') => void;
  onFeedback?: (msg: string) => void;
}

export const RoleQuickActionsFloating: React.FC<RoleQuickActionsFloatingProps> = ({
  role,
  onNavigateTab,
  onRecordActivity,
  onFeedback,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'messageAdmin' | 'checkCalendar' | null>(null);

  // Message Admin State
  const [msgCategory, setMsgCategory] = useState<'Academic' | 'Technical' | 'Urgent' | 'General'>('Academic');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenMessageAdmin = () => {
    setIsOpen(false);
    setActiveModal('messageAdmin');
    setMsgSent(false);
  };

  const handleOpenCalendar = () => {
    setIsOpen(false);
    setActiveModal('checkCalendar');
    onRecordActivity?.('Checked Academic Calendar & Deadlines', 'Calendar');
    onFeedback?.('Opened Academic Calendar Inspector');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgSubject.trim() || !msgContent.trim()) {
      onFeedback?.('Please fill out both subject and message.');
      return;
    }

    setMsgSent(true);
    const actionText = `Messaged Admin: "${msgSubject.substring(0, 32)}${msgSubject.length > 32 ? '...' : ''}"`;
    onRecordActivity?.(actionText, 'Message');
    onFeedback?.(`Dispatched message to Campus Administrator (Ref: #${Math.floor(1000 + Math.random() * 9000)})`);

    setTimeout(() => {
      setActiveModal(null);
      setMsgSubject('');
      setMsgContent('');
      setMsgSent(false);
    }, 1400);
  };

  // Calendar dates per active role
  const getCalendarEvents = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { date: 'May 20, 2026', title: 'CS481 Machine Learning Assignment 3 Due', time: '11:59 PM', tag: 'Academic' },
          { date: 'May 24, 2026', title: 'Google Technical Assessment (Placement)', time: '02:00 PM', tag: 'Placement' },
          { date: 'June 01, 2026', title: 'End-Semester Theory Examinations Begin', time: '09:30 AM', tag: 'Exam' },
          { date: 'June 15, 2026', title: 'Semester Project Viva & Code Review', time: '10:00 AM', tag: 'Project' },
        ];
      case 'FACULTY':
        return [
          { date: 'May 19, 2026', title: 'Department Curriculum Committee Review', time: '03:00 PM', tag: 'Senate' },
          { date: 'May 22, 2026', title: 'Midterm Grading Deadline (CS481 & CS302)', time: '05:00 PM', tag: 'Grading' },
          { date: 'May 28, 2026', title: 'Office Hours & Mentorship Check-in', time: '11:00 AM', tag: 'Advising' },
          { date: 'June 05, 2026', title: 'Final Question Paper Submission to Controller', time: '04:00 PM', tag: 'Exam' },
        ];
      case 'PLACEMENT':
        return [
          { date: 'May 21, 2026', title: 'Microsoft On-Campus Drive Day 1 (PPT + Coding)', time: '09:00 AM', tag: 'Recruitment' },
          { date: 'May 25, 2026', title: 'Amazon Shortlist Final Release', time: '06:00 PM', tag: 'Shortlist' },
          { date: 'May 29, 2026', title: 'Deloitte Virtual Technical Interviews', time: '10:00 AM', tag: 'Interview' },
          { date: 'June 04, 2026', title: 'Placement Annual Audit Report to Principal', time: '02:00 PM', tag: 'Admin' },
        ];
      case 'ADMIN':
        return [
          { date: 'May 20, 2026', title: 'Board of Governors Quarterly Budget Review', time: '11:00 AM', tag: 'Finance' },
          { date: 'May 26, 2026', title: 'NAAC / NBA Accreditation Audit Session', time: '10:00 AM', tag: 'Compliance' },
          { date: 'May 30, 2026', title: 'Campus Fiber Network Infrastructure Upgrade', time: '11:30 PM', tag: 'IT / Facilities' },
          { date: 'June 10, 2026', title: 'Institutional Commencement Convocation Rehearsal', time: '09:00 AM', tag: 'Ceremony' },
        ];
    }
  };

  return (
    <>
      {/* Floating Menu Trigger Button */}
      <div id="quick-actions-floating-container" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          id="btn-quick-actions-floating"
          onClick={toggleMenu}
          className={`group flex items-center gap-2 px-4 py-3 border-3 border-brandBlack dark:border-white shadow-brutal-lg hover:shadow-brutal-xl active:translate-y-0.5 cursor-pointer font-headline uppercase font-black text-xs transition-all duration-150 ${
            isOpen
              ? 'bg-brandBlack text-volt'
              : 'bg-volt text-brandBlack hover:bg-[#c2eb00]'
          }`}
          title="Quick Actions: Instant access to Message Admin, Calendar & tasks"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 stroke-[3]" />
              <span>Close Menu</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-brandBlack group-hover:rotate-12 transition-transform" />
              <span>Quick Actions</span>
              <span className="w-2 h-2 bg-brandBlack rounded-full animate-ping" />
            </>
          )}
        </button>

        {/* Floating Menu Popover */}
        {isOpen && (
          <div
            id="quick-actions-menu-popover"
            className="absolute bottom-14 right-0 w-72 sm:w-80 card-brutal p-4 bg-white dark:bg-[#181920] border-3 border-brandBlack dark:border-[#363a45] shadow-brutal-xl animate-in fade-in slide-in-from-bottom-3 duration-150"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-brandBlack dark:border-[#363a45]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-volt border border-brandBlack" />
                <h4 className="font-headline font-black text-xs uppercase tracking-wider text-brandBlack dark:text-white">
                  Quick Actions • {role}
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#f5f0e8] dark:bg-[#14151b] border border-brandBlack dark:border-[#363a45] text-slate-700 dark:text-slate-300">
                SHORTCUTS
              </span>
            </div>

            {/* Common Task Buttons */}
            <div className="space-y-2">
              {/* Task 1: Message Admin */}
              <button
                type="button"
                id="quick-action-message-admin"
                onClick={handleOpenMessageAdmin}
                className="w-full flex items-center justify-between p-2.5 border-2 border-brandBlack dark:border-[#363a45] bg-[#fffef5] dark:bg-[#15161c] hover:bg-[#ffcc00] dark:hover:bg-volt hover:text-brandBlack transition-all text-left group cursor-pointer"
                role="menuitem"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-brandBlack text-volt flex items-center justify-center border border-brandBlack">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-headline font-black uppercase text-brandBlack dark:text-white group-hover:text-brandBlack">
                      Message Admin
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 group-hover:text-brandBlack">
                      Direct campus administration desk
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brandBlack group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Task 2: Check Calendar */}
              <button
                type="button"
                id="quick-action-check-calendar"
                onClick={handleOpenCalendar}
                className="w-full flex items-center justify-between p-2.5 border-2 border-brandBlack dark:border-[#363a45] bg-[#fffef5] dark:bg-[#15161c] hover:bg-volt hover:text-brandBlack transition-all text-left group cursor-pointer"
                role="menuitem"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-[#ffcc00] text-brandBlack flex items-center justify-center border border-brandBlack">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-headline font-black uppercase text-brandBlack dark:text-white group-hover:text-brandBlack">
                      Check Calendar
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 group-hover:text-brandBlack">
                      Key dates, submissions & deadlines
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brandBlack group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Task 3: Contextual Action */}
              <button
                type="button"
                id="quick-action-role-contextual"
                onClick={() => {
                  setIsOpen(false);
                  if (role === 'STUDENT') {
                    onNavigateTab?.('schedule');
                    onRecordActivity?.('Viewed Course Schedule & Submissions', 'Navigation');
                    onFeedback?.('Navigated to Student Course Schedule');
                  } else if (role === 'FACULTY') {
                    onNavigateTab?.('courses');
                    onRecordActivity?.('Reviewed Faculty Course Roster', 'Navigation');
                    onFeedback?.('Navigated to Faculty Courses');
                  } else if (role === 'PLACEMENT') {
                    onNavigateTab?.('drives');
                    onRecordActivity?.('Inspected Active Placement Drives', 'Navigation');
                    onFeedback?.('Navigated to Placement Drives');
                  } else {
                    onNavigateTab?.('approvals');
                    onRecordActivity?.('Inspected Governance Approvals Queue', 'Navigation');
                    onFeedback?.('Navigated to Governance Approvals');
                  }
                }}
                className="w-full flex items-center justify-between p-2.5 border-2 border-brandBlack dark:border-[#363a45] bg-[#fffef5] dark:bg-[#15161c] hover:bg-[#d6e3ff] hover:text-brandBlack transition-all text-left group cursor-pointer"
                role="menuitem"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-brandBlack text-white flex items-center justify-center border border-brandBlack">
                    <FileCheck className="w-3.5 h-3.5 text-volt" />
                  </div>
                  <div>
                    <p className="text-xs font-headline font-black uppercase text-brandBlack dark:text-white group-hover:text-brandBlack">
                      {role === 'STUDENT' && 'Course Schedule'}
                      {role === 'FACULTY' && 'Course Rosters'}
                      {role === 'PLACEMENT' && 'Placement Drives'}
                      {role === 'ADMIN' && 'Governance Approvals'}
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 group-hover:text-brandBlack">
                      Direct workspace section link
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brandBlack group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Task 4: Emergency / IT Helpdesk */}
              <button
                type="button"
                id="quick-action-helpdesk"
                onClick={() => {
                  setIsOpen(false);
                  onRecordActivity?.('Logged Campus IT Helpdesk Ticket', 'System');
                  onFeedback?.('Campus IT Helpdesk Ticket Created (Priority: Tier 1, Status: Active)');
                }}
                className="w-full flex items-center justify-between p-2 border-2 border-dashed border-slate-400 dark:border-slate-600 hover:border-brandBlack hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left cursor-pointer"
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-3.5 h-3.5 text-[#e63b2e]" />
                  <span className="text-[11px] font-bold font-headline uppercase text-slate-700 dark:text-slate-300">
                    24/7 IT Help Desk
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-[#ffdad6] text-brandBlack px-1.5 py-0.2 border border-brandBlack">
                  ONLINE
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message Admin Modal */}
      {activeModal === 'messageAdmin' && (
        <div
          id="quick-actions-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg card-brutal p-6 bg-white dark:bg-[#181920] border-3 border-brandBlack dark:border-white shadow-brutal-xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-brandBlack dark:border-[#363a45]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brandBlack text-volt flex items-center justify-center border border-brandBlack">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-sm uppercase tracking-wider text-brandBlack dark:text-white">
                    Message Campus Administrator
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Sender: {role} Workspace • Priority Dispatch
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 border-2 border-brandBlack dark:border-white bg-[#f5f0e8] dark:bg-[#14151b] hover:bg-[#e63b2e] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {msgSent ? (
              <div className="p-6 text-center space-y-3 bg-[#e4ff66]/20 border-2 border-brandBlack">
                <CheckCircle className="w-10 h-10 text-[#00aa44] mx-auto animate-bounce" />
                <h4 className="font-headline font-black text-base uppercase text-brandBlack dark:text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">
                  Your message has been routed to the Office of the Registrar & Campus IT Desk. Reference ID: #MSG-{Math.floor(1000 + Math.random() * 9000)}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                {/* Category Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-headline uppercase text-brandBlack dark:text-slate-200">
                    Category / Department
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Academic', 'Technical', 'Urgent', 'General'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setMsgCategory(cat)}
                        className={`py-1.5 px-2 border-2 text-xs font-bold font-headline uppercase transition-all cursor-pointer ${
                          msgCategory === cat
                            ? 'bg-brandBlack text-volt border-brandBlack shadow-brutal-xs'
                            : 'bg-white dark:bg-[#14151b] text-brandBlack dark:text-slate-300 border-brandBlack dark:border-[#363a45] hover:bg-[#faf7f2]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-headline uppercase text-brandBlack dark:text-slate-200">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                    placeholder="e.g. Schedule adjustment request for CS481..."
                    className="w-full px-3 py-2 border-2 border-brandBlack dark:border-[#363a45] bg-[#faf7f2] dark:bg-[#121318] text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-headline uppercase text-brandBlack dark:text-slate-200">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={msgContent}
                    onChange={(e) => setMsgContent(e.target.value)}
                    placeholder="Provide specific information regarding your request or concern..."
                    className="w-full px-3 py-2 border-2 border-brandBlack dark:border-[#363a45] bg-[#faf7f2] dark:bg-[#121318] text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-brandBlack dark:border-[#363a45]">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border-2 border-brandBlack text-xs font-bold uppercase font-headline bg-white dark:bg-[#14151b] hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-brutal inline-flex items-center gap-1.5 px-5 py-2 border-2 border-brandBlack bg-volt hover:bg-[#c2eb00] text-brandBlack font-headline text-xs font-black uppercase cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Admin</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Check Calendar Modal */}
      {activeModal === 'checkCalendar' && (
        <div
          id="quick-actions-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg card-brutal p-6 bg-white dark:bg-[#181920] border-3 border-brandBlack dark:border-white shadow-brutal-xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-brandBlack dark:border-[#363a45]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ffcc00] text-brandBlack flex items-center justify-center border border-brandBlack">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-sm uppercase tracking-wider text-brandBlack dark:text-white">
                    Academic Calendar & Milestones
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Active Role: {role} • Spring 2026 Term
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 border-2 border-brandBlack dark:border-white bg-[#f5f0e8] dark:bg-[#14151b] hover:bg-[#e63b2e] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Event List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {getCalendarEvents().map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3 border-2 border-brandBlack dark:border-[#363a45] bg-[#faf7f2] dark:bg-[#14151b] flex items-start justify-between gap-3 hover:bg-white dark:hover:bg-[#1d1f27] transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 bg-brandBlack text-volt border border-brandBlack">
                        {ev.tag}
                      </span>
                      <span className="text-xs font-headline font-bold text-brandBlack dark:text-slate-200">
                        {ev.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{ev.time}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-brandBlack dark:text-white px-2 py-1 bg-white dark:bg-[#1e2029] border border-brandBlack dark:border-[#363a45] whitespace-nowrap shadow-brutal-xs">
                      {ev.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-brandBlack dark:border-[#363a45]">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Synced with Campus ERP & Google Calendar
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  onNavigateTab?.('schedule');
                  onRecordActivity?.('Navigated to Full Course Schedule', 'Navigation');
                  onFeedback?.('Opened Full Schedule View');
                }}
                className="btn-brutal inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-brandBlack bg-volt text-brandBlack text-xs font-black uppercase font-headline cursor-pointer"
              >
                <span>Jump to Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
