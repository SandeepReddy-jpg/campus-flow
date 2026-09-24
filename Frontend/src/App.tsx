/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RoleType, ScreenType, ThemeType, SignedInUser } from './types';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Navbar } from './components/Navbar';
import { ScreenNavMenu } from './components/ScreenNavMenu';
import { HeroSection } from './components/HeroSection';
import { TrustLogos } from './components/TrustLogos';
import { PillarsGrid } from './components/PillarsGrid';
import { RoleDashboardsGrid } from './components/RoleDashboardsGrid';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { LoginModal } from './components/LoginModal';
import { FullScreenRoleView } from './components/FullScreenRoleView';
import { QuickLinkModal } from './components/QuickLinkModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ToastFeedback } from './components/ToastFeedback';
import { STUDENT_ACCOUNTS } from './data/mockData';

const API_URL =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_API_URL ||
  'http://localhost:4000';

function mapBackendRole(role: string | undefined): RoleType {
  switch ((role || '').toLowerCase()) {
    case 'student':
      return 'STUDENT';
    case 'teacher':
    case 'hod':
      return 'FACULTY';
    case 'placement-office':
      return 'PLACEMENT';
    default:
      return 'ADMIN';
  }
}

export default function App() {
  const [activeRole, setActiveRole] = useState<RoleType>('STUDENT');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('OVERVIEW');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [fullScreenRole, setFullScreenRole] = useState<RoleType | null>(null);
  const [quickLinkTitle, setQuickLinkTitle] = useState<string | null>(null);
  const [signedInUser, setSignedInUser] = useState<SignedInUser | null>(null);
  const [activeStudentEmail, setActiveStudentEmail] = useState<string>(STUDENT_ACCOUNTS[0].email);
  const [theme, setTheme] = useState<ThemeType>(() => {
    try {
      const saved = localStorage.getItem('campusflow_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      if (saved === 'minimalist') return 'dark';
      if (saved === 'brutalist') return 'light';
    } catch {
      // fallback
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_theme', theme);
    } catch {
      // ignore
    }
    const isDark = theme === 'dark' || theme === 'minimalist';
    if (isDark) {
      document.documentElement.classList.add('dark', 'theme-dark');
      document.documentElement.classList.remove('light', 'theme-light', 'theme-minimalist');
      document.body.classList.add('dark', 'theme-dark');
      document.body.classList.remove('light', 'theme-light', 'theme-minimalist');
    } else {
      document.documentElement.classList.add('light', 'theme-light');
      document.documentElement.classList.remove('dark', 'theme-dark', 'theme-minimalist');
      document.body.classList.add('light', 'theme-light');
      document.body.classList.remove('dark', 'theme-dark', 'theme-minimalist');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const isCurrentlyDark = theme === 'dark' || theme === 'minimalist';
    const nextTheme: ThemeType = isCurrentlyDark ? 'light' : 'dark';
    setTheme(nextTheme);
    triggerFeedback(
      nextTheme === 'dark'
        ? 'Theme: Neo-Brutalist Dark Mode'
        : 'Theme: Neo-Brutalist Light Mode'
    );
  };

  const triggerFeedback = (msg: string) => {
    setToastMessage(msg);
  };

  const handleOpenSearch = () => {
    setIsGlobalSearchOpen(true);
    triggerFeedback('Opened Global Search [Ctrl+K]');
  };

  const handleCloseAnyActiveModal = () => {
    if (isGlobalSearchOpen) {
      setIsGlobalSearchOpen(false);
      triggerFeedback('Closed Global Search [Esc]');
      return;
    }
    if (isDemoModalOpen) {
      setIsDemoModalOpen(false);
      triggerFeedback('Closed Demo booking modal [Esc]');
      return;
    }
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
      triggerFeedback('Closed Login modal [Esc]');
      return;
    }
    if (quickLinkTitle) {
      setQuickLinkTitle(null);
      triggerFeedback('Closed Details inspector [Esc]');
      return;
    }
    if (fullScreenRole) {
      setFullScreenRole(null);
      triggerFeedback('Exited Full Screen view [Esc]');
      return;
    }
  };

  // Register global shortcuts: Ctrl+K / Cmd+K to search, Esc to close modals, Alt+1-4 to switch screens
  const { searchShortcutText } = useKeyboardShortcuts({
    onOpenSearch: handleOpenSearch,
    onCloseModal: handleCloseAnyActiveModal,
    onSelectRoleNumber: (num: number) => {
      const roles: RoleType[] = ['STUDENT', 'FACULTY', 'PLACEMENT', 'ADMIN'];
      if (num >= 1 && num <= 4) {
        handleSelectScreen(roles[num - 1]);
      }
    },
  });

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
    triggerFeedback('Opened Campus Demo booking form');
  };

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
    triggerFeedback('Opened Role Persona login portal');
  };

  const handleLoginAsRole = (role: RoleType) => {
    setActiveRole(role);
    setActiveScreen(role);
    setSignedInUser(null);
    setFullScreenRole(role);
    triggerFeedback(`Authenticated as ${role}`);
  };

  /** Real sign-in against the CampusFlow backend. Returns error text or null. */
  const handleRealLogin = async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await fetch(`${API_URL}/user-api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.token) {
        return data?.message || `Sign in failed (status ${res.status})`;
      }
      const p = data.payload || {};
      const role = mapBackendRole(p.role);
      const user: SignedInUser = {
        name: p.username || email,
        email: p.email || email,
        role,
        roll: p.id || '—',
      };
      setSignedInUser(user);
      setActiveRole(role);
      setActiveScreen(role);
      if (role === 'STUDENT') {
        const known = STUDENT_ACCOUNTS.some((s) => s.email.toLowerCase() === user.email.toLowerCase());
        setActiveStudentEmail(known ? user.email : STUDENT_ACCOUNTS[0].email);
      }
      try {
        localStorage.setItem('campusflow_token', data.token);
      } catch {
        // ignore storage failures
      }
      setFullScreenRole(role);
      triggerFeedback(`Signed in as ${user.name} (${role})`);
      return null;
    } catch {
      return 'Cannot reach the backend. Is it running on ' + API_URL + '?';
    }
  };

  const handleSignOut = () => {
    setSignedInUser(null);
    try {
      localStorage.removeItem('campusflow_token');
    } catch {
      // ignore
    }
    triggerFeedback('Signed out');
  };

  const handleExplore = () => {
    const el = document.getElementById('dashboards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    triggerFeedback('Scrolled to Role-Based Dashboards showcase');
  };

  const handleOpenQuickLink = (title: string) => {
    setQuickLinkTitle(title);
    triggerFeedback(`Opened detail inspector for "${title}"`);
  };

  const handleSelectScreen = (screen: ScreenType) => {
    setActiveScreen(screen);
    if (screen === 'OVERVIEW') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerFeedback('Switched to Overview & All Screens');
    } else {
      setActiveRole(screen as RoleType);
      triggerFeedback(`Active screen switched to ${screen} Screen`);
      const cardEl = document.getElementById(`card-${screen.toLowerCase()}-screen`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const dashboardsEl = document.getElementById('dashboards');
        if (dashboardsEl) dashboardsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenFullScreenRole = (role: RoleType) => {
    setActiveRole(role);
    setActiveScreen(role);
    setFullScreenRole(role);
    triggerFeedback(`Launched full-screen workspace for ${role}`);
  };

  // If user opened full screen dedicated role view
  if (fullScreenRole) {
    return (
      <>
        <FullScreenRoleView
          role={fullScreenRole}
          theme={theme}
          signedInUser={signedInUser}
          activeStudentEmail={activeStudentEmail}
          onSelectStudent={(email) => {
            setActiveStudentEmail(email);
            triggerFeedback('Switched student account');
          }}
          onClose={() => {
            setFullScreenRole(null);
            triggerFeedback('Returned to main dashboard');
          }}
          onSwitchRole={(newRole) => {
            setFullScreenRole(newRole);
            setActiveRole(newRole);
            setActiveScreen(newRole);
          }}
          onFeedback={triggerFeedback}
          onOpenSearch={handleOpenSearch}
          searchShortcutText={searchShortcutText}
        />

        <GlobalSearchModal
          isOpen={isGlobalSearchOpen}
          onClose={() => setIsGlobalSearchOpen(false)}
          onSelectScreen={handleSelectScreen}
          onRequestDemo={handleOpenDemo}
          onOpenLogin={handleOpenLogin}
          onOpenFullScreen={handleOpenFullScreenRole}
          onOpenQuickLink={handleOpenQuickLink}
          searchShortcutText={searchShortcutText}
        />

        <ToastFeedback
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-[#faf7f2] text-[#111111] font-body selection:bg-[#ffcc00] selection:text-black ${theme === 'minimalist' ? 'theme-minimalist' : ''}`}>
      {/* Sticky Top Header with Theme Controller */}
      <Navbar
        onRequestDemo={handleOpenDemo}
        onLoginClick={handleOpenLogin}
        activeScreen={activeScreen}
        onSelectScreen={handleSelectScreen}
        onOpenSearch={handleOpenSearch}
        searchShortcutText={searchShortcutText}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onFeedback={triggerFeedback}
      />

      {/* Screen Navigation Menu with Visual Active Indication */}
      <ScreenNavMenu
        activeScreen={activeScreen}
        onSelectScreen={handleSelectScreen}
        onOpenFullView={handleOpenFullScreenRole}
        onOpenSearch={handleOpenSearch}
        searchShortcutText={searchShortcutText}
      />

      <main>
        {/* Hero Section with Live Bauhaus Interactive Portal */}
        <HeroSection
          onRequestDemo={handleOpenDemo}
          onExplore={handleExplore}
          activeRole={activeRole}
          onRoleChange={(newRole) => {
            setActiveRole(newRole);
            setActiveScreen(newRole);
          }}
          onOpenQuickLink={handleOpenQuickLink}
          onFeedback={triggerFeedback}
        />

        {/* Institutional Trust Badges */}
        <TrustLogos />

        {/* Architecture & Capabilities (Drag-and-Drop Reorderable Grid) */}
        <PillarsGrid
          onSelectRole={(role) => {
            setActiveRole(role);
            setActiveScreen(role);
            const el = document.getElementById('dashboards');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            triggerFeedback(`Focused on ${role} capabilities`);
          }}
          onFeedback={triggerFeedback}
        />

        {/* Role-Based Dashboards (One Platform. Four Tailored Experiences.) */}
        <RoleDashboardsGrid
          activeRole={activeRole}
          onSelectRole={(role) => {
            setActiveRole(role);
            setActiveScreen(role);
            triggerFeedback(`Selected ${role} screen`);
          }}
          onOpenQuickLink={handleOpenQuickLink}
          onOpenFullScreenRole={handleOpenFullScreenRole}
          onFeedback={triggerFeedback}
        />

        {/* Speed & Onboarding (Three Steps Flow with Progress Tracker) */}
        <HowItWorks
          onFeedback={triggerFeedback}
          onRequestDemo={handleOpenDemo}
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Bottom CTA Block */}
        <CTASection
          onRequestDemo={handleOpenDemo}
          onExplore={handleExplore}
        />
      </main>

      {/* Brutalist Footer */}
      <Footer
        onSelectRole={(role) => {
          setActiveRole(role);
          setActiveScreen(role);
          triggerFeedback(`Selected ${role} screen`);
        }}
        onRequestDemo={handleOpenDemo}
      />

      {/* Interactive Modals */}
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onSelectScreen={handleSelectScreen}
        onRequestDemo={handleOpenDemo}
        onOpenLogin={handleOpenLogin}
        onOpenFullScreen={handleOpenFullScreenRole}
        onOpenQuickLink={handleOpenQuickLink}
        searchShortcutText={searchShortcutText}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultRole={activeRole}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginAsRole={handleLoginAsRole}
        onRealLogin={handleRealLogin}
        onQuickLogin={handleRealLogin}
        signedInUser={signedInUser}
        onSignOut={handleSignOut}
      />

      <QuickLinkModal
        title={quickLinkTitle}
        onClose={() => setQuickLinkTitle(null)}
        activeStudentEmail={activeStudentEmail}
      />

      {/* Clear Visual Feedback Toast */}
      <ToastFeedback
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}
