import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { announcementApi } from '../../api/announcementApi';

const FIELDS = [
  { name: 'coursesinfo', label: 'Course ID', required: true },
  { name: 'deptinfo', label: 'Department ID', required: true },
  { name: 'name', label: 'Title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true, full: true },
  { name: 'postedby', label: 'Posted by (user ID)', required: true },
  { name: 'priority', label: 'Priority', type: 'select', options: [{ value: 'low', label: 'Low' }, { value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }] },
  { name: 'ispinned', label: 'Pinned (true/false)' },
];

export function AnnouncementManagement() {
  return (
    <div>
      <PageHeader title="Announcements" subtitle="Create, view, update or delete announcements" />
      <ResourceForm fields={FIELDS} api={announcementApi} title="Announcements" />
    </div>
  );
}
