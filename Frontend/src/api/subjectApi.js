import { api } from './client';

export const subjectApi = {
  create: (data) => api.post('/subject-api/create', data),
  list: (query) => api.get('/subject-api/list', { query }),
  get: (id) => api.get(`/subject-api/info/${id}`),
  update: (id, data) => api.patch(`/subject-api/update/${id}`, data),
  remove: (id) => api.delete(`/subject-api/remove/${id}`),
};
