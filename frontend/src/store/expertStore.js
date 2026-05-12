import { create } from 'zustand';
import { fetchExperts, fetchExpertById } from '../api/expertApi';

/**
 * Expert store (Zustand).
 * Holds the paginated expert list and currently viewed expert detail.
 * All async actions are self-contained — components just call them.
 */
const useExpertStore = create((set, get) => ({
  experts: [],
  expert: null,
  pagination: null,
  loading: false,
  detailLoading: false,
  error: null,

  // Filters (kept in store so they survive navigation within the listing page)
  filters: {
    search: '',
    category: 'All',
    sort: 'rating',
    page: 1,
    limit: 12,
  },

  setFilters: (patch) =>
    set((s) => ({ filters: { ...s.filters, ...patch, page: 1 } })),

  setPage: (page) =>
    set((s) => ({ filters: { ...s.filters, page } })),

  loadExperts: async () => {
    const { filters } = get();
    set({ loading: true, error: null });
    try {
      const params = { ...filters };
      if (params.category === 'All') delete params.category;
      if (!params.search) delete params.search;

      const res = await fetchExperts(params);
      set({
        experts: res.data.data,
        pagination: res.data.meta,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  loadExpertById: async (id) => {
    set({ detailLoading: true, error: null, expert: null });
    try {
      const res = await fetchExpertById(id);
      set({ expert: res.data.data, detailLoading: false });
    } catch (err) {
      set({ error: err.message, detailLoading: false });
    }
  },

  // Called by SocketContext when a slot_updated event arrives
  updateSlotAvailability: (expertId, date, timeSlot, available) => {
    set((s) => {
      if (!s.expert || s.expert._id !== expertId) return {};

      const availableSlots = s.expert.availableSlots.map((day) => {
        if (day.date !== date) return day;
        const slots = available
          ? [...new Set([...day.slots, timeSlot])].sort()
          : day.slots.filter((sl) => sl !== timeSlot);
        return { ...day, slots };
      });

      return { expert: { ...s.expert, availableSlots } };
    });
  },

  clearExpert: () => set({ expert: null }),
}));

export default useExpertStore;
