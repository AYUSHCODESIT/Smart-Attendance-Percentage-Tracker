import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubjectAttendance } from '../../types';
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  FileQuestion,
  BookOpen,
  ArrowUpDown,
  Download,
} from 'lucide-react';

export const SubjectBreakdownTable: React.FC = () => {
  const { subjects, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState<keyof SubjectAttendance>('percentage');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const filteredSubjects = subjects
    .filter((sub) => {
      const matchSearch =
        sub.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'ALL' || sub.category === categoryFilter;
      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'COMPLIANT' && sub.percentage >= 75) ||
        (statusFilter === 'AT_RISK' && sub.percentage < 75);
      return matchSearch && matchCategory && matchStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const handleSort = (field: keyof SubjectAttendance) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    const headers = 'Subject Code,Subject Name,Instructor,Credits,Conducted,Attended,Absent,Percentage,Status\n';
    const rows = filteredSubjects
      .map(
        (s) =>
          `"${s.subjectCode}","${s.subjectName}","${s.instructor}",${s.credits},${s.totalConducted},${s.totalAttended},${s.totalAbsent},${s.percentage}%,"${
            s.percentage >= 75 ? 'Compliant' : 'Shortage'
          }"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_subject_breakdown_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subject code, title, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium focus:ring-1 focus:ring-slate-900"
          >
            <option value="ALL">All Categories</option>
            <option value="Core Theory">Core Theory</option>
            <option value="Core Practical">Core Practical</option>
            <option value="Department Elective">Department Elective</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium focus:ring-1 focus:ring-slate-900"
          >
            <option value="ALL">All Standings</option>
            <option value="COMPLIANT">Compliant (&gt;= 75%)</option>
            <option value="AT_RISK">At Risk (&lt; 75%)</option>
          </select>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md transition-colors"
            title="Export Table as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Structured Tabular Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
              <th
                className="py-3 px-4 cursor-pointer hover:bg-slate-200/60"
                onClick={() => handleSort('subjectCode')}
              >
                <div className="flex items-center gap-1">
                  <span>Subject Code</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-slate-200/60"
                onClick={() => handleSort('subjectName')}
              >
                <div className="flex items-center gap-1">
                  <span>Course Title & Instructor</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Credits</th>
              <th
                className="py-3 px-3 text-center cursor-pointer hover:bg-slate-200/60"
                onClick={() => handleSort('totalConducted')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Conducted</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                className="py-3 px-3 text-center cursor-pointer hover:bg-slate-200/60"
                onClick={() => handleSort('totalAttended')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Present</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                className="py-3 px-3 text-center cursor-pointer hover:bg-slate-200/60"
                onClick={() => handleSort('totalAbsent')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Absent</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 min-w-[140px]"
                onClick={() => handleSort('percentage')}
              >
                <div className="flex items-center gap-1">
                  <span>Attendance %</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-center">Buffer / Deficit</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {filteredSubjects.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500">
                  No courses found matching the search or filter criteria.
                </td>
              </tr>
            ) : (
              filteredSubjects.map((sub) => {
                const isShortage = sub.percentage < 75;

                return (
                  <tr
                    key={sub.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isShortage ? 'bg-rose-50/20' : ''
                    }`}
                  >
                    {/* Subject Code */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                      {sub.subjectCode}
                    </td>

                    {/* Subject Title & Instructor */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900 leading-tight">
                        {sub.subjectName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{sub.instructor}</span>
                        <span>•</span>
                        <span className="text-slate-400">{sub.category}</span>
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="py-3 px-3 text-center font-mono text-slate-600">
                      {sub.credits}
                    </td>

                    {/* Conducted */}
                    <td className="py-3 px-3 text-center font-mono font-medium text-slate-800">
                      {sub.totalConducted}
                    </td>

                    {/* Present */}
                    <td className="py-3 px-3 text-center font-mono font-medium text-emerald-700">
                      {sub.totalAttended}
                    </td>

                    {/* Absent */}
                    <td className="py-3 px-3 text-center font-mono font-medium text-rose-700">
                      {sub.totalAbsent}
                    </td>

                    {/* Percentage & Progress Bar */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-semibold text-xs sm:text-sm w-12 text-right ${
                            isShortage ? 'text-rose-600' : 'text-emerald-700'
                          }`}
                        >
                          {sub.percentage}%
                        </span>
                        <div className="w-16 sm:w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              sub.percentage >= 75
                                ? 'bg-emerald-600'
                                : sub.percentage >= 70
                                ? 'bg-amber-500'
                                : 'bg-rose-600'
                            }`}
                            style={{ width: `${Math.min(100, sub.percentage)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {isShortage ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-rose-100 text-rose-800 border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Shortage</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-100 text-emerald-800 border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          <span>Eligible</span>
                        </span>
                      )}
                    </td>

                    {/* Buffer / Deficit */}
                    <td className="py-3 px-3 text-center font-mono text-xs whitespace-nowrap">
                      {isShortage ? (
                        <span className="text-rose-700 font-medium">
                          Attend next {sub.requiredFor75}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">
                          Can miss {sub.canAffordToMiss}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveTab('helpdesk')}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded border border-transparent hover:border-slate-200 transition-colors"
                          title="Raise attendance dispute or ticket with faculty"
                        >
                          <FileQuestion className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('courseplan')}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded border border-transparent hover:border-slate-200 transition-colors"
                          title="View Syllabus & Course Plan"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary note */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          Showing <span className="font-semibold text-slate-800">{filteredSubjects.length}</span>{' '}
          registered subjects for Semester 4.
        </div>
        <div className="text-[11px] text-slate-500">
          Statutory Examination Criteria: 75.0% minimum in aggregate and per course.
        </div>
      </div>
    </div>
  );
};
