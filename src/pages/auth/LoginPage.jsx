import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ROUTES } from '@/utils/constants';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#030514] mb-2">Welcome Back</h1>
        <p className="text-xs text-slate-500">Log in to your account to continue earning crypto rewards.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 hover:border-[#7C3AED] hover:bg-[#F4F0FF] text-xs font-semibold text-slate-700 hover:text-[#4338CA] transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 hover:border-[#38BDF8] hover:bg-[#E0F2FE] text-xs font-semibold text-slate-700 hover:text-[#0284C7] transition-all"
        >
          <img src="https://www.svgrepo.com/show/452115/telegram.svg" className="w-4 h-4" alt="Telegram" />
          Telegram
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-[10px] font-medium text-slate-400 uppercase tracking-wider">or sign in with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">Password</label>
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-[10px] text-[#7C3AED] hover:text-[#4338CA] font-semibold transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={16} />
            </span>
            <input
              type={showPw ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPw(!showPw)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-[#7C3AED] to-[#4338CA] text-white rounded-lg font-bold text-xs shadow-[0_10px_25px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_35px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-[#7C3AED] font-bold hover:text-[#4338CA] transition-colors">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
