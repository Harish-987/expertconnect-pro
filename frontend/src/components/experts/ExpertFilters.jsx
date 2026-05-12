import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '../../constants';

const ExpertFilters = ({ filters, setFilters }) => {
  const hasActiveFilters = filters.category !== 'All' || filters.search || filters.sort !== 'rating';

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search experts by name, skill, or bio…"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full bg-surface-100 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200
              placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50
              hover:border-white/20 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ sort: e.target.value })}
            className="bg-surface-100 border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-sm text-slate-200
              focus:outline-none focus:ring-2 focus:ring-brand-500/40 appearance-none cursor-pointer
              hover:border-white/20 transition-colors"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface-100">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilters({ category: cat })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filters.category === cat
                ? 'bg-brand-500 text-white shadow-glow-sm'
                : 'bg-white/5 text-slate-400 border border-white/8 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={() => setFilters({ category: 'All', search: '', sort: 'rating' })}
            className="px-4 py-1.5 rounded-full text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpertFilters;
