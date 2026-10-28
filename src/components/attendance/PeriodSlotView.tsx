import React, { useState } from 'react';
import { weeklyTimetable } from '../../data/mockData';
import { Clock, MapPin, Check, X, AlertCircle } from 'lucide-react';

export const PeriodSlotView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const activeDay = weeklyTimetable.find((d) => d.day === selectedDay) || weeklyTimetable[0];

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Period-Wise & Slot-Wise Attendance Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Institutional slot breakdown across scheduled lecture periods
          </p>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
          {weeklyTimetable.map((day) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelectedDay(day.day)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                selectedDay === day.day
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span className="font-semibold text-slate-800">
            Slots for {activeDay.day} ({activeDay.slots.length} Sessions)
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>Present</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span>Absent</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeDay.slots.map((slot) => {
            const isAbsent = slot.status === 'Absent';
            const isPresent = slot.status === 'Present';

            return (
              <div
                key={slot.periodNumber}
                className={`p-3.5 rounded-md border transition-all ${
                  isAbsent
                    ? 'bg-rose-50/40 border-rose-300'
                    : isPresent
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                    Period {slot.periodNumber}
                  </span>
                  <span className="font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>

                <div className="mt-2.5">
                  <div className="font-mono text-xs font-bold text-slate-500">{slot.subjectCode}</div>
                  <div className="text-sm font-semibold text-slate-900 leading-snug">
                    {slot.subjectName}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{slot.room}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{slot.instructor}</span>
                  {isAbsent ? (
                    <span className="font-semibold text-rose-700 flex items-center gap-0.5">
                      <X className="w-3.5 h-3.5" /> Absent
                    </span>
                  ) : isPresent ? (
                    <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                      <Check className="w-3.5 h-3.5" /> Present
                    </span>
                  ) : (
                    <span className="text-slate-400">Scheduled</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
