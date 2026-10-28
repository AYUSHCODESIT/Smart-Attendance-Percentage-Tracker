import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Paperclip, AlertCircle, FileText } from 'lucide-react';
import { teacherDirectory } from '../../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedTeacherId?: string;
  preselectedSubjectCode?: string;
}

export const TicketSubmissionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  preselectedTeacherId,
  preselectedSubjectCode,
}) => {
  const { currentUser, subjects, createTicket } = useApp();

  const [subjectCode, setSubjectCode] = useState(preselectedSubjectCode || subjects[0]?.subjectCode || 'CS401');
  const [teacherId, setTeacherId] = useState(preselectedTeacherId || teacherDirectory[0]?.id || 'tch-01');
  const [category, setCategory] = useState<'Attendance Correction' | 'Medical Concession' | 'Duty Leave Dispute' | 'Academic Query'>('Attendance Correction');
  const [disputedDate, setDisputedDate] = useState('2026-10-17');
  const [disputedPeriod, setDisputedPeriod] = useState('Period 3 (11:15 - 12:15)');
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setErrorMsg('Please specify the detailed reason or justification for this ticket.');
      return;
    }

    const matchedSubject = subjects.find((s) => s.subjectCode === subjectCode);
    const matchedTeacher = teacherDirectory.find((t) => t.id === teacherId);

    createTicket({
      studentId: currentUser.studentId || 'AU2024-CS-0842',
      studentName: currentUser.name,
      teacherId,
      teacherName: matchedTeacher?.name || 'Faculty Office',
      subjectCode,
      subjectName: matchedSubject?.subjectName || 'Course',
      category,
      disputedDate,
      disputedPeriod,
      reason,
      documentAttached: fileName || 'attendance_audit_claim.pdf',
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setReason('');
      setFileName('');
      setErrorMsg('');
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
    >
      <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-lg w-full p-6 text-slate-800">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-sky-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="ticket-modal-title" className="text-base font-semibold text-slate-900">
                Raise Official Helpdesk Ticket
              </h2>
              <p className="text-xs text-slate-500">
                Direct faculty connection for attendance corrections & academic disputes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Ticket Submitted Successfully</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your inquiry has been assigned an official reference number and routed to the course coordinator.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            {errorMsg && (
              <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="ticket-subject-select" className="block font-semibold text-slate-700 mb-1">Subject Course</label>
                <select
                  id="ticket-subject-select"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium focus:ring-1 focus:ring-slate-900"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.subjectCode}>
                      {s.subjectCode} - {s.subjectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ticket-faculty-select" className="block font-semibold text-slate-700 mb-1">Assigned Faculty</label>
                <select
                  id="ticket-faculty-select"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium focus:ring-1 focus:ring-slate-900"
                >
                  {teacherDirectory.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.department.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ticket-category-select" className="block font-semibold text-slate-700 mb-1">Inquiry / Dispute Category</label>
              <select
                id="ticket-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium focus:ring-1 focus:ring-slate-900"
              >
                <option value="Attendance Correction">Attendance Correction (Biometric / RFID Error)</option>
                <option value="Medical Concession">Medical Concession Leave Application</option>
                <option value="Duty Leave Dispute">Duty Leave (Hackathon / Inter-University Sport)</option>
                <option value="Academic Query">Academic Syllabus / Course Query</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="ticket-date-input" className="block font-semibold text-slate-700 mb-1">Date in Dispute</label>
                <input
                  id="ticket-date-input"
                  type="date"
                  value={disputedDate}
                  onChange={(e) => setDisputedDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label htmlFor="ticket-period-select" className="block font-semibold text-slate-700 mb-1">Period Slot</label>
                <select
                  id="ticket-period-select"
                  value={disputedPeriod}
                  onChange={(e) => setDisputedPeriod(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium focus:ring-1 focus:ring-slate-900"
                >
                  <option value="Period 1 (09:00 - 10:00)">Period 1 (09:00 - 10:00)</option>
                  <option value="Period 2 (10:00 - 11:00)">Period 2 (10:00 - 11:00)</option>
                  <option value="Period 3 (11:15 - 12:15)">Period 3 (11:15 - 12:15)</option>
                  <option value="Period 4 (12:15 - 13:15)">Period 4 (12:15 - 13:15)</option>
                  <option value="Period 5 (14:00 - 16:00)">Period 5 (14:00 - 16:00 Lab)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ticket-reason-textarea" className="block font-semibold text-slate-700 mb-1">
                Detailed Statement & Justification
              </label>
              <textarea
                id="ticket-reason-textarea"
                rows={3}
                placeholder="Describe why your attendance status was incorrectly logged (e.g., biometric punch not synced, authorized duty slip submitted, or seat attendance roster marked present)..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 text-xs"
              />
            </div>

            {/* Document upload mock */}
            <div>
              <span className="block font-semibold text-slate-700 mb-1">
                Supporting Verification Document (PDF / JPEG)
              </span>
              <div className="flex items-center gap-2">
                <label htmlFor="ticket-document-input" className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
                  <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                  <span>Attach Document</span>
                  <input
                    id="ticket-document-input"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
                <span className="text-slate-500 text-[11px] truncate">
                  {fileName ? fileName : 'No document attached (optional)'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-slate-900 text-white hover:bg-slate-800 font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
