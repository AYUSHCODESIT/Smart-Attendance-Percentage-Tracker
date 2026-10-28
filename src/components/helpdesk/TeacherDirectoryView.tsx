import React, { useState } from 'react';
import { teacherDirectory } from '../../data/mockData';
import { TeacherContact } from '../../types';
import {
  Search,
  Mail,
  Phone,
  Building,
  Clock,
  MessageSquare,
  BookOpen,
  Send,
  X,
  UserCheck,
} from 'lucide-react';
import { TicketSubmissionModal } from './TicketSubmissionModal';

export const TeacherDirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [selectedTeacherForTicket, setSelectedTeacherForTicket] = useState<string | null>(null);
  const [activeChatTeacher, setActiveChatTeacher] = useState<TeacherContact | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, Array<{ sender: 'student' | 'teacher'; text: string; time: string }>>>({
    'tch-01': [
      { sender: 'teacher', text: 'Good morning Ayush. Have you checked the latest Red-Black tree problem set on the portal?', time: 'Yesterday 10:15 AM' },
      { sender: 'student', text: 'Yes Dr. Verma, I will submit it before Thursday night.', time: 'Yesterday 11:30 AM' },
    ],
  });

  const filteredTeachers = teacherDirectory.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.coursesHandled.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = deptFilter === 'ALL' || t.department.includes(deptFilter);
    return matchesSearch && matchesDept;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !activeChatTeacher) return;

    const teacherId = activeChatTeacher.id;
    const newMsg = {
      sender: 'student' as const,
      text: chatMessage,
      time: 'Just now',
    };

    setChatMessages((prev) => ({
      ...prev,
      [teacherId]: [...(prev[teacherId] || []), newMsg],
    }));

    setChatMessage('');

    // Simulated automated faculty reply
    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [teacherId]: [
          ...(prev[teacherId] || []),
          {
            sender: 'teacher',
            text: `Thank you for your message. I have received your inquiry regarding course records. Please drop by my office during scheduled consultation hours (${activeChatTeacher.officeHours}) or submit a formal ticket on the attendance tracking tab.`,
            time: 'Just now',
          },
        ],
      }));
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search faculty by name, department, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium focus:ring-1 focus:ring-slate-900"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Electronics">Electronics</option>
            <option value="Student Welfare">Counseling & Welfare</option>
          </select>
        </div>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{teacher.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{teacher.designation}</div>
                  <div className="text-[11px] font-medium text-slate-700 mt-1">
                    {teacher.department}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${
                    teacher.status === 'Available'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : teacher.status === 'In Lecture'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {teacher.status}
                </span>
              </div>

              {/* Contact Details */}
              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-sky-700 hover:text-sky-900 truncate font-mono text-[11px]"
                  >
                    {teacher.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px] text-slate-700">{teacher.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{teacher.officeRoom}</span>
                </div>

                <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight text-slate-500">
                    Office Hours: {teacher.officeHours}
                  </span>
                </div>
              </div>

              {/* Courses Handled */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Courses</span>
                </div>
                <div className="space-y-1">
                  {teacher.coursesHandled.map((course, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 truncate"
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveChatTeacher(teacher)}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                <span>Message</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTeacherForTicket(teacher.id)}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Raise Ticket</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Modal Launcher */}
      <TicketSubmissionModal
        isOpen={!!selectedTeacherForTicket}
        onClose={() => setSelectedTeacherForTicket(null)}
        preselectedTeacherId={selectedTeacherForTicket || undefined}
      />

      {/* In-App Direct Faculty Chat Modal */}
      {activeChatTeacher && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-teacher-title"
        >
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-lg w-full flex flex-col h-[520px] text-slate-800 overflow-hidden">
            {/* Chat Header */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="chat-teacher-title" className="text-sm font-semibold text-white">
                    {activeChatTeacher.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {activeChatTeacher.officeRoom} • {activeChatTeacher.status}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveChatTeacher(null)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Institutional Notice */}
            <div className="px-3 py-1.5 bg-slate-100 text-[11px] text-slate-600 border-b border-slate-200 flex items-center justify-between">
              <span>Official University Communications Log</span>
              <span className="font-mono text-slate-500">ID: {activeChatTeacher.id}</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {(chatMessages[activeChatTeacher.id] || []).map((msg, idx) => {
                const isStudent = msg.sender === 'student';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                        isStudent
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Type your official academic query or question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
