const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Booking schema.
 *
 * Double-booking prevention strategy:
 *   1. Service layer checks slot availability before attempting to save.
 *   2. The compound unique index { expertId, date, timeSlot } is the
 *      database-level safety net — it rejects concurrent inserts that
 *      pass the application-level check due to a race condition.
 *      MongoDB guarantees atomicity at the document level, so whichever
 *      write wins gets the slot; the other receives a duplicate-key error
 *      (code 11000) which the error middleware maps to a 409 response.
 */
const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      default: () => `BK-${uuidv4().slice(0, 8).toUpperCase()}`,
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expert',
      required: [true, 'Expert ID is required'],
    },
    userName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      match: [/^\+?[\d\s\-()]{7,15}$/, 'Please provide a valid phone number'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      match: [/^\d{2}:\d{2}$/, 'Time slot must be HH:MM'],
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    sessionPrice: {
      type: Number,
      default: 0,
    },
    expertName: {
      type: String,
      default: '',
    },
    expertCategory: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// ── Critical uniqueness constraint ───────────────────────────────────────────
// Prevents two bookings for the same expert + date + time slot.
// This is the last line of defence against race conditions.
bookingSchema.index(
  { expertId: 1, date: 1, timeSlot: 1 },
  { unique: true, name: 'unique_expert_slot' }
);

// Fast lookup by email (My Bookings page)
bookingSchema.index({ email: 1 });
bookingSchema.index({ expertId: 1, date: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
