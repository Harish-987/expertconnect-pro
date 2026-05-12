/**
 * Socket.io event handler.
 *
 * Room naming convention: `expert_<expertId>`
 * Each client viewing an expert's detail page joins that room so it
 * receives only the slot-update events relevant to it.
 *
 * Events (client → server):
 *   join_expert_room  { expertId }  — join the expert's room
 *   leave_expert_room { expertId }  — leave the expert's room
 *
 * Events (server → client):
 *   slot_updated      { expertId, date, timeSlot, available }
 *   booking_confirmed { bookingId, expertId, date, timeSlot }
 *   room_joined       { expertId, message }
 */
const setupSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.on('join_expert_room', ({ expertId }) => {
      if (!expertId) return;
      const room = `expert_${expertId}`;
      socket.join(room);
      socket.emit('room_joined', {
        expertId,
        message: `Joined room for expert ${expertId}. Slot updates will arrive in real time.`,
      });
      const roomSet = io.sockets.adapter.rooms.get(room);
      console.log(`   ↳ ${socket.id} joined ${room} (${roomSet ? roomSet.size : 1} in room)`);
    });

    socket.on('leave_expert_room', ({ expertId }) => {
      if (!expertId) return;
      const room = `expert_${expertId}`;
      socket.leave(room);
      console.log(`   ↳ ${socket.id} left ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSockets;
