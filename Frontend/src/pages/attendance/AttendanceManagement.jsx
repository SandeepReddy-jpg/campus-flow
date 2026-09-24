import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { attendanceApi } from '../../api/attendanceApi';

const FIELDS = [
  { name: 'subjectinfo', label: 'Subject ID', required: true },
  { name: 'studentinfo', label: 'Student user ID', required: true },
  { name: 'date', label: 'Date', required: true, hint: 'e.g. 2026-09-23' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: [{ value: 'present', label: 'Present' }, { value: 'absent', label: 'Absent' }, { value: 'late', label: 'Late' }] },
];

export function AttendanceManagement() {
  return (
    <div>
      <PageHeader title="Attendance" subtitle="Mark and manage attendance records" />
      <ResourceForm fields={FIELDS} api={attendanceApi} title="Attendance" />
    </div>
  );
}
