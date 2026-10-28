import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, CheckCircle2, Calculator, ArrowRight, RefreshCw } from 'lucide-react';

export const SystemAlertBanner: React.FC = () => {
  const {
    overallPercentage,
    isBelowThreshold,
    classesNeededFor75,
    classesCanAffordToMiss,
    setIsTargetCalculatorOpen,
    toggleComplianceDemo,
    isHighAttendanceDemo,
  } = useApp();

  return (
    <div
      role="region"
      aria-label="Attendance Status and Examination Eligibility Banner"
      className={`border-b transition-colors ${
        isBelowThreshold
          ? 'bg-rose-50/90 border-rose-200 text-rose-950'
          : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-1.5 rounded-md mt-0.5 shrink-0 ${
                isBelowThreshold ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isBelowThreshold ? (
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isBelowThreshold
                      ? 'bg-rose-200/80 text-rose-900 border border-rose-300'
                      : 'bg-emerald-200/80 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  {isBelowThreshold ? 'Statutory Warning' : 'Eligibility Confirmed'}
                </span>
                <span className="text-sm font-semibold">
                  Overall Aggregate: <span className="font-mono">{overallPercentage}%</span>
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  (Institutional Threshold: 75.0%)
                </span>
              </div>

              <p className="text-xs sm:text-sm mt-1 leading-snug">
                {isBelowThreshold ? (
                  <>
                    <strong className="font-semibold text-rose-900">ATTENDANCE ALERT:</strong> Your
                    total attendance is currently below 75%. You need to attend{' '}
                    <strong className="font-semibold underline">
                      {classesNeededFor75} mandatory upcoming classes
                    </strong>{' '}
                    consecutively to meet the eligibility threshold for exams.
                  </>
                ) : (
                  <>
                    <strong className="font-semibold text-emerald-900">ELIGIBILITY STATUS:</strong>{' '}
                    Your current attendance meets or exceeds the mandatory 75% institutional
                    examination criteria. Buffer margin:{' '}
                    <span className="font-medium">
                      you can miss up to {classesCanAffordToMiss} classes
                    </span>{' '}
                    and maintain exam clearance.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              type="button"
              onClick={() => setIsTargetCalculatorOpen(true)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border transition-colors shadow-xs ${
                isBelowThreshold
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800'
              }`}
              title="Launch Target Attendance Simulator"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Target Planner</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={toggleComplianceDemo}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded border bg-white hover:bg-slate-50 text-slate-700 border-slate-300 transition-colors shadow-xs"
              title="Switch between At Risk (<75%) and Compliant (>=75%) for demo testing"
            >
              <RefreshCw className="w-3 h-3 text-slate-500" />
              <span>
                Demo State: {isHighAttendanceDemo ? '78.4% (Eligible)' : '73.6% (At Risk)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
