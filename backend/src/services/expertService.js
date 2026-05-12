const Expert = require('../models/Expert');
const Booking = require('../models/Booking');

/**
 * Service layer keeps controllers thin by housing all database logic
 * and business rules. Controllers just call these and format the response.
 */

/**
 * Paginated, filterable, sortable expert list.
 * Supports full-text search via MongoDB $text index.
 */
const getExperts = async ({ search, category, sort, page, limit }) => {
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { bio: { $regex: search, $options: 'i' } },
      { expertise: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  if (category && category !== 'All') {
    filter.category = category;
  }

  // Map user-facing sort keys to Mongoose sort objects
  const sortMap = {
    'rating': { rating: -1 },
    '-rating': { rating: 1 },
    'price': { price: 1 },
    '-price': { price: -1 },
    'experience': { experience: -1 },
    '-experience': { experience: 1 },
    'name': { name: 1 },
    '-name': { name: -1 },
  };
  const sortObj = sortMap[sort] || { rating: -1 };

  const pageNum = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 12;
  const skip = (pageNum - 1) * pageSize;

  const [experts, total] = await Promise.all([
    Expert.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize)
      .select('-reviews -__v'),
    Expert.countDocuments(filter),
  ]);

  return {
    experts,
    pagination: {
      total,
      page: pageNum,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
      hasNext: pageNum < Math.ceil(total / pageSize),
      hasPrev: pageNum > 1,
    },
  };
};

/**
 * Returns a single expert with their availability slots minus already-booked ones.
 * This merges Expert.availableSlots with confirmed Bookings so the
 * frontend only shows genuinely free time.
 */
const getExpertById = async (id) => {
  const expert = await Expert.findById(id);
  if (!expert) return null;

  // Fetch all active (non-cancelled) bookings for this expert
  const bookings = await Booking.find({
    expertId: id,
    status: { $ne: 'cancelled' },
  }).select('date timeSlot -_id');

  // Build a Set of "date::timeSlot" strings for O(1) lookup
  const bookedSet = new Set(bookings.map((b) => `${b.date}::${b.timeSlot}`));

  // Filter out already-booked slots from each day
  const availableSlots = expert.availableSlots.map((day) => ({
    date: day.date,
    slots: day.slots.filter(
      (slot) => !bookedSet.has(`${day.date}::${slot}`)
    ),
  }));

  return { ...expert.toObject(), availableSlots };
};

module.exports = { getExperts, getExpertById };
