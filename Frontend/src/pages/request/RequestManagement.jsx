import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { requestApi } from '../../api/requestApi';

const FIELDS = [
  { name: 'userinfo', label: 'User ID', required: true },
  { name: 'catogery', label: 'Category', type: 'select', required: true, options: [{ value: 'leave', label: 'Leave' }, { value: 'document_request', label: 'Document request' }, { value: 'fee_related', label: 'Fee related' }, { value: 'course_drop', label: 'Course drop' }, { value: 'subject_change', label: 'Subject change' }, { value: 'project_extension', label: 'Project extension' }, { value: 'grievance', label: 'Grievance' }, { value: 'other', label: 'Other' }] },
  { name: 'title', label: 'Title', required: true },
  { name: 'subject', label: 'Subject', type: 'textarea', required: true, full: true },
  { name: 'attachments', label: 'Attachment URL' },
  { name: 'priority', label: 'Priority', type: 'select', options: [{ value: 'low', label: 'Low' }, { value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }] },
];

export function RequestManagement() {
  return (
    <div>
      <PageHeader title="Requests" subtitle="Raise and track student/staff requests" />
      <ResourceForm fields={FIELDS} api={requestApi} title="Requests" />
    </div>
  );
}
