const mongoose = require('mongoose');

/**
 * Connects to MongoDB via Mongoose.
 * Exits the process on failure — there's no point running the server
 * without a database connection.
 */
const connectDB = async () => {
  mongoose.set('strictQuery', true);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

// Surface connection lifecycle events for observability
mongoose.connection.on('disconnected', () =>
  console.warn('⚠️  MongoDB disconnected')
);
mongoose.connection.on('reconnected', () =>
  console.info('♻️  MongoDB reconnected')
);

module.exports = connectDB;
