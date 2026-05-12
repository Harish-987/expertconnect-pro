import useBookingStore from '../store/bookingStore';

const useBooking = () => {
  const { bookings, lastBooking, loading, searchLoading, error, submitBooking, fetchByEmail, clearLastBooking } =
    useBookingStore();

  return { bookings, lastBooking, loading, searchLoading, error, submitBooking, fetchByEmail, clearLastBooking };
};

export default useBooking;
