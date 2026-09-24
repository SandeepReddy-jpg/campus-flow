import { api } from './client';

export const submissionApi = {
  create: (data) => api.post('/submission-api/create', data),
  list: (query) => api.get('/submission-api/list', { query }),
  get: (id) => api.get(`/submission-api/info/${id}`),
  update: (id, data) => api.patch(`/submission-api/update/${id}`, data),
  remove: (id) => api.delete(`/submission-api/remove/${id}`),
};
