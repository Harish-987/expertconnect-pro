import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAllBookings, adminUpdateStatus } from '../api/adminApi';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { BookingCardSkeleton } from '../components/ui/Skeleton';
import { fadeUp } from '../animations/variants';
import { formatRelativeDate } from '../utils/formatters';
import toast from 'react-hot-toast';

const STATUS_OPTS = ['pending', 'confirmed', 'completed', 'cancelled'];
const statusColor = { pending: 'yellow', confirmed: 'blue', completed: 'green', cancelled: 'red' };

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllBookings({ status: statusFilter })
      .then((r) => setBookings(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter]); // eslint-disable-line

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try {
      await adminUpdateStatus(id, status);
      toast.success(`Status updated to ${status}`);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1">All Bookings</h1>
        <p className="text-slate-400 text-sm">Manage and update session statuses</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', ...STATUS_OPTS].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
              statusFilter === s ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-400 border border-white/8 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <BookingCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm glass-card border border-white/8">
            <thead>
              <tr className="border-b border-white/8">
                {['ID', 'Customer', 'Expert', 'Date · Time', 'Status', 'Amount', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <motion.tr
                  key={b._id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-brand-300 text-xs">{b.bookingId}</td>
                  <td className="py-3 px-4">
                    <div className="text-white text-xs font-medium">{b.userName}</div>
                    <div className="text-slate-500 text-xs">{b.email}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 text-xs">{b.expertName}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{b.date} · {b.timeSlot}</td>
                  <td className="py-3 px-4">
                    <Badge color={statusColor[b.status]}>{b.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-white font-medium">${b.sessionPrice}</td>
                  <td className="py-3 px-4">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatus(b._id, e.target.value)}
                      disabled={updating === b._id}
                      className="bg-surface-200 border border-white/10 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500/50"
                    >
                      {STATUS_OPTS.map((s) => (
                        <option key={s} value={s} className="bg-surface-200">{s}</option>
                      ))}
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <p className="text-center text-slate-500 py-12 text-sm">No bookings found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
