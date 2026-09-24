import React, { useState } from 'react';
import { X, Briefcase, ShieldCheck, GraduationCap, LogIn } from 'lucide-react';
import { RoleType, SignedInUser } from '../types';
import { STUDENT_ACCOUNTS } from '../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsRole: (role: RoleType) => void;
  /** Real backend sign-in. Resolves to an error message on failure, null on success. */
  onRealLogin: (email: string, password: string) => Promise<string | null>;
  /** Quick sign-in with a seeded student account (real backend auth). */
  onQuickLogin: (email: string, password: string) => Promise<string | null>;
  signedInUser: SignedInUser | null;
  onSignOut: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginAsRole,
  onRealLogin,
  onQuickLogin,
  signedInUser,
  onSignOut,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const DEMO_USERS: { role: RoleType; name: string; dept: string; idNumber: string; color: string; icon: React.ReactNode }[] = [
    {
      role: 'PLACEMENT',
      name: 'Arjun Nair',
      dept: 'Corporate Relations & Placement Cell',
      idNumber: 'OFFICER ID: TPO-2024',
      color: 'bg-[#d6e3ff]',
      icon: <Briefcase className="w-5 h-5 text-brandBlack" />
    },
    {
      role: 'ADMIN',
      name: 'Prof. K. Sharma',
      dept: 'Dean of Academic Operations & Registrar',
      idNumber: 'ROOT ADMIN PERMISSIONS',
      color: 'bg-[#d4ff00]',
      icon: <ShieldCheck className="w-5 h-5 text-brandBlack" />
    }
  ];

  const runLogin = async (key: string, fn: () => Promise<string | null>) => {
    setBusy(key);
    setError(null);
    try {
      const err = await fn();
      if (err) {
        setError(err);
      } else {
        onClose();
        setEmail('');
        setPassword('');
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#faf7f2] border-3 border-brandBlack shadow-brutal-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b-3 border-brandBlack">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#e63b2e] border border-brandBlack" />
            <h3 className="font-headline font-black text-lg uppercase tracking-tight text-brandBlack">
              CampusFlow Portal Sign In
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

        {signedInUser ? (
          <div className="space-y-3">
            <div className="p-3 bg-white border-2 border-brandBlack">
              <div className="text-[10px] font-black uppercase text-slate-500 font-headline">Signed in as</div>
              <div className="font-headline font-black text-sm uppercase text-brandBlack">{signedInUser.name}</div>
              <div className="text-[11px] text-slate-700">{signedInUser.email} • {signedInUser.roll}</div>
            </div>
            <button
              type="button"
              onClick={() => { onSignOut(); onClose(); }}
              className="btn-brutal w-full py-2 bg-white hover:bg-[#e63b2e] hover:text-white font-headline text-xs font-black uppercase cursor-pointer"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            {/* Real campus account sign-in */}
            <p className="text-xs text-slate-700 font-medium mb-2 font-headline font-black uppercase">
              Campus account sign in
            </p>
            <form
              className="space-y-2.5 p-3 bg-white border-2 border-brandBlack mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                runLogin('form', () => onRealLogin(email.trim(), password));
              }}
            >
              {error && (
                <div className="p-2 bg-[#fee2e2] border border-[#b91c1c] text-[#b91c1c] text-[11px] font-bold">
                  {error}
                </div>
              )}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@campus.edu"
                autoComplete="email"
                className="w-full bg-[#faf7f2] border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full bg-[#faf7f2] border-2 border-brandBlack px-3 py-2 text-xs font-medium focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy !== null}
                className="btn-brutal w-full py-2 bg-[#ffcc00] hover:bg-[#d4ff00] font-headline text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{busy === 'form' ? 'Signing in…' : 'Sign in'}</span>
              </button>
            </form>

            {/* Seeded student accounts */}
            <p className="text-xs text-slate-700 font-medium mb-2 font-headline font-black uppercase">
              Seeded student accounts
            </p>
            <div className="space-y-2.5 mb-4">
              {STUDENT_ACCOUNTS.map((s) => (
                <button
                  key={s.email}
                  type="button"
                  disabled={busy !== null}
                  onClick={() => runLogin(s.email, () => onQuickLogin(s.email, s.password))}
                  className="w-full p-3 bg-white border-2 border-brandBlack shadow-brutal-sm hover:shadow-brutal hover:bg-[#faf7f2] cursor-pointer transition-all flex items-center justify-between group text-left disabled:opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ffcc00] border-2 border-brandBlack flex items-center justify-center font-bold shadow-brutal-sm">
                      <GraduationCap className="w-5 h-5 text-brandBlack" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-black text-xs uppercase text-brandBlack">
                          {s.name}
                        </span>
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 border border-brandBlack bg-surface-container">
                          Student
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-700">{s.program} • Sem {s.semester}</div>
                      <div className="text-[9px] font-mono text-slate-500 font-bold">
                        ROLL: {s.roll} (CGPA {s.cgpa})
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-black font-headline uppercase px-3 py-1.5 border border-brandBlack bg-[#eee9e0] group-hover:bg-brandBlack group-hover:text-white transition-colors shrink-0">
                    {busy === s.email ? '…' : 'Sign In →'}
                  </span>
                </button>
              ))}
            </div>

            {/* Remaining demo personas */}
            <p className="text-xs text-slate-700 font-medium mb-2 font-headline font-black uppercase">
              Demo personas
            </p>
            <div className="space-y-2.5">
              {DEMO_USERS.map((user) => (
                <div
                  key={user.role}
                  onClick={() => {
                    onLoginAsRole(user.role);
                    onClose();
                  }}
                  className="p-3 bg-white border-2 border-brandBlack shadow-brutal-sm hover:shadow-brutal hover:bg-[#faf7f2] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${user.color} border-2 border-brandBlack flex items-center justify-center font-bold shadow-brutal-sm`}
                    >
                      {user.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-black text-xs uppercase text-brandBlack">
                          {user.name}
                        </span>
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 border border-brandBlack bg-surface-container">
                          {user.role} • Demo
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-700">{user.dept}</div>
                      <div className="text-[9px] font-mono text-slate-500 font-bold">{user.idNumber}</div>
                    </div>
                  </div>

                  <span className="text-xs font-black font-headline uppercase px-3 py-1.5 border border-brandBlack bg-[#eee9e0] group-hover:bg-brandBlack group-hover:text-white transition-colors">
                    Sign In →
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
