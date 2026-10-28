import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, AlertTriangle, TrendingUp, BookOpen } from 'lucide-react';

export const SemesterHistoryView: React.FC = () => {
  const { overallPercentage, isBelowThreshold } = useApp();

  const semesters = [
    {
      semester: 1,
      session: 'Autumn 2024',
      attendance: 88.4,
      totalHeld: 240,
      totalAttended: 212,
      credits: 22,
      sgpa: 8.54,
      status: 'Exam Cleared',
      isCurrent: false,
    },
    {
      semester: 2,
      session: 'Spring 2025',
      attendance: 84.2,
      totalHeld: 250,
      totalAttended: 210,
      credits: 24,
      sgpa: 8.58,
      status: 'Exam Cleared',
      isCurrent: false,
    },
    {
      semester: 3,
      session: 'Autumn 2025',
      attendance: 81.6,
      totalHeld: 245,
      totalAttended: 200,
      credits: 23,
      sgpa: 8.74,
      status: 'Exam Cleared',
      isCurrent: false,
    },
    {
      semester: 4,
      session: 'Spring 2026 (Current)',
      attendance: overallPercentage,
      totalHeld: 225,
      totalAttended: Math.round((225 * overallPercentage) / 100),
      credits: 22,
      sgpa: 8.65, // Projected
      status: isBelowThreshold ? 'Attendance Warning (< 75%)' : 'Eligible for Exams',
      isCurrent: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <h3 className="text-sm font-semibold text-slate-900">
          Semester-Wise Historical Attendance & Academic Trajectory
        </h3>
        <p className="text-xs text-slate-500">
          Official cumulative audit transcript from Semester 1 through current session
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Cumulative Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-semibold">Cumulative CGPA</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">8.62</div>
            <div className="text-[11px] text-emerald-700 font-medium">First Class with Distinction</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-semibold">Credits Earned</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">69 / 160</div>
            <div className="text-[11px] text-slate-500">Degree Requirement: 160</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-semibold">Historical Avg Attendance</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">84.7%</div>
            <div className="text-[11px] text-slate-500">Sem 1 - Sem 3 Mean</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-semibold">Current Semester 4</div>
            <div
              className={`text-lg font-bold font-mono mt-0.5 ${
                isBelowThreshold ? 'text-rose-600' : 'text-emerald-700'
              }`}
            >
              {overallPercentage}%
            </div>
            <div className="text-[11px] text-slate-500">
              {isBelowThreshold ? 'Immediate Action Needed' : 'Statutory Minimum Met'}
            </div>
          </div>
        </div>

        {/* Tabular History */}
        <div className="overflow-x-auto border border-slate-200 rounded-md">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-4">Semester</th>
                <th className="py-2.5 px-4">Academic Session</th>
                <th className="py-2.5 px-4 text-center">Classes Held</th>
                <th className="py-2.5 px-4 text-center">Attended</th>
                <th className="py-2.5 px-4 text-center">Attendance %</th>
                <th className="py-2.5 px-4 text-center">Credits</th>
                <th className="py-2.5 px-4 text-center">SGPA</th>
                <th className="py-2.5 px-4 text-center">Eligibility / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {semesters.map((s) => (
                <tr
                  key={s.semester}
                  className={`${
                    s.isCurrent ? 'bg-sky-50/40 font-medium' : 'hover:bg-slate-50'
                  } transition-colors`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    Semester {s.semester} {s.isCurrent && '(Active)'}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{s.session}</td>
                  <td className="py-3 px-4 text-center font-mono">{s.totalHeld}</td>
                  <td className="py-3 px-4 text-center font-mono text-emerald-700">
                    {s.totalAttended}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold">
                    <span
                      className={
                        s.attendance < 75 ? 'text-rose-600' : 'text-emerald-700'
                      }
                    >
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono">{s.credits}</td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-800">
                    {s.sgpa}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {s.isCurrent ? (
                      isBelowThreshold ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Admit Card Barred</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Eligible</span>
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Completed</span>
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
  );
};
