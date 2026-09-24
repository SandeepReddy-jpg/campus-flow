import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { eventApi } from '../../api/eventApi';

const FIELDS = [
  { name: 'coursesinfo', label: 'Course ID', required: true },
  { name: 'deptinfo', label: 'Department ID', required: true },
  { name: 'name', label: 'Event name', required: true },
  { name: 'decp', label: 'Description', type: 'textarea', required: true, full: true },
  { name: 'catogery', label: 'Category', type: 'select', required: true, options: [{ value: 'academic', label: 'Academic' }, { value: 'cultural', label: 'Cultural' }, { value: 'sports', label: 'Sports' }, { value: 'placement', label: 'Placement' }, { value: 'holiday', label: 'Holiday' }, { value: 'exam', label: 'Exam' }, { value: 'seminar', label: 'Seminar' }, { value: 'other', label: 'Other' }] },
  { name: 'startdate', label: 'Start date', required: true },
  { name: 'enddate', label: 'End date', required: true },
  { name: 'members', label: 'Members', type: 'number', required: true },
  { name: 'logo', label: 'Logo URL' },
];

export function EventManagement() {
  return (
    <div>
      <PageHeader title="Events" subtitle="Create and manage campus events" />
      <ResourceForm fields={FIELDS} api={eventApi} title="Events" />
    </div>
  );
}
