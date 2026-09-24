import {
  DeadlineItem,
  ApplicationItem,
  DriveItem,
  TestimonialItem,
  SeededStudent,
  SeededSubject,
  RosterEntry,
  TimetableSlot,
  TimetableDay,
  ResourceItem,
  CampusEvent,
  GradeDetail,
} from '../types';

export const INSTITUTIONS = [
  { name: 'IIT DELHI', color: '#e63b2e', location: 'New Delhi', type: 'Engineering & Tech' },
  { name: 'IIM BANGALORE', color: '#0055ff', location: 'Bengaluru', type: 'Management' },
  { name: 'CHRIST', color: '#ffcc00', location: 'Bengaluru', type: 'Multi-Disciplinary' },
  { name: 'NMIMS', color: '#111111', location: 'Mumbai', type: 'Technology & Business' },
  { name: 'SYMBIOSIS', color: '#e63b2e', location: 'Pune', type: 'International University' },
];

export const STUDENT_DEADLINES: DeadlineItem[] = [
  {
    id: 'd1',
    title: 'DBMS — Normalization Exercise',
    date: 'Sep 26',
    colorClass: 'text-[#e63b2e]',
    completed: false
  },
  {
    id: 'd2',
    title: 'OS — CPU Scheduling Simulation',
    date: 'Sep 30',
    colorClass: 'text-[#ffcc00]',
    completed: false
  },
  {
    id: 'd3',
    title: 'DSA — Linked List Implementation',
    date: 'Oct 5',
    colorClass: 'text-[#0055ff]',
    completed: false
  },
  {
    id: 'd4',
    title: 'ML — Regression Problem Set',
    date: 'Oct 8',
    colorClass: 'text-[#e63b2e]',
    completed: false
  },
  {
    id: 'd5',
    title: 'CN — Subnetting Worksheet',
    date: 'Oct 12',
    colorClass: 'text-[#ffcc00]',
    completed: false
  },
  {
    id: 'd6',
    title: 'Web — Portfolio Website',
    date: 'Oct 15',
    colorClass: 'text-[#0055ff]',
    completed: false
  }
];

export const STUDENT_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app1',
    role: 'Product Designer',
    company: 'ABC Corp',
    status: 'In Review',
    statusColor: 'bg-[#d4ff00]'
  },
  {
    id: 'app2',
    role: 'Software Engineer',
    company: 'TechNova',
    status: 'Applied',
    statusColor: 'bg-[#d6e3ff]'
  }
];

export const PLACEMENT_DRIVES: DriveItem[] = [
  {
    id: 'dr1',
    company: 'Goldman Sachs',
    date: 'Oct 6, 2026',
    type: 'On Campus'
  },
  {
    id: 'dr2',
    company: 'Microsoft',
    date: 'Oct 14, 2026',
    type: 'Virtual'
  },
  {
    id: 'dr3',
    company: 'McKinsey & Co',
    date: 'Oct 28, 2026',
    type: 'On Campus'
  }
];

/* ==========================================================================
   CAMPUS EVENTS, HACKATHONS & ACTIVITIES (first half of Fall 2026)
   ========================================================================== */

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'ev1',
    title: 'DevSprint 2026 — 36 Hour Campus Hackathon',
    kind: 'Hackathon',
    date: 'Oct 16–17',
    time: '9:00 AM +',
    location: 'Main Auditorium',
    accent: 'text-[#e63b2e]',
  },
  {
    id: 'ev2',
    title: 'Hugging Face Crash Course — AI/ML Workshop',
    kind: 'Workshop',
    date: 'Oct 8',
    time: '4:00 PM',
    location: 'CS Lab 1',
    accent: 'text-[#0055ff]',
  },
  {
    id: 'ev3',
    title: 'Guest Lecture: Careers in Cloud (AWS)',
    kind: 'Seminar',
    date: 'Sep 30',
    time: '3:00 PM',
    location: 'Seminar Hall',
    accent: 'text-[#ffcc00]',
  },
  {
    id: 'ev4',
    title: 'Goldman Sachs — On-Campus Drive',
    kind: 'Placement',
    date: 'Oct 6',
    time: '10:00 AM',
    location: 'TPO Block',
    accent: 'text-[#d4ff00]',
  },
  {
    id: 'ev5',
    title: 'CodeSprint Weekly — Competitive Programming',
    kind: 'Event',
    date: 'Every Sat',
    time: '10:00 AM',
    location: 'CS Lab 2',
    accent: 'text-[#e63b2e]',
  },
  {
    id: 'ev6',
    title: 'Aurora 2026 — Annual Tech Fest',
    kind: 'Event',
    date: 'Nov 14–15',
    time: 'All Day',
    location: 'Campus Grounds',
    accent: 'text-[#0055ff]',
  },
  {
    id: 'ev7',
    title: 'Startup Pitch Night — Innovation Cell',
    kind: 'Event',
    date: 'Oct 22',
    time: '6:00 PM',
    location: 'Innovation Cell',
    accent: 'text-[#ffcc00]',
  },
  {
    id: 'ev8',
    title: 'Git & GitHub Actions Bootcamp',
    kind: 'Workshop',
    date: 'Oct 1',
    time: '2:00 PM',
    location: 'CS Lab 1',
    accent: 'text-[#d4ff00]',
  },
];

