import React, { useState } from 'react';
import { institutionalSettings } from '../../data/mockData';
import {
  Settings,
  Globe,
  ShieldCheck,
  Server,
  Sliders,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const InstitutionalSettingsView: React.FC = () => {
  const [customDomain, setCustomDomain] = useState(institutionalSettings.institutionalDomain);
  const [mandatoryThreshold, setMandatoryThreshold] = useState(institutionalSettings.attendancePolicy.mandatoryEligibilityThreshold);
  const [condonationThreshold, setCondonationThreshold] = useState(institutionalSettings.attendancePolicy.condonationMinimumThreshold);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institutional Portal & Launch Deployment Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Apex domain routing, SSO federation, statutory threshold rules, and production checklist
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-900 text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Uptime: {institutionalSettings.serverUptime}</span>
          </span>
        </div>
      </div>

      {/* Production Launch Checklist Box */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Launch & Production Readiness Checklist</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Custom Domain</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-800 mt-1 truncate">
              {customDomain}
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">CNAME mapped & verified</div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Favicon & Brand Assets</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-800 mt-1">/favicon.svg (SVG/PNG)</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Retina and PWA configured</div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Privacy Policy</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-800 mt-1">FERPA & Bio Protection</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Audit compliance compliant</div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Terms & Regulations</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-800 mt-1">Statute 14.B Attendance</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Academic senate ratified</div>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-5 text-xs sm:text-sm">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Globe className="w-4 h-4 text-sky-600" />
            <span>Institutional Domain & Federation</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label htmlFor="domain-input" className="block font-semibold text-slate-700 mb-1">
                Primary Institutional Apex Hostname
              </label>
              <input
                id="domain-input"
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Points to institutional load balancer with automated Let's Encrypt Wildcard TLS certificates.
              </span>
            </div>

            <div>
              <label htmlFor="sso-input" className="block font-semibold text-slate-700 mb-1">
                Institutional SSO / LDAP Identity Provider
              </label>
              <input
                id="sso-input"
                type="text"
                readOnly
                value={institutionalSettings.ssoProvider}
                className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 font-mono text-xs text-slate-600"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                SAML 2.0 / OAuth2 federation active for all faculty and students.
              </span>
            </div>
          </div>
        </div>

        {/* Attendance Regulation Parameters */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Sliders className="w-4 h-4 text-sky-600" />
            <span>Statutory Attendance Policy Thresholds</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label htmlFor="threshold-mandatory-input" className="block font-semibold text-slate-700 mb-1">
                Mandatory Exam Eligibility Threshold (%)
              </label>
              <input
                id="threshold-mandatory-input"
                type="number"
                step="0.5"
                min="60"
                max="90"
                value={mandatoryThreshold}
                onChange={(e) => setMandatoryThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Students below this value trigger top warning banner and are barred from hall ticket issuance.
              </span>
            </div>

            <div>
              <label htmlFor="threshold-condonation-input" className="block font-semibold text-slate-700 mb-1">
                Minimum Condonable Baseline with Medical Proof (%)
              </label>
              <input
                id="threshold-condonation-input"
                type="number"
                step="0.5"
                min="50"
                max="75"
                value={condonationThreshold}
                onChange={(e) => setCondonationThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-slate-900"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Strict minimum required even with sanctioned medical/hospital leaves.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Last Synchronized: {institutionalSettings.lastDataSync}
          </span>

          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Changes saved to registry
              </span>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
