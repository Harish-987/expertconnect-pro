import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Code-split every page for optimal bundle size
const LandingPage        = lazy(() => import('../pages/LandingPage'));
const ExpertListingPage  = lazy(() => import('../pages/ExpertListingPage'));
const ExpertDetailPage   = lazy(() => import('../pages/ExpertDetailPage'));
const BookingPage        = lazy(() => import('../pages/BookingPage'));
const MyBookingsPage     = lazy(() => import('../pages/MyBookingsPage'));
const AdminDashboard     = lazy(() => import('../pages/AdminDashboard'));
const AdminBookings      = lazy(() => import('../pages/AdminBookings'));
const AdminExperts       = lazy(() => import('../pages/AdminExperts'));
const NotFoundPage       = lazy(() => import('../pages/NotFoundPage'));

const Fallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-slate-500">Loading…</p>
    </div>
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<Fallback />}>
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="experts" element={<ExpertListingPage />} />
        <Route path="experts/:id" element={<ExpertDetailPage />} />
        <Route path="experts/:id/book" element={<BookingPage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
      </Route>

      {/* Admin */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="experts" element={<AdminExperts />} />
      </Route>

      {/* Fallback */}
      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
