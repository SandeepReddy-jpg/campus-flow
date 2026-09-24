import { api } from './client';

export const requestApi = {
  create: (data) => api.post('/request-api/create', data),
  list: (query) => api.get('/request-api/list', { query }),
  get: (id) => api.get(`/request-api/info/${id}`),
  update: (id, data) => api.patch(`/request-api/update/${id}`, data),
  remove: (id) => api.delete(`/request-api/remove/${id}`),
};
