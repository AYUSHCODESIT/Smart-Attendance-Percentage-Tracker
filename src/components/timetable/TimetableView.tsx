import React, { useState } from 'react';
import { weeklyTimetable } from '../../data/mockData';
import { CalendarDays, Clock, MapPin, User, Download, Printer } from 'lucide-react';

export const TimetableView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const activeSchedule = weeklyTimetable.find((d) => d.day === selectedDay) || weeklyTimetable[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Interactive Weekly Class Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Institutional period allocations, classroom mappings, and weekly laboratory schedule
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Schedule</span>
          </button>
        </div>
      </div>

      {/* Day Navigation Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 p-2 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {weeklyTimetable.map((day) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelectedDay(day.day)}
              className={`flex-1 min-w-[100px] py-2 px-3 rounded-md text-xs font-semibold transition-colors text-center ${
                selectedDay === day.day
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day Schedule Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-semibold text-slate-800">
            Scheduled Periods for {activeSchedule.day}
          </span>
          <span className="font-mono text-slate-500">
            {activeSchedule.slots.length} Lectures and Laboratories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSchedule.slots.map((slot) => (
            <div
              key={slot.periodNumber}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  Period {slot.periodNumber}
                </span>
                <span className="text-xs font-mono text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                  {slot.subjectCode}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-1 leading-snug">
                  {slot.subjectName}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{slot.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono font-medium text-slate-800">{slot.room}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400 uppercase tracking-wider">{slot.type}</span>
                <span className="text-emerald-700 font-medium">Class In Session</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
