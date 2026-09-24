export function Spinner({ size = 24, label }) {
  return (
    <div className="spinner-wrap">
      <span className="spinner" style={{ width: size, height: size }} />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
}

export function Loader() {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <span className="spinner" style={{ width: 32, height: 32 }} />
    </div>
  );
}