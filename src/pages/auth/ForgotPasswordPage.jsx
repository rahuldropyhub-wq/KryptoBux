import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ROUTES } from '@/utils/constants';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-[var(--lavender)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={28} className="text-[var(--primary)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Check Your Email</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">We sent a password reset link to <strong>{email}</strong></p>
        <Button variant="secondary" fullWidth onClick={() => setSent(false)}>Try another email</Button>
        <Link to={ROUTES.LOGIN} className="block text-center text-sm text-[var(--primary)] mt-4 hover:underline">Back to Login</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Login
      </Link>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Forgot Password?</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Enter your email and we'll send you a reset link.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" leftIcon={<Mail size={15} />} required />
        <Button type="submit" fullWidth loading={loading} size="lg">Send Reset Link</Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
