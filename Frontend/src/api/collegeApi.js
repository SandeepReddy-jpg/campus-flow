import { api } from './client';

export const collegeApi = {
  create: (data) => api.post('/college-api/info', data),
  list: (query) => api.get('/college-api/list', { query }),
  get: (id) => api.get(`/college-api/info/${id}`),
  update: (id, data) => api.patch(`/college-api/update/${id}`, data),
  remove: (id) => api.delete(`/college-api/remove/${id}`),
};
