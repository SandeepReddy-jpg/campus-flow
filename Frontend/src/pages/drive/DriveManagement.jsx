import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { driveApi } from '../../api/driveApi';

const FIELDS = [
  { name: 'collegeinfo', label: 'College ID', required: true },
  { name: 'courseinfo', label: 'Course ID', required: true },
  { name: 'deptinfo', label: 'Department ID', required: true },
  { name: 'companyinfo', label: 'Company ID', required: true },
  { name: 'name', label: 'Drive name', required: true },
  { name: 'role', label: 'Role', required: true },
  { name: 'descp', label: 'Description', type: 'textarea', required: true, full: true },
  { name: 'salary', label: 'Salary', type: 'number', required: true },
  { name: 'status', label: 'Status', type: 'select', options: [{ value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed' }, { value: 'in_progress', label: 'In progress' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }] },
];

export function DriveManagement() {
  return (
    <div>
      <PageHeader title="Placement Drives" subtitle="Create and manage placement drives" />
      <ResourceForm fields={FIELDS} api={driveApi} title="Placement Drives" />
    </div>
  );
}
