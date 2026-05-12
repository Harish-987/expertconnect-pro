import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Users, BookOpen, DollarSign, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';
import { fetchDashboard } from '../api/adminApi';
import { ExpertCardSkeleton } from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import { formatCurrency, formatRelativeDate } from '../utils/formatters';
import { staggerContainer, fadeUp, scaleIn } from '../animations/variants';

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#64748b', '#3b82f6'];

const StatCard = ({ icon: Icon, label, value, sub, color = 'brand' }) => {
  const colorMap = {
    brand:   'bg-brand-500/15 text-brand-400',
    green:   'bg-emerald-500/15 text-emerald-400',
    yellow:  'bg-amber-500/15 text-amber-400',
    cyan:    'bg-cyan-500/15 text-cyan-400',
    red:     'bg-red-500/15 text-red-400',
  };
  return (
    <motion.div variants={scaleIn} className="glass-card p-5 border border-white/8">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-300">{label}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then((res) => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 skeleton rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <ExpertCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  const { stats, categoryBreakdown = [], recentBookings = [], bookingsByDay = [] } = data || {};

  return (
    <motion.div
      variants={staggerContainer(0.07)}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-slate-400 text-sm">Real-time overview of ExpertConnect Pro</p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        variants={staggerContainer(0.06)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard icon={BookOpen}    label="Total Bookings"  value={stats?.totalBookings || 0}  color="brand" />
        <StatCard icon={DollarSign}  label="Revenue"         value={formatCurrency(stats?.totalRevenue || 0)} color="green" />
        <StatCard icon={Clock}       label="Pending"         value={stats?.pendingBookings || 0} color="yellow" />
        <StatCard icon={Users}       label="Total Experts"   value={stats?.totalExperts || 0}   color="cyan" />
      </motion.div>

      {/* Status breakdown */}
      <motion.div variants={staggerContainer(0.06)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Confirmed', value: stats?.confirmedBookings, color: 'blue', icon: CheckCircle },
          { label: 'Completed', value: stats?.completedBookings, color: 'green', icon: TrendingUp },
          { label: 'Cancelled', value: stats?.cancelledBookings, color: 'red',   icon: XCircle },
          { label: 'Pending',   value: stats?.pendingBookings,   color: 'yellow', icon: Clock },
        ].map(({ label, value, color, icon: Icon }) => (
          <motion.div key={label} variants={scaleIn} className="glass-card p-4 border border-white/5 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${color}-500/10`}>
              <Icon className={`w-4 h-4 text-${color}-400`} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{value || 0}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts row */}
      <motion.div variants={staggerContainer(0.07)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings over time */}
        <motion.div variants={fadeUp} className="lg:col-span-2 glass-card p-5 border border-white/8">
          <h3 className="font-semibold text-white mb-4">Bookings — Last 7 Days</h3>
          {bookingsByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={bookingsByDay}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1c1c30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#colorBookings)" strokeWidth={2} dot={{ fill: '#6366f1', strokeWidth: 0, r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-600 text-sm">
              No booking data yet — seed the database first
            </div>
          )}
        </motion.div>

        {/* Category breakdown */}
        <motion.div variants={fadeUp} className="glass-card p-5 border border-white/8">
          <h3 className="font-semibold text-white mb-4">Sessions by Category</h3>
          {categoryBreakdown.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {categoryBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#1c1c30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {categoryBreakdown.slice(0, 4).map((item, i) => (
                  <div key={item._id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-slate-400">{item._id || 'Unknown'}</span>
                    </div>
                    <span className="text-slate-300 font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-600 text-sm">No data yet</div>
          )}
        </motion.div>
      </motion.div>

      {/* Recent bookings */}
      <motion.div variants={fadeUp} className="glass-card p-5 border border-white/8">
        <h3 className="font-semibold text-white mb-4">Recent Bookings</h3>
        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Booking ID', 'Customer', 'Expert', 'Date', 'Status', 'Amount'].map((h) => (
                    <th key={h} className="text-left py-3 px-3 text-xs text-slate-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b._id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-3 px-3 font-mono text-brand-300 text-xs">{b.bookingId}</td>
                    <td className="py-3 px-3 text-slate-300">{b.userName}</td>
                    <td className="py-3 px-3 text-slate-300">{b.expertName || b.expertId?.name}</td>
                    <td className="py-3 px-3 text-slate-400">{b.date} · {b.timeSlot}</td>
                    <td className="py-3 px-3">
                      <Badge color={{ pending: 'yellow', confirmed: 'blue', completed: 'green', cancelled: 'red' }[b.status]}>
                        {b.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-white font-medium">${b.sessionPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-8">No recent bookings</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
