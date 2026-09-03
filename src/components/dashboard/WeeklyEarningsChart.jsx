import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg">
        <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-sm text-vie-primary font-bold">
          {payload[0].value.toLocaleString()} Tokens
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyEarningsChart = ({ data }) => {
  const [period, setPeriod] = useState('7 Days');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-semibold text-vie-text">Weekly Earnings</h2>
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-vie-primary focus:border-vie-primary block p-2 outline-none"
        >
          <option>7 Days</option>
          <option>30 Days</option>
          <option>90 Days</option>
        </select>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#234398" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#234398" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stroke="#234398" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEarnings)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#234398' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyEarningsChart;
