import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { useToast } from '../../contexts/ToastContext';
import { Button, Field, Input, Select } from '../../components/ui';

const ROLES = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'placement-office', label: 'Placement Office' },
  { value: 'hod', label: 'HOD' },
];

const empty = {
  role: 'student',
  username: '',
  email: '',
  id: '',
  password: '',
  phno: '',
  department: '',
  branch: '',
};

export function Register() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form, phno: Number(form.phno) };
      if (form.role !== 'student') {
        delete payload.branch;
      }
      await userApi.register(payload);
      toast.success('Account created. Please sign in.');
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
          <span className="auth-card__logo">🎓</span>
          <h1>Create account</h1>
          <p>Join CampusFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="alert alert--error">{error}</div>}
          <div className="grid-2">
            <Field label="Role" required>
              <Select name="role" value={form.role} onChange={handleChange}>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Username" required>
              <Input name="username" value={form.username} onChange={handleChange} required />
            </Field>
          </div>

          <Field label="Email" required>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </Field>

          <div className="grid-2">
            <Field label="ID / Roll number" required hint="Your unique campus ID">
              <Input name="id" value={form.id} onChange={handleChange} required />
            </Field>
            <Field label="Phone number" required>
              <Input
                type="number"
                name="phno"
                value={form.phno}
                onChange={handleChange}
                required
              />
            </Field>
          </div>

          <div className="grid-2">
            <Field label="Department">
              <Input name="department" value={form.department} onChange={handleChange} />
            </Field>
            {form.role === 'student' && (
              <Field label="Branch">
                <Input name="branch" value={form.branch} onChange={handleChange} />
              </Field>
            )}
          </div>

          <Field label="Password" required>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
              autoComplete="new-password"
            />
          </Field>

          <Button type="submit" loading={loading} className="auth-form__submit">
            Create account
          </Button>
        </form>

        <div className="auth-card__links">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}