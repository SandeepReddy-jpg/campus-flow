import { useState } from 'react';
import { studentApi } from '../../api/studentApi';
import { useToast } from '../../contexts/ToastContext';
import { PageHeader, Button, Field, Input, Card } from '../../components/ui';

const empty = {
  user: '',
  skills: '',
  cgpa: '',
  admissionYear: '',
  graduationYear: '',
  program: '',
  linkdinurl: '',
  githuburl: '',
  potfoliourl: '',
  resume: '',
};

export function StudentManagement() {
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const [mode, setMode] = useState('create');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState(null);
  const [viewId, setViewId] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const reset = () => {
    setForm(empty);
    setMode('create');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        cgpa: Number(form.cgpa),
        admissionYear: form.admissionYear ? Number(form.admissionYear) : undefined,
        graduationYear: form.graduationYear ? Number(form.graduationYear) : undefined,
      };
      if (mode === 'update') {
        await studentApi.update(viewId, payload);
        toast.success('Student profile updated');
      } else {
        await studentApi.create(payload);
        toast.success('Student profile created');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    if (!viewId) return toast.error('Enter a student profile ID to view');
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.get(viewId);
      setView(data.payload);
      setMode('update');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Students" subtitle="Add, update, or view student profiles" />
      <Card>
        <div className="user-tabs">
          <button type="button" className={`resource__tab ${mode === 'create' ? 'is-active' : ''}`} onClick={reset}>
            Create profile
          </button>
          <button type="button" className={`resource__tab ${mode === 'update' ? 'is-active' : ''}`} onClick={() => setMode('update')}>
            Update / view
          </button>
        </div>

        {mode === 'update' && (
          <div className="resource__lookup">
            <Field label="Student profile ID" required>
              <div className="lookup-row">
                <Input value={viewId} onChange={(e) => setViewId(e.target.value)} placeholder="Profile ID" />
                <Button type="button" variant="secondary" onClick={handleView} loading={loading}>
                  Load
                </Button>
              </div>
            </Field>
          </div>
        )}

        <form onSubmit={handleSubmit} className="resource__form">
          {error && <div className="alert alert--error">{error}</div>}
          {view && <div className="alert alert--success">Loaded profile for {view.user?.username || view.user}</div>}

          <div className="grid-2">
            <Field label="User ID" required hint="Reference to the user account">
              <Input name="user" value={form.user} onChange={handleChange} required />
            </Field>
            <Field label="CGPA" required>
              <Input type="number" step="0.01" name="cgpa" value={form.cgpa} onChange={handleChange} required />
            </Field>
          </div>

          <Field label="Skills" hint="Comma separated, e.g. python, java, data science">
            <Input name="skills" value={form.skills} onChange={handleChange} />
          </Field>

          <div className="grid-3">
            <Field label="Admission year">
              <Input type="number" name="admissionYear" value={form.admissionYear} onChange={handleChange} />
            </Field>
            <Field label="Graduation year">
              <Input type="number" name="graduationYear" value={form.graduationYear} onChange={handleChange} />
            </Field>
            <Field label="Program">
              <Input name="program" value={form.program} onChange={handleChange} />
            </Field>
          </div>

          <div className="grid-3">
            <Field label="LinkedIn URL">
              <Input name="linkdinurl" value={form.linkdinurl} onChange={handleChange} />
            </Field>
            <Field label="GitHub URL">
              <Input name="githuburl" value={form.githuburl} onChange={handleChange} />
            </Field>
            <Field label="Portfolio URL">
              <Input name="potfoliourl" value={form.potfoliourl} onChange={handleChange} />
            </Field>
          </div>

          <Field label="Resume URL">
            <Input name="resume" value={form.resume} onChange={handleChange} />
          </Field>

          <div className="resource__actions">
            <Button type="submit" loading={loading}>
              {mode === 'update' ? 'Update profile' : 'Create profile'}
            </Button>
            <Button type="button" variant="ghost" onClick={reset}>
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}