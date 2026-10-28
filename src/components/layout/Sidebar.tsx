import React from 'react';
import { useApp, AppNavTab } from '../../context/AppContext';
import {
  CheckSquare,
  CalendarDays,
  BookOpen,
  FileText,
  LifeBuoy,
  Users,
  FileMinus,
  Award,
  PlusCircle,
  CreditCard,
  Settings,
  ShieldAlert,
  FileCheck2,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface NavItem {
  id: AppNavTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  section?: 'academic' | 'compliance' | 'auth';
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, isBelowThreshold, tickets, assignments, fees, setAuthPageMode } = useApp();

  const pendingTickets = tickets.filter((t) => t.status === 'Pending Review' || t.status === 'In Progress').length;
  const pendingAssignments = assignments.filter((a) => a.submissionStatus === 'Pending').length;
  const overdueFees = fees.filter((f) => f.status === 'Overdue').length;

  const academicItems: NavItem[] = [
    {
      id: 'attendance',
      label: 'Attendance Tracking',
      icon: CheckSquare,
      badge: isBelowThreshold ? 'Alert' : undefined,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      id: 'timetable',
      label: 'Class Timetable',
      icon: CalendarDays,
    },
    {
      id: 'courseplan',
      label: 'Course Plan & Syllabus',
      icon: BookOpen,
    },
    {
      id: 'assignments',
      label: 'Assignments & Tasks',
      icon: FileText,
      badge: pendingAssignments > 0 ? pendingAssignments : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'helpdesk',
      label: 'Faculty Helpdesk',
      icon: LifeBuoy,
      badge: pendingTickets > 0 ? `${pendingTickets} Open` : undefined,
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    {
      id: 'mentorship',
      label: 'Mentorship & Counseling',
      icon: Users,
    },
    {
      id: 'leave',
      label: 'Leave Management',
      icon: FileMinus,
    },
    {
      id: 'exams',
      label: 'Examinations Hub',
      icon: Award,
      badge: isBelowThreshold ? 'Barred' : 'Eligible',
      badgeColor: isBelowThreshold
        ? 'bg-rose-100 text-rose-800 border-rose-200'
        : 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'registration',
      label: 'Course Registration',
      icon: PlusCircle,
    },
    {
      id: 'fees',
      label: 'Fees & Dues Portal',
      icon: CreditCard,
      badge: overdueFees > 0 ? 'Due' : undefined,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
  ];

  const authItems: NavItem[] = [
    {
      id: 'login',
      label: 'Login Portal',
      icon: LogIn,
    },
    {
      id: 'signup',
      label: 'New Signup / Enroll',
      icon: UserPlus,
    },
  ];

  const complianceItems: NavItem[] = [
    {
      id: 'settings',
      label: 'Domain & Settings',
      icon: Settings,
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: ShieldAlert,
    },
    {
      id: 'terms',
      label: 'Academic Terms',
      icon: FileCheck2,
    },
  ];

  const renderNavGroup = (items: NavItem[]) => (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.id === 'login') {
                setAuthPageMode('login');
              } else if (item.id === 'signup') {
                setAuthPageMode('signup');
              }
              setActiveTab(item.id);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors text-left ${
              isActive
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-sky-400' : 'text-slate-500'
                }`}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </div>

            {item.badge && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-semibold shrink-0 ml-1.5 ${
                  isActive
                    ? 'bg-slate-800 text-slate-200 border-slate-700'
                    : item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 flex-shrink-0">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          Academic Navigation
        </div>
        <div className="text-xs text-slate-600 mt-0.5">Semester 4 (2024 - 2025)</div>
      </div>

      <nav className="p-2 space-y-4" aria-label="Portal Navigation">
        {renderNavGroup(academicItems)}

        <div className="pt-2 border-t border-slate-100">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Account Access
          </div>
          {renderNavGroup(authItems)}
        </div>

        <div className="pt-2 border-t border-slate-100">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            System & Policies
          </div>
          {renderNavGroup(complianceItems)}
        </div>
      </nav>

      {/* Quick Status Box */}
      <div className="m-3 p-3 rounded-md bg-slate-50 border border-slate-200 text-xs">
        <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
          <span>Regulation Status</span>
          <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1 py-0.5 rounded">
            Sec 14.B
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Students with aggregate attendance below 75% are ineligible for End-Semester Final Exams
          without Dean condonation.
        </p>
      </div>
    </aside>
  );
};
