import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Percent,
  Calculator,
  AlertTriangle,
  Clock,
  Calendar,
  Layers,
  History,
  Download,
} from 'lucide-react';
import { SubjectBreakdownTable } from './SubjectBreakdownTable';
import { TodayRosterView } from './TodayRosterView';
import { DateWiseLogView } from './DateWiseLogView';
import { PeriodSlotView } from './PeriodSlotView';
import { SemesterHistoryView } from './SemesterHistoryView';
import { TargetCalculatorModal } from './TargetCalculatorModal';

export const AttendanceOverview: React.FC = () => {
  const {
    totalScheduled,
    totalPresent,
    totalAbsent,
    overallPercentage,
    isBelowThreshold,
    classesNeededFor75,
    classesCanAffordToMiss,
    attendanceSubTab,
    setAttendanceSubTab,
    setIsTargetCalculatorOpen,
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Attendance Monitoring & Analytics Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time semester roster, course-wise aggregates, and examination clearance tracker
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsTargetCalculatorOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>Target Attendance Calculator</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Classes Scheduled */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Classes Scheduled
            </span>
            <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{totalScheduled}</span>
            <span className="text-xs text-slate-500">Conducted to date</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            Across 7 registered courses
          </div>
        </div>

        {/* Card 2: Total Classes Present */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Classes Attended
            </span>
            <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-700">{totalPresent}</span>
            <span className="text-xs text-emerald-800 font-medium">Valid presence</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            Includes biometric and on-duty punches
          </div>
        </div>

        {/* Card 3: Total Classes Absent */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Classes Missed
            </span>
            <div className="w-8 h-8 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-700">{totalAbsent}</span>
            <span className="text-xs text-rose-800 font-medium">Recorded absences</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            Disputes pending review: 1
          </div>
        </div>

        {/* Card 4: Overall Percentage & Eligibility */}
        <div
          className={`rounded-lg border p-4 shadow-xs transition-colors bg-white ${
            isBelowThreshold
              ? 'border-rose-300 ring-1 ring-rose-200'
              : 'border-emerald-300 ring-1 ring-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Aggregate
            </span>
            <div
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                isBelowThreshold ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold font-mono ${
                isBelowThreshold ? 'text-rose-600' : 'text-emerald-700'
              }`}
            >
              {overallPercentage}%
            </span>
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${
                isBelowThreshold
                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              {isBelowThreshold ? 'Deficit' : 'Eligible'}
            </span>
          </div>
          <div className="mt-2 text-[11px] font-medium border-t border-slate-100 pt-2">
            {isBelowThreshold ? (
              <span className="text-rose-700">Must attend next {classesNeededFor75} classes</span>
            ) : (
              <span className="text-emerald-700">Buffer: can miss up to {classesCanAffordToMiss} classes</span>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation for Filterable Views */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setAttendanceSubTab('summary')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              attendanceSubTab === 'summary'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Subject-Wise Breakdown</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendanceSubTab('today')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              attendanceSubTab === 'today'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Today's Attendance Roster</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendanceSubTab('datewise')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              attendanceSubTab === 'datewise'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Date-Wise Audit Log</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendanceSubTab('slots')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              attendanceSubTab === 'slots'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Period & Slot Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendanceSubTab('semester')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              attendanceSubTab === 'semester'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Semester Historical Overview</span>
          </button>
        </div>
      </div>

      {/* Render Active Sub-View */}
      {attendanceSubTab === 'summary' && <SubjectBreakdownTable />}
      {attendanceSubTab === 'today' && <TodayRosterView />}
      {attendanceSubTab === 'datewise' && <DateWiseLogView />}
      {attendanceSubTab === 'slots' && <PeriodSlotView />}
      {attendanceSubTab === 'semester' && <SemesterHistoryView />}

      {/* Calculator Modal */}
      <TargetCalculatorModal />
    </div>
  );
};
