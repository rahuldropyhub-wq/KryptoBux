// ============================================================
// CONSTANTS
// ============================================================

export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  HOW_IT_WORKS: '/how-it-works',
  REWARDS: '/rewards',
  FAQ: '/faq',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  ACCOUNT_VERIFICATION: '/account-verification',

  // User
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  WALLET: '/wallet',
  PTC: '/ptc',
  SHORTLINKS: '/shortlinks',
  FAUCET: '/faucet',
  DAILY_BONUS: '/daily-bonus',
  COUPONS: '/coupons',
  REFERRALS: '/referrals',
  VIP: '/vip',
  SPIN_WHEEL: '/spin-wheel',
  STREAKS: '/streaks',
  CHALLENGES: '/challenges',
  LEADERBOARD: '/leaderboard',
  WITHDRAW: '/withdraw',
  TRANSACTIONS: '/transactions',
  NOTIFICATIONS: '/notifications',
  SUPPORT: '/support',
  TELEGRAM: '/telegram',
  SETTINGS: '/settings',

  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAILS: '/admin/users/:id',
  ADMIN_WALLETS: '/admin/wallets',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_PTC: '/admin/ptc',
  ADMIN_SHORTLINKS: '/admin/shortlinks',
  ADMIN_ADVERTISEMENTS: '/admin/advertisements',
  ADMIN_FAUCET: '/admin/faucet',
  ADMIN_DAILY_BONUS: '/admin/daily-bonus',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_REFERRALS: '/admin/referrals',
  ADMIN_VIP: '/admin/vip',
  ADMIN_SPIN_WHEEL: '/admin/spin-wheel',
  ADMIN_STREAKS: '/admin/streaks',
  ADMIN_CHALLENGES: '/admin/challenges',
  ADMIN_LEADERBOARD: '/admin/leaderboard',
  ADMIN_WITHDRAWALS: '/admin/withdrawals',
  ADMIN_TICKETS: '/admin/tickets',
  ADMIN_TELEGRAM: '/admin/telegram',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SECURITY: '/admin/security',
  ADMIN_SETTINGS: '/admin/settings',
};

export const AD_TYPES = [
  { value: 'ptc', label: 'PTC Ads' },
  { value: 'banner', label: 'Banner Ads' },
  { value: 'native', label: 'Native Ads' },
  { value: 'popup', label: 'Popup Ads' },
  { value: 'video', label: 'Video Ads' },
  { value: 'external', label: 'External Ads' },
  { value: 'iframe', label: 'iFrame Ads' },
  { value: 'youtube', label: 'YouTube Ads' },
  { value: 'windows', label: 'Windows Ads' },
  { value: 'shortlink', label: 'Shortlinks' },
];

