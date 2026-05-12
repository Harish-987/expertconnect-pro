const router = require('express').Router();
const {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} = require('../controllers/bookingController');
const {
  createBookingRules,
  updateStatusRules,
  getBookingsByEmailRules,
} = require('../validators/bookingValidator');
const { bookingLimiter } = require('../middleware/rateLimiter');

router.post('/', bookingLimiter, createBookingRules, createBooking);
router.get('/', getBookingsByEmailRules, getBookingsByEmail);
router.patch('/:id/status', updateStatusRules, updateBookingStatus);

module.exports = router;
