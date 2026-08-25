import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Gift } from 'lucide-react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ROUTES } from '@/utils/constants';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', referralCode: '', terms: false });
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#030514] mb-1.5">Create Account</h1>
        <p className="text-xs text-slate-500">Join Krypto Bux and start earning crypto today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <button type="button" className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 hover:border-[#7C3AED] hover:bg-[#F4F0FF] text-xs font-semibold text-slate-700 hover:text-[#4338CA] transition-all">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
          Google
        </button>
        <button type="button" className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 hover:border-[#38BDF8] hover:bg-[#E0F2FE] text-xs font-semibold text-slate-700 hover:text-[#0284C7] transition-all">
          <img src="https://www.svgrepo.com/show/452115/telegram.svg" className="w-4 h-4" alt="Telegram" />
          Telegram
        </button>
      </div>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-[10px] font-medium text-slate-400 uppercase tracking-wider">or register with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><User size={16} /></span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all" required />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
              <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
              <input type={showPw ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm" className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Referral Code (Optional)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Gift size={16} /></span>
            <input type="text" name="referralCode" value={form.referralCode} onChange={handleChange} placeholder="Enter referral code" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all" />
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer pt-1">
          <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]" required />
          <span className="text-[11px] text-slate-500 leading-tight">
            I agree to the <Link to={ROUTES.TERMS} className="text-[#7C3AED] font-semibold hover:text-[#4338CA]">Terms & Conditions</Link> and <Link to={ROUTES.PRIVACY} className="text-[#7C3AED] font-semibold hover:text-[#4338CA]">Privacy Policy</Link>
          </span>
        </label>

        <div className="pt-1">
          <button type="submit" disabled={loading} className="w-full py-2.5 px-3 bg-gradient-to-r from-[#7C3AED] to-[#4338CA] text-white rounded-lg font-bold text-xs shadow-[0_10px_25px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_35px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Already have an account? <Link to={ROUTES.LOGIN} className="text-[#7C3AED] font-bold hover:text-[#4338CA] transition-colors">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
