import { api } from './client';

export const courseApi = {
  create: (data) => api.post('/course-api/create', data),
  list: (query) => api.get('/course-api/list', { query }),
  get: (id) => api.get(`/course-api/info/${id}`),
  update: (id, data) => api.patch(`/course-api/update/${id}`, data),
  remove: (id) => api.delete(`/course-api/remove/${id}`),
};
