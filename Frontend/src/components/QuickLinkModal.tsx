import React from 'react';
import { X, Calendar, CheckSquare, Award, BookOpen, Trophy, Clock, MapPin, FileText } from 'lucide-react';
import {
  STUDENT_DEADLINES,
  STUDENT_APPLICATIONS,
  PLACEMENT_DRIVES,
  CAMPUS_EVENTS,
  WEEKLY_TIMETABLE,
  GRADE_BREAKDOWN,
  RESOURCES_HUB,
  STUDENT_ACCOUNTS,
} from '../data/mockData';
import { TimetableDay } from '../types';

interface QuickLinkModalProps {
  title: string | null;
  onClose: () => void;
  activeStudentEmail?: string;
}

const RESOURCE_TYPE_LABEL: Record<string, string> = {
  notes: 'Notes',
  slides: 'Slides',
  video: 'Video',
  book: 'Book',
  link: 'Link',
};

const ORDERED_DAYS: TimetableDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const todayLabel = () => {
  const d = new Date();
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

const todayDayIndex = () => {
  const idx = new Date().getDay(); // 0 = Sun
  return idx === 0 ? -1 : idx - 1; // align to Mon=0
};

export const QuickLinkModal: React.FC<QuickLinkModalProps> = ({ title, onClose, activeStudentEmail }) => {
  if (!title) return null;

  const studentIndex = Math.max(
    0,
    STUDENT_ACCOUNTS.findIndex((s) => s.email === activeStudentEmail)
  );
  const activeStudent = STUDENT_ACCOUNTS[studentIndex];
  const studentGrades = GRADE_BREAKDOWN[studentIndex] ?? GRADE_BREAKDOWN[0];
  const isTimetable = title.includes('Timetable');
  const isWide = isTimetable || title.includes('Resources') || title.includes('Course Dashboard');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full ${
          isWide ? 'max-w-3xl' : 'max-w-lg'
        } bg-[#faf7f2] border-3 border-brandBlack shadow-brutal-xl p-6 max-h-[88vh] overflow-y-auto`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b-3 border-brandBlack">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ffcc00] border border-brandBlack" />
            <h3 className="font-headline font-black text-lg uppercase tracking-tight text-brandBlack">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-white border border-brandBlack px-2 py-0.5 text-slate-600">
              {todayLabel()}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 border-2 border-brandBlack hover:bg-[#e63b2e] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============ TIMETABLE ============ */}
        {isTimetable ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-700 font-medium">
              Section A · Semester III · {WEEKLY_TIMETABLE.filter((s) => s.day === 'Mon').length}+ periods/day ·
              Live-synced from academic registry
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="bg-[#eee9e0] border border-brandBlack font-headline font-black uppercase">
                    <th className="p-1.5 border border-brandBlack">Day</th>
                    {ORDERED_DAYS.map((d) => {
                      const slots = WEEKLY_TIMETABLE.filter((s) => s.day === d);
                      return (
                        <th key={d} className={`p-1.5 border border-brandBlack ${todayDayIndex() === ORDERED_DAYS.indexOf(d) ? 'bg-[#ffcc00]' : ''}`}>
                          {d}
                          <span className="block text-[9px] font-mono font-bold text-slate-600">{slots.length} slots</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {['09:00', '10:00', '11:15', '14:00', '15:00', '16:00'].map((start) => (
                    <tr key={start}>
                      <td className="p-1 border border-brandBlack font-mono font-bold text-slate-600 whitespace-nowrap">{start}</td>
                      {ORDERED_DAYS.map((d) => {
                        const slot = WEEKLY_TIMETABLE.find((s) => s.day === d && s.start === start);
                        return (
                          <td
                            key={d}
                            className={`p-1 border border-brandBlack align-top ${
                              todayDayIndex() === ORDERED_DAYS.indexOf(d) ? 'bg-[#fff9e6]' : 'bg-white'
                            }`}
                          >
                            {slot ? (
                              <div className="space-y-0.5">
                                <div className="font-black text-brandBlack">{slot.code}</div>
                                <div className="text-[9px] text-slate-600 font-medium">{slot.subject}</div>
                                <div className="text-[9px] font-mono text-slate-500">{slot.room}</div>
                                <span
                                  className={`inline-block text-[8px] font-black uppercase px-1 py-px border border-brandBlack ${
                                    slot.type === 'Lab'
                                      ? 'bg-[#d4ff00]'
                                      : slot.type === 'Tutorial'
                                      ? 'bg-[#d6e3ff]'
                                      : 'bg-[#ffdad6]'
                                  }`}
                                >
                                  {slot.type}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-300">·</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[9px] font-mono text-slate-600">Legend:</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-[#ffdad6] border border-brandBlack">Lecture</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-[#d4ff00] border border-brandBlack">Lab</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-[#d6e3ff] border border-brandBlack">Tutorial</span>
            </div>
          </div>
        ) : title.includes('Grades') ? (
          /* ============ GRADES ============ */
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#fff9e6] border-2 border-brandBlack">
              <div>
                <div className="text-xs font-black text-brandBlack uppercase font-headline">{activeStudent.name}</div>
                <div className="text-[10px] text-slate-600 font-medium">{activeStudent.roll} · {activeStudent.program}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black font-headline text-brandBlack leading-none">{activeStudent.cgpa}</div>
                <div className="text-[9px] uppercase font-bold text-slate-600">CGPA</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#eee9e0] border border-brandBlack font-headline font-black uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border border-brandBlack">Course</th>
                    <th className="p-2 border border-brandBlack">Credits</th>
                    <th className="p-2 border border-brandBlack">Marks</th>
                    <th className="p-2 border border-brandBlack">Grade</th>
                    <th className="p-2 border border-brandBlack">Status</th>
                  </tr>
                </thead>
                <tbody className="font-medium">
                  {studentGrades.map((g) => (
                    <tr key={g.code} className="bg-white border border-brandBlack">
                      <td className="p-2 border border-brandBlack">
                        <span className="font-mono font-black text-brandBlack">{g.code}</span>
                        <span className="block text-[10px] text-slate-600">{g.name}</span>
                      </td>
                      <td className="p-2 border border-brandBlack text-slate-700">{g.credits}</td>
                      <td className="p-2 border border-brandBlack font-mono">{g.marks}</td>
                      <td className="p-2 border border-brandBlack">
                        <span className="inline-block px-1.5 py-0.5 bg-[#d6e3ff] border border-brandBlack font-black">
                          {g.grade}
                        </span>
                      </td>
                      <td className="p-2 border border-brandBlack">
                        <span className={`text-[9px] font-black uppercase ${g.status === 'Completed' ? 'text-[#34d399]' : 'text-[#ffcc00]'}`}>
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border border-brandBlack text-[10px] font-bold text-slate-700">
              <Award className="w-3.5 h-3.5" />
              {activeStudent.creditsDone} credits completed · SGPA {activeStudent.cgpa.toFixed(1)} · departmental rank #2
            </div>
          </div>
        ) : title.includes('Resources') ? (
          /* ============ RESOURCES HUB ============ */
          <div className="space-y-3">
            <p className="text-xs text-slate-700 font-medium">
              {RESOURCES_HUB.length} resources across {new Set(RESOURCES_HUB.map((r) => r.code)).size} subjects · Auto-tagged to your schedule
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RESOURCES_HUB.map((res) => (
                <div key={res.id} className="p-3 bg-white border-2 border-brandBlack flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-black text-brandBlack">{res.code}</span>
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-[#d6e3ff] border border-brandBlack">
                      {RESOURCE_TYPE_LABEL[res.type]}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-brandBlack leading-snug">{res.title}</div>
                  <div className="text-[10px] text-slate-600 font-medium leading-snug">{res.description}</div>
                  <div className="mt-auto flex items-center justify-between pt-1.5">
                    <span className="text-[9px] text-slate-500 font-medium">{res.subject}</span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-[9px] font-black uppercase bg-[#ffcc00] text-brandBlack border border-brandBlack px-2 py-0.5 hover:bg-[#d4ff00] cursor-pointer"
                    >
                      Open ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : title.includes('Course Dashboard') ? (
          /* ============ COURSE DASHBOARD ============ */
          <div className="space-y-3">
            <p className="text-xs text-slate-700 font-medium">
              <Clock className="w-3 h-3 inline mr-1" />
              {todayLabel()} · {STUDENT_DEADLINES.length} open assignments · {CAMPUS_EVENTS.filter((e) => e.kind === 'Hackathon').length} hackathon this month
            </p>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <CheckSquare className="w-3.5 h-3.5 text-brandBlack" />
                <span className="text-[11px] font-black uppercase font-headline text-brandBlack">Assignment Deadlines</span>
              </div>
              <div className="space-y-1.5">
                {STUDENT_DEADLINES.map((d) => (
                  <div key={d.id} className="p-2.5 bg-white border border-brandBlack flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={d.colorClass}>■</span>
                      <span className="font-bold text-brandBlack">{d.title}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-600">{d.date} · 11:59 PM</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Trophy className="w-3.5 h-3.5 text-brandBlack" />
                <span className="text-[11px] font-black uppercase font-headline text-brandBlack">Events · Hackathons · Drives</span>
              </div>
              <div className="space-y-1.5">
                {CAMPUS_EVENTS.map((e) => (
                  <div key={e.id} className="p-2.5 bg-white border border-brandBlack flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`${e.accent} font-black text-sm leading-none`}>■</span>
                      <div>
                        <div className="font-bold text-brandBlack">{e.title}</div>
                        <div className="flex items-center gap-2 text-[9px] text-slate-600 font-medium">
                          <span className="flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" />{e.date}</span>
                          <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{e.time}</span>
                          <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{e.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-[#fff9e6] border border-brandBlack shrink-0">
                      {e.kind}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : title.includes('Deadlines') ? (
          /* ============ DEADLINES ============ */
          <div className="space-y-3">
            <p className="text-xs text-slate-700 font-medium">
              All upcoming course deliverables, submissions, and events:
            </p>
            <div className="space-y-2">
              {STUDENT_DEADLINES.map((d) => (
                <div
                  key={d.id}
                  className="p-3 bg-white border-2 border-brandBlack flex items-center justify-between text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span className={d.colorClass}>■</span>
                    <span>{d.title}</span>
                  </div>
                  <span className="font-mono text-slate-600 font-bold">{d.date}, 11:59 PM</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-brandBlack pt-2">
              <div className="text-[10px] font-black uppercase font-headline text-brandBlack mb-2">Campus Calendar</div>
              <div className="space-y-1.5">
                {CAMPUS_EVENTS.slice(0, 5).map((e) => (
                  <div key={e.id} className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className={e.accent}>■</span> {e.title}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-600">{e.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : title.includes('Applications') ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-700 font-medium">
              Real-time synchronization with institutional placement portal:
            </p>
            <div className="space-y-2">
              {STUDENT_APPLICATIONS.map((app) => (
                <div
                  key={app.id}
                  className="p-3 bg-white border-2 border-brandBlack flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-brandBlack">{app.role}</div>
                    <div className="text-[10px] text-slate-600">{app.company}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 border border-brandBlack text-[10px] font-black uppercase ${app.statusColor}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-2 bg-white border border-brandBlack text-[10px] text-slate-600 font-medium">
              Next on-campus drive: {PLACEMENT_DRIVES[0].company} · {PLACEMENT_DRIVES[0].date}
            </div>
          </div>
        ) : title.includes('Placement') ? (
          <div className="space-y-2">
            {PLACEMENT_DRIVES.map((dr) => (
              <div key={dr.id} className="p-3 bg-white border-2 border-brandBlack flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-brandBlack">{dr.company}</div>
                  <div className="text-[10px] text-slate-600">{dr.type}</div>
                </div>
                <span className="font-mono font-bold text-slate-700">{dr.date}</span>
              </div>
            ))}
          </div>
        ) : (
          /* ============ GENERIC MODULE FALLBACK (no operational-status banner) ============ */
          <div className="space-y-3">
            <div className="p-4 bg-white border-2 border-brandBlack space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase text-brandBlack font-headline">
                <FileText className="w-4 h-4" />
                {title} Module
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Live data for this module is seeded from the institutional ERP. Today: {todayLabel()}. Open your role
                dashboard to see the latest records.
              </p>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-[#fff9e6] border border-brandBlack text-[10px] font-bold text-slate-700">
              <BookOpen className="w-3.5 h-3.5" />
              Quick access: from the Student / Faculty workspace any time.
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="btn-brutal w-full py-2.5 bg-[#ffcc00] font-headline text-xs font-black uppercase text-brandBlack mt-4"
        >
          Close Window
        </button>
      </div>
    </div>
  );
};