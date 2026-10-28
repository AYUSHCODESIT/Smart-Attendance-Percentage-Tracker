import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  UserProfile,
  SubjectAttendance,
  AttendanceRecord,
  PeriodSlot,
  SupportTicket,
  LeaveRequest,
  AssignmentItem,
  MentorshipSession,
  FeeItem,
  PaymentTransaction,
  CourseOffering,
  UserRole,
} from '../types';
import {
  initialStudentProfile,
  demoAccounts,
  initialSubjects,
  recentAttendanceLogs,
  todayRosterSlots,
  initialSupportTickets,
  initialLeaveRequests,
  initialAssignments,
  mentorshipRecords,
  feeBreakdown,
  paymentTransactions,
  availableElectives,
} from '../data/mockData';

export type AppNavTab =
  | 'attendance'
  | 'timetable'
  | 'courseplan'
  | 'assignments'
  | 'helpdesk'
  | 'mentorship'
  | 'leave'
  | 'exams'
  | 'registration'
  | 'fees'
  | 'settings'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'signup';

export type AttendanceSubTab = 'summary' | 'today' | 'datewise' | 'slots' | 'semester';
export type AuthPageMode = 'login' | 'signup' | 'reset';

interface AppContextType {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  authPageMode: AuthPageMode;
  setAuthPageMode: (mode: AuthPageMode) => void;

  switchUser: (roleOrId: string) => void;
  logout: () => void;
  login: (email: string, role: UserRole) => void;
  signup: (userData: {
    name: string;
    email: string;
    role: UserRole;
    studentId?: string;
    rollNumber?: string;
    department: string;
    program?: string;
  }) => void;

  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  attendanceSubTab: AttendanceSubTab;
  setAttendanceSubTab: (subTab: AttendanceSubTab) => void;

  subjects: SubjectAttendance[];
  todayRoster: PeriodSlot[];
  attendanceLogs: AttendanceRecord[];

  totalScheduled: number;
  totalPresent: number;
  totalAbsent: number;
  overallPercentage: number;
  isBelowThreshold: boolean;
  classesNeededFor75: number;
  classesCanAffordToMiss: number;

  tickets: SupportTicket[];
  createTicket: (data: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) => void;

  leaveRequests: LeaveRequest[];
  submitLeaveRequest: (data: Omit<LeaveRequest, 'id' | 'applicationNumber' | 'appliedOn' | 'status' | 'projectedAttendanceImpact'>) => void;

  assignments: AssignmentItem[];
  submitAssignmentMock: (assignmentId: string, fileTitle: string) => void;

  mentorshipList: MentorshipSession[];
  scheduleMentorshipSession: (session: Omit<MentorshipSession, 'id' | 'status'>) => void;

  fees: FeeItem[];
  payments: PaymentTransaction[];
  payFeeMock: (feeId: string, amount: number, method: PaymentTransaction['method']) => void;

  electives: CourseOffering[];
  toggleElectiveRegistration: (courseCode: string) => void;

