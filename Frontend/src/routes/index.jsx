import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute, PublicOnly } from '../components/layout/RouteGuards';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { CollegeManagement } from '../pages/college/CollegeManagement';
import { DepartmentManagement } from '../pages/department/DepartmentManagement';
import { CourseManagement } from '../pages/course/CourseManagement';
import { SubjectManagement } from '../pages/subject/SubjectManagement';
import { AssignmentManagement } from '../pages/assignment/AssignmentManagement';
import { UserManagement } from '../pages/user/UserManagement';
import { StudentManagement } from '../pages/student/StudentManagement';
import { FacultyManagement } from '../pages/faculty/FacultyManagement';
import { AnnouncementManagement } from '../pages/announcement/AnnouncementManagement';
import { AttendanceManagement } from '../pages/attendance/AttendanceManagement';
import { EventManagement } from '../pages/event/EventManagement';
import { CompanyManagement } from '../pages/company/CompanyManagement';
import { DriveManagement } from '../pages/drive/DriveManagement';
import { RequestManagement } from '../pages/request/RequestManagement';
import { SubmissionManagement } from '../pages/submission/SubmissionManagement';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnly>
            <Login />
          </PublicOnly>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnly>
            <Register />
          </PublicOnly>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnly>
            <ForgotPassword />
          </PublicOnly>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/college" element={<CollegeManagement />} />
        <Route path="/department" element={<DepartmentManagement />} />
        <Route path="/course" element={<CourseManagement />} />
        <Route path="/subject" element={<SubjectManagement />} />
        <Route path="/assignment" element={<AssignmentManagement />} />
        <Route path="/submission" element={<SubmissionManagement />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/announcement" element={<AnnouncementManagement />} />
        <Route path="/event" element={<EventManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/student" element={<StudentManagement />} />
        <Route path="/faculty" element={<FacultyManagement />} />
        <Route path="/company" element={<CompanyManagement />} />
        <Route path="/drive" element={<DriveManagement />} />
        <Route path="/request" element={<RequestManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
