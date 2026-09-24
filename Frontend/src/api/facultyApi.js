import { api } from './client';

export const facultyApi = {
  create: (data) => api.post('/faculty-api/basic-info', data),
  list: (query) => api.get('/faculty-api/list', { query }),
  get: (id) => api.get(`/faculty-api/info/${id}`),
  update: (id, data) => api.patch(`/faculty-api/update/${id}`, data),
  remove: (id) => api.delete(`/faculty-api/remove/${id}`),
};