/* ==========================================================================
   GRADE BREAKDOWN (mirrors Backend/seed.js attendance + submission marks)
   Order matches STUDENT_ACCOUNTS.
   ========================================================================== */

export const GRADE_BREAKDOWN: GradeDetail[][] = [
  [
    { code: 'CS201', name: 'Data Structures', credits: 4, grade: 'A', marks: '88 / 100', status: 'Completed' },
    { code: 'CS202', name: 'Operating Systems', credits: 4, grade: 'B+', marks: '76 / 100', status: 'Completed' },
    { code: 'CS203', name: 'Database Management Systems', credits: 4, grade: 'A', marks: '85 / 100', status: 'Completed' },
    { code: 'CS204', name: 'Computer Networks', credits: 4, grade: 'A-', marks: '81 / 100', status: 'Ongoing' },
    { code: 'CS301', name: 'Machine Learning', credits: 3, grade: 'B+', marks: '77 / 100', status: 'Ongoing' },
    { code: 'CS302', name: 'Web Technologies', credits: 3, grade: 'A', marks: '84 / 100', status: 'Ongoing' },
  ],
  [
    { code: 'CS201', name: 'Data Structures', credits: 4, grade: 'A+', marks: '96 / 100', status: 'Completed' },
    { code: 'CS202', name: 'Operating Systems', credits: 4, grade: 'A+', marks: '95 / 100', status: 'Completed' },
    { code: 'CS203', name: 'Database Management Systems', credits: 4, grade: 'A+', marks: '97 / 100', status: 'Completed' },
    { code: 'CS204', name: 'Computer Networks', credits: 4, grade: 'A', marks: '90 / 100', status: 'Ongoing' },
    { code: 'CS301', name: 'Machine Learning', credits: 3, grade: 'A', marks: '91 / 100', status: 'Ongoing' },
    { code: 'CS302', name: 'Web Technologies', credits: 3, grade: 'A+', marks: '98 / 100', status: 'Ongoing' },
  ],
];

/* ==========================================================================
   DIGITAL RESOURCES HUB & LIBRARY CATALOG
   ========================================================================== */

export const RESOURCES_HUB: ResourceItem[] = [
  { id: 'r1', code: 'CS201', subject: 'Data Structures', title: 'Unit 1 — Arrays & Linked Lists', type: 'notes', description: 'Complete notes with solved examples and complexity tables.' },
  { id: 'r2', code: 'CS201', subject: 'Data Structures', title: 'Visualizing Data Structures — Animation Series', type: 'video', description: 'Animated walkthrough of stacks, queues, trees and graphs.' },
  { id: 'r3', code: 'CS201', subject: 'Data Structures', title: '150 Curated DSA Practice Problems', type: 'link', description: 'Graded problem set with editorial solutions.' },
  { id: 'r4', code: 'CS202', subject: 'Operating Systems', title: 'CPU Scheduling Lectures — Gantt Charts', type: 'slides', description: 'FCFS, SJF, Round Robin with worked examples.' },
  { id: 'r5', code: 'CS203', subject: 'Database Management Systems', title: 'SQL Workout — Query Bank & Solutions', type: 'book', description: 'Normalization, joins, transactions and indexing exercises.' },
  { id: 'r6', code: 'CS203', subject: 'Database Management Systems', title: 'ER Diagrams Crash Course', type: 'video', description: 'Step-by-step entity-relationship modeling.' },
  { id: 'r7', code: 'CS204', subject: 'Computer Networks', title: 'Subnetting & CIDR Cheat Sheet', type: 'notes', description: 'One-page reference for VLSM, CIDR and routing tables.' },
  { id: 'r8', code: 'CS204', subject: 'Computer Networks', title: 'TCP/IP Deep Dive — Reading List', type: 'link', description: 'Curated RFCs and guides for socket programming.' },
  { id: 'r9', code: 'CS301', subject: 'Machine Learning', title: 'Regression to Neural Networks — 12 Episodes', type: 'video', description: 'Full intro series with Jupyter notebook links.' },
  { id: 'r10', code: 'CS301', subject: 'Machine Learning', title: 'Scikit-learn Cheat Sheet', type: 'notes', description: 'Model selection, preprocessing and pipelines.' },
  { id: 'r11', code: 'CS302', subject: 'Web Technologies', title: 'MDN Web Docs — Official JS Guide', type: 'link', description: 'Authoritative reference for modern JavaScript.' },
  { id: 'r12', code: 'CS302', subject: 'Web Technologies', title: 'Responsive Design Field Guide', type: 'book', description: 'Layout, Flexbox, Grid and accessibility patterns.' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: 'CampusFlow has transformed how we connect students with opportunities. The platform is intuitive, powerful, and built for real campus needs.',
    author: 'Dr. Meera Iyer',
    title: 'Dean of Academics',
    initial: 'M',
    colorClass: 'bg-[#ffcc00]'
  },
  {
    quote: 'The automation and analytics have saved us countless hours and improved our placement outcomes significantly.',
    author: 'Arjun Nair',
    title: 'Placement Officer',
    initial: 'A',
    colorClass: 'bg-[#ffdad6]'
  },
  {
    quote: 'A one-stop platform that keeps everything—from applications to offers—organized and accessible. It truly empowers students.',
    author: 'Sneha Patil',
    title: 'Student, Final Year',
    initial: 'S',
    colorClass: 'bg-[#d4ff00]'
  }
];

