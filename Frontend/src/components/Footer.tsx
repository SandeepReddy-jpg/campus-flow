import React from 'react';
import { Box } from 'lucide-react';
import { RoleType } from '../types';

interface FooterProps {
  onSelectRole: (role: RoleType) => void;
  onRequestDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRole, onRequestDemo }) => {
  return (
    <footer className="border-t-3 border-brandBlack bg-white text-slate-800 text-xs py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Mission Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-container border-2 border-brandBlack flex items-center justify-center shadow-brutal-sm">
              <Box className="w-5 h-5 text-brandBlack" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black uppercase tracking-tight text-brandBlack font-headline">
              CampusFlow
            </span>
          </div>

          <p className="text-slate-700 font-medium text-xs max-w-sm leading-relaxed">
            The intelligent unified operating system for modern academic institutions. Connecting
            administration, students, and careers in one unified workspace.
          </p>

          <p className="text-[11px] font-mono text-slate-500 pt-4">
            © 2025 CampusFlow Inc. All rights reserved.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="space-y-3">
          <h4 className="font-black text-brandBlack text-xs tracking-wider uppercase font-headline border-b-2 border-brandBlack pb-1 inline-block">
            Product
          </h4>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                type="button"
                onClick={() => onSelectRole('STUDENT')}
                className="hover:underline hover:text-brandBlack cursor-pointer"
              >
                Unified Workflows
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectRole('FACULTY')}
                className="hover:underline hover:text-brandBlack cursor-pointer"
              >
                Role-Based Dashboards
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectRole('STUDENT')}
                className="hover:underline hover:text-brandBlack cursor-pointer"
              >
                AI Study Assistant
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectRole('PLACEMENT')}
                className="hover:underline hover:text-brandBlack cursor-pointer"
              >
                Placement Hub
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectRole('ADMIN')}
                className="hover:underline hover:text-brandBlack cursor-pointer"
              >
                Security & Compliance
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-black text-brandBlack text-xs tracking-wider uppercase font-headline border-b-2 border-brandBlack pb-1 inline-block">
            Solutions
          </h4>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#dashboards" className="hover:underline hover:text-brandBlack">
                Higher Education
              </a>
            </li>
            <li>
              <a href="#dashboards" className="hover:underline hover:text-brandBlack">
                Technical Institutes
              </a>
            </li>
            <li>
              <a href="#dashboards" className="hover:underline hover:text-brandBlack">
                Business Schools
              </a>
            </li>
            <li>
              <a href="#dashboards" className="hover:underline hover:text-brandBlack">
                Multi-Campus Systems
              </a>
            </li>
            <li>
              <a href="#dashboards" className="hover:underline hover:text-brandBlack">
                Integrations
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-black text-brandBlack text-xs tracking-wider uppercase font-headline border-b-2 border-brandBlack pb-1 inline-block">
            Company
          </h4>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="hover:underline hover:text-brandBlack">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-brandBlack">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-brandBlack">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-brandBlack">
                Terms of Service
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onRequestDemo}
                className="hover:underline hover:text-brandBlack text-left cursor-pointer"
              >
                Contact Support
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
