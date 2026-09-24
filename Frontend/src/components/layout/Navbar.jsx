export function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <button type="button" className="navbar__toggle" onClick={onMenuClick} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
      <div className="navbar__title">Campus Management</div>
      <div className="navbar__spacer" />
    </header>
  );
}