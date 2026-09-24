import React, { useState } from 'react';
import { RoleType } from '../types';
import { AI_ASSISTANT_PRESETS, STUDENT_DEADLINES } from '../data/mockData';
import { Bell, ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react';

interface InteractivePortalProps {
  activeRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  onOpenQuickLink: (title: string) => void;
  onFeedback?: (msg: string) => void;
}

export const InteractivePortal: React.FC<InteractivePortalProps> = ({
  activeRole,
  onRoleChange,
  onOpenQuickLink,
  onFeedback,
}) => {
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [deadlines, setDeadlines] = useState(STUDENT_DEADLINES);
  const [showBellNotification, setShowBellNotification] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('This Semester');

  const handleAiAsk = (query: string) => {
    if (!query.trim()) return;
    setIsThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsThinking(false);
      let reply = '';
      if (AI_ASSISTANT_PRESETS[query]) {
        reply = AI_ASSISTANT_PRESETS[query];
      } else {
        reply = `⚡ AI Insight on "${query}": Found in Course Syllabus Week 7. Key takeaway: apply principle decomposition before synthesis. Related practice quiz is ready.`;
      }
      setAiResponse(reply);
      onFeedback?.(`AI Copilot: Generated response for "${query.slice(0, 24)}..."`);
    }, 450);
  };

  const toggleDeadline = (id: string) => {
    setDeadlines((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextState = !d.completed;
          onFeedback?.(
            nextState
              ? `✓ Completed: ${d.title}`
              : `↺ Marked pending: ${d.title}`
          );
          return { ...d, completed: nextState };
        }
        return d;
      })
    );
  };

  return (
    <div className="relative bg-white border-3 border-brandBlack shadow-brutal-xl p-4 sm:p-6 select-none">
      {/* Neo-Brutalist Top Tab Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-3 border-brandBlack">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brandBlack text-white flex items-center justify-center font-bold text-xs border border-brandBlack shadow-brutal-sm">
            CF
          </div>
          <span className="text-sm font-black uppercase tracking-tight text-brandBlack font-headline">
            CampusFlow Portal
          </span>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-1 bg-surface-container p-1 border-2 border-brandBlack">
          {(['STUDENT', 'FACULTY', 'PLACEMENT', 'ADMIN'] as RoleType[]).map((role) => (
            <button
              key={role}
              type="button"
              id={`tab-${role.toLowerCase()}`}
              onClick={() => onRoleChange(role)}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all font-headline cursor-pointer ${
                activeRole === role
                  ? 'bg-brandBlack text-white shadow-sm'
                  : 'text-brandBlack hover:bg-white'
              }`}
            >
              {role.charAt(0) + role.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            type="button"
            id="portal-bell-button"
            onClick={() => setShowBellNotification(!showBellNotification)}
            className="w-7 h-7 border-2 border-brandBlack bg-primary-container flex items-center justify-center shadow-brutal-sm hover:bg-[#d4ff00] cursor-pointer transition-colors"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5 text-brandBlack" />
          </button>

          {showBellNotification && (
            <div className="absolute right-0 top-9 w-64 bg-white border-2 border-brandBlack shadow-brutal p-3 z-50 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-brandBlack font-headline font-black uppercase">
                <span>Recent Alerts (3)</span>
                <button
                  type="button"
                  onClick={() => setShowBellNotification(false)}
                  className="hover:text-[#e63b2e]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <div className="p-1.5 bg-[#f5f0e8] border border-brandBlack">
                  <div className="font-bold text-[11px]">Goldman Sachs Drive Added</div>
                  <div className="text-[9px] text-slate-600">Register by May 20, 5:00 PM</div>
                </div>
                <div className="p-1.5 bg-[#f5f0e8] border border-brandBlack">
                  <div className="font-bold text-[11px]">Grades Published: CS402</div>
                  <div className="text-[9px] text-slate-600">Grade A- awarded by Prof. Sharma</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC DASHBOARD INTERNAL GRID BASED ON ACTIVE ROLE */}

      {activeRole === 'STUDENT' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Progress Overview */}
          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-black uppercase tracking-wide text-brandBlack font-headline">
                Progress Overview
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedSemester((prev) =>
                    prev === 'This Semester' ? 'Full Academic Year' : 'This Semester'
                  )
                }
                className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 border border-brandBlack hover:bg-[#ffcc00] transition-colors cursor-pointer"
              >
                {selectedSemester} ▾
              </button>
            </div>

            <div className="flex items-center gap-4 my-2">
              {/* Progress Donut Circle / Brutalist Gauge */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center bg-white border-2 border-brandBlack shadow-brutal-sm">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2ddd4"
                    strokeWidth="4.5"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e63b2e"
                    strokeDasharray="76, 100"
                    strokeLinecap="square"
                    strokeWidth="4.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-brandBlack font-headline">76%</span>
                </div>
              </div>

              {/* Quick Stats List */}
              <div className="space-y-2 text-xs flex-1 font-bold">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-700">
                    <span>Courses Done</span>
                    <span className="text-brandBlack font-black">12 / 16</span>
                  </div>
                  <div className="w-full h-2 bg-white border border-brandBlack mt-1 overflow-hidden">
                    <div className="w-3/4 h-full bg-primary-container" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-700">
                    <span>Assignments Done</span>
                    <span className="text-brandBlack font-black">28 / 36</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-700">
                    <span>Attendance</span>
                    <span className="text-tertiary font-black">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Study Assistant */}
          <div className="p-4 bg-primary-container border-2 border-brandBlack shadow-brutal-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase text-brandBlack flex items-center gap-1.5 font-headline">
                  <Sparkles className="w-3.5 h-3.5 fill-brandBlack" />
                  AI Study Assistant
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-brandBlack text-volt font-black uppercase border border-brandBlack">
                  New
                </span>
              </div>
              <p className="text-[11px] text-brandBlack font-medium">
                Ask anything, get personalized help.
              </p>
            </div>

            {/* Input & Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAiAsk(aiInput);
              }}
              className="mt-3 relative"
            >
              <input
                id="ai-study-input"
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Explain this concept..."
                className="w-full bg-white border-2 border-brandBlack px-3 py-1.5 text-xs text-brandBlack font-medium placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-brandBlack shadow-brutal-sm"
              />
              <button
                type="submit"
                id="ai-submit-button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-brandBlack font-black text-xs hover:text-[#0055ff] p-1"
                aria-label="Submit Question"
              >
                ➔
              </button>
            </form>

            {/* AI Response Display if available */}
            {isThinking && (
              <div className="mt-2 p-2 bg-white border border-brandBlack text-[10px] font-bold text-slate-700 animate-pulse">
                Thinking with Campus AI...
              </div>
            )}

            {aiResponse && !isThinking && (
              <div className="mt-2 p-2 bg-white border border-brandBlack text-[10px] text-brandBlack font-medium shadow-brutal-sm relative">
                <button
                  type="button"
                  onClick={() => setAiResponse(null)}
                  className="absolute top-1 right-1 text-slate-500 hover:text-black font-black"
                >
                  ✕
                </button>
                {aiResponse}
              </div>
            )}

            {/* Quick action chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Summarize notes', 'Study plan', 'Quiz'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setAiInput(chip);
                    handleAiAsk(chip);
                  }}
                  className="text-[10px] px-2 py-0.5 bg-white border border-brandBlack font-bold text-brandBlack hover:bg-volt cursor-pointer transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Upcoming Deadlines */}
          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-black uppercase tracking-wide text-brandBlack font-headline flex items-center gap-1.5">
                <span>Upcoming Deadlines</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white border border-brandBlack font-bold">
                  {deadlines.filter((d) => !d.completed).length} DUE
                </span>
              </span>
              <button
                type="button"
                onClick={() => onOpenQuickLink('Deadlines')}
                className="text-[10px] font-bold text-tertiary underline uppercase cursor-pointer hover:text-black transition-colors"
              >
                View all
              </button>
            </div>

            <div className="space-y-2">
              {deadlines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleDeadline(item.id)}
                  className={`group p-2.5 bg-white border-2 border-brandBlack flex items-center justify-between text-xs cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-brutal-sm active:translate-y-0.5 active:shadow-none ${
                    item.completed ? 'bg-emerald-50/70 border-emerald-900 opacity-75' : 'hover:bg-[#fff9e6]'
                  }`}
                  title={item.completed ? 'Click to mark pending' : 'Click to mark completed'}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`${item.colorClass} font-black text-sm leading-none`}>■</span>
                    <span
                      className={`text-brandBlack font-bold text-[11px] truncate ${
                        item.completed ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <span className="text-[10px] font-mono text-slate-600 font-bold">
                      {item.date}
                    </span>
                    <span
                      className={`text-[8px] font-black uppercase px-1.5 py-0.2 border border-brandBlack ${
                        item.completed
                          ? 'bg-[#d4ff00] text-brandBlack'
                          : 'bg-[#faf7f2] text-slate-700 group-hover:bg-[#ffcc00]'
                      }`}
                    >
                      {item.completed ? 'DONE ✓' : 'TAP'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Quick Access */}
          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-black uppercase tracking-wide text-brandBlack font-headline">
                Quick Access
              </span>
              <button
                type="button"
                onClick={() => onOpenQuickLink('Resources')}
                className="text-[10px] font-bold text-tertiary underline uppercase cursor-pointer hover:text-black transition-colors"
              >
                View all
              </button>
            </div>

            <div className="space-y-1.5">
              {['Course Dashboard', 'Timetable', 'Grades', 'Resources Hub'].map((link) => (
                <div
                  key={link}
                  onClick={() => {
                    onOpenQuickLink(link);
                    onFeedback?.(`Navigated to ${link}`);
                  }}
                  className="group flex items-center justify-between px-3 py-2 bg-white border-2 border-brandBlack hover:bg-volt hover:translate-x-1 hover:shadow-brutal-sm cursor-pointer text-[11px] font-black text-brandBlack transition-all duration-150 active:translate-x-0"
                >
                  <span className="group-hover:text-black">{link}</span>
                  <span className="font-bold transform transition-transform group-hover:translate-x-1">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FACULTY SCREEN VIEW */}
      {activeRole === 'FACULTY' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black uppercase text-brandBlack font-headline">Course Overview</span>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 border border-brandBlack">
                Spring '25
              </span>
            </div>
            <div className="text-xs font-black text-brandBlack">Design Thinking & Systems</div>
            <div className="h-14 flex items-end">
              <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 40">
                <polyline
                  fill="none"
                  points="0,35 25,18 50,28 75,10 100,5"
                  stroke="#111111"
                  strokeWidth="3"
                />
                <circle cx="100" cy="5" fill="#e63b2e" r="4" stroke="#111111" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] text-slate-700 font-bold border-t border-brandBlack pt-2">
              <span>Avg Class Score: 85%</span>
              <span className="text-[#0055ff]">On Track</span>
            </div>
          </div>

          <div className="p-4 bg-secondary-container border-2 border-brandBlack shadow-brutal-sm space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black uppercase text-brandBlack font-headline">Student Progress</span>
              <span className="text-[10px] font-bold underline cursor-pointer">View 48 students</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>Aarav Mehta (Team Lead)</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-white border border-brandBlack">
                  <div className="w-[85%] h-full bg-[#e63b2e]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>Neha Sharma (Project 2)</span>
                  <span>68%</span>
                </div>
                <div className="h-2 bg-white border border-brandBlack">
                  <div className="w-[68%] h-full bg-[#ffcc00]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm">
            <div className="text-xs font-black uppercase text-brandBlack font-headline mb-2">
              At a Glance
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-white border border-brandBlack">
                <div className="text-lg font-black font-headline">24</div>
                <div className="text-[9px] uppercase font-bold text-slate-600">Advisees</div>
              </div>
              <div className="p-2 bg-white border border-brandBlack">
                <div className="text-lg font-black font-headline">3</div>
                <div className="text-[9px] uppercase font-bold text-slate-600">Courses</div>
              </div>
              <div className="p-2 bg-white border border-brandBlack">
                <div className="text-lg font-black font-headline">7</div>
                <div className="text-[9px] uppercase font-bold text-slate-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-2">
            <div className="text-xs font-black uppercase text-brandBlack font-headline mb-1">
              Faculty Actions
            </div>
            <button
              type="button"
              onClick={() => onOpenQuickLink('Grade Submissions')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-brandBlack hover:bg-volt text-[11px] font-bold transition-all text-left"
            >
              <span>Submit Mid-Term Grades</span>
              <span>→</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenQuickLink('Office Hours')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-brandBlack hover:bg-volt text-[11px] font-bold transition-all text-left"
            >
              <span>Open Office Hours Booking</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* PLACEMENT SCREEN VIEW */}
      {activeRole === 'PLACEMENT' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-2">
            <div className="flex justify-between text-[11px] font-bold uppercase text-slate-700">
              <span>Placement Season</span>
              <span>2024 – 25</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-brandBlack font-headline">68%</span>
              <span className="text-[10px] font-bold text-slate-600">428 / 630 Placed</span>
            </div>
            <div className="w-full h-2.5 bg-white border border-brandBlack overflow-hidden">
              <div className="w-[68%] h-full bg-[#0055ff]" />
            </div>
            <div className="text-[10px] text-slate-600 font-bold pt-1">Target: 95% by June</div>
          </div>

          <div className="p-4 bg-tertiary-container border-2 border-brandBlack shadow-brutal-sm space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase font-headline">
              <span>Upcoming Drives</span>
              <span className="text-[#0055ff] underline cursor-pointer">Schedule</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 bg-white border border-brandBlack flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-brandBlack">Goldman Sachs</div>
                  <div className="text-[10px] text-slate-600">May 21, 2025</div>
                </div>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-white border border-brandBlack">
                  On Campus
                </span>
              </div>
              <div className="p-2 bg-white border border-brandBlack flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-brandBlack">Microsoft</div>
                  <div className="text-[10px] text-slate-600">May 24, 2025</div>
                </div>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[#d4ff00] border border-brandBlack">
                  Virtual
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm">
            <div className="text-xs font-black uppercase font-headline mb-2">Drive Metrics</div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-1.5 bg-white border border-brandBlack">
                <div className="text-base font-black font-headline">112</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Companies</div>
              </div>
              <div className="p-1.5 bg-white border border-brandBlack">
                <div className="text-base font-black font-headline">28</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Drives</div>
              </div>
              <div className="p-1.5 bg-white border border-brandBlack">
                <div className="text-base font-black font-headline">315</div>
                <div className="text-[8px] font-bold uppercase text-slate-600">Offers</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-1.5">
            <div className="text-xs font-black uppercase font-headline mb-1">Recruiter Hub</div>
            <button
              type="button"
              onClick={() => onOpenQuickLink('Resume Verification')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-brandBlack hover:bg-volt text-[11px] font-bold transition-all text-left"
            >
              <span>Verify Batch Resumes</span>
              <span>→</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenQuickLink('Interview Schedules')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-brandBlack hover:bg-volt text-[11px] font-bold transition-all text-left"
            >
              <span>Manage Slot Allocations</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ADMIN SCREEN VIEW */}
      {activeRole === 'ADMIN' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-2">
            <span className="text-[11px] font-black uppercase text-brandBlack font-headline">
              Platform Overview
            </span>
            <div className="grid grid-cols-4 gap-1 text-center pt-1">
              <div>
                <div className="text-xs font-black text-brandBlack">2,842</div>
                <div className="text-[7px] font-bold text-slate-600 uppercase">Users</div>
              </div>
              <div>
                <div className="text-xs font-black text-[#e63b2e]">1,932</div>
                <div className="text-[7px] font-bold text-slate-600 uppercase">Active</div>
              </div>
              <div>
                <div className="text-xs font-black text-brandBlack">24</div>
                <div className="text-[7px] font-bold text-slate-600 uppercase">Depts</div>
              </div>
              <div>
                <div className="text-xs font-black text-[#0055ff]">18</div>
                <div className="text-[7px] font-bold text-slate-600 uppercase">Integ.</div>
              </div>
            </div>
            <div className="text-[10px] text-emerald-700 font-bold mt-2">
              ● All Systems Operational (99.98% SLA)
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-brandBlack shadow-brutal-sm space-y-2 text-xs">
            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-700">
              <span>System Activity</span>
              <span>Last 7 days ▾</span>
            </div>
            <div className="h-10 flex items-end">
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30">
                <polyline
                  fill="none"
                  points="0,25 15,18 30,22 45,10 60,19 75,8 90,14 100,5"
                  stroke="#0055ff"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>

          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-1.5 text-xs">
            <div className="flex justify-between text-[11px] font-bold uppercase font-headline">
              <span>Tasks & Approvals</span>
              <span className="text-[#0055ff] underline cursor-pointer text-[10px]">View all</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold bg-white p-1.5 border border-brandBlack">
              <span>Approve Event Request</span>
              <span className="px-1.5 py-0.2 bg-[#ffcc00] border border-brandBlack">
                2 pending
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold bg-white p-1.5 border border-brandBlack">
              <span>Review New Integration</span>
              <span className="px-1.5 py-0.2 bg-[#ffcc00] border border-brandBlack">
                1 pending
              </span>
            </div>
          </div>

          <div className="p-4 bg-surface-low border-2 border-brandBlack shadow-brutal-sm space-y-1.5">
            <div className="text-xs font-black uppercase font-headline mb-1">
              Governance & Security
            </div>
            <button
              type="button"
              onClick={() => onOpenQuickLink('Role Permissions')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-brandBlack hover:bg-volt text-[11px] font-bold transition-all text-left"
            >
              <span>Manage Role Permissions</span>
              <span>→</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenQuickLink('Audit Trail')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-brandBlack hover:bg-volt text-[11px] font-bold transition-all text-left"
            >
              <span>Download Audit Logs</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom decorative motorsport corner notch */}
      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-brandBlack" />
    </div>
  );
};
