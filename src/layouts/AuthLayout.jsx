import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 h-screen overflow-hidden">
      
      {/* Absolute Back Button for small screens or floating */}
      <button 
        onClick={() => navigate(ROUTES.HOME)}
        className="absolute top-4 left-4 lg:hidden flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-white px-3 py-1.5 rounded-full shadow-sm z-50 text-sm font-medium transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex h-full max-h-[700px] border border-slate-100 relative">
        
        {/* Floating Back Button for Desktop (inside card) */}
        <button 
          onClick={() => navigate(ROUTES.HOME)}
          className="hidden lg:flex absolute top-6 right-6 items-center gap-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full z-50 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Left Panel: Premium 3D Background */}
        <div className="hidden lg:flex flex-col justify-between w-[45%] p-8 text-white relative">
          {/* Background Image & Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url(/auth_hero.jpg)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030514] via-[#030514]/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[#4338CA]/20 mix-blend-overlay z-10"></div>

          {/* Content */}
          <div className="relative z-20">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 w-max">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="font-bold text-white text-sm">KB</span>
              </div>
              <span className="font-bold text-white text-lg tracking-wide">KryptoBux</span>
            </Link>
          </div>

          <div className="relative z-20 mt-auto pb-4">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
              <p className="text-[10px] font-bold text-white uppercase tracking-wider">Start Earning Today</p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-[1.15] mb-4 text-white drop-shadow-lg">
              Unlock the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#818CF8]">Crypto Rewards.</span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Complete tasks, play games, and invite friends to earn crypto instantly. Join thousands of users worldwide.
            </p>
          </div>
          
          <div className="relative z-20 flex items-center justify-between">
            <p className="text-white/50 text-[11px]">© 2024 Krypto Bux. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors"><span className="text-[11px]">Terms</span></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors"><span className="text-[11px]">Privacy</span></a>
            </div>
          </div>
        </div>

        {/* Right: Form Area */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12 relative bg-white overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
