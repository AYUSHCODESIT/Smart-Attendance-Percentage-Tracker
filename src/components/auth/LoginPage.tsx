import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { demoAccounts } from '../../data/mockData';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, switchUser, setAuthPageMode, setActiveTab } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your institutional email address.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Invalid email format. Please provide a valid university email.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, role);
      setIsSubmitting(false);
    }, 600);
  };

  const handleQuickDemo = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword('ApexInstitutional#2026');
    setRole(account.role);
    setIsSubmitting(true);
    setTimeout(() => {
      switchUser(account.id);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Institutional Brand & Security Credentials Info */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-lg p-6 sm:p-8 flex flex-col justify-between border border-slate-800 shadow-md">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white leading-tight">
                  Apex Institute
                </h1>
                <p className="text-xs text-slate-400">Academic Portal & Attendance Gateway</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold block">
                Single Sign-On (SSO) & LDAP
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                Unified Portal for Real-Time Attendance & Academic Affairs
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log in using your verified university credentials to monitor course-wise attendance
                percentages, statutory examination eligibility warnings, and submit helpdesk
                disputes.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Statute 14.B 75% attendance threshold monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Biometric terminal verification and on-duty tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>End-semester exam registration and hall tickets</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>256-bit TLS Encrypted • Shibboleth SAML 2.0 Compliant</span>
          </div>
        </div>

        {/* Right Column: Main Login Form */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4 mb-5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Account Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your institutional identity credentials or select a verified demo profile below
              </p>
            </div>

            {/* Quick Demo Logins Bar */}
            <div className="mb-5 p-3 rounded-md bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Quick Select Verified Demo Accounts:</span>
                <span className="text-[10px] text-slate-400 font-mono">One-click test access</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickDemo(acc)}
                    className="p-2 rounded border border-slate-200 bg-white hover:bg-slate-100 text-left transition-colors text-xs"
                    title={`Sign in as ${acc.name} (${acc.role})`}
                  >
                    <div className="font-bold text-slate-900 truncate text-[11px]">
                      {acc.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-sky-700 uppercase font-mono font-semibold">
                      {acc.role}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label
                  htmlFor="login-email"
                  className="block font-semibold text-slate-700 mb-1"
                >
                  Institutional Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="e.g. ayush.sharma@apexuniversity.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="login-password"
                    className="font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthPageMode('reset')}
                    className="text-xs text-sky-700 hover:text-sky-900 underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter institutional account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="login-role"
                    className="block font-semibold text-slate-700 mb-1"
                  >
                    Role Designation
                  </label>
                  <select
                    id="login-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 font-medium text-xs bg-white focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="student">Student (Undergraduate / Postgraduate)</option>
                    <option value="teacher">Faculty / Course Instructor</option>
                    <option value="mentor">Academic Mentor / Counselor</option>
                    <option value="admin">University Administrator / Registrar</option>
                  </select>
                </div>

                <div className="flex items-center pt-5 sm:pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <span>Remember workstation session</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm mt-2 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Verifying with LDAP Server...' : 'Sign In with Institutional SSO'}</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-600">
            <div>
              New student or faculty member?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthPageMode('signup');
                  setActiveTab('signup');
                }}
                className="text-sky-700 font-semibold hover:underline"
              >
                Enroll / Sign Up Here
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              Directory v4.2 • Apex University
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
