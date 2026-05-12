import api from './axios';

export const createBooking = (data) => api.post('/bookings', data);

export const fetchBookingsByEmail = (email) =>
  api.get('/bookings', { params: { email } });

export const updateBookingStatus = (id, status) =>
  api.patch(`/bookings/${id}/status`, { status });
