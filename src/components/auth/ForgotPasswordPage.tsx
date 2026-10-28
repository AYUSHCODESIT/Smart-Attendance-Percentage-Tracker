import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { setAuthPageMode, setActiveTab } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid institutional email address.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="text-center border-b border-slate-100 pb-4 mb-5">
          <div className="w-10 h-10 rounded-md bg-slate-900 text-sky-400 flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Reset Portal Password
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Apex Institute Central Identity Management Service
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Recovery Instructions Dispatched</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              An encrypted password recovery link has been sent to{' '}
              <span className="font-mono font-semibold text-slate-800">{email}</span>. Please verify your
              inbox within 15 minutes.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setAuthPageMode('login');
                  setActiveTab('login');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4 text-xs sm:text-sm">
            {errorMessage && (
              <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter the institutional email address linked to your university account. We will dispatch
              a time-limited cryptographic token to verify your identity.
            </p>

            <div>
              <label htmlFor="reset-email" className="block font-semibold text-slate-700 mb-1">
                Institutional Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="reset-email"
                  type="email"
                  placeholder="e.g. ayush.sharma@apexuniversity.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
            >
              <span>Dispatch Recovery Link</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>

            <div className="text-center pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setAuthPageMode('login');
                  setActiveTab('login');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Institutional Login</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
