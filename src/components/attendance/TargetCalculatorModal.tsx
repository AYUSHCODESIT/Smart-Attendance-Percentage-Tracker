import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calculator, HelpCircle, Check, AlertCircle } from 'lucide-react';

export const TargetCalculatorModal: React.FC = () => {
  const {
    isTargetCalculatorOpen,
    setIsTargetCalculatorOpen,
    subjects,
    totalScheduled,
    totalPresent,
    overallPercentage,
  } = useApp();

  const [selectedScope, setSelectedScope] = useState<string>('overall');
  const [targetPercent, setTargetPercent] = useState<number>(75);
  const [hypotheticalUpcoming, setHypotheticalUpcoming] = useState<number>(20);
  const [hypotheticalAttended, setHypotheticalAttended] = useState<number>(18);

  if (!isTargetCalculatorOpen) return null;

  // Determine current baseline depending on selected scope
  const activeSubject = subjects.find((s) => s.id === selectedScope);
  const baselineConducted = activeSubject ? activeSubject.totalConducted : totalScheduled;
  const baselineAttended = activeSubject ? activeSubject.totalAttended : totalPresent;
  const baselinePercentage = activeSubject ? activeSubject.percentage : overallPercentage;

  // Calculation 1: Consecutive classes needed to reach target percentage T% (where T = targetPercent / 100)
  // (baselineAttended + x) / (baselineConducted + x) >= T
  // baselineAttended + x >= T * baselineConducted + T * x
  // x * (1 - T) >= T * baselineConducted - baselineAttended
  // x >= (T * baselineConducted - baselineAttended) / (1 - T)
  const T = targetPercent / 100;
  let consecutiveNeeded = 0;
  let classesCanAffordToMiss = 0;

  if (T > 0 && T < 1) {
    if (baselinePercentage < targetPercent) {
      const numerator = T * baselineConducted - baselineAttended;
      const denominator = 1 - T;
      consecutiveNeeded = Math.ceil(numerator / denominator);
      if (consecutiveNeeded < 0) consecutiveNeeded = 0;
    } else {
      // How many can be missed: baselineAttended / (baselineConducted + y) >= T
      // baselineAttended >= T * baselineConducted + T * y
      // y <= (baselineAttended - T * baselineConducted) / T
      classesCanAffordToMiss = Math.floor((baselineAttended - T * baselineConducted) / T);
      if (classesCanAffordToMiss < 0) classesCanAffordToMiss = 0;
    }
  }

  // Calculation 2: What-if projection if student attends hypotheticalAttended out of hypotheticalUpcoming
  const projectedConducted = baselineConducted + hypotheticalUpcoming;
  const projectedAttended = baselineAttended + Math.min(hypotheticalAttended, hypotheticalUpcoming);
  const projectedPercentage =
    projectedConducted > 0 ? Number(((projectedAttended / projectedConducted) * 100).toFixed(1)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calculator-title"
    >
      <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-xl w-full p-6 text-slate-800">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-sky-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 id="calculator-title" className="text-base font-semibold text-slate-900">
                Attendance Target Planner & What-If Simulator
              </h2>
              <p className="text-xs text-slate-500">
                Statutory attendance buffer and threshold projections
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsTargetCalculatorOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Target Scope Selection */}
          <div>
            <label htmlFor="scope-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Scope
            </label>
            <select
              id="scope-select"
              value={selectedScope}
              onChange={(e) => setSelectedScope(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-md border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 font-medium"
            >
              <option value="overall">All Courses Combined (Overall Aggregate)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subjectCode} - {sub.subjectName} ({sub.percentage}%)
                </option>
              ))}
            </select>
          </div>

          {/* Current Baseline Card */}
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
            <div>
              <div className="text-slate-500 text-xs">Current Standing</div>
              <div className="font-semibold text-slate-900 mt-0.5">
                {baselineAttended} attended / {baselineConducted} held
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 text-xs">Current Percentage</div>
              <div
                className={`text-base font-mono font-bold ${
                  baselinePercentage < 75 ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {baselinePercentage}%
              </div>
            </div>
          </div>

          {/* Target Percentage Preset & Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="target-slider">Desired Target Threshold</label>
              <span className="font-mono text-sm text-slate-900">{targetPercent}%</span>
            </div>

            <div className="flex gap-2">
              {[75, 80, 85, 90].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTargetPercent(val)}
                  className={`flex-1 py-1 text-xs rounded font-medium border transition-colors ${
                    targetPercent === val
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {val}% {val === 75 && '(Mandatory)'}
                </button>
              ))}
            </div>

            <input
              id="target-slider"
              type="range"
              min="50"
              max="95"
              step="1"
              value={targetPercent}
              onChange={(e) => setTargetPercent(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          {/* Result 1: Consecutive classes needed / safe to miss */}
          <div
            className={`p-4 rounded-md border ${
              baselinePercentage < targetPercent
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {baselinePercentage < targetPercent ? (
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              ) : (
                <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm">
                {baselinePercentage < targetPercent ? (
                  <>
                    <p className="font-semibold text-amber-900">
                      Requirement to reach {targetPercent}%:
                    </p>
                    <p className="mt-1">
                      You must attend the next{' '}
                      <span className="font-mono font-bold text-sm text-amber-950 px-1.5 py-0.5 bg-amber-200/60 rounded border border-amber-300">
                        {consecutiveNeeded} consecutive classes
                      </span>{' '}
                      without being absent once.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-emerald-900">
                      Clearance confirmed for {targetPercent}%:
                    </p>
                    <p className="mt-1">
                      You currently hold a safe buffer margin. You can miss up to{' '}
                      <span className="font-mono font-bold text-sm text-emerald-950 px-1.5 py-0.5 bg-emerald-200/60 rounded border border-emerald-300">
                        {classesCanAffordToMiss} classes
                      </span>{' '}
                      and remain above {targetPercent}%.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* What-If Future Scenario Simulation */}
          <div className="border border-slate-200 rounded-md p-3.5 bg-slate-50/50 space-y-3">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Upcoming Schedule Projection Simulator</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label htmlFor="upcoming-input" className="block text-slate-600 font-medium mb-1">Upcoming Classes Held</label>
                <input
                  id="upcoming-input"
                  type="number"
                  min="1"
                  max="50"
                  value={hypotheticalUpcoming}
                  onChange={(e) => setHypotheticalUpcoming(Math.max(1, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono text-xs focus:ring-1 focus:ring-slate-900"
                />
              </div>
              <div>
                <label htmlFor="planned-input" className="block text-slate-600 font-medium mb-1">Classes You Will Attend</label>
                <input
                  id="planned-input"
                  type="number"
                  min="0"
                  max={hypotheticalUpcoming}
                  value={hypotheticalAttended}
                  onChange={(e) =>
                    setHypotheticalAttended(
                      Math.min(hypotheticalUpcoming, Math.max(0, Number(e.target.value)))
                    )
                  }
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono text-xs focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="p-2.5 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Simulated Future Attendance:</span>
              <span
                className={`font-mono font-bold text-sm ${
                  projectedPercentage < 75 ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {projectedPercentage}%{' '}
                <span className="text-[11px] font-normal text-slate-500">
                  ({projectedAttended}/{projectedConducted})
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={() => setIsTargetCalculatorOpen(false)}
            className="px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