  isTargetCalculatorOpen: boolean;
  setIsTargetCalculatorOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  toggleComplianceDemo: () => void;
  isHighAttendanceDemo: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialStudentProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authPageMode, setAuthPageMode] = useState<AuthPageMode>('login');

  const [activeTab, setActiveTab] = useState<AppNavTab>('login');
  const [attendanceSubTab, setAttendanceSubTab] = useState<AttendanceSubTab>('summary');

  const [subjects, setSubjects] = useState<SubjectAttendance[]>(initialSubjects);
  const [todayRoster] = useState<PeriodSlot[]>(todayRosterSlots);
  const [attendanceLogs] = useState<AttendanceRecord[]>(recentAttendanceLogs);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [assignments, setAssignments] = useState<AssignmentItem[]>(initialAssignments);
  const [mentorshipList, setMentorshipList] = useState<MentorshipSession[]>(mentorshipRecords);
  const [fees, setFees] = useState<FeeItem[]>(feeBreakdown);
  const [payments, setPayments] = useState<PaymentTransaction[]>(paymentTransactions);
  const [electives, setElectives] = useState<CourseOffering[]>(availableElectives);

  const [isTargetCalculatorOpen, setIsTargetCalculatorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHighAttendanceDemo, setIsHighAttendanceDemo] = useState(false);

  // Dynamic Overall Aggregate Calculations
  const { totalScheduled, totalPresent, totalAbsent, overallPercentage } = useMemo(() => {
    const totalScheduled = subjects.reduce((acc, sub) => acc + sub.totalConducted, 0);
    const totalPresent = subjects.reduce((acc, sub) => acc + sub.totalAttended, 0);
    const totalAbsent = subjects.reduce((acc, sub) => acc + sub.totalAbsent, 0);
    const overallPercentage = totalScheduled > 0 ? Number(((totalPresent / totalScheduled) * 100).toFixed(1)) : 0;
    return { totalScheduled, totalPresent, totalAbsent, overallPercentage };
  }, [subjects]);

  const isBelowThreshold = overallPercentage < 75.0;

  // Formula:
  // (totalPresent + x) / (totalScheduled + x) >= 0.75
  // x >= (0.75 * totalScheduled - totalPresent) / 0.25 = 3 * totalScheduled - 4 * totalPresent
  const classesNeededFor75 = useMemo(() => {
    if (!isBelowThreshold) return 0;
    const needed = Math.ceil(3 * totalScheduled - 4 * totalPresent);
    return needed > 0 ? needed : 0;
  }, [isBelowThreshold, totalScheduled, totalPresent]);

  // How many classes can be missed while staying >= 75%:
  // totalPresent / (totalScheduled + y) >= 0.75
  // y <= (4 * totalPresent - 3 * totalScheduled) / 3
  const classesCanAffordToMiss = useMemo(() => {
    if (isBelowThreshold) return 0;
    const canMiss = Math.floor((4 * totalPresent - 3 * totalScheduled) / 3);
    return canMiss > 0 ? canMiss : 0;
  }, [isBelowThreshold, totalScheduled, totalPresent]);

  const switchUser = (roleOrId: string) => {
    const found = demoAccounts.find((acc) => acc.role === roleOrId || acc.id === roleOrId);
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      setActiveTab('attendance');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthPageMode('login');
    setActiveTab('login');
  };

  const login = (email: string, role: UserRole) => {
    const matched = demoAccounts.find((acc) => acc.role === role || acc.email.toLowerCase() === email.toLowerCase()) || {
      ...initialStudentProfile,
      id: `usr-${Date.now()}`,
      email,
      role,
      name: email.split('@')[0].replace('.', ' '),
    };
    setCurrentUser(matched);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setActiveTab('attendance');
  };

  const signup = (userData: {
    name: string;
    email: string;
    role: UserRole;
    studentId?: string;
    rollNumber?: string;
    department: string;
    program?: string;
  }) => {
    const newUser: UserProfile = {
      id: `usr-new-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      studentId: userData.studentId || `AU2026-${userData.role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNumber: userData.rollNumber || `26${userData.role.slice(0, 2).toUpperCase()}999`,
      department: userData.department,
      program: userData.program || 'Bachelor of Technology (B.Tech)',
      semester: 1,
      section: 'Section A',
      academicYear: '2026 - 2027',
      advisorName: 'Dr. Anita Desai',
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setActiveTab('attendance');
  };

  const createTicket = (data: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...data,
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      status: 'Pending Review',
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const submitLeaveRequest = (data: Omit<LeaveRequest, 'id' | 'applicationNumber' | 'appliedOn' | 'status' | 'projectedAttendanceImpact'>) => {
    const newLeave: LeaveRequest = {
      ...data,
      id: `lv-${Date.now()}`,
      applicationNumber: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
      appliedOn: 'Today',
      status: 'Pending Approval',
      projectedAttendanceImpact: {
        currentPercentage: overallPercentage,
        projectedIfApproved: Number(Math.min(100, overallPercentage + (data.totalClassesImpacted * 0.4)).toFixed(1)),
        projectedIfRejected: Number(Math.max(0, overallPercentage - (data.totalClassesImpacted * 0.3)).toFixed(1)),
      },
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
  };

  const submitAssignmentMock = (assignmentId: string, _fileTitle: string) => {
    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === assignmentId
          ? {
              ...asg,
              submissionStatus: 'Submitted',
              submittedDate: 'Submitted today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : asg
      )
    );
  };

  const scheduleMentorshipSession = (session: Omit<MentorshipSession, 'id' | 'status'>) => {
    const newSession: MentorshipSession = {
      ...session,
      id: `mnt-${Date.now()}`,
      status: 'Scheduled',
    };
    setMentorshipList((prev) => [newSession, ...prev]);
  };

  const payFeeMock = (feeId: string, amount: number, method: PaymentTransaction['method']) => {
    setFees((prev) =>
      prev.map((fee) => {
        if (fee.id === feeId) {
          const newPaid = fee.paidAmount + amount;
          const newDue = Math.max(0, fee.totalAmount - newPaid);
          return {
            ...fee,
            paidAmount: newPaid,
            dueAmount: newDue,
            status: newDue === 0 ? 'Paid' : 'Partial',
          };
        }
        return fee;
      })
    );

    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      transactionRef: `TXN-AU-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Payment for ${fees.find((f) => f.id === feeId)?.category || 'Academic Fees'}`,
      amount,
      method,
      status: 'Success',
      receiptUrl: `/receipts/AU_REC_${Date.now()}.pdf`,
    };
    setPayments((prev) => [newTx, ...prev]);
  };

  const toggleElectiveRegistration = (courseCode: string) => {
    setElectives((prev) =>
      prev.map((c) =>
        c.code === courseCode
          ? {
              ...c,
              isRegistered: !c.isRegistered,
              enrolled: c.isRegistered ? c.enrolled - 1 : c.enrolled + 1,
            }
          : c
      )
    );
  };

  // Demo toggle between <75% and >=75% so all reviewer states can be tested instantly
  const toggleComplianceDemo = () => {
    if (!isHighAttendanceDemo) {
      // Switch to 78.4%
      setSubjects((prev) =>
        prev.map((sub) => {
          if (sub.subjectCode === 'CS402') {
            return {
              ...sub,
              totalAttended: 33,
              totalAbsent: 7,
              percentage: 82.5,
              requiredFor75: 0,
              canAffordToMiss: 4,
            };
          }
          if (sub.subjectCode === 'MA301') {
            return {
              ...sub,
              totalAttended: 29,
              totalAbsent: 7,
              percentage: 80.6,
              requiredFor75: 0,
              canAffordToMiss: 2,
            };
          }
          if (sub.subjectCode === 'CS405P') {
            return {
              ...sub,
              totalAttended: 12,
              totalAbsent: 2,
              percentage: 85.7,
              requiredFor75: 0,
              canAffordToMiss: 2,
            };
          }
          return sub;
        })
      );
      setIsHighAttendanceDemo(true);
    } else {
      // Revert to initial subjects (<75%)
      setSubjects(initialSubjects);
      setIsHighAttendanceDemo(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        authPageMode,
        setAuthPageMode,
        switchUser,
        logout,
        login,
        signup,
        activeTab,
        setActiveTab,
        attendanceSubTab,
        setAttendanceSubTab,
        subjects,
        todayRoster,
        attendanceLogs,
        totalScheduled,
        totalPresent,
        totalAbsent,
        overallPercentage,
        isBelowThreshold,
        classesNeededFor75,
        classesCanAffordToMiss,
        tickets,
        createTicket,
        leaveRequests,
        submitLeaveRequest,
        assignments,
        submitAssignmentMock,
        mentorshipList,
        scheduleMentorshipSession,
        fees,
        payments,
        payFeeMock,
        electives,
        toggleElectiveRegistration,
        isTargetCalculatorOpen,
        setIsTargetCalculatorOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toggleComplianceDemo,
        isHighAttendanceDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
