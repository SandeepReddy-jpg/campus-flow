import { api } from './client';

export const userApi = {
  register: (data) => api.post('/user-api/register', data),
  login: (data) => api.post('/user-api/login', data),
  list: (query) => api.get('/user-api/list', { query }),
  get: (id) => api.get(`/user-api/info/${id}`),
  update: (id, data) => api.patch(`/user-api/update/${id}`, data),
  softDelete: (id) => api.patch(`/user-api/delete/${id}`),
  remove: (id) => api.delete(`/user-api/remove/${id}`),
  forgotPassword: (data) => api.post('/user-api/forgot', data),
};
