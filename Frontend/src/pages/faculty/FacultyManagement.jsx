import { useState } from 'react';
import { facultyApi } from '../../api/facultyApi';
import { useToast } from '../../contexts/ToastContext';
import { PageHeader, Button, Field, Input, Card } from '../../components/ui';

const empty = {
  user: '',
  collegeinfo: '',
  deptinfo: '',
  designation: '',
  qualifications: '',
  specialization: '',
  experienceYears: '',
};

export function FacultyManagement() {
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
        qualifications: form.qualifications.split(',').map((s) => s.trim()).filter(Boolean),
        specialization: form.specialization.split(',').map((s) => s.trim()).filter(Boolean),
        experienceYears: form.experienceYears ? Number(form.experienceYears) : 0,
      };
      if (mode === 'update') {
        await facultyApi.update(viewId, payload);
        toast.success('Faculty profile updated');
      } else {
        await facultyApi.create(payload);
        toast.success('Faculty profile created');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    if (!viewId) return toast.error('Enter a faculty profile ID to view');
    setLoading(true);
    setError(null);
    try {
      const data = await facultyApi.get(viewId);
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
      <PageHeader title="Faculty" subtitle="Add, update, or view faculty profiles" />
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
            <Field label="Faculty profile ID" required>
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

          <div className="grid-3">
            <Field label="User ID" required hint="Reference to the user account">
              <Input name="user" value={form.user} onChange={handleChange} required />
            </Field>
            <Field label="College ID" required>
              <Input name="collegeinfo" value={form.collegeinfo} onChange={handleChange} required />
            </Field>
            <Field label="Department ID" required>
              <Input name="deptinfo" value={form.deptinfo} onChange={handleChange} required />
            </Field>
          </div>

          <div className="grid-2">
            <Field label="Designation" required>
              <Input name="designation" value={form.designation} onChange={handleChange} required />
            </Field>
            <Field label="Experience (years)">
              <Input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} />
            </Field>
          </div>

          <Field label="Qualifications" hint="Comma separated, e.g. M.Tech, Ph.D">
            <Input name="qualifications" value={form.qualifications} onChange={handleChange} />
          </Field>

          <Field label="Specialization" hint="Comma separated, e.g. Java, Distributed Systems">
            <Input name="specialization" value={form.specialization} onChange={handleChange} />
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