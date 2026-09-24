import { api } from './client';

export const driveApi = {
  create: (data) => api.post('/drive-api/create', data),
  list: (query) => api.get('/drive-api/list', { query }),
  get: (id) => api.get(`/drive-api/info/${id}`),
  update: (id, data) => api.patch(`/drive-api/update/${id}`, data),
  remove: (id) => api.delete(`/drive-api/remove/${id}`),
};
