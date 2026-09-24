import React, { useState, useEffect } from 'react';
import { Layers, ShieldCheck, Sparkles, LineChart, GripVertical, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { RoleType } from '../types';

interface PillarItem {
  id: string;
  title: string;
  role: RoleType;
  icon: React.ReactNode;
  iconBg: string;
  accentBar: string;
  description: string;
  actionText: string;
  defaultNum: string;
}

const DEFAULT_PILLARS: PillarItem[] = [
  {
    id: 'unified-workflows',
    title: 'Unified Workflows',
    role: 'STUDENT',
    icon: <Layers className="w-8 h-8" strokeWidth={2.5} />,
    iconBg: 'bg-primary-container',
    accentBar: 'bg-brandBlack',
    description: 'Streamline admissions, enrollment, advising, and administration with intelligent, end-to-end workflows.',
    actionText: 'Explore Student Workflow',
    defaultNum: '01',
  },
  {
    id: 'role-based-access',
    title: 'Role-Based Access',
    role: 'FACULTY',
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />,
    iconBg: 'bg-tertiary-container',
    accentBar: 'bg-tertiary',
    description: 'Secure, granular access tailored to every role—so the right people see the right information.',
    actionText: 'Explore Faculty Workflow',
    defaultNum: '02',
  },
  {
    id: 'ai-study-assistant',
    title: 'AI Study Assistant',
    role: 'STUDENT',
    icon: <Sparkles className="w-8 h-8" strokeWidth={2.5} />,
    iconBg: 'bg-volt',
    accentBar: 'bg-volt',
    description: '24/7 AI support helps students learn, plan, and stay on track with personalized guidance and instant answers.',
    actionText: 'Try Copilot Workflow',
    defaultNum: '03',
  },
  {
    id: 'real-time-insights',
    title: 'Real-Time Insights',
    role: 'ADMIN',
    icon: <LineChart className="w-8 h-8" strokeWidth={2.5} />,
    iconBg: 'bg-secondary-container',
    accentBar: 'bg-secondary',
    description: 'Dashboards and live analytics surface what matters, helping leaders make faster, data-informed decisions.',
    actionText: 'Explore Governance Workflow',
    defaultNum: '04',
  },
];

interface PillarsGridProps {
  onSelectRole: (role: RoleType) => void;
  onFeedback?: (msg: string) => void;
}

const STORAGE_KEY = 'campusflow_pillar_priorities_order';

export const PillarsGrid: React.FC<PillarsGridProps> = ({ onSelectRole, onFeedback }) => {
  const [pillars, setPillars] = useState<PillarItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedIds: string[] = JSON.parse(saved);
        const reordered = savedIds
          .map((id) => DEFAULT_PILLARS.find((p) => p.id === id))
          .filter((p): p is PillarItem => Boolean(p));
        if (reordered.length === DEFAULT_PILLARS.length) {
          return reordered;
        }
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_PILLARS;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Save to localStorage when order changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pillars.map((p) => p.id)));
    } catch {
      // ignore
    }
  }, [pillars]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // set data for compatibility
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...pillars];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);

    setPillars(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);

    onFeedback?.('Changes Saved');
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pillars.length) return;

    const updated = [...pillars];
    const [item] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, item);

    setPillars(updated);
    onFeedback?.('Changes Saved');
  };

  const handleResetOrder = () => {
    setPillars(DEFAULT_PILLARS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    onFeedback?.('Changes Saved');
  };

  const isCustomOrder = pillars.some((p, i) => p.id !== DEFAULT_PILLARS[i].id);

  return (
    <section className="py-24 px-6 relative" id="features">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-volt border-2 border-brandBlack shadow-brutal-sm text-xs font-black uppercase tracking-wider font-headline">
            <span>●</span> ARCHITECTURE & CAPABILITIES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-brandBlack tracking-tight font-headline">
            Everything your campus needs, in one place.
          </h2>

          <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
            CampusFlow brings together every essential workflow, tool, and insight so you can focus
            on what matters most: student success.
          </p>

          {/* Interactive Reorder Instructions & Reset Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-brandBlack shadow-brutal-sm">
              <GripVertical className="w-4 h-4 text-brandBlack shrink-0" />
              <span className="font-bold uppercase text-[11px] text-brandBlack">
                Drag cards to reorder personal campus priorities
              </span>
            </div>

            {isCustomOrder && (
              <button
                type="button"
                onClick={handleResetOrder}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8e3da] hover:bg-[#ffdad6] border-2 border-brandBlack text-brandBlack font-bold uppercase text-[11px] shadow-brutal-sm hover:shadow-brutal transition-all cursor-pointer"
                title="Reset order back to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Order</span>
              </button>
            )}
          </div>
        </div>

        {/* 2x2 Reorderable Grid with HTML5 Drag-and-Drop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const isDragging = draggedIndex === index;
            const isTargetOver = dragOverIndex === index && draggedIndex !== index;
            const priorityNumber = `0${index + 1}`;

            return (
              <div
                key={pillar.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => onSelectRole(pillar.role)}
                className={`card-brutal p-7 sm:p-8 flex flex-col justify-between relative group cursor-pointer transition-all duration-200 select-none ${
                  isDragging ? 'opacity-40 border-dashed scale-[0.98]' : ''
                } ${
                  isTargetOver
                    ? 'ring-4 ring-brandBlack bg-[#fff9e6] shadow-brutal-xl translate-y-[-4px]'
                    : ''
                }`}
              >
                {/* Top Row: Icon + Drag Handle + Priority Index Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-16 h-16 ${pillar.iconBg} border-3 border-brandBlack flex items-center justify-center text-brandBlack shadow-brutal-sm group-hover:rotate-3 transition-transform shrink-0`}
                    >
                      {pillar.icon}
                    </div>

                    {/* Drag Grip Handle */}
                    <div
                      className="p-1.5 bg-surface-high border-2 border-brandBlack text-brandBlack cursor-grab active:cursor-grabbing hover:bg-volt transition-colors"
                      title="Click and drag to reorder priority"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Priority & Quick Reorder Controls */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {/* Accessible Move Up / Down Buttons for mobile/keyboard */}
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'up')}
                        className={`p-1 border border-brandBlack bg-white text-brandBlack hover:bg-volt transition-all ${
                          index === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:shadow-brutal-sm'
                        }`}
                        title="Move Up"
                        aria-label={`Move ${pillar.title} up`}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        disabled={index === pillars.length - 1}
                        onClick={() => handleMove(index, 'down')}
                        className={`p-1 border border-brandBlack bg-white text-brandBlack hover:bg-volt transition-all ${
                          index === pillars.length - 1
                            ? 'opacity-30 cursor-not-allowed'
                            : 'cursor-pointer hover:shadow-brutal-sm'
                        }`}
                        title="Move Down"
                        aria-label={`Move ${pillar.title} down`}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black px-3 py-1 bg-brandBlack text-white border-2 border-brandBlack font-headline inline-block">
                        {priorityNumber}
                      </span>
                      <div className="text-[10px] font-mono font-bold uppercase text-slate-500 mt-1">
                        Priority
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillar Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase text-brandBlack font-headline">
                    {pillar.title}
                  </h3>
                  <div className={`w-12 h-1.5 ${pillar.accentBar}`} />
                  <p className="text-sm font-medium text-slate-700 leading-relaxed pt-1">
                    {pillar.description}
                  </p>
                  <div className="pt-4 flex items-center justify-between text-xs font-black uppercase font-headline text-brandBlack group-hover:text-[#0055ff]">
                    <span>{pillar.actionText}</span>
                    <span className="transform transition-transform group-hover:translate-x-1 font-bold">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
