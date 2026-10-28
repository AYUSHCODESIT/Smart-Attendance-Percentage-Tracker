import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Search,
} from 'lucide-react';
import { TeacherDirectoryView } from './TeacherDirectoryView';
import { TicketSubmissionModal } from './TicketSubmissionModal';

export const HelpdeskTicketsView: React.FC = () => {
  const { tickets } = useApp();
  const [subTab, setSubTab] = useState<'directory' | 'tickets'>('directory');
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter === 'ALL') return true;
    return t.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3 h-3" />
            <span>Resolved</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
            <Clock className="w-3 h-3" />
            <span>In Progress</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
            <AlertCircle className="w-3 h-3" />
            <span>Rejected</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institutional Academic Helpdesk & Faculty Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Internal faculty communication channel, ticket dispute logging, and attendance corrections
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewTicketOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Raise New Dispute Ticket</span>
        </button>
      </div>

      {/* Subtab Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSubTab('directory')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              subTab === 'directory'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Teacher Directory & Office Hours</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('tickets')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              subTab === 'tickets'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            <span>My Submitted Tickets</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {tickets.length}
            </span>
          </button>
        </div>
      </div>

      {/* Directory Tab View */}
      {subTab === 'directory' && <TeacherDirectoryView />}

      {/* Tickets List View */}
      {subTab === 'tickets' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">Filter by status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-medium text-slate-700 focus:ring-1 focus:ring-slate-900"
            >
              <option value="ALL">All Tickets</option>
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {ticket.ticketNumber}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {ticket.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">
                      Filed: {ticket.createdAt}
                    </span>
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Course & Instructor:</span>
                    <div className="font-semibold text-slate-900">
                      {ticket.subjectCode} - {ticket.subjectName} ({ticket.teacherName})
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Disputed Date & Slot:</span>
                    <div className="font-mono font-medium text-slate-800">
                      {ticket.disputedDate} • {ticket.disputedPeriod}
                    </div>
                  </div>
                </div>

                <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200 text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-800 block mb-1">Statement:</span>
                  {ticket.reason}
                </div>

                {ticket.documentAttached && (
                  <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Attached Document: {ticket.documentAttached}</span>
                  </div>
                )}

                {ticket.resolutionNotes && (
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    <span className="font-semibold block mb-0.5">Faculty Resolution:</span>
                    {ticket.resolutionNotes}
                    {ticket.resolvedAt && (
                      <span className="block text-[11px] text-emerald-800 font-mono mt-1">
                        Resolved on: {ticket.resolvedAt}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      <TicketSubmissionModal
        isOpen={isNewTicketOpen}
        onClose={() => setIsNewTicketOpen(false)}
      />
    </div>
  );
};
