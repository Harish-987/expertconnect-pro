const bookingService = require('../services/bookingService');
const Expert = require('../models/Expert');
const { success, error } = require('../utils/apiResponse');
const asyncWrapper = require('../middleware/asyncWrapper');

const getDashboard = asyncWrapper(async (req, res) => {
  const data = await bookingService.getDashboardStats();
  return success(res, 'Dashboard data fetched', data);
});

const getAllBookings = asyncWrapper(async (req, res) => {
  const result = await bookingService.getAllBookings(req.query);
  return success(res, 'All bookings fetched', result.bookings, 200, result.pagination);
});

const getAllExperts = asyncWrapper(async (req, res) => {
  const experts = await Expert.find().sort({ createdAt: -1 });
  return success(res, 'Experts fetched', experts);
});

const updateBookingStatus = asyncWrapper(async (req, res) => {
  const io = req.app.get('io');
  const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status, io);
  return success(res, 'Status updated', booking);
});

module.exports = { getDashboard, getAllBookings, getAllExperts, updateBookingStatus };
