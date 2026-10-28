import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle,
  Plus,
  Trash2,
  AlertCircle,
  Layers,
  User,
  Clock,
} from 'lucide-react';

export const CourseRegistrationView: React.FC = () => {
  const { electives, toggleElectiveRegistration } = useApp();
  const [filterType, setFilterType] = useState('ALL');

  const registeredElectives = electives.filter((c) => c.isRegistered);
  const totalElectiveCredits = registeredElectives.reduce((sum, c) => sum + c.credits, 0);
  const coreCredits = 15; // standard core semester load
  const totalRegisteredCredits = coreCredits + totalElectiveCredits;
  const maxCreditCap = 24;

  const filteredElectives = electives.filter((c) => {
    if (filterType === 'ALL') return true;
    return c.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Subject Registration & Course Enrollment Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Elective course selection, prerequisite verification, and semester credit allocation
          </p>
        </div>

        <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Registered Credits</span>
            <span className="font-bold text-slate-900 text-sm">
              {totalRegisteredCredits} / {maxCreditCap}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Credit Margin</span>
            <span className="font-bold text-emerald-700 text-sm">
              {maxCreditCap - totalRegisteredCredits} Available
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-medium">Course Category:</span>
          {['ALL', 'Department Elective', 'Open Elective'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                filterType === type
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {type === 'ALL' ? 'All Electives' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Electives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredElectives.map((course) => {
          const isFull = course.enrolled >= course.capacity;

          return (
            <div
              key={course.code}
              className={`bg-white rounded-lg border p-4 shadow-xs flex flex-col justify-between transition-colors ${
                course.isRegistered
                  ? 'border-emerald-300 ring-1 ring-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {course.code}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{course.type}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{course.title}</h3>
                  </div>

                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                    {course.credits} Credits
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">{course.schedule}</span>
                  </div>
                </div>

                {course.prerequisites.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-500 block mb-1">Prerequisites:</span>
                    <div className="flex flex-wrap gap-1">
                      {course.prerequisites.map((prereq, idx) => (
                        <span
                          key={idx}
                          className="font-mono px-1.5 py-0.2 rounded bg-slate-50 text-slate-700 border border-slate-200"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">
                  Enrolled: {course.enrolled} / {course.capacity}
                </span>

                <button
                  type="button"
                  onClick={() => toggleElectiveRegistration(course.code)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold shadow-xs transition-colors ${
                    course.isRegistered
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {course.isRegistered ? (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Drop Elective</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-sky-400" />
                      <span>Enroll in Course</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
