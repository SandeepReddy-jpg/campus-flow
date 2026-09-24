import { useState } from 'react';
import { userApi } from '../../api/userApi';
import { useToast } from '../../contexts/ToastContext';
import { PageHeader, Button, Field, Input, Select, Card } from '../../components/ui';

const ROLES = ['student', 'teacher', 'placement-office', 'hod'];

const empty = { role: 'student', username: '', email: '', id: '', password: '', phno: '', department: '', branch: '' };

export function UserManagement() {
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState('');
  const [mode, setMode] = useState('create');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const reset = () => {
    setForm(empty);
    setEditId('');
    setMode('create');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form, phno: Number(form.phno) };
      if (payload.role !== 'student') delete payload.branch;
      if (mode === 'update') {
        await userApi.update(editId, payload);
        toast.success('User updated successfully');
      } else {
        await userApi.register(payload);
        toast.success('User created successfully');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editId) return toast.error('Provide a user ID to delete');
    if (!window.confirm('Deactivate this user?')) return;
    setLoading(true);
    try {
      await userApi.softDelete(editId);
      toast.success('User deactivated');
      reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Users" subtitle="Create, update, or deactivate user accounts" />
      <Card>
        <div className="user-tabs">
          <button type="button" className={`resource__tab ${mode === 'create' ? 'is-active' : ''}`} onClick={reset}>
            Create user
          </button>
          <button type="button" className={`resource__tab ${mode === 'update' ? 'is-active' : ''}`} onClick={() => setMode('update')}>
            Update / deactivate
          </button>
        </div>

        <form onSubmit={handleSubmit} className="resource__form">
          {error && <div className="alert alert--error">{error}</div>}

          {mode === 'update' && (
            <div className="grid-2">
              <Field label="User ID" required hint="ID of the account to update">
                <Input value={editId} onChange={(e) => setEditId(e.target.value)} placeholder="User ID" required />
              </Field>
              <Field label="Role">
                <Select name="role" value={form.role} onChange={handleChange}>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          )}

          <div className="grid-2">
            <Field label="Username" required>
              <Input name="username" value={form.username} onChange={handleChange} required />
            </Field>
            <Field label="Email" required>
              <Input type="email" name="email" value={form.email} onChange={handleChange} required />
            </Field>
          </div>

          <div className="grid-2">
            <Field label="ID / Roll number" required>
              <Input name="id" value={form.id} onChange={handleChange} required />
            </Field>
            <Field label="Phone number" required>
              <Input type="number" name="phno" value={form.phno} onChange={handleChange} required />
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

          <Field label="Password" required hint="Required for creating or updating an account">
            <Input type="password" name="password" value={form.password} onChange={handleChange} minLength={6} required />
          </Field>

          <div className="resource__actions">
            <Button type="submit" loading={loading}>
              {mode === 'update' ? 'Update user' : 'Create user'}
            </Button>
            {mode === 'update' && (
              <Button type="button" variant="danger" onClick={handleDelete} loading={loading}>
                Deactivate
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={reset}>
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}