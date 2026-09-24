export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon = '📭', title = 'Nothing here yet', message }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">{icon}</span>
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__message">{message}</p>}
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="empty-state empty-state--error">
      <span className="empty-state__icon">⚠️</span>
      <h3 className="empty-state__title">Something went wrong</h3>
      {message && <p className="empty-state__message">{message}</p>}
    </div>
  );
}