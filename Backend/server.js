import 'dotenv/config';
import exp from 'express';
import cors from 'cors';
import pkg from 'mongoose';
const { connect, connection: mongooseConnection } = pkg;
import { userapp } from './Apis/userapi.js';
import { studentapp } from './Apis/studentapi.js';
import { facultyapp } from './Apis/faculty.js';
import { collegeapp } from './Apis/college.js';
import { deptapp } from './Apis/dept.js';
import { courseapp } from './Apis/courses.js';
import { subjectapp } from './Apis/subject.js';
import { assignmentapp } from './Apis/assignment.js';
import { announcementapp } from './Apis/announcement.js';
import { eventapp } from './Apis/events.js';
import { attendanceapp } from './Apis/attendance.js';
import { companyapp } from './Apis/company.js';
import { driveapp } from './Apis/drive.js';
import { requestapp } from './Apis/request.js';
import { submissionapp } from './Apis/submission.js';
import { timetableapp } from './Apis/timetable.js';
import { resourceapp } from './Apis/resource.js';
import { optionalAuth } from './middleware/auth.js';

const app = exp();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/campusflow';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// ---------- middleware ----------
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl / mobile / same-origin
      const allowed = [frontendUrl, 'http://localhost:3000', 'http://localhost:5173'];
      if (allowed.includes(origin)) return cb(null, true);
      return cb(null, true); // dev-friendly; tighten in production
    },
    credentials: true,
  })
);
app.use(exp.json({ limit: '1mb' }));
app.use(exp.urlencoded({ extended: true }));

// tiny request logger (no extra deps)
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// ---------- public meta ----------
const ROUTES = [
  ['user-api', 'POST /register, POST /login, POST /forgot, GET /me, GET /list, GET /info/:id, PATCH|PUT /update/:id, PATCH /delete/:id, PATCH /restore/:id, DELETE /remove/:id'],
  ['student-api', 'POST /basic-info, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['faculty-api', 'POST /basic-info, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['college-api', 'POST /info, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['dept-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT|POST /update/:id, DELETE /remove/:id'],
  ['course-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['subject-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['assignment-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['announcement-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['event-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['attendance-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['company-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['drive-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['request-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['submission-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['timetable-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
  ['resource-api', 'POST /create, GET /list, GET /info/:id, PATCH|PUT /update/:id, DELETE /remove/:id'],
];

app.get('/', (_req, res) => {
  res.json({
    message: 'CampusFlow API is running',
    version: '2.0.0',
    auth: process.env.REQUIRE_AUTH !== 'false' ? 'required (Bearer JWT)' : 'disabled',
    routes: ROUTES.map(([base, ops]) => `/${base} — ${ops}`),
  });
});

app.get('/health', (_req, res) => {
  const state = mongooseConnection.readyState; // 1 = connected
  res.json({ status: 'ok', db: state === 1 ? 'connected' : 'connecting', uptime: process.uptime() });
});

// Aggregated counts for the frontend Dashboard quick-access tiles.
app.get('/api/stats', optionalAuth, async (_req, res, next) => {
  try {
    const { usermodel } = await import('./modules/User.js');
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
    const [users, colleges, departments, courses, subjects, assignments, submissions, attendance, announcements, events, companies, drives, requests, timetable, resources] =
      await Promise.all([
        usermodel.countDocuments(), collegemodel.countDocuments(), deptmodel.countDocuments(),
        coursesmodel.countDocuments(), subjectmodel.countDocuments(), assignmentmodel.countDocuments(),
        submissionmodel.countDocuments(), attendancemodel.countDocuments(), announcementmodel.countDocuments(),
        eventmodel.countDocuments(), companymodel.countDocuments(), drivemodel.countDocuments(),
        requestmodel.countDocuments(), timetablemodel.countDocuments(), resourcemodel.countDocuments(),
      ]);
    res.json({
      message: 'platform stats',
      payload: { users, colleges, departments, courses, subjects, assignments, submissions, attendance, announcements, events, companies, drives, requests, timetable, resources },
    });
  } catch (err) {
    next(err);
  }
});

// ---------- resource routers (paths match Frontend src/api/* exactly) ----------
app.use('/user-api', userapp);
app.use('/student-api', studentapp);
app.use('/faculty-api', facultyapp);
app.use('/college-api', collegeapp);
app.use('/dept-api', deptapp);
app.use('/course-api', courseapp);
app.use('/subject-api', subjectapp);
app.use('/assignment-api', assignmentapp);
app.use('/announcement-api', announcementapp);
app.use('/event-api', eventapp);
app.use('/attendance-api', attendanceapp);
app.use('/company-api', companyapp);
app.use('/drive-api', driveapp);
app.use('/request-api', requestapp);
app.use('/submission-api', submissionapp);
app.use('/timetable-api', timetableapp);
app.use('/resource-api', resourceapp);

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ---------- central error handler ----------
/* eslint-disable no-unused-vars */
app.use((err, _req, res, _next) => {
  if (err?.name === 'ValidationError') {
    const details = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({ message: details[0] || 'Validation failed', error: err.message, details });
  }
  if (err?.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id format', error: err.message });
  }
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'value';
    return res.status(409).json({ message: `Duplicate value for '${field}'`, error: err.message });
  }
  if (err?.name === 'SyntaxError' && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err?.message });
});

// ---------- db + boot (skip listen under test) ----------
async function connection() {
  try {
    await connect(mongoUri);
    app.locals.dbConnected = true;
    console.log('MongoDB connection is successful');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => console.log(`CampusFlow backend live on http://localhost:${port}`));
    }
  } catch (error) {
    console.log('Error connecting to the Database ', error.message);
    if (process.env.NODE_ENV !== 'test') process.exit(1);
    throw error;
  }
}
connection();

export default app;
