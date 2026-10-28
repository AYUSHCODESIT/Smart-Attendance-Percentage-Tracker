import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Mail,
  User,
  GraduationCap,
  KeyRound,
  ShieldCheck,
  X,
  AlertCircle,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { demoAccounts } from '../../data/mockData';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, switchUser, currentUser } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid institutional university email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    login(email, role);
    setSuccessMessage('Authentication verified through institutional LDAP.');
    setTimeout(() => {
      setSuccessMessage('');
      setIsAuthModalOpen(false);
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.endsWith('.edu')) {
      setErrorMessage('New registration requires an authorized institutional .edu domain email.');
      return;
    }
    if (!studentId.trim()) {
      setErrorMessage('Official University Student / Faculty ID number is required.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Strong password of at least 8 characters required for security compliance.');
      return;
    }

    login(email, role);
    setSuccessMessage('Account registered and identity token linked.');
    setTimeout(() => {
      setSuccessMessage('');
      setIsAuthModalOpen(false);
    }, 800);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide your registered institutional email.');
      return;
    }
    setSuccessMessage('A secure password reset link has been dispatched to your institutional inbox.');
    setTimeout(() => {
      setSuccessMessage('');
      setAuthMode('login');
    }, 2000);
  };

  const selectQuickDemo = (demoAccount: typeof demoAccounts[0]) => {
    setEmail(demoAccount.email);
    setPassword('ApexUniversity#2026');
    setRole(demoAccount.role);
    if (demoAccount.studentId) {
      setStudentId(demoAccount.studentId);
    }
    switchUser(demoAccount.id);
    setIsAuthModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-md w-full p-6 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-sky-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-base font-semibold text-slate-900">
                {authMode === 'login'
                  ? 'Institutional SSO & LDAP Login'
                  : authMode === 'signup'
                  ? 'New University Account Enrollment'
                  : 'Reset Academic Account Password'}
              </h2>
              <p className="text-xs text-slate-500">Apex Institute Authentication Gateway</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-200 text-xs">
          <div className="font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Verified Demo Accounts:</span>
            <span className="text-[10px] text-slate-400">One-click sign in</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => selectQuickDemo(acc)}
                className={`p-1.5 rounded border text-left text-[11px] transition-colors ${
                  currentUser.id === acc.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold truncate">{acc.name}</div>
                <div className="text-[10px] opacity-80 uppercase font-mono">{acc.role}</div>
              </button>
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="mt-3 p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mt-3 p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Login Form */}
        {authMode === 'login' && (
          <form onSubmit={handleLogin} className="mt-4 space-y-3 text-xs">
            <div>
              <label htmlFor="login-email-input" className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email-input"
                  type="email"
                  placeholder="e.g. ayush.sharma@apexuniversity.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password-input" className="font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthMode('reset')}
                  className="text-sky-700 hover:text-sky-900 underline text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password-input"
                  type="password"
                  placeholder="Enter your university portal password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-role-select" className="block font-semibold text-slate-700 mb-1">Authorized Role Profile</label>
              <select
                id="login-role-select"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded border border-slate-300 font-medium bg-white"
              >
                <option value="student">Student (Undergraduate / Postgraduate)</option>
                <option value="teacher">Faculty / Course Instructor</option>
                <option value="mentor">Academic Mentor / Counselor</option>
                <option value="admin">Institutional Registrar / Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors mt-2"
            >
              Sign In with Institutional SSO
            </button>

            <div className="text-center pt-2 border-t border-slate-100 text-slate-600">
              Don't have an enrolled portal profile?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="text-sky-700 font-semibold hover:underline"
              >
                Register Here
              </button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignup} className="mt-4 space-y-3 text-xs">
            <div>
              <label htmlFor="signup-email-input" className="block font-semibold text-slate-700 mb-1">Official University Email (.edu)</label>
              <input
                id="signup-email-input"
                type="email"
                placeholder="student.name@apexuniversity.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label htmlFor="signup-studentid-input" className="block font-semibold text-slate-700 mb-1">University Student / Employee ID</label>
              <input
                id="signup-studentid-input"
                type="text"
                placeholder="AU2024-CS-XXXX or FAC-CS-XXX"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="signup-role-select" className="block font-semibold text-slate-700 mb-1">Designated Role</label>
                <select
                  id="signup-role-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-2.5 py-2 rounded border border-slate-300 bg-white"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Faculty</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="signup-department-input" className="block font-semibold text-slate-700 mb-1">Department</label>
                <input
                  id="signup-department-input"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-2.5 py-2 rounded border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password-input" className="block font-semibold text-slate-700 mb-1">Create Password (Min 8 Chars)</label>
              <input
                id="signup-password-input"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors mt-2"
            >
              Verify & Complete Registration
            </button>

            <div className="text-center pt-2 border-t border-slate-100 text-slate-600">
              Already have credentials?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-sky-700 font-semibold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Reset Password Form */}
        {authMode === 'reset' && (
          <form onSubmit={handleReset} className="mt-4 space-y-3 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Enter your verified university email. An encrypted authentication token will be
              dispatched to reset your credentials.
            </p>

            <div>
              <label htmlFor="reset-email-input" className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
              <input
                id="reset-email-input"
                type="email"
                placeholder="e.g. ayush.sharma@apexuniversity.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors mt-2"
            >
              Send Password Reset Link
            </button>

            <div className="text-center pt-2 border-t border-slate-100 text-slate-600">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-sky-700 font-semibold hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
