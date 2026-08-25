import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ROUTES } from '@/utils/constants';

const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  if (done) return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Password Reset!</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Your password has been successfully updated.</p>
      <Link to={ROUTES.LOGIN} className="btn btn-primary btn-lg w-full justify-center">Back to Login</Link>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Reset Password</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Enter your new password below.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="New Password" type={showPw ? 'text' : 'password'} value={form.password}
          onChange={(e) => setForm(p => ({...p, password: e.target.value}))}
          placeholder="New password" leftIcon={<Lock size={15} />}
          rightIcon={<button type="button" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>} required />
        <Input label="Confirm Password" type={showPw ? 'text' : 'password'} value={form.confirm}
          onChange={(e) => setForm(p => ({...p, confirm: e.target.value}))}
          placeholder="Confirm new password" leftIcon={<Lock size={15} />} required />
        <Button type="submit" fullWidth loading={loading} size="lg">Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
