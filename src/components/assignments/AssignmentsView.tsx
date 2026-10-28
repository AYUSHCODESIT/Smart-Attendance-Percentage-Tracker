import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  FileCheck,
  Send,
} from 'lucide-react';
import { AssignmentItem } from '../../types';

export const AssignmentsView: React.FC = () => {
  const { assignments, submitAssignmentMock } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'SUBMITTED'>('ALL');
  const [submissionModalAssignment, setSubmissionModalAssignment] = useState<AssignmentItem | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredAssignments = assignments.filter((a) => {
    if (activeTab === 'PENDING') return a.submissionStatus === 'Pending';
    if (activeTab === 'SUBMITTED') return a.submissionStatus === 'Submitted' || a.submissionStatus === 'Graded';
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionModalAssignment) return;

    submitAssignmentMock(
      submissionModalAssignment.id,
      uploadedFileName || 'assignment_submission.zip'
    );
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSubmissionModalAssignment(null);
      setUploadedFileName('');
      setNotes('');
    }, 1200);
  };

  const getStatusBadge = (status: AssignmentItem['submissionStatus']) => {
    switch (status) {
      case 'Graded':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Graded & Verified</span>
          </span>
        );
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
            <FileCheck className="w-3 h-3" />
            <span>Submitted (Under Evaluation)</span>
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
            <AlertCircle className="w-3 h-3" />
            <span>Overdue / Late</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Pending Submission</span>
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
            Assignments, Tasks & Lab Project Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Continuous internal assessment portal with deadline tracking and faculty grading feedback
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              activeTab === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Tasks ({assignments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('PENDING')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              activeTab === 'PENDING'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SUBMITTED')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              activeTab === 'SUBMITTED'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Submitted & Graded
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => {
          const isPending = asg.submissionStatus === 'Pending';

          return (
            <div
              key={asg.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {asg.subjectCode}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{asg.subjectName}</span>
                    <span className="text-xs font-mono text-slate-400">• Weightage: {asg.weightage}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{asg.title}</h3>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {getStatusBadge(asg.submissionStatus)}
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Due: {asg.dueDate}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                {asg.description}
              </p>

              {asg.submittedDate && (
                <div className="text-xs text-slate-600 flex items-center justify-between border-t border-slate-100 pt-2 font-mono">
                  <span>{asg.submittedDate}</span>
                  {asg.obtainedMarks !== undefined && (
                    <span className="font-bold text-slate-900">
                      Score: {asg.obtainedMarks} / {asg.maxMarks}
                    </span>
                  )}
                </div>
              )}

              {asg.feedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-950">
                  <span className="font-semibold block mb-0.5">Faculty Assessment:</span>
                  {asg.feedback}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-500">
                  Maximum Points: <span className="font-bold text-slate-800">{asg.maxMarks}</span>
                </div>

                {isPending && (
                  <button
                    type="button"
                    onClick={() => setSubmissionModalAssignment(asg)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-sky-400" />
                    <span>Upload & Submit Assignment</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {submissionModalAssignment && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submission-modal-title"
        >
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-lg w-full p-6 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 id="submission-modal-title" className="text-base font-semibold text-slate-900">
                  Assignment Submission Portal
                </h2>
                <p className="text-xs text-slate-500">
                  {submissionModalAssignment.subjectCode}: {submissionModalAssignment.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionModalAssignment(null)}
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
                <h3 className="text-sm font-bold text-slate-900">Assignment Uploaded & Recorded</h3>
                <p className="text-xs text-slate-500">
                  Submission receipt timestamped on central institutional server.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label htmlFor="assignment-file-input" className="block font-semibold text-slate-700 mb-1">
                    Upload Archive or Document (.zip, .pdf, .tar.gz)
                  </label>
                  <label htmlFor="assignment-file-input" className="cursor-pointer border-2 border-dashed border-slate-300 rounded-lg p-5 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mb-1.5" />
                    <span className="font-semibold text-slate-700">Click to browse file</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">Maximum file size: 50MB</span>
                    <input
                      id="assignment-file-input"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                  {uploadedFileName && (
                    <div className="mt-2 text-xs font-mono text-emerald-700 flex items-center gap-1.5 bg-emerald-50 p-2 rounded border border-emerald-200">
                      <FileCheck className="w-4 h-4 shrink-0" />
                      <span className="truncate">Ready for upload: {uploadedFileName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="assignment-notes-textarea" className="block font-semibold text-slate-700 mb-1">
                    Student Submission Notes / Execution Instructions
                  </label>
                  <textarea
                    id="assignment-notes-textarea"
                    rows={3}
                    placeholder="Provide compiler flags, execution steps, or notes for the teaching assistant..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmissionModalAssignment(null)}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm Submission</span>
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
