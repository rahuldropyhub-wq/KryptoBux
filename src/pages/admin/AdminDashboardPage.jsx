import React from 'react';
import { 
  Users, Wallet, Download, Monitor, Droplets, TrendingUp, 
  ShieldCheck, AlertCircle, ArrowUpRight, CheckCircle2, Clock, DollarSign
} from 'lucide-react';
import AdminStatCard from '@/components/admin/AdminStatCard';
import ChartCard from '@/components/admin/ChartCard';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { StatusBadge } from '@/components/common/Badge';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const revenueChartData = [
  { label: 'Mon', value: 420 },
  { label: 'Tue', value: 680 },
  { label: 'Wed', value: 590 },
  { label: 'Thu', value: 890 },
  { label: 'Fri', value: 1120 },
  { label: 'Sat', value: 1450 },
  { label: 'Sun', value: 1320 },
];

const pendingWithdrawalsQueue = [
  { id: 'WD-8914', user: 'crypto_tycoon', amount: '$45.00', currency: 'LTC', time: '10 min ago', status: 'pending' },
  { id: 'WD-8913', user: 'satoshix99', amount: '$20.00', currency: 'USDT', time: '25 min ago', status: 'pending' },
  { id: 'WD-8912', user: 'moon_walker', amount: '$15.00', currency: 'TRX', time: '1 hr ago', status: 'pending' },
];

const recentRegistrations = [
  { id: 1, name: 'David Vance', username: 'vance_crypto', email: 'd.vance@mail.com', ip: '194.26.11.4', time: '5 min ago', status: 'active' },
  { id: 2, name: 'Elena Rostova', username: 'elena_r', email: 'elena.r@mail.ru', ip: '82.102.33.19', time: '18 min ago', status: 'active' },
  { id: 3, name: 'Kweku Mensah', username: 'kmensah', email: 'kmensah@gmail.com', ip: '102.14.88.2', time: '35 min ago', status: 'active' },
];

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Admin Console Overview</h1>
          <p className="page-subtitle">Real-time platform metrics, revenue tracking, pending approvals, and user activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={ROUTES.ADMIN_WITHDRAWALS}>
            <Button variant="primary" size="sm" leftIcon={<Download size={14} />}>
              Process Pending Payouts (3)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Registered Users"
          value={28450}
          trend="up"
          trendValue="+14% this month"
          icon={Users}
          accentIndex={0}
        />
        <AdminStatCard
          label="Gross Platform Revenue"
          value="$14,820"
          trend="up"
          trendValue="+22% this week"
          icon={DollarSign}
          accentIndex={1}
        />
        <AdminStatCard
          label="Total Coins Paid Out"
          value="4.2M Coins"
          trend="up"
          trendValue="99.4% success"
          icon={Wallet}
          accentIndex={2}
        />
        <AdminStatCard
          label="Pending Cashouts"
          value="$80.00"
          sub="3 Requests awaiting approval"
          icon={Download}
          accentIndex={3}
        />
      </div>

      {/* Charts & Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Weekly Revenue vs User Payouts ($ USD)"
            subtitle="7-Day financial performance overview"
            data={revenueChartData}
            height={230}
            labels={[
              { label: 'Ad & Sponsor Revenue ($)', color: '#234398' },
              { label: 'User Payout Claims ($)', color: '#16a34a' },
            ]}
          />
        </div>

        {/* System Health & Security Feed */}
        <div className="space-y-4">
          <Card title="System Services Health" subtitle="Automated gateway status">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 text-green-800 border border-green-100">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-green-600" /> FaucetPay API Gateway
                </span>
                <span className="font-bold">Online (12ms)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 text-green-800 border border-green-100">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-green-600" /> CoinGecko Rates Feed
                </span>
                <span className="font-bold">Synced</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 text-green-800 border border-green-100">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-green-600" /> Anti-Fraud Multi-IP Guard
                </span>
                <span className="font-bold">Enforcing</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-100">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-blue-600" /> Telegram Webhook Bot
                </span>
                <span className="font-bold">Connected</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Moderation Queues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Withdrawals */}
        <Card 
          title="Withdrawals Approval Queue" 
          subtitle="Pending user cash-outs requiring review"
          action={
            <Link to={ROUTES.ADMIN_WITHDRAWALS}>
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />}>
                Go to Queue
              </Button>
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawalsQueue.map((wd) => (
                  <tr key={wd.id}>
                    <td className="font-mono text-xs font-semibold">{wd.id}</td>
                    <td className="font-semibold text-sm">@{wd.user}</td>
                    <td className="font-bold font-mono text-sm text-[var(--text-primary)]">{wd.amount}</td>
                    <td>
                      <span className="badge badge-primary font-bold text-xs">{wd.currency}</span>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)]">{wd.time}</td>
                    <td>
                      <StatusBadge status={wd.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Registrations */}
        <Card 
          title="Recent User Registrations" 
          subtitle="New accounts signed up in the last hour"
          action={
            <Link to={ROUTES.ADMIN_USERS}>
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />}>
                All Users
              </Button>
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>IP Address</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--deep)] text-white flex items-center justify-center font-bold text-[10px]">
                          {u.username[0].toUpperCase()}
                        </div>
                        <span className="font-semibold text-sm text-[var(--text-primary)]">@{u.username}</span>
                      </div>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)]">{u.email}</td>
                    <td className="font-mono text-xs">{u.ip}</td>
                    <td className="text-xs text-[var(--text-secondary)]">{u.time}</td>
                    <td>
                      <StatusBadge status={u.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
