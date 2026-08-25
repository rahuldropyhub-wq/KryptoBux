import { Mail, RefreshCw } from 'lucide-react';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

const VerifyEmailPage = () => (
  <div className="text-center">
    <div className="w-16 h-16 bg-[var(--lavender)] rounded-full flex items-center justify-center mx-auto mb-4">
      <Mail size={28} className="text-[var(--primary)]" />
    </div>
    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Verify Your Email</h1>
    <p className="text-sm text-[var(--text-secondary)] mb-2 max-w-sm mx-auto">
      We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
    </p>
    <p className="text-xs text-[var(--text-muted)] mb-6">Check spam folder if you can't find it.</p>
    <div className="space-y-3">
      <Button fullWidth variant="secondary" leftIcon={<RefreshCw size={14} />}>Resend Verification Email</Button>
      <Link to={ROUTES.LOGIN} className="block text-sm text-[var(--primary)] hover:underline">Back to Login</Link>
    </div>
  </div>
);
export default VerifyEmailPage;
