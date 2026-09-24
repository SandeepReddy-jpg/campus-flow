import { api } from './client';

export const studentApi = {
  create: (data) => api.post('/student-api/basic-info', data),
  list: (query) => api.get('/student-api/list', { query }),
  get: (id) => api.get(`/student-api/info/${id}`),
  update: (id, data) => api.patch(`/student-api/update/${id}`, data),
  remove: (id) => api.delete(`/student-api/remove/${id}`),
};
