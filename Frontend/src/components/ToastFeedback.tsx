import React, { useEffect } from 'react';
import { Check, X, Sparkles } from 'lucide-react';

interface ToastFeedbackProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
}

export const ToastFeedback: React.FC<ToastFeedbackProps> = ({
  message,
  onDismiss,
  duration,
}) => {
  const isChangesSaved = message?.trim().toLowerCase().includes('changes saved');

  useEffect(() => {
    if (!message) return;
    // Use a brief auto-dismiss duration for "Changes Saved" (2000ms) or custom duration
    const displayDuration = duration ?? (isChangesSaved ? 2000 : 3200);
    const timer = setTimeout(() => {
      onDismiss();
    }, displayDuration);
    return () => clearTimeout(timer);
  }, [message, onDismiss, duration, isChangesSaved]);

  if (!message) return null;

  return (
    <aside
      id="toast-feedback-alert"
      aria-label="Notification alert"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 max-w-sm border-3 border-brandBlack shadow-brutal-xl p-3.5 flex items-center gap-3 transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 ${
        isChangesSaved ? 'bg-white' : 'bg-white'
      }`}
    >
      <div
        className={`w-7 h-7 border-2 border-brandBlack flex items-center justify-center shrink-0 ${
          isChangesSaved ? 'bg-[#d4ff00]' : 'bg-volt'
        }`}
      >
        <Check className="w-4 h-4 text-brandBlack stroke-[3]" />
      </div>

      <div className="flex-1 text-xs font-bold text-brandBlack leading-tight">
        {isChangesSaved ? (
          <div>
            <div className="flex items-center gap-1.5 font-headline font-black tracking-wide uppercase text-[11px] text-brandBlack">
              <span>Changes Saved</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            {message !== 'Changes Saved' && (
              <div className="text-[11px] font-medium text-slate-700 mt-0.5">
                {message.replace(/^changes saved\s*[-—:]?\s*/i, '')}
              </div>
            )}
          </div>
        ) : (
          message
        )}
      </div>

      <button
        type="button"
        id="toast-dismiss-btn"
        onClick={onDismiss}
        className="p-1 hover:bg-[#e63b2e] hover:text-white transition-colors cursor-pointer border border-transparent hover:border-brandBlack"
        aria-label="Dismiss feedback"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};

