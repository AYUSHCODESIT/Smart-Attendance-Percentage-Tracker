import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { UserRole } from '../../types';

export const SignupPage: React.FC = () => {
  const { signup, setAuthPageMode, setActiveTab } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [studentId, setStudentId] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [program, setProgram] = useState('Bachelor of Technology (B.Tech)');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToStatute, setAgreedToStatute] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Full legal name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('A valid institutional email address is required.');
      return;
    }
    if (!email.toLowerCase().endsWith('.edu')) {
      setErrorMessage('Portal enrollment requires an authorized university domain email ending in .edu (e.g. name@apexuniversity.edu).');
      return;
    }
    if (!studentId.trim()) {
      setErrorMessage('University Student ID / Employee ID is required.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters in length for institutional security.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (!agreedToStatute) {
      setErrorMessage('You must acknowledge and accept University Attendance Statute 14.B (75% mandatory threshold) to complete enrollment.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      signup({
        name,
        email,
        role,
        studentId,
        rollNumber: rollNumber || `26${role.slice(0, 2).toUpperCase()}101`,
        department,
        program,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Academic Guidelines & Compliance */}
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
                <p className="text-xs text-slate-400">Directorate of Academic Enrollment</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold block">
                Official Registration
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                New Student & Faculty Portal Credentialing
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enroll your university identifier to activate automated biometric attendance tracking,
                access lecture schedules, submit continuous assessments, and register for examinations.
              </p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-md border border-slate-700 space-y-2 text-xs">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-sky-400" />
                <span>Statute 14.B Attendance Compliance</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                By registering, you acknowledge the university requirement of maintaining a minimum of
                75.0% attendance in all registered lecture and laboratory hours for exam eligibility.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>FERPA & Institutional Privacy Standards Compliant</span>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4 mb-5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Create Institutional Profile
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Please complete all fields with your verified university registrar information
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-name" className="block font-semibold text-slate-700 mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="e.g. Ayush Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-role" className="block font-semibold text-slate-700 mb-1">
                    Role Category
                  </label>
                  <select
                    id="signup-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-slate-900 bg-white"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Faculty / Course Instructor</option>
                    <option value="mentor">Academic Mentor / Counselor</option>
                    <option value="admin">University Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block font-semibold text-slate-700 mb-1">
                  Institutional Email Address (.edu)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="e.g. student.name@apexuniversity.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-studentid" className="block font-semibold text-slate-700 mb-1">
                    Student ID / Employee Code
                  </label>
                  <input
                    id="signup-studentid"
                    type="text"
                    placeholder="AU2024-CS-XXXX"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="signup-rollnumber" className="block font-semibold text-slate-700 mb-1">
                    University Roll Number
                  </label>
                  <input
                    id="signup-rollnumber"
                    type="text"
                    placeholder="24CS108"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-dept" className="block font-semibold text-slate-700 mb-1">
                    Academic Department
                  </label>
                  <select
                    id="signup-dept"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-slate-900 bg-white"
                  >
                    <option value="Computer Science and Engineering">Computer Science & Engineering</option>
                    <option value="Electronics and Communication">Electronics & Communication</option>
                    <option value="Department of Mathematics">Mathematics & Computing</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Dean of Student Affairs">Student Affairs & Counseling</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="signup-program" className="block font-semibold text-slate-700 mb-1">
                    Program / Degree
                  </label>
                  <input
                    id="signup-program"
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-pwd" className="block font-semibold text-slate-700 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="signup-pwd"
                      type="password"
                      placeholder="Min 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-confirmpwd" className="block font-semibold text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="signup-confirmpwd"
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Statute 14.B Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={agreedToStatute}
                    onChange={(e) => setAgreedToStatute(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 shrink-0"
                  />
                  <span className="leading-relaxed">
                    I acknowledge and agree to University Academic Regulations (including Section 14.B
                    mandatory 75.0% attendance threshold for examination eligibility) and the
                    Institutional Privacy Policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm mt-3 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Registering with Registrar Database...' : 'Complete University Enrollment'}</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-600">
            <div>
              Already have verified credentials?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthPageMode('login');
                  setActiveTab('login');
                }}
                className="text-sky-700 font-semibold hover:underline"
              >
                Sign In to Portal
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              Registrar Office • Academic Session 2024 - 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