export const AI_ASSISTANT_PRESETS: Record<string, string> = {
  'Summarize notes': '📝 Summary for CS402 (Distributed Systems): Key topics covered include Raft consensus algorithm, Byzantine fault tolerance, and vector clocks. Review chapter 4 before Monday.',
  'Study plan': '📅 7-Day Sprint Plan: Day 1-2: Normalization & SQL Queries. Day 3-4: Indexing & B-Trees. Day 5: Transactions & ACID. Day 6: Mock tests. Day 7: Final revision.',
  'Quiz': '⚡ Quick Knowledge Check: In relational databases, what does the "I" in ACID stand for? A) Integrity B) Isolation C) Iteration D) Idempotency. (Answer: B - Isolation)'
};

/* ==========================================================================
   SEEDED CAMPUS DATA (mirrors Backend/seed.js — Anurag University, CSE)
   Two real student accounts + six subjects taught by Meera Nair.
   ========================================================================== */

export const STUDENT_ACCOUNTS: SeededStudent[] = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    password: 'student123',
    roll: '24EG110A01',
    branch: 'A',
    program: 'B.Tech CSE',
    semester: '3',
    cgpa: 8.7,
    attendancePct: 95,
    creditsDone: '48 / 160',
    skills: ['Python', 'Java', 'React'],
    grades: {
      CS201: 'A',
      CS202: 'B+',
      CS203: 'A',
      CS204: 'A-',
      CS301: 'B+',
      CS302: 'A',
    },
  },
  {
    name: 'Diya Patel',
    email: 'diya.patel@campus.edu',
    password: 'student123',
    roll: '24EG110A02',
    branch: 'A',
    program: 'B.Tech CSE',
    semester: '3',
    cgpa: 9.1,
    attendancePct: 95,
    creditsDone: '48 / 160',
    skills: ['C++', 'Data Structures', 'Machine Learning'],
    grades: {
      CS201: 'A+',
      CS202: 'A+',
      CS203: 'A+',
      CS204: 'A',
      CS301: 'A',
      CS302: 'A+',
    },
  },
];

export const SEEDED_SUBJECTS: SeededSubject[] = [
  { code: 'CS201', name: 'Data Structures', credits: 4, teacher: 'Meera Nair', schedule: 'Mon/Wed 10:00 AM · Thu Lab', dueLabel: 'Linked List Implementation', dueDate: 'Oct 5' },
  { code: 'CS202', name: 'Operating Systems', credits: 4, teacher: 'Meera Nair', schedule: 'Mon/Tue + Thu Tutorial', dueLabel: 'CPU Scheduling Simulation', dueDate: 'Sep 30' },
  { code: 'CS203', name: 'Database Management Systems', credits: 4, teacher: 'Meera Nair', schedule: 'Mon/Wed + Fri Lab', dueLabel: 'Normalization Exercise', dueDate: 'Sep 26' },
  { code: 'CS204', name: 'Computer Networks', credits: 4, teacher: 'Meera Nair', schedule: 'Mon/Fri + Tue Lab', dueLabel: 'Subnetting Worksheet', dueDate: 'Oct 12' },
  { code: 'CS301', name: 'Machine Learning', credits: 3, teacher: 'Meera Nair', schedule: 'Wed/Thu + Fri Lab', dueLabel: 'Regression Problem Set', dueDate: 'Oct 8' },
  { code: 'CS302', name: 'Web Technologies', credits: 3, teacher: 'Meera Nair', schedule: 'Tue/Thu + Wed/Sat Lab', dueLabel: 'Portfolio Website', dueDate: 'Oct 15' },
];

