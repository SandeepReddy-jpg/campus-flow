import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { assignmentApi } from '../../api/assignmentApi';

const FIELDS = [
  { name: 'subjectinfo', label: 'Subject ID', required: true },
  { name: 'teacherinfo', label: 'Teacher user ID', required: true },
  { name: 'name', label: 'Assignment name', required: true },
  { name: 'descp', label: 'Description', type: 'textarea', required: true, full: true },
  { name: 'instructions', label: 'Instructions', type: 'textarea', required: true, full: true },
  { name: 'maxmarks', label: 'Maximum marks', type: 'number', defaultValue: 100 },
  { name: 'duedate', label: 'Due date', required: true, hint: 'e.g. 12-9-2026' },
];

export function AssignmentManagement() {
  return (
    <div>
      <PageHeader title="Assignments" subtitle="Create or update assignments" />
      <ResourceForm fields={FIELDS} api={assignmentApi} title="Assignment details" />
    </div>
  );
}