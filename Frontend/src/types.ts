export type RoleType = 'STUDENT' | 'FACULTY' | 'PLACEMENT' | 'ADMIN';

export type ScreenType = 'OVERVIEW' | 'STUDENT' | 'FACULTY' | 'PLACEMENT' | 'ADMIN';

export type ThemeType = 'light' | 'dark' | 'brutalist' | 'minimalist';

export interface DeadlineItem {
  id: string;
  title: string;
  date: string;
  colorClass: string;
  completed?: boolean;
}

export interface QuickLinkItem {
  id: string;
  title: string;
  iconName?: string;
  href?: string;
}

export interface ApplicationItem {
  id: string;
  role: string;
  company: string;
  status: 'In Review' | 'Applied' | 'Selected' | 'Interviewing';
  statusColor: string;
}

export interface DriveItem {
  id: string;
  company: string;
  date: string;
  type: 'On Campus' | 'Virtual';
}

export interface TestimonialItem {
  quote: string;
  author: string;
  title: string;
  initial: string;
  colorClass: string;
}

export interface SeededStudent {
  name: string;
  email: string;
  password: string;
  roll: string;
  branch: string;
  program: string;
  semester: string;
  cgpa: number;
  attendancePct: number;
  creditsDone: string;
  skills: string[];
  grades: Record<string, string>;
}

export interface SeededSubject {
  code: string;
  name: string;
  credits: number;
  teacher: string;
  schedule: string;
  dueLabel: string;
  dueDate: string;
}

export interface RosterEntry {
  name: string;
  roll: string;
  attendancePct: number;
  assignment: string;
  marks: string;
  status: 'Graded' | 'Needs Grading';
}

export interface SignedInUser {
  name: string;
  email: string;
  role: RoleType;
  roll: string;
}

export type TimetableDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface TimetableSlot {
  id: string;
  day: TimetableDay;
  start: string;
  end: string;
  code: string;
  subject: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export type ResourceType = 'notes' | 'slides' | 'video' | 'book' | 'link';

export interface ResourceItem {
  id: string;
  code: string;
  subject: string;
  title: string;
  type: ResourceType;
  description: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  kind: 'Hackathon' | 'Workshop' | 'Event' | 'Placement' | 'Seminar';
  date: string;
  time: string;
  location: string;
  accent: string;
}

export interface GradeDetail {
  code: string;
  name: string;
  credits: number;
  grade: string;
  marks: string;
  status: 'Completed' | 'Ongoing';
}
