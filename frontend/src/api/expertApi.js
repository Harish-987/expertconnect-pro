import api from './axios';

export const fetchExperts = (params) => api.get('/experts', { params });

export const fetchExpertById = (id) => api.get(`/experts/${id}`);
