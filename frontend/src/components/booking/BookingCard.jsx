import { motion } from 'framer-motion';
import { Calendar, Clock, User, Hash } from 'lucide-react';
import { fadeUp } from '../../animations/variants';
import Badge from '../ui/Badge';
import { formatFullDate, formatTime, formatBookingId, formatRelativeDate } from '../../utils/formatters';
import { BOOKING_STATUSES } from '../../constants';

const statusColor = { pending: 'yellow', confirmed: 'blue', completed: 'green', cancelled: 'red' };

const BookingCard = ({ booking }) => {
  const { bookingId, expertId, expertName, expertCategory, date, timeSlot, status, sessionPrice, notes, createdAt } = booking;
  const name = expertName || expertId?.name || 'Unknown Expert';
  const category = expertCategory || expertId?.category || '';
  const image = expertId?.profileImage;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-surface-100 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Expert avatar */}
        {image && (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10 shrink-0"
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-white text-base">{name}</h3>
              {category && <p className="text-xs text-slate-500">{category}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Badge color={statusColor[status] || 'slate'} dot>
                {BOOKING_STATUSES[status]?.label || status}
              </Badge>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 shrink-0 text-brand-400" />
              <span className="font-mono text-brand-300">{formatBookingId(bookingId)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{formatFullDate(date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{formatTime(timeSlot)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-white">
                {sessionPrice ? `$${sessionPrice}` : '—'}
              </span>
            </div>
          </div>

          {notes && (
            <p className="mt-3 text-xs text-slate-500 bg-white/3 rounded-lg px-3 py-2 border border-white/5">
              📝 {notes}
            </p>
          )}

          <p className="mt-3 text-xs text-slate-600">Booked {formatRelativeDate(createdAt)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
