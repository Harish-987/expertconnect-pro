require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const connectDB = require('./config/db');
const setupSockets = require('./sockets/socketHandler');

const PORT = process.env.PORT || 5000;

// ── HTTP + Socket.io ──────────────────────────────────────────────────────────
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((o) => o.trim()),
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Make io available to controllers via req.app.get('io')
app.set('io', io);

setupSockets(io);

// ── Start ──────────────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log('\n🚀 ExpertConnect Pro API is running');
    console.log(`   ↳ http://localhost:${PORT}`);
    console.log(`   ↳ ENV: ${process.env.NODE_ENV}`);
    console.log('   ↳ Socket.io ready\n');
  });
};

start();

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`\n${signal} received — shutting down gracefully…`);
  httpServer.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
