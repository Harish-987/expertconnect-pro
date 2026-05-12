const { error: apiError } = require('../utils/apiResponse');

/**
 * Centralised error-handling middleware.
 * Must be registered LAST in app.js (after all routes).
 *
 * Handles:
 *   - Mongoose validation errors  → 422
 *   - Mongoose duplicate key (11000) → 409  (double-booking guard)
 *   - Mongoose CastError (bad ObjectId) → 400
 *   - JWT errors → 401
 *   - Custom AppError with statusCode → use that code
 *   - Anything else → 500
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 422;
    const fields = Object.values(err.errors).map((e) => e.message);
    message = fields.join(', ');
  }

  // MongoDB duplicate key — most commonly our unique_expert_slot index
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {}).join(', ');
    message = field.includes('expertId')
      ? 'This time slot has already been booked. Please choose another.'
      : `Duplicate value for field: ${field}`;
  }

  // Bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
  }

  // JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired. Please log in again.';
  }

  // Don't leak internal details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${statusCode} — ${message}`, err.stack);
  }

  return apiError(res, message, statusCode);
};

module.exports = errorHandler;
