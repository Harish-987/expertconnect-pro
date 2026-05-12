import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import useExperts from '../hooks/useExperts';
import ExpertCard from '../components/experts/ExpertCard';
import ExpertFilters from '../components/experts/ExpertFilters';
import { ExpertCardSkeleton } from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import { staggerContainer, fadeUp } from '../animations/variants';

const ExpertListingPage = () => {
  const { experts, pagination, loading, error, filters, setFilters, setPage } = useExperts();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.page]);

  return (
    <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-brand-400 text-sm font-medium mb-3">
            <Users className="w-4 h-4" />
            <span>Our Experts</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Find Your Expert
          </h1>
          <p className="text-slate-400">
            {pagination
              ? `${pagination.total} verified professionals ready to help`
              : 'Browse and filter by specialty'}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ExpertFilters filters={filters} setFilters={setFilters} />
        </motion.div>

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-2xl mb-3">⚠️</p>
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="secondary">
              Try again
            </Button>
          </div>
        )}

        {/* Loading grid */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ExpertCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Expert grid */}
        {!loading && !error && (
          <>
            {experts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No experts found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search or filters.</p>
                <Button onClick={() => setFilters({ search: '', category: 'All' })} variant="outline">
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer(0.05)}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {experts.map((expert) => (
                  <ExpertCard key={expert._id} expert={expert} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center gap-3 mt-12"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage(filters.page - 1)}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Prev
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => Math.abs(p - filters.page) <= 2)
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          p === filters.page
                            ? 'bg-brand-500 text-white'
                            : 'text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!pagination.hasNext}
                  onClick={() => setPage(filters.page + 1)}
                  iconRight={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExpertListingPage;
