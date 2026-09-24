import React, { useEffect, useState, useRef } from 'react';
import { ThemeType } from '../types';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export interface TourStep {
  id: string;
  targetId: string;
  badge: string;
  title: string;
  description: string;
  hint?: string;
  placement?: 'bottom' | 'top' | 'center';
}

interface QuickTourTooltipProps {
  isOpen: boolean;
  stepIndex: number;
  steps: TourStep[];
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onJumpToStep: (index: number) => void;
  theme?: ThemeType;
}

export const QuickTourTooltip: React.FC<QuickTourTooltipProps> = ({
  isOpen,
  stepIndex,
  steps,
  onNext,
  onPrev,
  onClose,
  onJumpToStep,
  theme = 'brutalist',
}) => {
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const isMinimalist = theme === 'minimalist';

  // Highlight and scroll target into view
  useEffect(() => {
    if (!isOpen || !currentStep) return;

    const targetEl = document.getElementById(currentStep.targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.classList.add('tour-target-highlight');

      return () => {
        targetEl.classList.remove('tour-target-highlight');
      };
    }
  }, [isOpen, currentStep]);

  if (!isOpen || !currentStep) return null;

  return (
    <>
      {/* Subtle backdrop overlay with high z-index */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-50 pointer-events-auto transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Tour Card (Docked Bottom Right on Desktop, Bottom Center on Mobile) */}
      <div
        id="quick-tour-tooltip-container"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick Tour: ${currentStep.title}`}
        className={`fixed z-50 bottom-6 right-6 left-6 sm:left-auto sm:w-[420px] transition-all duration-200 ${
          isMinimalist
            ? 'bg-white rounded-xl border border-slate-200 shadow-2xl p-5 text-slate-800'
            : 'bg-[#fffef8] border-3 border-brandBlack shadow-brutal-xl p-5 text-[#111111]'
        }`}
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-brandBlack">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-[10px] font-headline font-black uppercase tracking-wider ${
                isMinimalist
                  ? 'bg-blue-100 text-blue-700 rounded'
                  : 'bg-[#d4ff00] border border-brandBlack text-brandBlack'
              }`}
            >
              {currentStep.badge}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              Step {stepIndex + 1} of {steps.length}
            </span>
          </div>

          <button
            type="button"
            id="tour-close-btn"
            onClick={onClose}
            className={`p-1 transition-colors cursor-pointer ${
              isMinimalist
                ? 'hover:bg-slate-100 rounded text-slate-500'
                : 'hover:bg-rose-100 border border-transparent hover:border-brandBlack text-brandBlack'
            }`}
            title="Exit Tour (Escape)"
            aria-label="Exit Quick Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tour Content */}
        <div className="py-4 space-y-2">
          <h3
            className={`text-base font-black uppercase font-headline leading-snug ${
              isMinimalist ? 'text-slate-900 normal-case font-bold text-lg' : 'text-brandBlack'
            }`}
          >
            {currentStep.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {currentStep.description}
          </p>

          {currentStep.hint && (
            <div
              className={`mt-2.5 p-2 text-xs flex items-start gap-2 ${
                isMinimalist
                  ? 'bg-slate-50 rounded text-slate-600 border border-slate-200'
                  : 'bg-[#f5f0e8] border border-brandBlack text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0055ff] shrink-0 mt-0.5" />
              <span className="text-[11px] font-mono">{currentStep.hint}</span>
            </div>
          )}
        </div>

        {/* Step Progress Dots & Navigation Controls */}
        <div className="pt-3 border-t-2 border-brandBlack flex items-center justify-between gap-2">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onJumpToStep(idx)}
                aria-label={`Jump to Tour Step ${idx + 1}`}
                className={`w-2.5 h-2.5 transition-all cursor-pointer ${
                  isMinimalist ? 'rounded-full' : 'border border-brandBlack'
                } ${
                  idx === stepIndex
                    ? isMinimalist
                      ? 'bg-blue-600 w-5'
                      : 'bg-volt w-4'
                    : isMinimalist
                    ? 'bg-slate-300 hover:bg-slate-400'
                    : 'bg-white hover:bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="tour-prev-btn"
              onClick={onPrev}
              disabled={stepIndex === 0}
              className={`px-2.5 py-1 text-xs font-headline font-bold uppercase transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isMinimalist
                  ? 'text-slate-600 hover:bg-slate-100 rounded'
                  : 'bg-white hover:bg-slate-100 border border-brandBlack text-brandBlack'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              id="tour-next-btn"
              onClick={onNext}
              className={`px-3 py-1 text-xs font-headline font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shadow-brutal-xs hover:shadow-brutal ${
                isMinimalist
                  ? 'bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm'
                  : 'bg-[#ffcc00] hover:bg-volt text-brandBlack border-2 border-brandBlack'
              }`}
            >
              <span>{isLastStep ? 'Finish Tour' : 'Next'}</span>
              {isLastStep ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
