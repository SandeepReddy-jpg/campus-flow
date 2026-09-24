export function Badge({ children, tone = 'default' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

const ROLE_TONES = {
  teacher: 'primary',
  student: 'success',
  'placement-office': 'warning',
  hod: 'danger',
};

export function RoleBadge({ role }) {
  return <Badge tone={ROLE_TONES[role] || 'default'}>{role}</Badge>;
}