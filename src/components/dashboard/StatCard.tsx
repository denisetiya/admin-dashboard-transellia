import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: 'indigo' | 'emerald' | 'amber' | 'violet';
}

export const StatCard = ({ title, value, change, icon: Icon, variant = 'indigo' }: StatCardProps) => {
  const isPositive = change >= 0;
  const palette: Record<NonNullable<StatCardProps['variant']>, { ring: string; tint: string; icon: string; bar: string; glow: string }> = {
    indigo: {
      ring: 'ring-indigo-100/50',
      tint: 'bg-gradient-to-br from-indigo-50 to-indigo-100/50',
      icon: 'text-indigo-600',
      bar: 'from-indigo-500 via-indigo-600 to-purple-600',
      glow: 'shadow-indigo-500/20',
    },
    emerald: {
      ring: 'ring-emerald-100/50',
      tint: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      icon: 'text-emerald-600',
      bar: 'from-emerald-500 via-emerald-600 to-teal-600',
      glow: 'shadow-emerald-500/20',
    },
    amber: {
      ring: 'ring-amber-100/50',
      tint: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      icon: 'text-amber-600',
      bar: 'from-amber-500 via-amber-600 to-orange-600',
      glow: 'shadow-amber-500/20',
    },
    violet: {
      ring: 'ring-violet-100/50',
      tint: 'bg-gradient-to-br from-violet-50 to-violet-100/50',
      icon: 'text-violet-600',
      bar: 'from-violet-500 via-violet-600 to-fuchsia-600',
      glow: 'shadow-violet-500/20',
    },
  };
  const theme = palette[variant];
  
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg ring-1 ${theme.ring} ${theme.glow} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-gray-50/50 transition-opacity duration-300 group-hover:opacity-75"></div>
      
      {/* Top gradient bar with animation */}
      <div className="absolute inset-x-0 top-0 h-1.5">
        <div className={`h-full w-full bg-gradient-to-r ${theme.bar} transition-all duration-500 group-hover:h-2`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-white/30 to-white/5 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.tint} shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110`}>
            <Icon className={`h-6 w-6 ${theme.icon} transition-transform duration-300 group-hover:scale-110`} aria-hidden="true" />
          </div>
          <div className="flex-1 ml-4">
            <dl>
              <dt className="text-sm font-semibold text-gray-500 truncate mb-1">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-3xl font-bold text-gray-900 tracking-tight group-hover:text-gray-800 transition-colors duration-300">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className={`inline-flex items-center rounded-full ${isPositive ? 'bg-green-50' : 'bg-red-50'} px-3 py-1.5 text-sm font-semibold shadow-sm`}>
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" aria-hidden="true" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" aria-hidden="true" />
            )}
            <span className={`${isPositive ? 'text-green-700' : 'text-red-700'}`}>
              {Math.abs(change)}%
            </span>
          </div>
          <span className="text-xs text-gray-400 font-medium">vs last month</span>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${theme.bar} transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
