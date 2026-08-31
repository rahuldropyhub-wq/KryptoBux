import React, { useState } from 'react';
import { 
  FileText, Download, TrendingUp, DollarSign, Users, 
  Wallet, Award, Calendar, BarChart2, CheckCircle
} from 'lucide-react';
import AdminStatCard from '@/components/admin/AdminStatCard';
import ChartCard from '@/components/admin/ChartCard';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { formatNumber } from '@/utils/formatters';

const financialChartData = [
  { label: 'Jan', value: 8200 },
  { label: 'Feb', value: 9400 },
  { label: 'Mar', value: 11200 },
  { label: 'Apr', value: 12800 },
  { label: 'May', value: 13500 },
  { label: 'Jun', value: 14820 },
];

const AdminReportsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('June 2026');

  const handleDownloadPDF = () => {
    alert(`Generating official ${selectedMonth} Financial Audit Report (PDF)...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Financial & Operational Reports</h1>
          <p className="page-subtitle">Export revenue performance, user acquisition metrics, and task payout breakdowns</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<Download size={14} />}
            onClick={handleDownloadPDF}
          >
            Export Monthly Report (PDF)
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminStatCard
          label="Gross Ad Revenue"
          value="$14,820.00"
          trend="up"
          trendValue="+18.4% vs last month"
          icon={DollarSign}
          accentIndex={0}
        />
        <AdminStatCard
          label="User Payout Expense"
          value="$4,200.00"
          sub="Crypto & FaucetPay"
          icon={Wallet}
          accentIndex={1}
        />
        <AdminStatCard
          label="Net Platform Profit"
          value="$10,620.00"
          trend="up"
          trendValue="71.6% Profit Margin"
          icon={TrendingUp}
          accentIndex={2}
        />
        <AdminStatCard
          label="New User Signups"
          value="3,420"
          trend="up"
          trendValue="+12% growth"
          icon={Users}
          accentIndex={3}
        />
      </div>

      {/* Financial Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Monthly Revenue Growth (USD)"
            subtitle="Platform gross earnings trajectory"
            data={financialChartData}
            height={240}
            labels={[
              { label: 'Monthly Gross ($)', color: '#234398' }
            ]}
          />
        </div>

        {/* Task Revenue Share */}
        <Card title="Task Revenue Breakdown" subtitle="By earning activity">
          <div className="space-y-4 pt-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>PTC Sponsored Ads</span>
                <span className="text-[var(--primary)] font-bold">45% ($6,669)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Banner & Native Ads</span>
                <span className="text-purple-600 font-bold">30% ($4,446)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Shortlinks Network CPC</span>
                <span className="text-emerald-600 font-bold">15% ($2,223)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Popunder & Direct Sponsors</span>
                <span className="text-amber-600 font-bold">10% ($1,482)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminReportsPage;
