const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected'));
mongoose.connection.on('reconnected',  () => console.info('♻️  MongoDB reconnected'));
mongoose.connection.on('error',        (e) => console.error('MongoDB error:', e.message));

/**
 * Connects to MongoDB.
 * Throws on failure so the caller (server.js) can log the root cause,
 * but the HTTP server stays up — Render logs will show the Atlas error.
 */
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS:          45000,
    maxPoolSize:              10,
  });
  console.log(`✅ MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
