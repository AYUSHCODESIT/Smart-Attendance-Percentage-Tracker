import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { examSchedule, semesterResults } from '../../data/mockData';
import {
  Award,
  Calendar,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Download,
  FileCheck2,
  FileBadge,
  Printer,
} from 'lucide-react';

export const ExaminationsView: React.FC = () => {
  const { overallPercentage, isBelowThreshold, setIsTargetCalculatorOpen, currentUser } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'datesheet' | 'registration' | 'results'>('datesheet');
  const [selectedSemester, setSelectedSemester] = useState<number>(3);

  const activeResult = semesterResults.find((r) => r.semesterNumber === selectedSemester) || semesterResults[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Examinations Directorate & Hall Ticket Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            End-semester final datesheets, statutory 75% attendance clearance, and official grade sheets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1.5 rounded border ${
              isBelowThreshold
                ? 'bg-rose-100 text-rose-800 border-rose-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
          >
            {isBelowThreshold ? 'Admit Card Withheld (< 75%)' : 'Eligible for Hall Ticket'}
          </span>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('datesheet')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'datesheet'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Exam Date Sheet & Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('registration')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'registration'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <FileBadge className="w-4 h-4" />
            <span>Exam Registration & Admit Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('results')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'results'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Semester Results & Grade Sheets</span>
          </button>
        </div>
      </div>

      {/* Date Sheet Tab */}
      {activeSubTab === 'datesheet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="font-semibold text-slate-900 text-sm">
                End-Semester Examination Time Table (November 2026)
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Chief Superintendent Office • Hall Block A & Block B
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Date Sheet</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Subject Code</th>
                    <th className="py-3 px-4">Course Title</th>
                    <th className="py-3 px-3 text-center">Examination Hall</th>
                    <th className="py-3 px-3 text-center">Seat Allocation</th>
                    <th className="py-3 px-3 text-center">Attendance Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {examSchedule.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono whitespace-nowrap">
                        <div className="font-bold text-slate-900">{item.examDate}</div>
                        <div className="text-[11px] text-slate-500">{item.timeSlot}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-sky-800">
                        {item.courseCode}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{item.courseName}</td>
                      <td className="py-3 px-3 text-center font-mono text-xs">{item.hallNumber}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                        {item.seatNumber}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        {item.attendanceEligible && !isBelowThreshold ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Cleared</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Attendance Shortage</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Registration & Admit Card Tab */}
      {activeSubTab === 'registration' && (
        <div className="space-y-4">
          {/* Statutory 75% Check Alert Box */}
          {isBelowThreshold ? (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-5 space-y-3 text-rose-950">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-900">
                    ADMIT CARD LOCKED: Mandatory Attendance Threshold Not Satisfied
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
                    Under Academic Regulation Statute 14.B, your overall attendance standing of{' '}
                    <strong className="font-mono font-bold text-rose-950">{overallPercentage}%</strong> is
                    below the statutory minimum threshold of 75.0%. Your hall ticket issuance is
                    currently withheld.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTargetCalculatorOpen(true)}
                  className="px-3.5 py-1.5 rounded-md bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-xs"
                >
                  Calculate Classes Needed for Clearance
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 space-y-3 text-emerald-950">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-900">
                    ELIGIBILITY CLEARED: Official Hall Ticket Generated
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                    Your overall attendance standing of{' '}
                    <strong className="font-mono font-bold text-emerald-950">{overallPercentage}%</strong>{' '}
                    satisfies statutory examination criteria. Hall Ticket Number:{' '}
                    <span className="font-mono font-bold text-slate-900">HT-2026-CS-0842</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hall Ticket Preview Card */}
          <div className="bg-white rounded-lg border border-slate-300 p-6 shadow-xs max-w-2xl mx-auto space-y-5">
            <div className="text-center border-b border-slate-200 pb-4">
              <div className="font-bold text-base text-slate-900 uppercase tracking-wide">
                Apex Institute of Technology & Science
              </div>
              <div className="text-xs text-slate-500">
                End-Semester Examination Hall Ticket • Semester 4 (2024 - 2025)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Candidate Name:</span>
                <div className="font-bold text-slate-900">{currentUser.name}</div>
              </div>
              <div>
                <span className="text-slate-500">Roll Number:</span>
                <div className="font-mono font-bold text-slate-900">{currentUser.rollNumber}</div>
              </div>
              <div>
                <span className="text-slate-500">Student ID:</span>
                <div className="font-mono font-bold text-slate-900">{currentUser.studentId}</div>
              </div>
              <div>
                <span className="text-slate-500">Department / Program:</span>
                <div className="font-medium text-slate-900">{currentUser.department}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-700">Audit Status:</span>
              <span
                className={`font-mono font-bold ${
                  isBelowThreshold ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                Attendance: {overallPercentage}% • {isBelowThreshold ? 'Locked' : 'Issued'}
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isBelowThreshold}
                onClick={() => alert('Official Hall Ticket PDF downloaded successfully.')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold shadow-xs transition-colors ${
                  isBelowThreshold
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download Official Hall Ticket PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results & Grade Sheets Tab */}
      {activeSubTab === 'results' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Select Past Semester:</span>
              {[1, 2, 3].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
                    selectedSemester === sem
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Semester {sem}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500">
                Semester SGPA:{' '}
                <strong className="font-mono text-slate-900 text-sm">{activeResult.sgpa}</strong>
              </span>
              <span className="text-slate-500">
                Cumulative CGPA:{' '}
                <strong className="font-mono text-slate-900 text-sm">{activeResult.cgpa}</strong>
              </span>
            </div>
          </div>

          {/* Grade Sheet Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Course Code</th>
                    <th className="py-3 px-4">Course Title</th>
                    <th className="py-3 px-3 text-center">Credits</th>
                    <th className="py-3 px-3 text-center">Letter Grade</th>
                    <th className="py-3 px-3 text-center">Grade Points</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {activeResult.grades.map((grade) => (
                    <tr key={grade.courseCode} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {grade.courseCode}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{grade.courseName}</td>
                      <td className="py-3 px-3 text-center font-mono">{grade.credits}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-sky-800">
                        {grade.gradeEarned}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-800">
                        {grade.gradePoints}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {grade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
