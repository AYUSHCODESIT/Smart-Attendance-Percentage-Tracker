import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Bell,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchUser,
    activeTab,
    setActiveTab,
    isAuthenticated,
    logout,
    setAuthPageMode,
  } = useApp();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Institution Info */}
          <button
            type="button"
            onClick={() => setActiveTab('attendance')}
            className="flex items-center gap-3 text-left focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight text-white text-base">
                  Apex Academic Portal
                </span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
                  v4.2-PROD
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart Attendance Percentage Tracker & Student Records Management System
              </p>
            </div>
          </button>

          {/* Quick Demo Role Switcher for seamless testing */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center bg-slate-800/80 p-1 rounded-md border border-slate-700 text-xs">
              <span className="text-slate-400 px-2 font-medium">Active Role:</span>
              <button
                type="button"
                onClick={() => switchUser('student')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currentUser.role === 'student' && activeTab !== 'login' && activeTab !== 'signup'
                    ? 'bg-sky-600 text-white font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => switchUser('teacher')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currentUser.role === 'teacher' && activeTab !== 'login' && activeTab !== 'signup'
                    ? 'bg-sky-600 text-white font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => switchUser('mentor')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currentUser.role === 'mentor' && activeTab !== 'login' && activeTab !== 'signup'
                    ? 'bg-sky-600 text-white font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Mentor
              </button>
              <button
                type="button"
                onClick={() => switchUser('admin')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currentUser.role === 'admin' && activeTab !== 'login' && activeTab !== 'signup'
                    ? 'bg-sky-600 text-white font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          {/* User Profile & Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('attendance')}
                  className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 relative transition-colors"
                  title="Notifications & System Logs"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                </button>

                <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

                <div className="flex items-center gap-2.5 pl-1">
                  <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <User className="w-4 h-4" />
                  </div>

                  <div className="text-left hidden md:block">
                    <div className="text-xs font-medium text-white flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-sky-300 border border-slate-700 uppercase">
                        {currentUser.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {currentUser.studentId ? currentUser.studentId : currentUser.email}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-rose-200 border border-slate-700 transition-colors ml-1"
                    title="Sign Out of Portal"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthPageMode('login');
                    setActiveTab('login');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === 'login'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthPageMode('signup');
                    setActiveTab('signup');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === 'signup'
                      ? 'bg-sky-600 text-white'
                      : 'bg-white hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
