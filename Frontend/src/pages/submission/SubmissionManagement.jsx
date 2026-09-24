import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { submissionApi } from '../../api/submissionApi';

const FIELDS = [
  { name: 'courseinfo', label: 'Course ID', required: true },
  { name: 'deptinfo', label: 'Department ID', required: true },
  { name: 'studentinfo', label: 'Student user ID', required: true },
  { name: 'assignmentinfo', label: 'Assignment ID', required: true },
  { name: 'marksobtained', label: 'Marks obtained', type: 'number', required: true },
  { name: 'grade', label: 'Grade', required: true },
];

export function SubmissionManagement() {
  return (
    <div>
      <PageHeader title="Submissions" subtitle="Grade assignment submissions" />
      <ResourceForm fields={FIELDS} api={submissionApi} title="Submissions" />
    </div>
  );
}
