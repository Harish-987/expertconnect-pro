const mongoose = require('mongoose');

/**
 * Expert schema.
 * availableSlots stores per-day slot arrays so the API can quickly
 * serve a date-keyed availability map to the frontend.
 */
const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Technology',
        'Business',
        'Finance',
        'Design',
        'Marketing',
        'Legal',
        'Health',
        'Education',
      ],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: [600, 'Bio cannot exceed 600 characters'],
    },
    expertise: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String,
      default: '',
    },
    // Price per 60-minute session in USD
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    // Array of { date: 'YYYY-MM-DD', slots: ['09:00', '10:00', ...] }
    availableSlots: [
      {
        date: { type: String },
        slots: [{ type: String }],
      },
    ],
    isOnline: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: [String],
      default: ['English'],
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    sessionDuration: {
      type: Number,
      default: 60,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userName: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Full-text search index across name, bio, and category
expertSchema.index({ name: 'text', bio: 'text', category: 'text' });
expertSchema.index({ category: 1 });
expertSchema.index({ rating: -1 });

module.exports = mongoose.model('Expert', expertSchema);
