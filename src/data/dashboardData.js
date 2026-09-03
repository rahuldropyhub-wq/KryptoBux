export const dashboardData = {
  user: {
    username: "CryptoUser",
    level: 12,
    xp: 8450,
    nextLevelXp: 10000,
    balance: 125450,
    usdBalance: 1.25,
    dailyBonusDay: 5,
    dailyBonusReward: 50,
    referralCount: 24,
    activeReferrals: 17,
    referralEarnings: 12450
  },
  earnings: {
    faucet: 1250,
    ptc: 640,
    shortlinks: 2450,
    offerwall: 8500,
    referrals: 750
  },
  activity: {
    faucetClaims: 248,
    ptcViews: 42,
    shortlinksCompleted: 87,
    offersCompleted: 14,
    challengesCompleted: 8
  },
  chartData: [
    { name: 'Mon', earnings: 1200 },
    { name: 'Tue', earnings: 1800 },
    { name: 'Wed', earnings: 1500 },
    { name: 'Thu', earnings: 2400 },
    { name: 'Fri', earnings: 3200 },
    { name: 'Sat', earnings: 2900 },
    { name: 'Sun', earnings: 4100 },
  ],
  transactions: [
    { id: 1, type: 'Faucet', desc: 'Faucet Claim', amount: 65, date: 'Today 14:32', status: 'Completed' },
    { id: 2, type: 'PTC', desc: 'Advertisement View', amount: 25, date: 'Today 14:21', status: 'Completed' },
    { id: 3, type: 'Referral', desc: 'Referral Commission', amount: 10, date: 'Today 13:48', status: 'Completed' },
    { id: 4, type: 'Withdraw', desc: 'BTC Withdrawal', amount: -500, date: 'Yesterday', status: 'Pending' },
  ],
  timeline: [
    { id: 1, action: 'Faucet claim completed', time: '2 minutes ago' },
    { id: 2, action: 'PTC advertisement completed', time: '8 minutes ago' },
    { id: 3, action: 'Challenge progress updated', time: '20 minutes ago' },
    { id: 4, action: 'Referral commission received', time: '1 hour ago' },
  ],
  leaderboard: [
    { id: 1, username: 'User123', score: 950000 },
    { id: 2, username: 'CryptoKing', score: 840000 },
    { id: 3, username: 'FaucetPro', score: 720000 },
  ]
};
