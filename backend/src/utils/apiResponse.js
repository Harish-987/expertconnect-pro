/**
 * Uniform API response helpers.
 * Every controller uses these so the client always gets the same shape:
 *   { success, message, data?, meta? }
 */

const success = (res, message, data = null, statusCode = 200, meta = null) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  if (meta !== null) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

const error = (res, message, statusCode = 500, errors = null) => {
  const payload = { success: false, message };
  if (errors !== null) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

module.exports = { success, error };
