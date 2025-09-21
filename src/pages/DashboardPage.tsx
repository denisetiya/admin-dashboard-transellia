import { StatCard } from '../components/dashboard/StatCard';
import { PageHeader } from '../components/layout/PageHeader';
import { IncomeChart } from '../components/income/IncomeChart';
import { 
  UserGroupIcon, 
 CreditCardIcon, 
  CurrencyDollarIcon, 
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';

export const DashboardPage = () => {
  // Mock data for statistics
  const stats = [
    {
      title: 'Total Users',
      value: '12,361',
      change: 12.5,
      icon: UserGroupIcon,
      variant: 'indigo' as const,
    },
    {
      title: 'Active Subscriptions',
      value: '1,294',
      change: 8.2,
      icon: CreditCardIcon,
      variant: 'emerald' as const,
    },
    {
      title: 'Monthly Revenue',
      value: 'Rp 124.5M',
      change: 18.3,
      icon: CurrencyDollarIcon,
      variant: 'amber' as const,
    },
    {
      title: 'Total Stores',
      value: '842',
      change: 5.7,
      icon: ShoppingBagIcon,
      variant: 'violet' as const,
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <PageHeader
          title="Dashboard"
          subtitle="Ringkasan performa terbaru, pendapatan, dan aktivitas sistem."
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-2">
          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                variant={stat.variant}
              />
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Income Chart */}
            <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Income Overview</h2>
                <span className="text-xs text-gray-500">Last 12 months</span>
              </div>
              <IncomeChart bare />
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <span className="text-xs text-gray-500">System feed</span>
              </div>
              <div className="rounded-lg h-80 flex items-center justify-center border border-dashed border-gray-300 bg-gray-50">
                <p className="text-gray-500">Recent activity will go here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
