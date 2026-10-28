import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Radio,
  Download,
  AlertTriangle,
} from 'lucide-react';

export const DateWiseLogView: React.FC = () => {
  const { attendanceLogs, setActiveTab } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredLogs = attendanceLogs.filter((log) => {
    const matchDate = !selectedDate || log.date === selectedDate;
    const matchStatus = selectedStatus === 'ALL' || log.status === selectedStatus;
    return matchDate && matchStatus;
  });

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      {/* Date Filter Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <label htmlFor="log-date-filter" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Filter by Date:
            </label>
            <input
              id="log-date-filter"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono focus:ring-1 focus:ring-slate-900"
            />
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate('')}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-medium text-slate-700 focus:ring-1 focus:ring-slate-900"
            >
              <option value="ALL">All Statuses</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-800">{filteredLogs.length}</span> audit logs
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Date & Slot</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Course Instructor</th>
              <th className="py-3 px-3 text-center">Verification Mode</th>
              <th className="py-3 px-3 text-center">Marked At</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No attendance records found for the chosen date or filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                const isAbsent = log.status === 'Absent';

                return (
                  <tr
                    key={log.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isAbsent ? 'bg-rose-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-mono font-medium text-slate-900">{log.date}</div>
                      <div className="text-[11px] font-mono text-slate-500">
                        Period {log.periodNumber} ({log.timeSlot})
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-xs text-slate-700 mr-2">
                        {log.subjectCode}
                      </span>
                      <span className="font-medium text-slate-900">{log.subjectName}</span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">{log.instructor}</td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        <Radio className="w-2.5 h-2.5 text-slate-500" />
                        <span>{log.mode}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                      {log.markedAt}
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {isAbsent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-rose-100 text-rose-800 border-rose-200">
                          <XCircle className="w-3 h-3" />
                          <span>Absent</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-100 text-emerald-800 border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Present</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isAbsent ? (
                        <button
                          type="button"
                          onClick={() => setActiveTab('helpdesk')}
                          className="text-xs font-medium text-rose-700 hover:text-rose-900 underline"
                        >
                          Dispute
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Verified</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
