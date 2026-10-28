import React, { useState } from 'react';
import { coursePlans } from '../../data/mockData';
import { BookOpen, CheckCircle, FileDown, BookMarked, Layers } from 'lucide-react';

export const CoursePlanView: React.FC = () => {
  const [selectedCourseCode, setSelectedCourseCode] = useState(coursePlans[0]?.subjectCode || 'CS401');

  const activePlan = coursePlans.find((c) => c.subjectCode === selectedCourseCode) || coursePlans[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Course Plan & Syllabus Progress Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Institutional academic curriculum modules, lecture schedule pacing, and textbook references
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert(`Downloading verified institutional syllabus for ${activePlan.subjectCode}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition-colors self-start sm:self-center"
        >
          <FileDown className="w-4 h-4 text-slate-500" />
          <span>Download Syllabus PDF</span>
        </button>
      </div>

      {/* Course Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {coursePlans.map((plan) => (
          <button
            key={plan.subjectCode}
            type="button"
            onClick={() => setSelectedCourseCode(plan.subjectCode)}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold border transition-colors whitespace-nowrap flex items-center gap-2 ${
              selectedCourseCode === plan.subjectCode
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="font-mono">{plan.subjectCode}</span>
            <span>{plan.subjectName.split(' ')[0]}</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-200">
              {plan.overallProgress}%
            </span>
          </button>
        ))}
      </div>

      {/* Active Course Overview Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                {activePlan.subjectCode}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{activePlan.subjectName}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Curriculum approved by Board of Studies for Academic Session 2024 - 2025.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Overall Curriculum Coverage</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${activePlan.overallProgress}%` }}
                ></div>
              </div>
              <span className="font-mono font-bold text-sm text-slate-900">
                {activePlan.overallProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* Modules Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Curriculum Modules & Teaching Delivery Status</span>
          </h3>

          <div className="space-y-3">
            {activePlan.modules.map((mod) => (
              <div
                key={mod.moduleNumber}
                className="p-4 rounded-md border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-800">
                      Module {mod.moduleNumber}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">{mod.title}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono text-slate-600">
                      {mod.topicsCompleted} of {mod.topicsPlanned} topics completed
                    </span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-xs border ${
                        mod.completionPercentage === 100
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : mod.completionPercentage > 0
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {mod.completionPercentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Topics Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.keyTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Textbooks & References */}
        <div className="pt-3 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <BookMarked className="w-3.5 h-3.5 text-slate-500" />
            <span>Prescribed Textbooks & Reference Literature</span>
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {activePlan.textbooks.map((book, idx) => (
              <li key={idx} className="font-medium text-slate-800">
                {book}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
