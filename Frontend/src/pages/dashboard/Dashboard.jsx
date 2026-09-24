import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RoleBadge } from '../../components/ui';

const QUICK_LINKS = [
  { to: '/college', label: 'Colleges', icon: '🏛️', desc: 'Manage campus institutions' },
  { to: '/department', label: 'Departments', icon: '🏢', desc: 'Organize departments' },
  { to: '/course', label: 'Courses', icon: '🎓', desc: 'Define degree programs' },
  { to: '/subject', label: 'Subjects', icon: '📚', desc: 'Add subjects & teachers' },
  { to: '/assignment', label: 'Assignments', icon: '📝', desc: 'Post & update assignments' },
  { to: '/submission', label: 'Submissions', icon: '📥', desc: 'Grade submissions' },
  { to: '/attendance', label: 'Attendance', icon: '✅', desc: 'Track attendance' },
  { to: '/announcement', label: 'Announcements', icon: '📢', desc: 'Campus announcements' },
  { to: '/event', label: 'Events', icon: '🎉', desc: 'Campus events' },
  { to: '/users', label: 'Users', icon: '👥', desc: 'Manage accounts & roles' },
  { to: '/student', label: 'Students', icon: '🧑‍🎓', desc: 'Student profiles' },
  { to: '/faculty', label: 'Faculty', icon: '👩‍🏫', desc: 'Faculty profiles' },
  { to: '/company', label: 'Companies', icon: '🏭', desc: 'Recruiting companies' },
  { to: '/drive', label: 'Drives', icon: '💼', desc: 'Placement drives' },
  { to: '/request', label: 'Requests', icon: '📨', desc: 'Student & staff requests' },
];

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <section className="dashboard__welcome">
        <div className="dashboard__avatar">{user?.username?.[0]?.toUpperCase() || 'U'}</div>
        <div>
          <h1>Welcome back, {user?.username || 'User'}</h1>
          <p>
            {user?.email} · <RoleBadge role={user?.role} />
          </p>
        </div>
      </section>

      <section>
        <h2 className="dashboard__heading">Quick access</h2>
        <div className="dashboard__grid">
          {QUICK_LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="tile">
              <span className="tile__icon">{item.icon}</span>
              <span className="tile__label">{item.label}</span>
              <span className="tile__desc">{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
