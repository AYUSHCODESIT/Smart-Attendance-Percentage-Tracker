import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { SystemAlertBanner } from './components/layout/SystemAlertBanner';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { AttendanceOverview } from './components/attendance/AttendanceOverview';
import { TimetableView } from './components/timetable/TimetableView';
import { CoursePlanView } from './components/syllabus/CoursePlanView';
import { AssignmentsView } from './components/assignments/AssignmentsView';
import { HelpdeskTicketsView } from './components/helpdesk/HelpdeskTicketsView';
import { MentorshipView } from './components/mentorship/MentorshipView';
import { LeaveManagementView } from './components/leave/LeaveManagementView';
import { ExaminationsView } from './components/exams/ExaminationsView';
import { CourseRegistrationView } from './components/registration/CourseRegistrationView';
import { FeeManagementView } from './components/fees/FeeManagementView';
import { InstitutionalSettingsView } from './components/settings/InstitutionalSettingsView';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { AuthModal } from './components/auth/AuthModal';

const MainLayout: React.FC = () => {
  const { activeTab, isAuthenticated, authPageMode } = useApp();

  // If student/faculty is logged out, render the dedicated authentication landing portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {authPageMode === 'signup' ? (
            <SignupPage />
          ) : authPageMode === 'reset' ? (
            <ForgotPasswordPage />
          ) : (
            <LoginPage />
          )}
        </main>
        <Footer />
        <AuthModal />
      </div>
    );
  }

  // When authenticated, render full academic portal dashboard
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Banner Alert (Dynamically calculates >=75% vs <75%) */}
      <SystemAlertBanner />

      {/* Main Header */}
      <Header />

      {/* Main Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Academic Sidebar */}
          <Sidebar />

          {/* Center Main Stage */}
          <main className="flex-1 w-full min-w-0" id="main-content">
            {activeTab === 'attendance' && <AttendanceOverview />}
            {activeTab === 'timetable' && <TimetableView />}
            {activeTab === 'courseplan' && <CoursePlanView />}
            {activeTab === 'assignments' && <AssignmentsView />}
            {activeTab === 'helpdesk' && <HelpdeskTicketsView />}
            {activeTab === 'mentorship' && <MentorshipView />}
            {activeTab === 'leave' && <LeaveManagementView />}
            {activeTab === 'exams' && <ExaminationsView />}
            {activeTab === 'registration' && <CourseRegistrationView />}
            {activeTab === 'fees' && <FeeManagementView />}
            {activeTab === 'settings' && <InstitutionalSettingsView />}
            {activeTab === 'privacy' && <PrivacyPolicyPage />}
            {activeTab === 'terms' && <TermsPage />}
            {activeTab === 'login' && <LoginPage />}
            {activeTab === 'signup' && <SignupPage />}
          </main>
        </div>
      </div>

      {/* Institutional Footer */}
      <Footer />

      {/* Quick Verified Authentication Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
