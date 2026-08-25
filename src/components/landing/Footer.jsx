import { Link } from 'react-router-dom';
import { Facebook, Twitter, Send, MessageCircle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const Footer = () => {
  return (
    <footer className="bg-[#030514] pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] rounded-xl flex items-center justify-center font-bold text-white text-xl">
                KB
              </div>
              <span className="text-xl font-bold text-white tracking-tight">KRYPTO BUX</span>
            </Link>
            <p className="text-slate-400 text-[13px] leading-relaxed mb-6">
              The most trusted platform to earn crypto rewards by completing simple tasks online.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#7C3AED] hover:text-white transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#7C3AED] hover:text-white transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#7C3AED] hover:text-white transition-all">
                <Send size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#7C3AED] hover:text-white transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold text-[14px] mb-5">Platform</h4>
              <ul className="flex flex-col gap-3 text-[13px] text-slate-400">
                <li><Link to={ROUTES.HOME} className="hover:text-[#7C3AED] transition-colors">Home</Link></li>
                <li><a href="#features" className="hover:text-[#7C3AED] transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[#7C3AED] transition-colors">How It Works</a></li>
                <li><a href="#rewards" className="hover:text-[#7C3AED] transition-colors">Rewards</a></li>
                <li><a href="#leaderboard" className="hover:text-[#7C3AED] transition-colors">Leaderboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-[14px] mb-5">Earn</h4>
              <ul className="flex flex-col gap-3 text-[13px] text-slate-400">
                <li><Link to={ROUTES.REWARDS} className="hover:text-[#7C3AED] transition-colors">PTC Ads</Link></li>
                <li><Link to={ROUTES.REWARDS} className="hover:text-[#7C3AED] transition-colors">Shortlinks</Link></li>
                <li><Link to={ROUTES.REWARDS} className="hover:text-[#7C3AED] transition-colors">Faucet</Link></li>
                <li><Link to={ROUTES.REWARDS} className="hover:text-[#7C3AED] transition-colors">Daily Bonus</Link></li>
                <li><Link to={ROUTES.REWARDS} className="hover:text-[#7C3AED] transition-colors">Challenges</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-[14px] mb-5">Account</h4>
              <ul className="flex flex-col gap-3 text-[13px] text-slate-400">
                <li><Link to={ROUTES.LOGIN} className="hover:text-[#7C3AED] transition-colors">Login</Link></li>
                <li><Link to={ROUTES.REGISTER} className="hover:text-[#7C3AED] transition-colors">Sign Up</Link></li>
                <li><Link to={ROUTES.DASHBOARD} className="hover:text-[#7C3AED] transition-colors">Withdraw</Link></li>
                <li><Link to={ROUTES.SUPPORT} className="hover:text-[#7C3AED] transition-colors">Support</Link></li>
                <li><Link to={ROUTES.DASHBOARD} className="hover:text-[#7C3AED] transition-colors">Transactions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-[14px] mb-5">Company</h4>
              <ul className="flex flex-col gap-3 text-[13px] text-slate-400">
                <li><Link to="/about" className="hover:text-[#7C3AED] transition-colors">About Us</Link></li>
                <li><a href="#faq" className="hover:text-[#7C3AED] transition-colors">FAQ</a></li>
                <li><Link to={ROUTES.SUPPORT} className="hover:text-[#7C3AED] transition-colors">Contact Us</Link></li>
                <li><Link to="/terms" className="hover:text-[#7C3AED] transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-[#7C3AED] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-[14px] mb-5">Stay Connected</h4>
            <p className="text-slate-400 text-[13px] mb-4">
              Subscribe to get updates and exclusive offers!
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-[12px]">
            © {new Date().getFullYear()} Krypto Bux. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
