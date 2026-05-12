import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-white/8 bg-surface-DEFAULT">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-btn-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">
              ExpertConnect <span className="text-brand-400">Pro</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed">
            Real-time expert session booking for ambitious teams and individuals.
          </p>
          <div className="flex gap-3">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          {
            title: 'Product',
            links: [
              { label: 'Browse Experts', to: '/experts' },
              { label: 'My Bookings', to: '/my-bookings' },
              { label: 'Admin Dashboard', to: '/admin' },
            ],
          },
          {
            title: 'Categories',
            links: [
              { label: 'Technology', to: '/experts?category=Technology' },
              { label: 'Business', to: '/experts?category=Business' },
              { label: 'Finance', to: '/experts?category=Finance' },
              { label: 'Design', to: '/experts?category=Design' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', to: '/' },
              { label: 'Blog', to: '/' },
              { label: 'Careers', to: '/' },
              { label: 'Privacy Policy', to: '/' },
            ],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} ExpertConnect Pro. All rights reserved.
        </p>
        <p className="text-xs text-slate-600">
          Built with React, Node.js & MongoDB · Real-time via Socket.io
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
