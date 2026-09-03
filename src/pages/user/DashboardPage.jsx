import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import BalanceCard from '../../components/dashboard/BalanceCard';
import LevelCard from '../../components/dashboard/LevelCard';
import DailyBonusCard from '../../components/dashboard/DailyBonusCard';
import AvailableOffersCarousel from '../../components/dashboard/AvailableOffersCarousel';
import EarningsSummary from '../../components/dashboard/EarningsSummary';
import WeeklyEarningsChart from '../../components/dashboard/WeeklyEarningsChart';
import ActivityOverview from '../../components/dashboard/ActivityOverview';
import QuickEarningActions from '../../components/dashboard/QuickEarningActions';
import FaucetStatusCard from '../../components/dashboard/FaucetStatusCard';
import ReferralSummary from '../../components/dashboard/ReferralSummary';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import ChallengeProgress from '../../components/dashboard/ChallengeProgress';
import LeaderboardPreview from '../../components/dashboard/LeaderboardPreview';

const DashboardPage = () => {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="w-10 h-10 border-4 border-vie-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* 1. BALANCE + LEVEL + DAILY BONUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <BalanceCard balance={data.user.balance} usdBalance={data.user.usdBalance} />
        <LevelCard level={data.user.level} xp={data.user.xp} nextLevelXp={data.user.nextLevelXp} />
        <DailyBonusCard day={data.user.dailyBonusDay} reward={data.user.dailyBonusReward} />
      </div>

      {/* 2. ADVERTISEMENT BANNER (Mock) */}
      <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center h-24 mb-6 border border-gray-200 border-dashed text-gray-400 text-sm font-medium">
        Advertisement Banner
      </div>

      {/* 3. OFFERWALL CAROUSEL */}
      <AvailableOffersCarousel />

      {/* 4. EARNINGS SUMMARY */}
      <div className="mb-6">
        <EarningsSummary earnings={data.earnings} />
      </div>

      {/* 3. WEEKLY EARNINGS CHART */}
      <div className="mb-6">
        <WeeklyEarningsChart data={data.chartData} />
      </div>

      {/* 4. ACTIVITY OVERVIEW */}
      <div className="mb-6">
        <ActivityOverview activity={data.activity} />
      </div>

      {/* 5. START EARNING / QUICK ACTIONS */}
      <div className="mb-6">
        <QuickEarningActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 6. FAUCET STATUS */}
        <div className="lg:col-span-1">
          <FaucetStatusCard />
        </div>
        
        {/* LEVEL PROGRESS (Detailed) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-semibold text-vie-text mb-4">Level Progress</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold">Level {data.user.level}</span>
            <span className="font-bold text-gray-400">Level {data.user.level + 1}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div className="bg-vie-primary h-3 rounded-full" style={{ width: '84.5%' }}></div>
          </div>
          <div className="text-xs text-center text-gray-500 mb-5">
            {data.user.xp.toLocaleString()} / {data.user.nextLevelXp.toLocaleString()} XP
          </div>

          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent XP</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Faucet</div>
              <div className="text-sm font-bold text-vie-success">+5 XP</div>
            </div>
            <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">PTC</div>
              <div className="text-sm font-bold text-vie-success">+2 XP</div>
            </div>
            <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Challenge</div>
              <div className="text-sm font-bold text-vie-success">+20 XP</div>
            </div>
            <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Offerwall</div>
              <div className="text-sm font-bold text-vie-success">+50 XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. REFERRAL SUMMARY + CHALLENGE PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ReferralSummary data={data.user} />
        </div>
        <div className="lg:col-span-1">
          <ChallengeProgress />
        </div>
      </div>

      {/* 8. RECENT TRANSACTIONS + RECENT ACTIVITY + LEADERBOARD PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={data.transactions} />
        </div>
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
          <ActivityTimeline timeline={data.timeline} />
          <LeaderboardPreview leaderboard={data.leaderboard} />
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
