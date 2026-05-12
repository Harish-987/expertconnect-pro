/**
 * Wraps async route handlers so unhandled promise rejections are forwarded
 * to Express's next(err) instead of crashing the process.
 * Usage: router.get('/path', asyncWrapper(myAsyncController))
 */
const asyncWrapper = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncWrapper;
