import { StatCard } from '../components/dashboard/StatCard';
import { PageHeader } from '../components/layout/PageHeader';
import { IncomeChart } from '../components/income/IncomeChart';
import { Button } from '../components/ui/Button';
import { 
  UserGroupIcon, 
 CreditCardIcon, 
  CurrencyDollarIcon, 
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  Cog6ToothIcon
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
          actions={
            <div className="flex space-x-3">
              <Button 
                variant="secondary" 
                size="md"
                leftIcon={<EyeIcon className="w-4 h-4" />}
              >
                View Reports
              </Button>
              <Button 
                variant="primary"
                leftIcon={<ArrowTrendingUpIcon className="w-4 h-4" />}
              >
                Analytics
              </Button>
              <Button 
                variant="ghost"
                size="md"
                leftIcon={<Cog6ToothIcon className="w-4 h-4" />}
              >
                Settings
              </Button>
            </div>
          }
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
            <div className="group rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-gray-100/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Income Overview</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500 font-medium">Live Data</span>
                </div>
              </div>
              <IncomeChart bare />
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-green-700">Revenue Target</span>
                  </div>
                  <span className="text-sm font-bold text-green-800">84% achieved</span>
                </div>
                <div className="mt-2 bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{width: '84%'}}></div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="group rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-gray-100/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition-colors duration-200">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { type: 'user', action: 'New user registered', time: '2 min ago', color: 'bg-green-500' },
                  { type: 'payment', action: 'Payment received', time: '5 min ago', color: 'bg-blue-500' },
                  { type: 'subscription', action: 'Subscription upgraded', time: '12 min ago', color: 'bg-purple-500' },
                  { type: 'store', action: 'New store approved', time: '18 min ago', color: 'bg-indigo-500' },
                  { type: 'system', action: 'System backup completed', time: '1 hour ago', color: 'bg-gray-500' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50/50 transition-colors duration-200">
                    <div className={`h-3 w-3 ${activity.color} rounded-full shadow-sm`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
