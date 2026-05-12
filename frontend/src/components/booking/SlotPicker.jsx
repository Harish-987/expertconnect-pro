import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wifi } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatters';
import { useSocket } from '../../context/SocketContext';

/**
 * SlotPicker renders a date-scrollable availability calendar.
 * It receives availableSlots from the expert store — which is kept in sync
 * by SocketContext so booked slots disappear in real time.
 */
const SlotPicker = ({ availableSlots = [], selectedDate, selectedSlot, onSelect }) => {
  const [dateIndex, setDateIndex] = useState(0);
  const { connected } = useSocket();

  const daysToShow = 5;
  const visibleDays = availableSlots.slice(dateIndex, dateIndex + daysToShow);
  const currentDay = visibleDays.find((d) => d.date === selectedDate) || visibleDays[0];

  const canPrev = dateIndex > 0;
  const canNext = dateIndex + daysToShow < availableSlots.length;

  return (
    <div className="space-y-4">
      {/* Live indicator */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-300">Select a Time Slot</h4>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi className={`w-3 h-3 ${connected ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className={connected ? 'text-emerald-400' : 'text-slate-500'}>
            {connected ? 'Real-time' : 'Connecting…'}
          </span>
        </div>
      </div>

      {/* Date scroller */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDateIndex((i) => Math.max(0, i - 1))}
          disabled={!canPrev}
          className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 grid grid-cols-5 gap-1.5">
          {visibleDays.map((day) => {
            const isSel = day.date === selectedDate;
            const hasSlots = day.slots.length > 0;
            return (
              <button
                key={day.date}
                onClick={() => hasSlots && onSelect(day.date, null)}
                disabled={!hasSlots}
                className={`py-2 px-1 rounded-xl text-center transition-all text-xs font-medium ${
                  isSel
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : hasSlots
                    ? 'bg-white/5 text-slate-300 hover:bg-brand-500/20 hover:text-brand-300 border border-white/8'
                    : 'bg-white/3 text-slate-600 cursor-not-allowed border border-white/5'
                }`}
              >
                <div>{formatDate(day.date)}</div>
                <div className={`text-[10px] mt-0.5 ${isSel ? 'text-brand-200' : 'text-slate-500'}`}>
                  {hasSlots ? `${day.slots.length} free` : 'Full'}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setDateIndex((i) => i + 1)}
          disabled={!canNext}
          className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Time slots for selected date */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay?.date}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
        >
          {currentDay?.slots?.length > 0 ? (
            currentDay.slots.map((slot) => {
              const isSel = slot === selectedSlot && currentDay.date === selectedDate;
              return (
                <motion.button
                  key={slot}
                  onClick={() => onSelect(currentDay.date, slot)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium text-center transition-all border ${
                    isSel
                      ? 'bg-brand-500/25 border-brand-400 text-brand-200 shadow-glow-sm'
                      : 'bg-white/4 border-white/8 text-slate-300 hover:bg-brand-500/12 hover:border-brand-500/40 hover:text-brand-300'
                  }`}
                >
                  {formatTime(slot)}
                </motion.button>
              );
            })
          ) : (
            <div className="col-span-4 text-center py-8 text-slate-500 text-sm">
              No slots available for this date
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {selectedDate && selectedSlot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-3 text-sm text-brand-300 text-center"
        >
          ✓ Selected: <strong>{formatDate(selectedDate)}</strong> at <strong>{formatTime(selectedSlot)}</strong>
        </motion.div>
      )}
    </div>
  );
};

export default SlotPicker;
