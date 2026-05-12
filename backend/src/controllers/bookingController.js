const { validationResult } = require('express-validator');
const bookingService = require('../services/bookingService');
const { success, error } = require('../utils/apiResponse');
const asyncWrapper = require('../middleware/asyncWrapper');

const createBooking = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, 'Validation failed', 422, errors.array());
  }

  // Attach io instance so service can emit socket events
  const io = req.app.get('io');
  const booking = await bookingService.createBooking(req.body, io);
  return success(res, 'Session booked successfully!', booking, 201);
});

const getBookingsByEmail = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, 'Validation failed', 422, errors.array());
  }

  const bookings = await bookingService.getBookingsByEmail(req.query.email);
  return success(res, 'Bookings fetched successfully', bookings);
});

const updateBookingStatus = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, 'Validation failed', 422, errors.array());
  }

  const io = req.app.get('io');
  const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status, io);
  return success(res, 'Booking status updated successfully', booking);
});

module.exports = { createBooking, getBookingsByEmail, updateBookingStatus };
