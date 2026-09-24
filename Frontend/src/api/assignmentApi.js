import { api } from './client';

export const assignmentApi = {
  create: (data) => api.post('/assignment-api/create', data),
  list: (query) => api.get('/assignment-api/list', { query }),
  get: (id) => api.get(`/assignment-api/info/${id}`),
  update: (id, data) => api.patch(`/assignment-api/update/${id}`, data),
  remove: (id) => api.delete(`/assignment-api/remove/${id}`),
};
