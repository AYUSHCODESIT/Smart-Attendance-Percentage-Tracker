import React from 'react';
import { FileCheck2, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-6 h-6 text-sky-700" />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Academic Regulations & Terms of Service
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Statute Ordinance 2024 • Academic Council & Examination Directorate
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            1. Statutory Attendance Requirement (Statute 14.B)
          </h2>
          <p>
            Under University Academic Ordinance Section 14.B, every enrolled candidate is required to
            maintain a minimum attendance aggregate of{' '}
            <strong className="text-slate-900">75.0%</strong> across all scheduled lecture and laboratory
            hours in each registered course during the semester.
          </p>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-900 text-xs">
            <strong>Examination Debarment Clause:</strong> Students failing to achieve the mandatory
            75% threshold are automatically barred from receiving the End-Semester Examination Admit
            Card and must register for course repetition during the summer term.
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            2. Medical and On-Duty Condonation Guidelines
          </h2>
          <p>
            The Dean of Academic Affairs may, on the recommendation of the Department Counseling Cell
            and Head of Department, grant condonation of shortage in attendance up to a maximum of
            10.0% (permitting eligibility down to an absolute floor of 65.0%) strictly under the
            following conditions:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>Hospitalization or acute clinical illness certified by the University Health Center Physician.</li>
            <li>Official deputation representing the University in national competitive hackathons, conferences, or sports tournaments.</li>
            <li>Submission of certified leave documentation within five (5) working days of return to campus.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            3. Academic Integrity & Continuous Assessment
          </h2>
          <p>
            Assignments, laboratory code projects, and continuous assessment submissions must reflect
            original student work. Plagiarism or unauthorized code synthesis in lab evaluations
            results in an immediate award of zero points and referral to the Academic Disciplinary
            Committee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            4. Financial Dues & Fee Clearance
          </h2>
          <p>
            Issuance of official grade sheets, hall tickets, and subsequent semester course
            enrollment is contingent upon full clearance of all assessed tuition, laboratory, and
            examination fees prior to published institutional cutoff deadlines.
          </p>
        </section>
      </div>
    </div>
  );
};
