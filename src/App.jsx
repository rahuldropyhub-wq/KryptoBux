import '@/styles/globals.css';
import '@/styles/animations.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import UserLayout from '@/components/user/UserLayout';
import AdminLayout from '@/components/admin/AdminLayout';

// Public Pages
import LandingPage from '@/pages/public/LandingPage';
import AboutPage from '@/pages/public/AboutPage';
import HowItWorksPage from '@/pages/public/HowItWorksPage';
import RewardsPage from '@/pages/public/RewardsPage';
import FAQPage from '@/pages/public/FAQPage';
import ContactPage from '@/pages/public/ContactPage';
import TermsPage from '@/pages/public/TermsPage';
import PrivacyPage from '@/pages/public/PrivacyPage';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage';
import AccountVerificationPage from '@/pages/auth/AccountVerificationPage';

// User Pages
import DashboardPage from '@/pages/user/DashboardPage';

// Placeholder for unbuilt pages
const Placeholder = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <div className="w-16 h-16 bg-[var(--lavender)] rounded-2xl flex items-center justify-center">
      <span className="text-2xl font-bold text-[var(--primary)]">KB</span>
    </div>
    <h2 className="text-xl font-semibold text-[var(--text-primary)]">{name}</h2>
    <p className="text-sm text-[var(--text-secondary)]">This page is coming soon.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/account-verification" element={<AccountVerificationPage />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Placeholder name="Profile" />} />
          <Route path="/wallet" element={<Placeholder name="Wallet" />} />
          <Route path="/ptc" element={<Placeholder name="PTC Earnings" />} />
          <Route path="/shortlinks" element={<Placeholder name="Shortlinks" />} />
          <Route path="/faucet" element={<Placeholder name="Faucet" />} />
          <Route path="/daily-bonus" element={<Placeholder name="Daily Bonus" />} />
          <Route path="/coupons" element={<Placeholder name="Coupons" />} />
          <Route path="/referrals" element={<Placeholder name="Referral Program" />} />
          <Route path="/vip" element={<Placeholder name="VIP Level" />} />
          <Route path="/spin-wheel" element={<Placeholder name="Spin Wheel" />} />
          <Route path="/streaks" element={<Placeholder name="Streak Rewards" />} />
          <Route path="/challenges" element={<Placeholder name="Challenges" />} />
          <Route path="/leaderboard" element={<Placeholder name="Leaderboard" />} />
          <Route path="/withdraw" element={<Placeholder name="Withdraw" />} />
          <Route path="/transactions" element={<Placeholder name="Transactions" />} />
          <Route path="/notifications" element={<Placeholder name="Notifications" />} />
          <Route path="/support" element={<Placeholder name="Support" />} />
          <Route path="/telegram" element={<Placeholder name="Telegram" />} />
          <Route path="/settings" element={<Placeholder name="Settings" />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Placeholder name="Admin Dashboard" />} />
          <Route path="/admin/users" element={<Placeholder name="Users Management" />} />
          <Route path="/admin/users/:id" element={<Placeholder name="User Details" />} />
          <Route path="/admin/wallets" element={<Placeholder name="Wallet Management" />} />
          <Route path="/admin/transactions" element={<Placeholder name="Transactions" />} />
          <Route path="/admin/ptc" element={<Placeholder name="PTC Management" />} />
          <Route path="/admin/shortlinks" element={<Placeholder name="Shortlinks Management" />} />
          <Route path="/admin/advertisements" element={<Placeholder name="Advertisement Management" />} />
          <Route path="/admin/faucet" element={<Placeholder name="Faucet Management" />} />
          <Route path="/admin/daily-bonus" element={<Placeholder name="Daily Bonus Management" />} />
          <Route path="/admin/coupons" element={<Placeholder name="Coupons Management" />} />
          <Route path="/admin/referrals" element={<Placeholder name="Referral Management" />} />
          <Route path="/admin/vip" element={<Placeholder name="VIP Management" />} />
          <Route path="/admin/spin-wheel" element={<Placeholder name="Spin Wheel Management" />} />
          <Route path="/admin/streaks" element={<Placeholder name="Streak Management" />} />
          <Route path="/admin/challenges" element={<Placeholder name="Challenges Management" />} />
          <Route path="/admin/leaderboard" element={<Placeholder name="Leaderboard Management" />} />
          <Route path="/admin/withdrawals" element={<Placeholder name="Withdrawal Management" />} />
          <Route path="/admin/tickets" element={<Placeholder name="Ticket Management" />} />
          <Route path="/admin/telegram" element={<Placeholder name="Telegram Management" />} />
          <Route path="/admin/notifications" element={<Placeholder name="Notification Management" />} />
          <Route path="/admin/reports" element={<Placeholder name="Reports" />} />
          <Route path="/admin/security" element={<Placeholder name="Security" />} />
          <Route path="/admin/settings" element={<Placeholder name="System Settings" />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
