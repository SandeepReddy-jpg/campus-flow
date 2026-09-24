import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { useToast } from '../../contexts/ToastContext';
import { Button, Field, Input } from '../../components/ui';

export function ForgotPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', newpassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await userApi.forgotPassword(form);
      toast.success('Password reset successful. Sign in with your new password.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-card__logo">🔑</span>
          <h1>Reset password</h1>
          <p>Enter your email and a new password</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="alert alert--error">{error}</div>}
          <Field label="Email" required>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Field>
          <Field label="New password" required>
            <Input
              type="password"
              name="newpassword"
              value={form.newpassword}
              onChange={handleChange}
              minLength={6}
              required
            />
          </Field>
          <Button type="submit" loading={loading} className="auth-form__submit">
            Reset password
          </Button>
        </form>

        <div className="auth-card__links">
          <Link to="/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}