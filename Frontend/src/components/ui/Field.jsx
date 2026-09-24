export function Field({ label, error, hint, required, children, className = '' }) {
  return (
    <label className={`field ${className}`}>
      {label && (
        <span className="field__label">
          {label}
          {required && <span className="field__required"> *</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="field__hint">{hint}</span>}
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}

export function Input({ className = '', ...props }) {
  return <input className={`input ${className}`} {...props} />;
}

export function Textarea({ className = '', ...props }) {
  return <textarea className={`input textarea ${className}`} {...props} />;
}

export function Select({ children, className = '', ...props }) {
  return (
    <select className={`input ${className}`} {...props}>
      {children}
    </select>
  );
}