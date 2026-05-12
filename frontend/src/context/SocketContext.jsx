import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../constants';
import useExpertStore from '../store/expertStore';

/**
 * SocketContext provides a shared Socket.io connection to the whole app.
 *
 * - Single connection created on mount, cleaned up on unmount.
 * - Components use useSocket() to access the socket and connection state.
 * - ExpertDetailPage calls joinRoom/leaveRoom to subscribe to slot updates.
 * - Incoming slot_updated events are forwarded to the Zustand store so the
 *   UI reflects changes without a page reload.
 */
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const updateSlotAvailability = useExpertStore((s) => s.updateSlotAvailability);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect',    () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('slot_updated', ({ expertId, date, timeSlot, available }) => {
      updateSlotAvailability(expertId, date, timeSlot, available);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [updateSlotAvailability]);

  const joinRoom  = (expertId) => socketRef.current?.emit('join_expert_room',  { expertId });
  const leaveRoom = (expertId) => socketRef.current?.emit('leave_expert_room', { expertId });

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected, joinRoom, leaveRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used inside SocketProvider');
  return ctx;
};
