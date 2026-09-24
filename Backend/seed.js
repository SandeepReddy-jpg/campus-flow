/**
 * CampusFlow seed script.
 *
 *  1. Removes default/smoke-test accounts + all smoke-test data
 *     (test-prefixed users, every college/dept/course/
 *     subject/assignment/attendance/submission/announcement/event/
 *     company/drive/request + student & faculty profiles).
 *  2. Seeds fresh demo data: 1 college, 1 dept, 1 course, 6 subjects,
 *     1 faculty account, 2 student accounts (with profiles, attendance
 *     and submissions), assignments, announcements and an event.
 *
 * Run:  node seed.js
 */
import 'dotenv/config';
import bcryptjs from 'bcryptjs';
import pkg from 'mongoose';

const { connect, disconnect } = pkg;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/campusflow';

const { usermodel } = await import('./modules/User.js');
const { studentmodel } = await import('./modules/studentmodule.js');
const { facultymodel } = await import('./modules/faculty.js');
const { collegemodel } = await import('./modules/college.js');
const { deptmodel } = await import('./modules/department.js');
const { coursesmodel } = await import('./modules/courses.js');
const { subjectmodel } = await import('./modules/subject.js');
const { assignmentmodel } = await import('./modules/assignment.js');
const { submissionmodel } = await import('./modules/submission.js');
const { attendancemodel } = await import('./modules/attendance.js');
const { announcementmodel } = await import('./modules/announcement.js');
const { eventmodel } = await import('./modules/events.js');
const { companymodel } = await import('./modules/company.js');
const { drivemodel } = await import('./modules/drive.js');
const { requestmodel } = await import('./modules/request.js');
const { timetablemodel } = await import('./modules/timetable.js');
const { resourcemodel } = await import('./modules/resource.js');

const hash = (pw) => bcryptjs.hash(String(pw), 10);

