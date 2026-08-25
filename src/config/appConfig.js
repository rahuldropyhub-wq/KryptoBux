// ============================================================
// APP CONFIGURATION
// ============================================================

const appConfig = {
  appName: 'Krypto Bux',
  appTagline: 'Earn Crypto Rewards',
  appDescription: 'Complete tasks, earn coins, and withdraw crypto rewards.',
  appUrl: import.meta.env.VITE_APP_URL || 'https://kryptobux.com',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Brand
  brand: {
    primary: '#234398',
    deep: '#25275E',
    lavender: '#E2DCED',
  },

  // Coin
  coin: {
    symbol: 'KB',
    name: 'Krypto Bux Coin',
    minWithdrawal: 1000,
    maxWithdrawal: 1000000,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },

  // Auth
  auth: {
    tokenKey: 'kb_token',
    refreshTokenKey: 'kb_refresh_token',
    userKey: 'kb_user',
    tokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  },

  // Social
  social: {
    telegram: 'https://t.me/kryptobux',
    twitter: 'https://twitter.com/kryptobux',
    discord: 'https://discord.gg/kryptobux',
    instagram: 'https://instagram.com/kryptobux',
  },

  // Support
  support: {
    email: 'support@kryptobux.com',
  },
};

export default appConfig;
