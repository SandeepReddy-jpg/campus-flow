import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { courseApi } from '../../api/courseApi';

const FIELDS = [
  { name: 'collegeinfo', label: 'College ID', required: true },
  { name: 'deptinfo', label: 'Department ID', required: true },
  { name: 'name', label: 'Course name', required: true },
  { name: 'code', label: 'Course code', required: true },
  { name: 'credits', label: 'Credits', type: 'number', required: true },
  { name: 'duration', label: 'Duration', required: true, hint: 'e.g. 4years' },
  { name: 'descp', label: 'Description', type: 'textarea', required: true, full: true },
];

export function CourseManagement() {
  return (
    <div>
      <PageHeader title="Courses" subtitle="Add or update course information" />
      <ResourceForm fields={FIELDS} api={courseApi} title="Course details" />
    </div>
  );
}