/* ==========================================================================
   WEEKLY TIMETABLE — Section A, Sem III (busy, realistic)
   ========================================================================== */

const SUBJECT_LOOKUP: Record<string, string> = Object.fromEntries(
  SEEDED_SUBJECTS.map((s) => [s.code, s.name])
);

type RawSlot = [TimetableDay, string, string, string, string, TimetableSlot['type']];

const RAW_SLOTS: RawSlot[] = [
  // Monday
  ['Mon', '09:00', '10:00', 'CS204', 'R305', 'Tutorial'],
  ['Mon', '10:00', '11:00', 'CS201', 'R304', 'Lecture'],
  ['Mon', '11:15', '12:15', 'CS203', 'R304', 'Lecture'],
  ['Mon', '14:00', '15:00', 'CS202', 'R304', 'Lecture'],
  ['Mon', '15:00', '16:00', 'CS301', 'Lab 2', 'Lab'],
  // Tuesday
  ['Tue', '09:00', '10:00', 'CS201', 'R304', 'Lecture'],
  ['Tue', '10:00', '11:00', 'CS204', 'Lab 1', 'Lab'],
  ['Tue', '11:15', '12:15', 'CS202', 'R304', 'Lecture'],
  ['Tue', '14:00', '15:00', 'CS302', 'R305', 'Lecture'],
  ['Tue', '15:00', '16:00', 'CS203', 'Lab 2', 'Lab'],
  // Wednesday
  ['Wed', '09:00', '10:00', 'CS301', 'R305', 'Lecture'],
  ['Wed', '10:00', '11:00', 'CS201', 'R304', 'Lecture'],
  ['Wed', '11:15', '12:15', 'CS202', 'Lab 1', 'Lab'],
  ['Wed', '14:00', '15:00', 'CS204', 'R305', 'Lecture'],
  ['Wed', '15:00', '16:00', 'CS203', 'R304', 'Tutorial'],
  ['Wed', '16:00', '17:00', 'CS302', 'Lab 2', 'Lab'],
  // Thursday
  ['Thu', '09:00', '10:00', 'CS202', 'R304', 'Tutorial'],
  ['Thu', '10:00', '11:00', 'CS203', 'R304', 'Lecture'],
  ['Thu', '11:15', '12:15', 'CS301', 'R305', 'Lecture'],
  ['Thu', '14:00', '15:00', 'CS201', 'Lab 2', 'Lab'],
  ['Thu', '15:00', '16:00', 'CS302', 'R305', 'Lecture'],
  ['Thu', '16:00', '17:00', 'CS204', 'R305', 'Tutorial'],
  // Friday
  ['Fri', '09:00', '10:00', 'CS302', 'R305', 'Lecture'],
  ['Fri', '10:00', '11:00', 'CS201', 'R304', 'Tutorial'],
  ['Fri', '11:15', '12:15', 'CS204', 'R305', 'Lecture'],
  ['Fri', '14:00', '15:00', 'CS301', 'Lab 1', 'Lab'],
  ['Fri', '15:00', '17:00', 'CS203', 'Lab 2', 'Lab'],
  // Saturday (club + hackathon prep)
  ['Sat', '10:00', '12:00', 'CS302', 'Lab 1', 'Lab'],
];

export const WEEKLY_TIMETABLE: TimetableSlot[] = RAW_SLOTS.map(
  ([day, start, end, code, room, type], i) => ({
    id: `slot-${i + 1}`,
    day,
    start,
    end,
    code,
    room,
    type,
    subject: SUBJECT_LOOKUP[code] ?? code,
  })
);

export const FACULTY_INFO = {
  name: 'Meera Nair',
  email: 'meera.nair@campus.edu',
  id: 'FAC-CSE-01',
  designation: 'Associate Professor',
  department: 'Computer Science and Engineering',
  advisees: 2,
  courses: SEEDED_SUBJECTS.length,
  toGrade: 1,
};

export const FACULTY_ROSTER: RosterEntry[] = [
  { name: 'Aarav Sharma', roll: '24EG110A01', attendancePct: 95, assignment: 'CPU Scheduling Simulation', marks: '76 / 100', status: 'Graded' },
  { name: 'Diya Patel', roll: '24EG110A02', attendancePct: 95, assignment: 'CPU Scheduling Simulation', marks: '95 / 100', status: 'Graded' },
];

/** Submissions still awaiting grading (no submission record exists yet). */
export const PENDING_GRADING: { student: string; roll: string; assignment: string; due: string }[] = [
  { student: 'Aarav Sharma', roll: '24EG110A01', assignment: 'Subnetting Worksheet', due: 'Oct 20' },
  { student: 'Diya Patel', roll: '24EG110A02', assignment: 'Subnetting Worksheet', due: 'Oct 20' },
];
