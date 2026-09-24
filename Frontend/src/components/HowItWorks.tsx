import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, Circle, RotateCcw, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface SetupStep {
  id: string;
  stepNum: string;
  title: string;
  description: string;
  details: string[];
  containerBg: string;
  badgeBg: string;
}

const SETUP_STEPS: SetupStep[] = [
  {
    id: 'connect_systems',
    stepNum: '01',
    title: 'Connect your campus systems',
    description: 'Integrate student information, HR, finance, and learning systems in minutes.',
    details: ['SIS & Banner/PeopleSoft Sync', 'Active Directory / Okta SSO', 'LMS Course Catalog Sync'],
    containerBg: 'bg-primary-container',
    badgeBg: 'bg-[#ffcc00]',
  },
  {
    id: 'automate_ai',
    stepNum: '02',
    title: 'Automate workflows with AI',
    description: 'Intelligent automation streamlines processes, reduces manual work, and eliminates errors.',
    details: ['AI Course Copilot & Tutoring', 'Automated Syllabus Processing', 'Real-Time Alert Dispatch'],
    containerBg: 'bg-volt',
    badgeBg: 'bg-volt',
  },
  {
    id: 'empower_roles',
    stepNum: '03',
    title: 'Empower every role',
    description: 'Give students, faculty, staff, and admins the right tools and insights to get work done.',
    details: ['Student Portal Provisioning', 'Faculty Grading Workspaces', 'Executive Governance View'],
    containerBg: 'bg-tertiary-container',
    badgeBg: 'bg-[#d6e3ff]',
  },
];

const STORAGE_KEY = 'campusflow_setup_tasks_progress';

interface HowItWorksProps {
  onFeedback?: (msg: string) => void;
  onRequestDemo?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onFeedback, onRequestDemo }) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      connect_systems: true, // initial completed default for realistic onboarding
      automate_ai: false,
      empower_roles: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
    } catch {
      // ignore
    }
  }, [completedTasks]);

  const toggleTask = (taskId: string, title: string) => {
    const nextState = !completedTasks[taskId];
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: nextState,
    }));

    if (nextState) {
      onFeedback?.(`Completed setup task: "${title}"`);
    } else {
      onFeedback?.(`Marked task as pending: "${title}"`);
    }
  };

  const handleResetProgress = () => {
    const cleared = {
      connect_systems: false,
      automate_ai: false,
      empower_roles: false,
    };
    setCompletedTasks(cleared);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleared));
    } catch {
      // ignore
    }
    onFeedback?.('Reset all campus setup tasks to pending');
  };

  const handleCompleteAll = () => {
    const allDone = {
      connect_systems: true,
      automate_ai: true,
      empower_roles: true,
    };
    setCompletedTasks(allDone);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allDone));
    } catch {
      // ignore
    }
    onFeedback?.('All campus onboarding tasks marked as 100% completed!');
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalCount = SETUP_STEPS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <section className="py-28 px-6 relative" id="how-it-works">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-brandBlack shadow-brutal-sm text-xs font-black uppercase tracking-wider font-headline">
            <span className="w-2.5 h-2.5 bg-brandBlack" />
            <span>SPEED & ONBOARDING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-brandBlack tracking-tight font-headline">
            From chaos to clarity in{' '}
            <span className="bg-volt px-2 border-2 border-brandBlack shadow-brutal-sm inline-block">
              three steps.
            </span>
          </h2>

          <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
            CampusFlow connects what you have, automates what you do, and empowers everyone. Track your institutional setup progress below.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="card-brutal p-6 sm:p-8 bg-[#fffefc] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-brandBlack pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-brandBlack text-white px-2.5 py-1 font-headline">
                  Setup Tracker
                </span>
                <span className="text-sm font-black font-headline text-brandBlack">
                  {completedCount} of {totalCount} Tasks Ready
                </span>
              </div>
              <p className="text-xs font-mono text-slate-600">
                Saved to your browser preferences for seamless campus onboarding.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCompleteAll}
                className="px-3 py-1.5 bg-[#d4ff00] hover:bg-[#ffcc00] border-2 border-brandBlack text-xs font-black uppercase font-headline shadow-brutal-sm hover:shadow-brutal transition-all cursor-pointer"
                title="Mark all 3 setup tasks ready"
              >
                Mark All Ready
              </button>
              <button
                type="button"
                onClick={handleResetProgress}
                className="p-1.5 bg-white hover:bg-slate-100 border-2 border-brandBlack text-brandBlack shadow-brutal-sm transition-all cursor-pointer"
                title="Reset progress to 0"
                aria-label="Reset progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-headline font-black uppercase">
              <span>Campus Deployment Readiness</span>
              <span className="font-mono text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full h-4 bg-[#eee9e0] border-2 border-brandBlack p-0.5 relative overflow-hidden">
              <div
                className={`h-full border border-brandBlack transition-all duration-500 ease-out ${
                  progressPercent === 100 ? 'bg-[#d4ff00]' : 'bg-[#ffcc00]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* All complete callout */}
          {progressPercent === 100 && (
            <div className="p-4 bg-[#eaffea] border-2 border-brandBlack shadow-brutal-sm flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00cc44] text-white border-2 border-brandBlack flex items-center justify-center font-bold">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase font-headline text-brandBlack">
                    All Setup Tasks Complete!
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Your institutional blueprint is fully configured and ready for live campus migration.
                  </p>
                </div>
              </div>
              {onRequestDemo && (
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="btn-brutal px-4 py-1.5 bg-[#ffcc00] text-xs font-black uppercase font-headline cursor-pointer hover:bg-[#d4ff00]"
                >
                  Schedule Final Handover
                </button>
              )}
            </div>
          )}
        </div>

        {/* 3-Step Process Flow with Interactive Completion Toggles */}
        <div className="relative">
          {/* Connecting Horizontal Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-1 bg-brandBlack z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8 relative z-10">
            {SETUP_STEPS.map((step) => {
              const isDone = Boolean(completedTasks[step.id]);

              return (
                <div
                  key={step.id}
                  className={`card-brutal p-7 text-left space-y-5 flex flex-col justify-between group transition-all duration-200 ${
                    isDone ? 'bg-[#fcfdf7] ring-2 ring-brandBlack' : 'bg-white'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top row: Number badge + Status */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-14 h-14 ${step.containerBg} border-3 border-brandBlack flex items-center justify-center font-black text-2xl font-headline shadow-brutal text-brandBlack group-hover:scale-105 transition-transform`}
                      >
                        {step.stepNum}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleTask(step.id, step.title)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-black uppercase font-headline border-2 border-brandBlack shadow-brutal-sm cursor-pointer transition-all ${
                          isDone
                            ? 'bg-[#d4ff00] text-brandBlack'
                            : 'bg-white hover:bg-[#eee9e0] text-slate-600'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-brandBlack stroke-[3]" />
                            <span>Ready</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                            <span>Pending</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Step Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase text-brandBlack font-headline leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Step sub-items */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                          <span className={`w-1.5 h-1.5 border border-brandBlack ${isDone ? 'bg-[#00cc44]' : 'bg-slate-300'}`} />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleTask(step.id, step.title)}
                    className={`w-full py-2 px-3 border-2 border-brandBlack font-headline text-xs font-black uppercase transition-all shadow-brutal-sm cursor-pointer ${
                      isDone
                        ? 'bg-white hover:bg-[#ffdad6] text-brandBlack'
                        : 'bg-[#ffcc00] hover:bg-[#d4ff00] text-brandBlack'
                    }`}
                  >
                    {isDone ? 'Mark as Incomplete' : 'Mark Task as Completed ✓'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
