import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NAV_SECTIONS = [
  {
    title: 'Main',
    items: [{ to: '/', label: 'Dashboard', icon: '📊', end: true }],
  },
  {
    title: 'Organization',
    items: [
      { to: '/college', label: 'Colleges', icon: '🏛️' },
      { to: '/department', label: 'Departments', icon: '🏢' },
      { to: '/course', label: 'Courses', icon: '🎓' },
      { to: '/subject', label: 'Subjects', icon: '📚' },
      { to: '/company', label: 'Companies', icon: '🏭' },
    ],
  },
  {
    title: 'People',
    items: [
      { to: '/users', label: 'Users', icon: '👥' },
      { to: '/student', label: 'Students', icon: '🧑‍🎓' },
      { to: '/faculty', label: 'Faculty', icon: '👩‍🏫' },
    ],
  },
  {
    title: 'Academic',
    items: [
      { to: '/assignment', label: 'Assignments', icon: '📝' },
      { to: '/submission', label: 'Submissions', icon: '📥' },
      { to: '/attendance', label: 'Attendance', icon: '✅' },
      { to: '/announcement', label: 'Announcements', icon: '📢' },
      { to: '/event', label: 'Events', icon: '🎉' },
    ],
  },
  {
    title: 'Placements & Requests',
    items: [
      { to: '/drive', label: 'Drives', icon: '💼' },
      { to: '/request', label: 'Requests', icon: '📨' },
    ],
  },
];

export function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">🎓</span>
          <span className="sidebar__name">CampusFlow</span>
        </div>

        <nav className="sidebar__nav">
          {NAV_SECTIONS.map((section) => (
            <div className="sidebar__group" key={section.title}>
              <p className="sidebar__group-title">{section.title}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
                  onClick={onClose}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.username?.[0]?.toUpperCase() || 'U'}</div>
            <div className="sidebar__meta">
              <span className="sidebar__username">{user?.username || 'User'}</span>
              <span className="sidebar__role">{user?.role}</span>
            </div>
          </div>
          <button type="button" className="sidebar__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
