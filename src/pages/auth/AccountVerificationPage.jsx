import { Shield } from 'lucide-react';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

const AccountVerificationPage = () => (
  <div className="text-center">
    <div className="w-16 h-16 bg-[var(--lavender)] rounded-full flex items-center justify-center mx-auto mb-4">
      <Shield size={28} className="text-[var(--primary)]" />
    </div>
    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Account Verification</h1>
    <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-sm mx-auto">
      Your account is being verified. This usually takes 24 hours. You'll receive an email notification once approved.
    </p>
    <Link to={ROUTES.LOGIN} className="btn btn-primary w-full justify-center">Back to Login</Link>
  </div>
);
export default AccountVerificationPage;
