import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, ChevronLeft, Zap, Menu } from 'lucide-react';

const NAV = [
  { to: '/admin',          label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Bookings',   icon: BookOpen },
  { to: '/admin/experts',  label: 'Experts',    icon: Users },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface-DEFAULT flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 220 }}
        className="shrink-0 bg-surface-100 border-r border-white/8 flex flex-col sticky top-0 h-screen overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/8">
          <div className="w-8 h-8 rounded-lg bg-btn-primary flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-white text-sm whitespace-nowrap overflow-hidden">
              Admin Panel
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Back to site + collapse */}
        <div className="p-3 border-t border-white/8 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            {!collapsed && 'Back to site'}
          </Link>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <Menu className="w-4 h-4 shrink-0" />
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
