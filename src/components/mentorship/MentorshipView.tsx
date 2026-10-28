import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Send,
  X,
  FileText,
  UserCheck,
} from 'lucide-react';
import { MentorshipSession } from '../../types';

export const MentorshipView: React.FC = () => {
  const { mentorshipList, scheduleMentorshipSession } = useApp();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [sessionDate, setSessionDate] = useState('2026-10-24');
  const [sessionTime, setSessionTime] = useState('02:30 PM');
  const [sessionType, setSessionType] = useState<MentorshipSession['type']>('Attendance Review');
  const [mentorName, setMentorName] = useState('Dr. Anita Desai');
  const [reason, setReason] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMentorshipSession({
      date: sessionDate,
      time: sessionTime,
      mentorName,
      mentorId: 'usr-mentor-01',
      type: sessionType,
      meetingNotes: `Appointment requested by student: "${reason || 'General academic advisory and attendance standing review.'}"`,
      actionItems: ['Prepare course-wise attendance printout', 'Meet at Department Counseling Cabin 102'],
      nextReviewDate: 'To be scheduled post-consultation',
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsScheduleModalOpen(false);
      setReason('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Student Mentorship & Academic Counseling Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Faculty advisory records, counseling meeting minutes, and appointment scheduling
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Book Counseling Appointment</span>
        </button>
      </div>

      {/* Advisor Info Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Designated Faculty Academic Mentor:</div>
            <div className="text-sm font-bold text-slate-900">Dr. Anita Desai</div>
            <div className="text-xs text-slate-600">
              Department Counseling Cell • Cabin 102, Counseling Block
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-200">
          <div className="font-semibold text-slate-800">Next Mandatory Review:</div>
          <div className="font-mono text-slate-600">04 November 2026 at 02:30 PM</div>
        </div>
      </div>

      {/* Counseling Sessions History Log */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Past Counseling Minutes & Attendance Remediation Plans</span>
        </h2>

        <div className="space-y-3.5">
          {mentorshipList.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-900 text-white font-mono">
                    {session.type}
                  </span>
                  <span className="text-xs font-medium text-slate-600">
                    Mentor: {session.mentorName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {session.date} at {session.time}
                  </span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded font-semibold border ${
                      session.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-sky-50 text-sky-800 border-sky-200'
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100 leading-relaxed">
                <span className="font-semibold text-slate-900 block mb-1">Session Summary:</span>
                {session.meetingNotes}
              </div>

              {session.actionItems && session.actionItems.length > 0 && (
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Agreed Action Items & Milestones:
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-600">
                    {session.actionItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Scheduler Modal */}
      {isScheduleModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-modal-title"
        >
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-md w-full p-6 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 id="schedule-modal-title" className="text-base font-semibold text-slate-900">
                  Book Mentorship Session
                </h2>
                <p className="text-xs text-slate-500">Schedule official 1-on-1 counseling slot</p>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
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
                <h3 className="text-sm font-bold text-slate-900">Counseling Appointment Booked</h3>
                <p className="text-xs text-slate-500">
                  Notification transmitted to advisor calendar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSchedule} className="mt-4 space-y-3 text-xs">
                <div>
                  <label htmlFor="mentor-name-select" className="block font-semibold text-slate-700 mb-1">Select Mentor</label>
                  <select
                    id="mentor-name-select"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium"
                  >
                    <option value="Dr. Anita Desai">Dr. Anita Desai (Primary Faculty Advisor)</option>
                    <option value="Dr. Rajesh Verma">Dr. Rajesh Verma (Course Coordinator)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mentorship-type-select" className="block font-semibold text-slate-700 mb-1">Session Category</label>
                  <select
                    id="mentorship-type-select"
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium"
                  >
                    <option value="Attendance Review">Attendance Review & Eligibility Plan</option>
                    <option value="Academic Performance">Academic Performance & CGPA Strategy</option>
                    <option value="Class Counseling">General Class Counseling</option>
                    <option value="Career Guidance">Career & Internship Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="mentorship-date-input" className="block font-semibold text-slate-700 mb-1">Preferred Date</label>
                    <input
                      id="mentorship-date-input"
                      type="date"
                      value={sessionDate}
                      onChange={(e) => setSessionDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="mentorship-time-select" className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                    <select
                      id="mentorship-time-select"
                      value={sessionTime}
                      onChange={(e) => setSessionTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono"
                    >
                      <option value="10:00 AM">10:00 AM - 10:45 AM</option>
                      <option value="11:30 AM">11:30 AM - 12:15 PM</option>
                      <option value="02:30 PM">02:30 PM - 03:15 PM</option>
                      <option value="04:00 PM">04:00 PM - 04:45 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="mentorship-agenda-textarea" className="block font-semibold text-slate-700 mb-1">Agenda / Discussion Topic</label>
                  <textarea
                    id="mentorship-agenda-textarea"
                    rows={3}
                    placeholder="Briefly state what you wish to discuss with your mentor..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800"
                  >
                    Confirm Appointment
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
