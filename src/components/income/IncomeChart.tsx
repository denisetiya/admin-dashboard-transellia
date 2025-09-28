import { useState } from 'react';
import { mockIncome } from '../../data/mockData';
import { 
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface IncomeChartProps {
  bare?: boolean;
}

export const IncomeChart = ({ bare = false }: IncomeChartProps) => {
  const [timeRange, setTimeRange] = useState('monthly');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('id-ID', {
//       month: 'short',
//       day: 'numeric',
//     });
//   };

  // Group income data by month for the chart
  const getChartData = () => {
    const monthlyData: Record<string, number> = {};
    
    mockIncome.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      
      monthlyData[monthKey] += item.amount;
    });
    
    return Object.entries(monthlyData).map(([key, value]) => {
      const [year, month] = key.split('-');
      const date = new Date(parseInt(year), parseInt(month), 1);
      return {
        date: date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
        amount: value,
      };
    });
  };

  const chartData = getChartData();
  // Compute a “nice” max for better proportional bars (1/2/5 steps)
  const rawMax = Math.max(...chartData.map((d) => d.amount), 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)));
  const steps = [1, 2, 5, 10];
  const niceMax = steps.map((s) => s * magnitude).find((v) => v >= rawMax) ?? rawMax;

  const content = (
    <>
      <div className="h-80 relative">
        {/* Chart Container with gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/30 to-transparent rounded-xl"></div>
        
        <div className="relative flex items-end h-64 mt-6 pb-3 px-4">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-gray-300 w-full"></div>
            ))}
          </div>
          
          {/* Chart bars */}
          {chartData.map((item, index) => {
            const height = Math.max((item.amount / niceMax) * 90, 8);
            return (
              <div key={index} className="flex flex-col items-center flex-1 px-2 h-full justify-end group">
                <div className="relative w-full flex justify-center">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap z-10">
                    <div className="text-center">
                      <div className="font-semibold">{formatAmount(item.amount)}</div>
                      <div className="text-gray-300">{item.date}</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/90"></div>
                  </div>
                  
                  {/* Bar with gradient */}
                  <div
                    className="w-8 bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-3 truncate w-full text-center font-medium">{item.date}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-green-600 uppercase tracking-wide">Total Income</div>
              <div className="text-lg font-bold text-green-900">
                {formatAmount(chartData.reduce((sum, item) => sum + item.amount, 0))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">Average</div>
              <div className="text-lg font-bold text-blue-900">
                {formatAmount(chartData.reduce((sum, item) => sum + item.amount, 0) / chartData.length)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-purple-600 uppercase tracking-wide">Peak Month</div>
              <div className="text-lg font-bold text-purple-900">
                {formatAmount(Math.max(...chartData.map(d => d.amount)))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (bare) return content;

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl ring-1 ring-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
            <ChartBarIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Income Analytics</h2>
            <p className="text-sm text-gray-500">Monthly revenue breakdown</p>
          </div>
        </div>
        <div className="mt-3 flex md:mt-0">
          <select
            className="focus:ring-indigo-500/50 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300/50 rounded-xl pl-3 pr-8 py-2.5 bg-white/50 backdrop-blur-sm transition-all duration-200"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      {content}
    </div>
  );
};
