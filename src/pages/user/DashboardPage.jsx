import { Monitor, Link2, Droplets, Star, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/user/StatCard';
import ActivityFeed from '@/components/user/ActivityFeed';
import TransactionTable from '@/components/user/TransactionTable';
import Card from '@/components/common/Card';
import ChartCard from '@/components/admin/ChartCard';
import { ROUTES } from '@/utils/constants';

const quickActions = [
  { label: 'PTC Ads', icon: Monitor, href: ROUTES.PTC, color: 'text-blue-600 bg-blue-50' },
  { label: 'Shortlinks', icon: Link2, href: ROUTES.SHORTLINKS, color: 'text-purple-600 bg-purple-50' },
  { label: 'Faucet', icon: Droplets, href: ROUTES.FAUCET, color: 'text-cyan-600 bg-cyan-50' },
  { label: 'Daily Bonus', icon: Star, href: ROUTES.DAILY_BONUS, color: 'text-yellow-600 bg-yellow-50' },
  { label: 'Withdraw', icon: Download, href: ROUTES.WITHDRAW, color: 'text-green-600 bg-green-50' },
];

const chartData = [
  { label: 'Mon', value: 120 },
  { label: 'Tue', value: 280 },
  { label: 'Wed', value: 200 },
  { label: 'Thu', value: 380 },
  { label: 'Fri', value: 310 },
  { label: 'Sat', value: 490 },
  { label: 'Sun', value: 420 },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="section-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Krypto Bux • User Panel</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Balance" value={2450} sub="Coins" accentIndex={0} />
        <StatCard label="Earning Bonus" value="+15%" sub="Active" accentIndex={1} />
        <StatCard label="Total Earned" value={12750} sub="Coins" accentIndex={2} />
        <StatCard label="Total Referrals" value={125} sub="Users" accentIndex={3} />
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--background)] transition-all group"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon size={18} />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)] text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </Card>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <ChartCard
            title="Earnings Overview"
            subtitle="Last 7 days"
            data={chartData}
            height={220}
            labels={[
              { label: 'Faucet', color: '#234398' },
              { label: 'PTC', color: '#25275E' },
              { label: 'Daily Bonus', color: '#E2DCED' },
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>

      {/* Recent Transactions */}
      <Card title="Recent Transactions" subtitle="Your latest activity">
        <TransactionTable />
      </Card>
    </div>
  );
};

export default DashboardPage;
