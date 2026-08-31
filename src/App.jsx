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
import ProfilePage from '@/pages/user/ProfilePage';
import WalletPage from '@/pages/user/WalletPage';
import PtcPage from '@/pages/user/PtcPage';
import ShortlinksPage from '@/pages/user/ShortlinksPage';
import FaucetPage from '@/pages/user/FaucetPage';
import DailyBonusPage from '@/pages/user/DailyBonusPage';
import CouponsPage from '@/pages/user/CouponsPage';
import ReferralsPage from '@/pages/user/ReferralsPage';
import VipPage from '@/pages/user/VipPage';
import SpinWheelPage from '@/pages/user/SpinWheelPage';
import StreaksPage from '@/pages/user/StreaksPage';
import ChallengesPage from '@/pages/user/ChallengesPage';
import LeaderboardPage from '@/pages/user/LeaderboardPage';
import WithdrawPage from '@/pages/user/WithdrawPage';
import TransactionsPage from '@/pages/user/TransactionsPage';
import NotificationsPage from '@/pages/user/NotificationsPage';
import SupportPage from '@/pages/user/SupportPage';
import TelegramPage from '@/pages/user/TelegramPage';
import SettingsPage from '@/pages/user/SettingsPage';

// Admin Pages
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminUserDetailsPage from '@/pages/admin/AdminUserDetailsPage';
import AdminWalletsPage from '@/pages/admin/AdminWalletsPage';
import AdminTransactionsPage from '@/pages/admin/AdminTransactionsPage';
import AdminPtcPage from '@/pages/admin/AdminPtcPage';
import AdminShortlinksPage from '@/pages/admin/AdminShortlinksPage';
import AdminAdvertisementsPage from '@/pages/admin/AdminAdvertisementsPage';
import AdminFaucetPage from '@/pages/admin/AdminFaucetPage';
import AdminDailyBonusPage from '@/pages/admin/AdminDailyBonusPage';
import AdminCouponsPage from '@/pages/admin/AdminCouponsPage';
import AdminReferralsPage from '@/pages/admin/AdminReferralsPage';
import AdminVipPage from '@/pages/admin/AdminVipPage';
import AdminSpinWheelPage from '@/pages/admin/AdminSpinWheelPage';
import AdminStreaksPage from '@/pages/admin/AdminStreaksPage';
import AdminChallengesPage from '@/pages/admin/AdminChallengesPage';
import AdminLeaderboardPage from '@/pages/admin/AdminLeaderboardPage';
import AdminWithdrawalsPage from '@/pages/admin/AdminWithdrawalsPage';
import AdminTicketsPage from '@/pages/admin/AdminTicketsPage';
import AdminTelegramPage from '@/pages/admin/AdminTelegramPage';
import AdminNotificationsPage from '@/pages/admin/AdminNotificationsPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';
import AdminSecurityPage from '@/pages/admin/AdminSecurityPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/ptc" element={<PtcPage />} />
          <Route path="/shortlinks" element={<ShortlinksPage />} />
          <Route path="/faucet" element={<FaucetPage />} />
          <Route path="/daily-bonus" element={<DailyBonusPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/spin-wheel" element={<SpinWheelPage />} />
          <Route path="/streaks" element={<StreaksPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/telegram" element={<TelegramPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/:id" element={<AdminUserDetailsPage />} />
          <Route path="/admin/wallets" element={<AdminWalletsPage />} />
          <Route path="/admin/transactions" element={<AdminTransactionsPage />} />
          <Route path="/admin/ptc" element={<AdminPtcPage />} />
          <Route path="/admin/shortlinks" element={<AdminShortlinksPage />} />
          <Route path="/admin/advertisements" element={<AdminAdvertisementsPage />} />
          <Route path="/admin/faucet" element={<AdminFaucetPage />} />
          <Route path="/admin/daily-bonus" element={<AdminDailyBonusPage />} />
          <Route path="/admin/coupons" element={<AdminCouponsPage />} />
          <Route path="/admin/referrals" element={<AdminReferralsPage />} />
          <Route path="/admin/vip" element={<AdminVipPage />} />
          <Route path="/admin/spin-wheel" element={<AdminSpinWheelPage />} />
          <Route path="/admin/streaks" element={<AdminStreaksPage />} />
          <Route path="/admin/challenges" element={<AdminChallengesPage />} />
          <Route path="/admin/leaderboard" element={<AdminLeaderboardPage />} />
          <Route path="/admin/withdrawals" element={<AdminWithdrawalsPage />} />
          <Route path="/admin/tickets" element={<AdminTicketsPage />} />
          <Route path="/admin/telegram" element={<AdminTelegramPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/security" element={<AdminSecurityPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