async function main() {
  await connect(mongoUri);
  console.log('Connected to', mongoUri);

  // ---------- 1. wipe default / smoke-test data ----------
  const testUserFilter = {
    $or: [
      { username: /^(smoke|verify_|diag)/i },
      { email: /^(smoke|verify_|diag).*@|^stu\d+@campus\.edu$|^smoke\d+@campus\.edu$/i },
    ],
  };
  const removedUsers = await usermodel.deleteMany(testUserFilter);
  console.log(`Removed ${removedUsers.deletedCount} default/test users`);

  // Every org/academic record in the DB right now is smoke-test junk,
  // so reseed these collections from scratch. Real user accounts
  // (e.g. adi123) are left untouched.
  const wiped = {};
  for (const [name, model] of [
    ['colleges', collegemodel],
    ['departments', deptmodel],
    ['courses', coursesmodel],
    ['subjects', subjectmodel],
    ['assignments', assignmentmodel],
    ['attendance', attendancemodel],
    ['submissions', submissionmodel],
    ['announcements', announcementmodel],
    ['events', eventmodel],
    ['companies', companymodel],
    ['drives', drivemodel],
    ['requests', requestmodel],
    ['timetable', timetablemodel],
    ['resources', resourcemodel],
    ['studentProfiles', studentmodel],
    ['facultyProfiles', facultymodel],
  ]) {
    const r = await model.deleteMany({});
    wiped[name] = r.deletedCount;
  }
  console.log('Wiped collections:', JSON.stringify(wiped));

  // ---------- 2. seed fresh demo data ----------
  const college = await collegemodel.create({
    name: 'Anurag University',
    code: 'AU',
    address: 'Venkatapur, Medchal-Malkajgiri, Hyderabad 500088',
    contact: { phone: '040-00000000', email: 'info@anurag.edu.in', website: 'https://anurag.edu.in' },
    desp: 'A premier private university focused on engineering and technology.',
  });

  const dept = await deptmodel.create({
    collegeinfo: college._id,
    name: 'Computer Science and Engineering',
    code: 'CSE',
    descp: 'B.Tech Computer Science and Engineering department.',
  });

  const course = await coursesmodel.create({
    collegeinfo: college._id,
    deptinfo: dept._id,
    name: 'B.Tech Computer Science and Engineering',
    code: 'BTCSE',
    credits: 160,
    duration: '4 Years',
    descp: 'Four year undergraduate program in Computer Science and Engineering.',
  });

  // Faculty account (also used as teacherinfo for subjects/assignments)
  const facultyUser = await usermodel.create({
    role: 'teacher',
    username: 'Meera Nair',
    email: 'meera.nair@campus.edu',
    id: 'FAC-CSE-01',
    password: await hash('faculty123'),
    phno: 9876500001,
    department: 'CSE',
  });
  await facultymodel.create({
    user: facultyUser._id,
    collegeinfo: college._id,
    deptinfo: dept._id,
    designation: 'Associate Professor',
    qualifications: ['M.Tech Computer Science', 'Ph.D Computer Science'],
    specialization: ['Operating Systems', 'Computer Networks'],
    experienceYears: 8,
  });

  // Two student accounts with pre-seeded profile data
  const studentDefs = [
    {
      user: {
        role: 'student',
        username: 'Aarav Sharma',
        email: 'aarav.sharma@campus.edu',
        id: '24EG110A01',
        password: await hash('student123'),
        phno: 9876543210,
        department: 'CSE',
        branch: 'A',
      },
      profile: {
        skills: ['Python', 'Java', 'React'],
        cgpa: 8.7,
        admissionYear: 2024,
        graduationYear: 2028,
        program: 'B.Tech CSE',
        linkdinurl: 'https://linkedin.com/in/aaravsharma',
        githuburl: 'https://github.com/aaravsharma',
        potfoliourl: '',
        resume: '',
      },
    },
    {
      user: {
        role: 'student',
        username: 'Diya Patel',
        email: 'diya.patel@campus.edu',
        id: '24EG110A02',
        password: await hash('student123'),
        phno: 9876543211,
        department: 'CSE',
        branch: 'A',
      },
      profile: {
        skills: ['C++', 'Data Structures', 'Machine Learning'],
        cgpa: 9.1,
        admissionYear: 2024,
        graduationYear: 2028,
        program: 'B.Tech CSE',
        linkdinurl: 'https://linkedin.com/in/diyapatel',
        githuburl: 'https://github.com/diyapatel',
        potfoliourl: '',
        resume: '',
      },
    },
  ];

  const students = [];
  for (const def of studentDefs) {
    const u = await usermodel.create(def.user);
    const p = await studentmodel.create({ user: u._id, ...def.profile });
    students.push({ user: u, profile: p });
  }

  // Subjects
  const subjectDefs = [
    { name: 'Data Structures', code: 'CS201', descp: 'Arrays, linked lists, stacks, queues, trees and graphs.', credits: 4 },
    { name: 'Operating Systems', code: 'CS202', descp: 'Processes, scheduling, memory management and file systems.', credits: 4 },
    { name: 'Database Management Systems', code: 'CS203', descp: 'ER models, SQL, normalization and transactions.', credits: 4 },
    { name: 'Computer Networks', code: 'CS204', descp: 'OSI model, TCP/IP, routing and network security basics.', credits: 4 },
    { name: 'Machine Learning', code: 'CS301', descp: 'Regression, classification, clustering and neural networks.', credits: 3 },
    { name: 'Web Technologies', code: 'CS302', descp: 'HTML, CSS, JavaScript and modern frontend frameworks.', credits: 3 },
  ];
  const subjects = [];
  for (const s of subjectDefs) {
    subjects.push(
      await subjectmodel.create({
        collegeinfo: college._id,
        deptinfo: dept._id,
        courseinfo: course._id,
        teacherinfo: facultyUser._id,
        ...s,
      })
    );
  }

  // Assignments (the last one intentionally has no submissions yet)
  const assignmentDefs = [
    { subject: 0, name: 'Linked List Implementation', descp: 'Singly and doubly linked list operations.', instructions: 'Implement in C++ with a menu-driven program.', maxmarks: 100, duedate: '2026-10-05' },
    { subject: 1, name: 'CPU Scheduling Simulation', descp: 'Simulate FCFS, SJF and Round Robin.', instructions: 'Submit code plus a report comparing waiting times.', maxmarks: 100, duedate: '2026-10-08' },
    { subject: 2, name: 'Normalization Exercise', descp: 'Normalize tables up to BCNF.', instructions: 'Show all decomposition steps with keys.', maxmarks: 50, duedate: '2026-10-12' },
    { subject: 3, name: 'Subnetting Worksheet', descp: 'Subnet design for a campus network.', instructions: 'Submit solved worksheet as PDF.', maxmarks: 50, duedate: '2026-10-20' },
  ];
  const assignments = [];
  for (const a of assignmentDefs) {
    assignments.push(
      await assignmentmodel.create({
        subjectinfo: subjects[a.subject]._id,
        teacherinfo: facultyUser._id,
        name: a.name,
        descp: a.descp,
        instructions: a.instructions,
        maxmarks: a.maxmarks,
        duedate: a.duedate,
      })
    );
  }

  // Submissions (first three assignments, both students)
  const marks = [
    [88, 'A'], [92, 'A+'],
    [76, 'B+'], [95, 'A+'],
    [45, 'A'], [48, 'A+'],
  ];
  let mi = 0;
  for (let ai = 0; ai < 3; ai++) {
    for (const s of students) {
      const [m, g] = marks[mi++];
      await submissionmodel.create({
        courseinfo: course._id,
        deptinfo: dept._id,
        studentinfo: s.user._id,
        assignmentinfo: assignments[ai]._id,
        marksobtained: m,
        grade: g,
      });
    }
  }

  // Attendance: 5 days x first 4 subjects x both students
  const dates = ['2026-09-18', '2026-09-19', '2026-09-22', '2026-09-23', '2026-09-24'];
  const statusPattern = ['present', 'present', 'present', 'present', 'late']; // Aarav
  const statusPattern2 = ['present', 'present', 'absent', 'present', 'present']; // Diya
  for (let di = 0; di < dates.length; di++) {
    for (let si = 0; si < 4; si++) {
      await attendancemodel.create({ subjectinfo: subjects[si]._id, studentinfo: students[0].user._id, date: dates[di], status: statusPattern[di] });
      await attendancemodel.create({ subjectinfo: subjects[si]._id, studentinfo: students[1].user._id, date: dates[di], status: statusPattern2[di] });
    }
  }

  // Announcements + event
  await announcementmodel.create({
    coursesinfo: course._id,
    deptinfo: dept._id,
    name: 'Mid-Semester Examinations',
    content: 'Mid-semester examinations for all CSE subjects begin on 6th October. Hall tickets will be issued a week before.',
    priority: 'high',
    postedby: facultyUser._id,
    ispinned: true,
  });
  await announcementmodel.create({
    coursesinfo: course._id,
    deptinfo: dept._id,
    name: 'Tech Fest Registrations Open',
    content: 'Registrations are open for the annual tech fest. Coding, robotics and paper presentation events available.',
    priority: 'normal',
    postedby: facultyUser._id,
    ispinned: false,
  });
  await eventmodel.create({
    coursesinfo: course._id,
    deptinfo: dept._id,
    name: 'Annual Tech Fest',
    decp: 'Two-day technical festival with coding contests and project expo.',
    catogery: 'cultural',
    startdate: '2026-11-14',
    enddate: '2026-11-15',
    members: 500,
  });

  // Weekly timetable for Section A (Mon–Fri)
  const slot = (day, subject, startTime, endTime, room) => ({
    collegeinfo: college._id,
    deptinfo: dept._id,
    courseinfo: course._id,
    subjectinfo: subjects[subject]._id,
    teacherinfo: facultyUser._id,
    day,
    startTime,
    endTime,
    room,
    section: 'A',
  });
  const timetableDefs = [
    slot('Monday', 0, '10:00 AM', '11:00 AM', 'R304'),
    slot('Monday', 2, '11:15 AM', '12:15 PM', 'R304'),
    slot('Monday', 3, '2:00 PM', '3:00 PM', 'R305'),
    slot('Tuesday', 1, '9:00 AM', '10:00 AM', 'R304'),
    slot('Tuesday', 3, '10:15 AM', '11:15 AM', 'R305'),
    slot('Tuesday', 4, '2:00 PM', '3:00 PM', 'Lab 2'),
    slot('Wednesday', 0, '10:00 AM', '11:00 AM', 'R304'),
    slot('Wednesday', 2, '11:15 AM', '12:15 PM', 'R304'),
    slot('Wednesday', 5, '2:00 PM', '3:00 PM', 'Lab 1'),
    slot('Thursday', 1, '9:00 AM', '10:00 AM', 'R304'),
    slot('Thursday', 4, '11:00 AM', '12:00 PM', 'Lab 2'),
    slot('Thursday', 2, '2:00 PM', '3:00 PM', 'R304'),
    slot('Friday', 3, '9:00 AM', '10:00 AM', 'R305'),
    slot('Friday', 5, '11:00 AM', '12:00 PM', 'Lab 1'),
    slot('Friday', 0, '2:00 PM', '4:00 PM', 'Lab 1'),
  ];
  await timetablemodel.insertMany(timetableDefs);

  // Study resources hub (linked to subjects, uploaded by faculty)
  const resourceDefs = [
    { subject: 0, title: 'DS Lecture Notes — Unit 1 (Arrays & Linked Lists)', type: 'notes', url: 'https://campusflow.local/resources/cs201-unit1.pdf', description: 'Complete unit 1 notes with solved examples.' },
    { subject: 0, title: 'Visualizing Data Structures', type: 'video', url: 'https://campusflow.local/resources/cs201-visual', description: 'Animated walkthroughs of stacks, queues and trees.' },
    { subject: 0, title: 'DSA Practice Problem Set', type: 'link', url: 'https://campusflow.local/resources/cs201-practice', description: '120 curated practice problems with solutions.' },
    { subject: 1, title: 'CPU Scheduling Slides', type: 'slides', url: 'https://campusflow.local/resources/cs202-slides.pdf', description: 'FCFS, SJF and Round Robin with Gantt charts.' },
    { subject: 2, title: 'SQL Practice Book', type: 'book', url: 'https://campusflow.local/resources/cs203-book.pdf', description: 'Queries, normalization and transaction exercises.' },
    { subject: 3, title: 'Subnetting Cheat Sheet', type: 'notes', url: 'https://campusflow.local/resources/cs204-subnet.pdf', description: 'One-page CIDR and subnet design reference.' },
    { subject: 4, title: 'ML Intro Video Series', type: 'video', url: 'https://campusflow.local/resources/cs301-videos', description: 'Regression to neural networks, 12 episodes.' },
    { subject: 5, title: 'MDN Web Docs — JS Guide', type: 'link', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'Official JavaScript reference and tutorials.' },
  ];
  for (const r of resourceDefs) {
    await resourcemodel.create({
      subjectinfo: subjects[r.subject]._id,
      title: r.title,
      type: r.type,
      url: r.url,
      description: r.description,
      uploadedBy: facultyUser._id,
    });
  }

  console.log('Seed complete:');
  console.log('  college:', college.code, '| dept:', dept.code, '| course:', course.code);
  console.log('  subjects:', subjects.length, '| assignments:', assignments.length);
  console.log('  timetable slots:', timetableDefs.length, '| resources:', resourceDefs.length);
  console.log('  faculty: meera.nair@campus.edu / faculty123');
  console.log('  students: aarav.sharma@campus.edu / student123, diya.patel@campus.edu / student123');

  await disconnect();
}

main().catch(async (err) => {
  console.error('Seed failed:', err);
  try { await disconnect(); } catch { /* ignore */ }
  process.exit(1);
});
