import { api } from './client';

export const attendanceApi = {
  create: (data) => api.post('/attendance-api/create', data),
  list: (query) => api.get('/attendance-api/list', { query }),
  get: (id) => api.get(`/attendance-api/info/${id}`),
  update: (id, data) => api.patch(`/attendance-api/update/${id}`, data),
  remove: (id) => api.delete(`/attendance-api/remove/${id}`),
};
