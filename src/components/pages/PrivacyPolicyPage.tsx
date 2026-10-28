import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-sky-700" />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institutional Privacy Policy & Student Data Protection
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Effective Date: Academic Year 2024 - 2025 • Apex Institute of Technology and Science
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            1. Scope and Institutional Purpose
          </h2>
          <p>
            This policy defines the collection, processing, storage, and auditing of student academic
            records, biometric presence verification signatures, and administrative transactional
            data within the Smart Attendance Percentage Tracker and Academic Portal. All operations
            comply with statutory higher-education regulations, FERPA standards, and applicable
            national digital personal data protection mandates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            2. Biometric and RFID Terminal Data Handling
          </h2>
          <p>
            Biometric punch logs recorded at classroom access points and laboratory terminals are
            mathematically converted into irreversible one-way cryptographic hash tokens. Raw
            fingerprint images are never stored or transferred across network boundaries. Timestamps,
            terminal serial IDs, and calculated attendance percentages are archived solely for
            curriculum compliance and examination eligibility verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            3. Access Control and Role-Based Authorization
          </h2>
          <p>
            Access to student attendance profiles, counseling logs, medical leave certificates, and
            examination grade sheets is strictly restricted based on authenticated institutional
            identities:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>
              <strong>Students:</strong> Access restricted to personal course enrollments, attendance
              aggregates, submitted tickets, and fee receipts.
            </li>
            <li>
              <strong>Faculty:</strong> Authorization granted for course rosters, attendance
              entry, assignment evaluation, and helpdesk inquiries.
            </li>
            <li>
              <strong>Mentors and Counselors:</strong> Access to advisory meeting logs, attendance
              intervention plans, and medical leave documentation.
            </li>
            <li>
              <strong>Administration & Registrar:</strong> Central governance over eligibility
              thresholds, hall ticket generation, and university audit reports.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            4. Dispute Resolution & Audit Records
          </h2>
          <p>
            All attendance dispute tickets, medical leave attachments, and correction audit trails
            are maintained in an immutable log for a minimum period of five (5) academic years
            following student graduation. Records are accessible to academic review boards during
            statutory audits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            5. Inquiries & Data Protection Officer Contact
          </h2>
          <p>
            Inquiries regarding student record privacy, audit discrepancies, or data access may be
            addressed directly to the Registrar Data Governance Cell at{' '}
            <span className="font-mono font-medium text-slate-900">
              dpo@apexuniversity.edu
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
};
