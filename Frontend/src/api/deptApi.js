import { api } from './client';

export const deptApi = {
  create: (data) => api.post('/dept-api/create', data),
  list: (query) => api.get('/dept-api/list', { query }),
  get: (id) => api.get(`/dept-api/info/${id}`),
  update: (id, data) => api.patch(`/dept-api/update/${id}`, data),
  remove: (id) => api.delete(`/dept-api/remove/${id}`),
};
