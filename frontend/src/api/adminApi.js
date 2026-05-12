import api from './axios';

export const fetchDashboard = () => api.get('/admin/dashboard');
export const fetchAllBookings = (params) => api.get('/admin/bookings', { params });
export const fetchAllExperts = () => api.get('/admin/experts');
export const adminUpdateStatus = (id, status) =>
  api.patch(`/admin/bookings/${id}/status`, { status });
