import { create } from 'zustand';

const useUiStore = create((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,

  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
}));

export default useUiStore;
