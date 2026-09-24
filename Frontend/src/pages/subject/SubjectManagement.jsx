import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { subjectApi } from '../../api/subjectApi';

const FIELDS = [
  { name: 'collegeinfo', label: 'College ID', required: true },
  { name: 'deptinfo', label: 'Department ID', required: true },
  { name: 'courseinfo', label: 'Course ID', required: true },
  { name: 'teacherinfo', label: 'Teacher user ID', required: true },
  { name: 'name', label: 'Subject name', required: true },
  { name: 'code', label: 'Subject code', required: true },
  { name: 'credits', label: 'Credits', type: 'number', required: true },
  { name: 'descp', label: 'Description', type: 'textarea', required: true, full: true },
];

export function SubjectManagement() {
  return (
    <div>
      <PageHeader title="Subjects" subtitle="Add or update subject information" />
      <ResourceForm fields={FIELDS} api={subjectApi} title="Subject details" />
    </div>
  );
}