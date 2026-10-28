import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, GraduationCap, Globe, LogIn, UserPlus } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setAuthPageMode } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 mt-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <GraduationCap className="w-5 h-5 text-sky-700" />
              <span>Apex Institute of Technology & Science</span>
            </div>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
              Official Academic Portal and Smart Attendance Percentage Tracking System. Real-time
              biometric verification, syllabus tracking, and examination clearance administration.
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Statutory Regulation Enforced: Ordinance Statute 14.B (75.0% Mandatory Attendance Rule)
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Academic Portals
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('attendance')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Attendance Tracker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('timetable')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Weekly Class Timetable
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('courseplan')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Syllabus & Lecture Plan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('exams')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Examinations & Hall Ticket
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('fees')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Fee Statements & Receipts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Authentication & Compliance */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Access & Compliance
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setAuthPageMode('login');
                    setActiveTab('login');
                  }}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Institutional Login Portal</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setAuthPageMode('signup');
                    setActiveTab('signup');
                  }}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                  <span>New Student / Faculty Enrollment</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Custom Domain & Settings</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('privacy')}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Institutional Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('terms')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Academic Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Server Health */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-slate-400">
          <div>
            &copy; 2024 - 2026 Apex Institute of Technology and Science. All rights reserved.
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span>Server: portal.apexuniversity.edu</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">SSL 256-bit Encrypted</span>
            <span>•</span>
            <span>LDAP Synced</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
