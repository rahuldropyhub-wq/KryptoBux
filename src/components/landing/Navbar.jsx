import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';

const navLinks = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Rewards', href: ROUTES.REWARDS },
  { label: 'Leaderboard', href: ROUTES.LEADERBOARD },
  { label: 'FAQ', href: ROUTES.FAQ },
  { label: 'Contact', href: ROUTES.CONTACT },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-[#030514]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="font-bold text-white text-lg leading-none">KB</span>
          </div>
          <span className="font-bold text-white text-xl tracking-wide">KRYPTO BUX</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href === ROUTES.HOME && location.pathname === '/');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative h-full flex items-center text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#7C3AED] rounded-t-full shadow-[0_-2px_10px_rgba(124,58,237,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
            <Moon size={16} />
          </button>
          
          <Link
            to={ROUTES.LOGIN}
            className="px-6 py-2.5 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all"
          >
            Log In
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className="px-6 py-2.5 text-sm font-semibold text-[#030514] bg-[#E2DCED] rounded-xl hover:bg-white transition-all shadow-md"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-[#030514] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-white/5 flex flex-col gap-3">
                <Link to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)} className="px-6 py-3 text-center text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all">Log In</Link>
                <Link to={ROUTES.REGISTER} onClick={() => setMenuOpen(false)} className="px-6 py-3 text-center text-sm font-semibold text-[#030514] bg-[#E2DCED] rounded-xl hover:bg-white transition-all">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
