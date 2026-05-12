import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CircleDot } from 'lucide-react';
import { fetchAllExperts } from '../api/adminApi';
import Badge from '../components/ui/Badge';
import { ExpertCardSkeleton } from '../components/ui/Skeleton';
import { formatCurrency } from '../utils/formatters';
import { staggerContainer, fadeUp } from '../animations/variants';

const AdminExperts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllExperts()
      .then((r) => setExperts(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1">Expert Roster</h1>
        <p className="text-slate-400 text-sm">{experts.length} registered professionals</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <ExpertCardSkeleton key={i} />)}
        </div>
      ) : (
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {experts.map((e) => (
            <motion.div
              key={e._id}
              variants={fadeUp}
              className="glass-card p-5 border border-white/8 hover:border-brand-500/30 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <img src={e.profileImage} alt={e.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate">{e.name}</h3>
                  <p className="text-xs text-slate-500">{e.category}</p>
                </div>
                <Badge color={e.isOnline ? 'green' : 'slate'} dot={e.isOnline}>
                  {e.isOnline ? 'Online' : 'Away'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">{e.rating.toFixed(1)}</span>
                  <span>({e.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleDot className="w-3 h-3" />
                  <span>{e.totalSessions} sessions</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(e.price)}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminExperts;
