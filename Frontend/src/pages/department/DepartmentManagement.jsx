import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { deptApi } from '../../api/deptApi';

const FIELDS = [
  { name: 'collegeinfo', label: 'College ID', required: true, hint: 'Reference to college' },
  { name: 'name', label: 'Department name', required: true },
  { name: 'code', label: 'Department code', required: true },
  { name: 'hodid', label: 'HOD user ID', required: true },
  { name: 'descp', label: 'Description', type: 'textarea', required: true, full: true },
];

export function DepartmentManagement() {
  return (
    <div>
      <PageHeader title="Departments" subtitle="Add or update department information" />
      <ResourceForm fields={FIELDS} api={deptApi} title="Department details" />
    </div>
  );
}