export const PTC_TABS = [
  { value: 'all', label: 'All Ads' },
  { value: 'windows', label: 'Windows Ads' },
  { value: 'iframe', label: 'iFrame Ads' },
  { value: 'external', label: 'External Ads' },
  { value: 'youtube', label: 'YouTube Ads' },
  { value: 'shortlink', label: 'Shortlinks' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
];

export const TRANSACTION_TYPES = [
  { value: 'all', label: 'All Transactions' },
  { value: 'earn', label: 'Earnings' },
  { value: 'withdraw', label: 'Withdrawals' },
  { value: 'referral', label: 'Referral Bonus' },
  { value: 'bonus', label: 'Bonuses' },
];

export const VIP_LEVELS = [
  { level: 0, name: 'Standard', minCoins: 0, bonus: '0%', color: '#94a3b8' },
  { level: 1, name: 'Bronze', minCoins: 10000, bonus: '+5%', color: '#cd7f32' },
  { level: 2, name: 'Silver', minCoins: 50000, bonus: '+10%', color: '#9ea7b0' },
  { level: 3, name: 'Gold', minCoins: 150000, bonus: '+15%', color: '#f5b942' },
  { level: 4, name: 'Platinum', minCoins: 500000, bonus: '+20%', color: '#e5e4e2' },
  { level: 5, name: 'Diamond', minCoins: 1000000, bonus: '+25%', color: '#234398' },
];

export const EARNING_METHODS = [
  { id: 'ptc', title: 'PTC Ads', description: 'Watch ads and earn coins', icon: 'Monitor', route: '/ptc', reward: '20-50 Coins' },
  { id: 'shortlinks', title: 'Shortlinks', description: 'Complete shortlink tasks', icon: 'Link', route: '/shortlinks', reward: '15-35 Coins' },
  { id: 'faucet', title: 'Faucet', description: 'Claim coins every hour', icon: 'Droplets', route: '/faucet', reward: '10-25 Coins' },
  { id: 'daily-bonus', title: 'Daily Bonus', description: 'Log in daily for bonuses', icon: 'Star', route: '/daily-bonus', reward: '15-100 Coins' },
  { id: 'referrals', title: 'Referral Rewards', description: 'Invite friends and earn', icon: 'Users', route: '/referrals', reward: '100+ Coins' },
  { id: 'coupons', title: 'Coupons', description: 'Redeem coupon codes', icon: 'Ticket', route: '/coupons', reward: 'Variable' },
  { id: 'spin-wheel', title: 'Spin Wheel', description: 'Spin for surprise rewards', icon: 'RefreshCw', route: '/spin-wheel', reward: 'Up to 1000' },
  { id: 'challenges', title: 'Challenges', description: 'Complete tasks for big rewards', icon: 'Trophy', route: '/challenges', reward: '500+ Coins' },
];

export const PLATFORM_STATS = [
  { value: '25K+', label: 'Active Users' },
  { value: '500K+', label: 'Tasks Completed' },
  { value: '12.4M+', label: 'Coins Distributed' },
  { value: '99%', label: 'Successful Withdrawals' },
];

export const WHY_CHOOSE_US = [
  { icon: 'Shield', title: 'Bank-Grade Security', description: 'Your account and funds are protected with enterprise-level security.' },
  { icon: 'Zap', title: 'Instant Rewards', description: 'Earn coins instantly upon task completion. No delays.' },
  { icon: 'LayoutGrid', title: 'Multiple Earning Methods', description: '8+ ways to earn — PTC, faucet, shortlinks, referrals, and more.' },
  { icon: 'Eye', title: 'Transparent Transactions', description: 'Every transaction is logged and visible in your dashboard.' },
  { icon: 'Smartphone', title: 'Mobile Friendly', description: 'Fully optimized for any device, anywhere, anytime.' },
  { icon: 'HeadphonesIcon', title: '24/7 Support', description: 'Our support team is always ready to help you.' },
];

export const FAQ_ITEMS = [
  {
    q: 'What is Krypto Bux?',
    a: 'Krypto Bux is a cryptocurrency rewards platform where you can earn coins by completing simple tasks like watching ads, visiting websites, and more. You can then withdraw your earnings as real cryptocurrency.'
  },
  {
    q: 'How do I start earning?',
    a: 'Create a free account, complete your profile verification, and start completing tasks. Choose from PTC ads, shortlinks, faucet claims, daily bonuses, and more.'
  },
  {
    q: 'What is the minimum withdrawal amount?',
    a: 'The minimum withdrawal amount is 1,000 coins. You can withdraw to supported crypto wallets once you reach this threshold.'
  },
  {
    q: 'How long do withdrawals take?',
    a: 'Most withdrawals are processed within 24-48 hours. Instant withdrawals are available for VIP members.'
  },
  {
    q: 'Is Krypto Bux free to join?',
    a: 'Yes! Krypto Bux is completely free to join. We never charge you to use the platform.'
  },
  {
    q: 'How does the referral program work?',
    a: 'Invite friends using your unique referral link. You earn a bonus for every friend who joins and completes tasks on the platform.'
  },
  {
    q: 'What are VIP levels?',
    a: 'VIP levels reward loyal users with higher earning rates, priority withdrawals, and exclusive bonuses. Earn more coins to level up.'
  },
];

export const TESTIMONIALS = [
  { name: 'Alex Rodriguez', role: 'Active Member', avatar: 'AR', rating: 5, text: 'Krypto Bux is the best rewards platform I\'ve used. Fast payouts and tons of earning opportunities!', earnings: '45,200 Coins' },
  { name: 'Sarah Chen', role: 'VIP Gold Member', avatar: 'SC', rating: 5, text: 'The daily bonus and spin wheel keep me coming back every day. Highly recommend this platform!', earnings: '128,500 Coins' },
  { name: 'Marcus Johnson', role: 'Referral Champion', avatar: 'MJ', rating: 5, text: 'I\'ve referred 50+ friends and the referral bonuses are incredible. Best passive income online.', earnings: '250,000 Coins' },
];
