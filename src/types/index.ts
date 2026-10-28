export type UserRole = 'student' | 'teacher' | 'mentor' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  studentId?: string;
  rollNumber?: string;
  department: string;
  program: string;
  semester: number;
  section: string;
  academicYear: string;
  advisorName: string;
}

export interface SubjectAttendance {
  id: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  instructor: string;
  instructorEmail: string;
  instructorOffice: string;
  credits: number;
  totalConducted: number;
  totalAttended: number;
  totalAbsent: number;
  percentage: number;
  requiredFor75: number; // how many consecutive to attend to reach 75%
  canAffordToMiss: number; // how many can be missed while staying >= 75%
  category: 'Core Theory' | 'Core Practical' | 'Department Elective' | 'Open Elective';
  lastUpdated: string;
}

export interface PeriodSlot {
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  room: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  status?: 'Present' | 'Absent' | 'Cancelled' | 'Upcoming';
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  dateStr?: string;
  slots: PeriodSlot[];
}

export interface AttendanceRecord {
  id: string;
  date: string;
  periodNumber: number;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  instructor: string;
  status: 'Present' | 'Absent' | 'On Duty' | 'Medical Leave';
  markedAt: string;
  mode: 'Biometric' | 'RFID' | 'Faculty Portal';
}

export interface TeacherContact {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  officeRoom: string;
  officeHours: string;
  coursesHandled: string[];
  status: 'Available' | 'In Lecture' | 'On Leave';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subjectCode: string;
  subjectName: string;
  category: 'Attendance Correction' | 'Medical Concession' | 'Duty Leave Dispute' | 'Academic Query';
  disputedDate: string;
  disputedPeriod: string;
  reason: string;
  documentAttached?: string;
  status: 'Pending Review' | 'In Progress' | 'Resolved' | 'Rejected';
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface SyllabusModule {
  moduleNumber: number;
  title: string;
  topicsPlanned: number;
  topicsCompleted: number;
  completionPercentage: number;
  keyTopics: string[];
}

export interface CoursePlan {
  subjectCode: string;
  subjectName: string;
  syllabusUrl: string;
  modules: SyllabusModule[];
  overallProgress: number;
  textbooks: string[];
}

export interface AssignmentItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  weightage: string;
  submissionStatus: 'Submitted' | 'Pending' | 'Late' | 'Graded';
  submittedDate?: string;
  obtainedMarks?: number;
  feedback?: string;
}

export interface MentorshipSession {
  id: string;
  date: string;
  time: string;
  mentorName: string;
  mentorId: string;
  type: 'Class Counseling' | 'Attendance Review' | 'Academic Performance' | 'Career Guidance';
  status: 'Scheduled' | 'Completed' | 'Follow-up Required';
  meetingNotes: string;
  actionItems: string[];
  nextReviewDate?: string;
}

export interface LeaveRequest {
  id: string;
  applicationNumber: string;
  type: 'Medical Leave' | 'Duty Leave' | 'Personal Emergency';
  startDate: string;
  endDate: string;
  totalDays: number;
  totalClassesImpacted: number;
  reason: string;
  documentName?: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  appliedOn: string;
  approverComments?: string;
  projectedAttendanceImpact: {
    currentPercentage: number;
    projectedIfApproved: number;
    projectedIfRejected: number;
  };
}

export interface ExamScheduleItem {
  courseCode: string;
  courseName: string;
  examDate: string;
  timeSlot: string;
  hallNumber: string;
  seatNumber: string;
  type: 'Mid-Semester' | 'End-Semester Final';
  attendanceEligible: boolean;
}

export interface ExamRegistration {
  registrationId: string;
  semester: number;
  academicYear: string;
  overallAttendance: number;
  isEligibleForAdmitCard: boolean;
  registeredCourses: string[];
  hallTicketStatus: 'Issued' | 'Pending Attendance Clearance' | 'Locked';
  hallTicketNumber?: string;
}

export interface SemesterGrade {
  courseCode: string;
  courseName: string;
  credits: number;
  gradeEarned: string;
  gradePoints: number;
  status: 'Pass' | 'Fail';
}

export interface SemesterResult {
  semesterNumber: number;
  academicSession: string;
  creditsRegistered: number;
  creditsEarned: number;
  sgpa: number;
  cgpa: number;
  grades: SemesterGrade[];
}

export interface FeeItem {
  id: string;
  category: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Overdue';
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  date: string;
  description: string;
  amount: number;
  method: 'Net Banking' | 'UPI' | 'Credit/Debit Card' | 'Campus NEFT';
  status: 'Success' | 'Processing' | 'Failed';
  receiptUrl: string;
}

export interface CourseOffering {
  code: string;
  title: string;
  department: string;
  credits: number;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  type: 'Core' | 'Department Elective' | 'Open Elective';
  prerequisites: string[];
  isRegistered?: boolean;
}
