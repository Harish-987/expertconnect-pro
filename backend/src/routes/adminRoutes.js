const router = require('express').Router();
const {
  getDashboard,
  getAllBookings,
  getAllExperts,
  updateBookingStatus,
} = require('../controllers/adminController');

// In production, protect these with JWT auth middleware.
// For demo purposes they're open, but the admin key should be
// passed as a header and validated before allowing mutations.
router.get('/dashboard', getDashboard);
router.get('/bookings', getAllBookings);
router.get('/experts', getAllExperts);
router.patch('/bookings/:id/status', updateBookingStatus);

module.exports = router;
