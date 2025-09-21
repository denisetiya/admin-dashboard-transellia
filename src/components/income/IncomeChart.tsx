import { useState } from 'react';
import { mockIncome } from '../../data/mockData';
import { 
  ChartBarIcon,
  ArrowsUpDownIcon
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
      <div className="h-72">
        <div className="flex items-end h-56 mt-6 border-b border-l border-gray-200 pb-3 pl-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 px-1.5 h-full justify-end">
              <div
                className="w-2/3 md:w-3/4 bg-indigo-600 rounded-t hover:bg-indigo-700 transition-colors duration-200 mx-auto"
                style={{ height: `${Math.max((item.amount / niceMax) * 92, 6)}%` }}
                title={`${item.date} • ${formatAmount(item.amount)}`}
              />
              <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">{item.date}</div>
              <div className="text-xs font-medium text-gray-900 mt-1 truncate w-full text-center">
                {formatAmount(item.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between py-3 border-t border-gray-200">
          <div className="flex items-center">
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-900">Total Income</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {formatAmount(chartData.reduce((sum, item) => sum + item.amount, 0))}
          </div>
        </div>
      </div>
    </>
  );

  if (bare) return content;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <ChartBarIcon className="h-6 w-6 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Income Overview</h2>
        </div>
        <div className="mt-3 flex md:mt-0">
          <select
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-3 pr-10 py-2"
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
