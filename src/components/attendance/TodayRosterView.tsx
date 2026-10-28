import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, MapPin, User, CheckCircle2, XCircle, AlertCircle, FileEdit } from 'lucide-react';

export const TodayRosterView: React.FC = () => {
  const { todayRoster, setActiveTab } = useApp();

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Present':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Marked Present</span>
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            <span>Marked Absent</span>
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-sky-100 text-sky-800 border border-sky-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Upcoming Session</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Scheduled</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Date Header Info */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-white">
              LIVE ROSTER
            </span>
            <span className="text-sm font-semibold text-slate-900">
              Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time biometric and RFID terminal synchronizations active for Academic Block 3 and Computing Labs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('helpdesk')}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors self-start sm:self-center"
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>Report Punch Error</span>
        </button>
      </div>

      {/* Roster Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {todayRoster.map((slot) => {
          const isAbsent = slot.status === 'Absent';
          const isPresent = slot.status === 'Present';

          return (
            <div
              key={slot.periodNumber}
              className={`rounded-lg border p-4 shadow-xs transition-colors bg-white ${
                isAbsent
                  ? 'border-rose-300 ring-1 ring-rose-200'
                  : isPresent
                  ? 'border-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                    Period {slot.periodNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                  {slot.type}
                </span>
              </div>

              <div className="mt-3">
                <div className="font-mono font-bold text-xs text-slate-500">{slot.subjectCode}</div>
                <div className="font-semibold text-slate-900 text-sm mt-0.5 leading-snug">
                  {slot.subjectName}
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{slot.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-700">{slot.room}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>{getStatusBadge(slot.status)}</div>
                {isAbsent && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('helpdesk')}
                    className="text-xs text-rose-700 hover:text-rose-900 underline font-medium"
                  >
                    Dispute Absent
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
