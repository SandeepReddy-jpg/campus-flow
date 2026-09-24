import { api } from './client';

export const companyApi = {
  create: (data) => api.post('/company-api/create', data),
  list: (query) => api.get('/company-api/list', { query }),
  get: (id) => api.get(`/company-api/info/${id}`),
  update: (id, data) => api.patch(`/company-api/update/${id}`, data),
  remove: (id) => api.delete(`/company-api/remove/${id}`),
};
