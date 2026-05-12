import { create } from 'zustand';
import { createBooking, fetchBookingsByEmail } from '../api/bookingApi';
import toast from 'react-hot-toast';

const useBookingStore = create((set) => ({
  bookings: [],
  lastBooking: null,
  loading: false,
  searchLoading: false,
  error: null,

  submitBooking: async (data, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const res = await createBooking(data);
      const booking = res.data.data;
      set({ lastBooking: booking, loading: false });
      toast.success('Session booked successfully! 🎉');
      onSuccess?.(booking);
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
    }
  },

  fetchByEmail: async (email) => {
    set({ searchLoading: true, error: null });
    try {
      const res = await fetchBookingsByEmail(email);
      set({ bookings: res.data.data, searchLoading: false });
    } catch (err) {
      set({ error: err.message, searchLoading: false, bookings: [] });
      toast.error(err.message);
    }
  },

  clearLastBooking: () => set({ lastBooking: null }),
  clearBookings:    () => set({ bookings: [] }),
}));

export default useBookingStore;
