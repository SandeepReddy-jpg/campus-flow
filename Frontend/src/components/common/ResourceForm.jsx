import { useState } from 'react';
import { Button, Field, Input, Select, Textarea } from '../ui';
import { DataTable } from './DataTable';
import { useToast } from '../../contexts/ToastContext';

function toDisplay(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return value.name || value.username || value.email || value._id || JSON.stringify(value);
  return String(value);
}

export function ResourceForm({ fields, api, title, subtitle, transformPayload }) {
  const { toast } = useToast();
  const [form, setForm] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.name] = f.defaultValue ?? (f.type === 'array' ? [] : '');
    });
    return init;
  });
  const [recordId, setRecordId] = useState('');
  const [mode, setMode] = useState('create');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [loaded, setLoaded] = useState(null);

  const handleChange = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const buildPayload = () => {
    const payload = {};
    fields.forEach((f) => {
      let v = form[f.name];
      if (f.type === 'number' && v !== '') v = Number(v);
      if (f.type === 'array' && typeof v === 'string') v = v.split(',').map((s) => s.trim()).filter(Boolean);
      payload[f.name] = v;
    });
    return transformPayload ? transformPayload(payload) : payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const body = buildPayload();
      if (mode === 'update' && recordId) {
        const res = await api.update(recordId, body);
        toast.success('Record updated successfully');
        setLoaded(res?.payload || null);
      } else {
        const res = await api.create(body);
        toast.success('Record created successfully');
        if (res?.payload?._id) {
          setRecordId(res.payload._id);
          setLoaded(res.payload);
        }
        setMode('update');
      }
      setRows(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    if (!recordId) return toast.error('Enter a record ID first');
    if (typeof api.get !== 'function') return toast.error('View is not supported for this resource');
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(recordId);
      const record = res?.payload || res;
      setLoaded(record);
      const next = {};
      fields.forEach((f) => {
        let v = record?.[f.name];
        if (Array.isArray(v)) v = v.join(', ');
        else if (v !== null && typeof v === 'object') v = v._id || '';
        else if (v === undefined || v === null) v = '';
        next[f.name] = v;
      });
      setForm(next);
      toast.success('Record loaded');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowse = async () => {
    if (typeof api.list !== 'function') return toast.error('Listing is not supported for this resource');
    setListLoading(true);
    setError(null);
    try {
      const res = await api.list({ limit: 50 });
      setRows(res?.payload || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setListLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!recordId) return toast.error('Enter a record ID first');
    if (typeof api.remove !== 'function') return toast.error('Delete is not supported for this resource');
    if (!window.confirm('Delete this record permanently?')) return;
    setLoading(true);
    try {
      await api.remove(recordId);
      toast.success('Record deleted');
      handleReset();
      setRows(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const init = {};
    fields.forEach((f) => (init[f.name] = f.defaultValue ?? (f.type === 'array' ? [] : '')));
    setForm(init);
    setRecordId('');
    setMode('create');
    setError(null);
    setLoaded(null);
  };

  const columns = [
    { key: '_id', label: 'ID', render: (r) => <code className="mono">{String(r._id).slice(-8)}</code> },
    ...fields.slice(0, 4).map((f) => ({ key: f.name, label: f.label, render: (r) => toDisplay(r[f.name]) })),
  ];

  return (
    <div className="resource">
      <header className="resource__header">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="resource__tabs">
          <button
            type="button"
            className={`resource__tab ${mode === 'create' ? 'is-active' : ''}`}
            onClick={handleReset}
          >
            Create new
          </button>
          <button
            type="button"
            className={`resource__tab ${mode === 'update' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('update');
              setError(null);
            }}
          >
            Update / view
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="resource__form">
        {error && <div className="alert alert--error">{error}</div>}
        {loaded?._id && <div className="alert alert--success">Working with record {loaded._id}</div>}

        {mode === 'update' && (
          <Field label="Record ID" required hint="ID of the record to view, update or delete">
            <div className="lookup-row">
              <Input value={recordId} onChange={(e) => setRecordId(e.target.value)} placeholder="Enter record ID" required />
              <Button type="button" variant="secondary" onClick={handleLoad} loading={loading}>
                Load
              </Button>
            </div>
          </Field>
        )}

        <div className="resource__grid">
          {fields.map((f) => (
            <Field
              key={f.name}
              label={f.label}
              required={f.required}
              hint={f.hint}
              className={f.full ? 'span-2' : ''}
            >
              {f.type === 'select' ? (
                <Select value={form[f.name]} onChange={(e) => handleChange(f.name, e.target.value)} required={f.required}>
                  {!f.required && <option value="">Select…</option>}
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : f.type === 'textarea' ? (
                <Textarea value={form[f.name]} onChange={(e) => handleChange(f.name, e.target.value)} required={f.required} rows={f.rows || 3} />
              ) : (
                <Input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={Array.isArray(form[f.name]) ? form[f.name].join(', ') : form[f.name]}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  required={f.required}
                  placeholder={f.placeholder}
                />
              )}
            </Field>
          ))}
        </div>

        <div className="resource__actions">
          <Button type="submit" loading={loading}>
            {mode === 'update' ? 'Update record' : 'Create record'}
          </Button>
          {mode === 'update' && typeof api.remove === 'function' && (
            <Button type="button" variant="danger" onClick={handleDelete} loading={loading}>
              Delete
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      {typeof api.list === 'function' && (
        <div className="resource__browse">
          <div className="resource__browse-head">
            <h3>Browse records</h3>
            <Button type="button" variant="secondary" onClick={handleBrowse} loading={listLoading}>
              Refresh list
            </Button>
          </div>
          {rows === null ? (
            <p className="muted">Click “Refresh list” to load the latest records.</p>
          ) : (
            <DataTable
              columns={columns}
              rows={rows}
              emptyMessage="No records found yet"
              onRowClick={(row) => {
                setRecordId(row._id);
                setLoaded(row);
                setMode('update');
                const next = {};
                fields.forEach((f) => {
                  let v = row?.[f.name];
                  if (Array.isArray(v)) v = v.join(', ');
                  else if (v !== null && typeof v === 'object') v = v._id || '';
                  else if (v === undefined || v === null) v = '';
                  next[f.name] = v;
                });
                setForm(next);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
