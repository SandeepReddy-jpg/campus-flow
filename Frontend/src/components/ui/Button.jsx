import { Spinner } from './Spinner';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  type = 'button',
  disabled,
  className = '',
  ...props
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {loading ? <Spinner size={16} /> : children}
    </button>
  );
}