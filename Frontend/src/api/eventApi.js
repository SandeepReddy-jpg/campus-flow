import { api } from './client';

export const eventApi = {
  create: (data) => api.post('/event-api/create', data),
  list: (query) => api.get('/event-api/list', { query }),
  get: (id) => api.get(`/event-api/info/${id}`),
  update: (id, data) => api.patch(`/event-api/update/${id}`, data),
  remove: (id) => api.delete(`/event-api/remove/${id}`),
};
