import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { RoleType } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: RoleType;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, defaultRole = 'STUDENT' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    institution: '',
    role: defaultRole,
    studentCount: '5,000 - 15,000 Students',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#faf7f2] border-3 border-brandBlack shadow-brutal-xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Top brutalist bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-3 border-brandBlack">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ffcc00] border border-brandBlack" />
            <h3 className="font-headline font-black text-lg uppercase tracking-tight text-brandBlack">
              {submitted ? 'Demo Scheduled' : 'Request a Campus Demo'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 border-2 border-brandBlack hover:bg-[#e63b2e] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="space-y-4 py-4 text-center">
            <div className="w-16 h-16 mx-auto bg-[#d4ff00] border-3 border-brandBlack flex items-center justify-center shadow-brutal">
              <Check className="w-8 h-8 text-brandBlack stroke-[3]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black font-headline uppercase text-brandBlack">
                You're all set!
              </h4>
              <p className="text-xs text-slate-700 font-medium max-w-sm mx-auto">
                We've reserved a personalized campus walkthrough for{' '}
                <span className="font-bold text-black">{formData.institution || 'your institution'}</span>.
                Check your inbox at <span className="font-bold text-black">{formData.workEmail || 'your email'}</span>.
              </p>
            </div>
            <div className="p-3 bg-white border-2 border-brandBlack text-left text-xs space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 font-headline">Demo Reference</div>
              <div className="font-mono font-bold text-sm text-brandBlack">CF-DEMO-2025-{Math.floor(1000 + Math.random() * 9000)}</div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="btn-brutal w-full py-3 bg-[#ffcc00] text-brandBlack font-black font-headline uppercase text-sm"
            >
              Return to CampusFlow
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-700 font-medium">
              Discover how CampusFlow brings admissions, courses, student advising, and campus placements into one unified hub.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-black uppercase font-headline text-brandBlack mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Dr. Rajesh Verma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none shadow-brutal-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase font-headline text-brandBlack mb-1">
                  Institutional Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="r.verma@iitd.ac.in"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full bg-white border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none shadow-brutal-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase font-headline text-brandBlack mb-1">
                    Institution
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="IIT Delhi / University"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-white border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none shadow-brutal-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase font-headline text-brandBlack mb-1">
                    Primary Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as RoleType })}
                    className="w-full bg-white border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none shadow-brutal-sm"
                  >
                    <option value="ADMIN">Dean / Campus Leadership</option>
                    <option value="FACULTY">Faculty / Department Head</option>
                    <option value="PLACEMENT">Placement Director</option>
                    <option value="STUDENT">Student Representative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase font-headline text-brandBlack mb-1">
                  Campus Scale
                </label>
                <select
                  value={formData.studentCount}
                  onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                  className="w-full bg-white border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none shadow-brutal-sm"
                >
                  <option>Under 2,500 Students</option>
                  <option>2,500 - 10,000 Students</option>
                  <option>10,000 - 30,000 Students</option>
                  <option>30,000+ Multi-Campus System</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-brutal w-full py-3 bg-[#ffcc00] hover:bg-[#d4ff00] text-brandBlack font-black font-headline uppercase text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Demo Request</span>
                <span>→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
