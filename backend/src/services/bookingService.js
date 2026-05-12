const Booking = require('../models/Booking');
const Expert = require('../models/Expert');

/**
 * Creates a booking with atomic double-booking prevention.
 *
 * Two-layer guard:
 *  1. Application check: fast rejection before hitting the DB write.
 *  2. Unique index fallback: if two concurrent requests both pass
 *     the app check, the index ensures only one succeeds.
 */
const createBooking = async (data, io) => {
  const { expertId, date, timeSlot } = data;

  // ── Layer 1: Application-level slot check ─────────────────────────────────
  const expert = await Expert.findById(expertId);
  if (!expert) {
    const err = new Error('Expert not found');
    err.statusCode = 404;
    throw err;
  }

  // Verify the requested slot actually exists in the expert's schedule
  const dayEntry = expert.availableSlots.find((d) => d.date === date);
  if (!dayEntry || !dayEntry.slots.includes(timeSlot)) {
    const err = new Error('The selected time slot is not available for this expert');
    err.statusCode = 400;
    throw err;
  }

  // Check if an active booking already occupies the slot
  const existing = await Booking.findOne({
    expertId,
    date,
    timeSlot,
    status: { $ne: 'cancelled' },
  });
  if (existing) {
    const err = new Error('This time slot has already been booked. Please choose another.');
    err.statusCode = 409;
    throw err;
  }

  // ── Layer 2: DB write (unique index is the race-condition safety net) ──────
  const booking = await Booking.create({
    ...data,
    sessionPrice: expert.price,
    expertName: expert.name,
    expertCategory: expert.category,
  });

  // Increment expert session counter
  await Expert.findByIdAndUpdate(expertId, { $inc: { totalSessions: 1 } });

  // ── Real-time broadcast ───────────────────────────────────────────────────
  // Notify all clients watching this expert's room that a slot was taken
  if (io) {
    io.to(`expert_${expertId}`).emit('slot_updated', {
      expertId,
      date,
      timeSlot,
      available: false,
    });
    io.to(`expert_${expertId}`).emit('booking_confirmed', {
      bookingId: booking.bookingId,
      expertId,
      date,
      timeSlot,
    });
  }

  return booking;
};

const getBookingsByEmail = async (email) => {
  return Booking.find({ email: email.toLowerCase() })
    .populate('expertId', 'name profileImage category price')
    .sort({ createdAt: -1 });
};

const updateBookingStatus = async (id, status, io) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('expertId', 'name profileImage category');

  if (!booking) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }

  // If cancelled, notify watchers the slot is free again
  if (status === 'cancelled' && io) {
    io.to(`expert_${booking.expertId._id}`).emit('slot_updated', {
      expertId: booking.expertId._id,
      date: booking.date,
      timeSlot: booking.timeSlot,
      available: true,
    });
  }

  return booking;
};

const getAllBookings = async ({ page, limit, status } = {}) => {
  const filter = {};
  if (status && status !== 'all') filter.status = status;

  const pageNum = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 20;

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate('expertId', 'name profileImage category')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize),
    Booking.countDocuments(filter),
  ]);

  return {
    bookings,
    pagination: { total, page: pageNum, limit: pageSize, totalPages: Math.ceil(total / pageSize) },
  };
};

const getDashboardStats = async () => {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalExperts,
    revenueResult,
    categoryBreakdown,
    recentBookings,
    bookingsByDay,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'confirmed' }),
    Booking.countDocuments({ status: 'completed' }),
    Booking.countDocuments({ status: 'cancelled' }),
    Expert.countDocuments(),
    Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$sessionPrice' } } },
    ]),
    Booking.aggregate([
      { $group: { _id: '$expertCategory', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Booking.find()
      .populate('expertId', 'name profileImage category')
      .sort({ createdAt: -1 })
      .limit(5),
    // Last 7 days bookings per day
    Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    stats: {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalExperts,
      totalRevenue: (revenueResult[0] && revenueResult[0].total) || 0,
    },
    categoryBreakdown,
    recentBookings,
    bookingsByDay,
  };
};

module.exports = {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
  getAllBookings,
  getDashboardStats,
};
