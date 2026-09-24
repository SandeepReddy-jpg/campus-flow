import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { collegeApi } from '../../api/collegeApi';

const FIELDS = [
  { name: 'name', label: 'College name', required: true },
  { name: 'code', label: 'College code', required: true },
  { name: 'address', label: 'Address', required: true, full: true },
  { name: 'contact_phone', label: 'Contact phone' },
  { name: 'contact_email', label: 'Contact email' },
  { name: 'contact_website', label: 'Website' },
  { name: 'desp', label: 'Description', type: 'textarea', required: true, full: true },
  { name: 'logo', label: 'Logo URL' },
];

export function CollegeManagement() {
  return (
    <div>
      <PageHeader title="Colleges" subtitle="Add or update college information" />
      <ResourceForm
        fields={FIELDS}
        api={collegeApi}
        title="College details"
        transformPayload={(p) => ({
          name: p.name,
          code: p.code,
          address: p.address,
          contact: {
            phone: p.contact_phone,
            email: p.contact_email,
            website: p.contact_website,
          },
          desp: p.desp,
          logo: p.logo,
        })}
      />
    </div>
  );
}