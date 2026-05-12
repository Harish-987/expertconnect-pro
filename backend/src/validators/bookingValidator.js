const { body, query, param } = require('express-validator');

/**
 * Validation rules for booking endpoints.
 * express-validator chains are arrays; they're spread into route definitions.
 */

const createBookingRules = [
  body('expertId')
    .notEmpty().withMessage('Expert ID is required')
    .isMongoId().withMessage('Invalid expert ID'),

  body('userName')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-()]{7,15}$/).withMessage('Please provide a valid phone number'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format')
    .custom((value) => {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) throw new Error('Cannot book a slot in the past');
      return true;
    }),

  body('timeSlot')
    .notEmpty().withMessage('Time slot is required')
    .matches(/^\d{2}:\d{2}$/).withMessage('Time slot must be in HH:MM format'),

  body('notes')
    .optional()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters'),
];

const updateStatusRules = [
  param('id').isMongoId().withMessage('Invalid booking ID'),
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Status must be one of: pending, confirmed, completed, cancelled'),
];

const getBookingsByEmailRules = [
  query('email')
    .notEmpty().withMessage('Email query parameter is required')
    .isEmail().withMessage('Please provide a valid email address'),
];

module.exports = { createBookingRules, updateStatusRules, getBookingsByEmailRules };
