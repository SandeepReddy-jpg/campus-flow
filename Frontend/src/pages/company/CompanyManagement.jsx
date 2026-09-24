import { PageHeader } from '../../components/ui';
import { ResourceForm } from '../../components/common/ResourceForm';
import { companyApi } from '../../api/companyApi';

const FIELDS = [
  { name: 'collegeinfo', label: 'College ID', required: true },
  { name: 'name', label: 'Company name', required: true },
  { name: 'sector', label: 'Sector', required: true },
  { name: 'industry', label: 'Industry', required: true },
  { name: 'hrname', label: 'HR name', required: true },
  { name: 'hrphno', label: 'HR phone', type: 'number', required: true },
  { name: 'hremail', label: 'HR email', required: true },
  { name: 'descp', label: 'Description', type: 'textarea', required: true, full: true },
  { name: 'logo', label: 'Logo URL' },
];

export function CompanyManagement() {
  return (
    <div>
      <PageHeader title="Companies" subtitle="Manage recruiting companies" />
      <ResourceForm fields={FIELDS} api={companyApi} title="Companies" />
    </div>
  );
}
