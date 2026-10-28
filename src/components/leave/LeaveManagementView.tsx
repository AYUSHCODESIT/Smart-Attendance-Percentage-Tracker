import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileMinus,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Paperclip,
  TrendingUp,
  AlertTriangle,
  Send,
  X,
} from 'lucide-react';
import { LeaveRequest } from '../../types';

export const LeaveManagementView: React.FC = () => {
  const { leaveRequests, submitLeaveRequest, overallPercentage } = useApp();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveRequest['type']>('Medical Leave');
  const [startDate, setStartDate] = useState('2026-10-25');
  const [endDate, setEndDate] = useState('2026-10-27');
  const [totalClasses, setTotalClasses] = useState(8);
  const [reason, setReason] = useState('');
  const [docName, setDocName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Live real-time projection simulator for the modal
  const simulatedApproved = Number(Math.min(100, overallPercentage + (totalClasses * 0.35)).toFixed(1));
  const simulatedRejected = Number(Math.max(0, overallPercentage - (totalClasses * 0.4)).toFixed(1));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    submitLeaveRequest({
      type: leaveType,
      startDate,
      endDate,
      totalDays: 3,
      totalClassesImpacted: totalClasses,
      reason,
      documentName: docName || 'medical_fitness_certificate.pdf',
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsApplyModalOpen(false);
      setReason('');
      setDocName('');
    }, 1200);
  };

  const getStatusBadge = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Approved & Condoned</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3" />
            <span>Rejected</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Under Verification</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Student Leave Management & Attendance Condonation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit formal medical, on-duty, and emergency leave applications with dynamic percentage impact previews
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsApplyModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Apply for Institutional Leave</span>
        </button>
      </div>

      {/* Regulation Policy Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-1.5">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Institutional Condonation Policy (Section 12.3)</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Approved Medical and On-Duty leaves convert recorded absences into condoned sessions on
          the central attendance server. A minimum overall baseline of 65.0% is required even with
          certified medical leaves to sit for End-Semester examinations.
        </p>
      </div>

      {/* Leave Applications History */}
      <div className="space-y-3.5">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Leave Applications & Impact Audit ({leaveRequests.length})
        </h2>

        {leaveRequests.map((lv) => (
          <div
            key={lv.id}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-900">
                  {lv.applicationNumber}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  {lv.type}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Impact: {lv.totalClassesImpacted} Classes ({lv.totalDays} Days)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Applied: {lv.appliedOn}</span>
                {getStatusBadge(lv.status)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Leave Duration:</span>
                <div className="font-mono font-medium text-slate-900">
                  {lv.startDate} to {lv.endDate}
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5">Supporting Certificate:</span>
                <div className="font-mono text-slate-700 flex items-center gap-1">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lv.documentName}</span>
                </div>
              </div>
            </div>

            <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-700">
              <span className="font-semibold text-slate-900">Reason:</span> {lv.reason}
            </div>

            {/* Impact Calculation Preview Bar */}
            <div className="p-3 bg-slate-50/80 rounded border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
                <span>Attendance Impact Projection:</span>
              </span>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500">If Approved: </span>
                  <span className="font-bold text-emerald-700">
                    {lv.projectedAttendanceImpact.projectedIfApproved}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">If Rejected: </span>
                  <span className="font-bold text-rose-700">
                    {lv.projectedAttendanceImpact.projectedIfRejected}%
                  </span>
                </div>
              </div>
            </div>

            {lv.approverComments && (
              <div className="text-xs text-slate-600 pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-800">Approver Remarks:</span>{' '}
                {lv.approverComments}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leave Application Modal */}
      {isApplyModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-modal-title"
        >
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-lg w-full p-6 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 id="leave-modal-title" className="text-base font-semibold text-slate-900">
                  New Leave Application & Impact Simulation
                </h2>
                <p className="text-xs text-slate-500">
                  Calculate condonation margin before submitting to Dean of Student Welfare
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Leave Application Filed</h3>
                <p className="text-xs text-slate-500">
                  Application forwarded to Mentor and HOD for official review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label htmlFor="leave-type-select" className="block font-semibold text-slate-700 mb-1">Leave Classification</label>
                  <select
                    id="leave-type-select"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium"
                  >
                    <option value="Medical Leave">Medical Leave (Doctor Certificate Attached)</option>
                    <option value="Duty Leave">Duty Leave (Official Event / Hackathon)</option>
                    <option value="Personal Emergency">Personal Emergency Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="leave-start-input" className="block font-semibold text-slate-700 mb-1">Commencing Date</label>
                    <input
                      id="leave-start-input"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="leave-end-input" className="block font-semibold text-slate-700 mb-1">Concurring Date</label>
                    <input
                      id="leave-end-input"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="leave-classes-input" className="block font-semibold text-slate-700 mb-1">
                    Estimated Class Sessions Impacted
                  </label>
                  <input
                    id="leave-classes-input"
                    type="number"
                    min="1"
                    max="40"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono"
                  />
                </div>

                {/* Live Real-time Impact Simulator Box */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="font-semibold text-slate-800 flex items-center justify-between">
                    <span>Live Attendance Impact Projection:</span>
                    <span className="font-mono text-slate-500">Current: {overallPercentage}%</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                      <span className="text-[11px] text-emerald-800 block">If Approved (Condoned)</span>
                      <span className="text-base font-bold font-mono text-emerald-700">
                        {simulatedApproved}%
                      </span>
                    </div>

                    <div className="p-2 bg-rose-50 rounded border border-rose-200">
                      <span className="text-[11px] text-rose-800 block">If Rejected (Absence)</span>
                      <span className="text-base font-bold font-mono text-rose-700">
                        {simulatedRejected}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="leave-reason-textarea" className="block font-semibold text-slate-700 mb-1">Reason for Absence</label>
                  <textarea
                    id="leave-reason-textarea"
                    rows={2}
                    placeholder="Provide details of clinical illness, hospital admission, or official event representation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="leave-document-input" className="block font-semibold text-slate-700 mb-1">Attach Medical Slip or Event Letter</label>
                  <div className="flex items-center gap-2">
                    <label htmlFor="leave-document-input" className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-slate-50 text-slate-700 font-medium">
                      <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                      <span>Attach File</span>
                      <input
                        id="leave-document-input"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setDocName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                    <span className="text-slate-500 font-mono text-[11px] truncate">
                      {docName || 'No document attached'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
