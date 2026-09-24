import { api } from './client';

export const announcementApi = {
  create: (data) => api.post('/announcement-api/create', data),
  list: (query) => api.get('/announcement-api/list', { query }),
  get: (id) => api.get(`/announcement-api/info/${id}`),
  update: (id, data) => api.patch(`/announcement-api/update/${id}`, data),
  remove: (id) => api.delete(`/announcement-api/remove/${id}`),
};
