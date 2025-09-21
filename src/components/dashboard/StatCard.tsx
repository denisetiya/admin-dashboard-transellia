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
  const palette: Record<NonNullable<StatCardProps['variant']>, { ring: string; tint: string; icon: string; bar: string }> = {
    indigo: {
      ring: 'ring-indigo-100',
      tint: 'bg-indigo-50',
      icon: 'text-indigo-600',
      bar: 'from-indigo-500/90 to-purple-500/90',
    },
    emerald: {
      ring: 'ring-emerald-100',
      tint: 'bg-emerald-50',
      icon: 'text-emerald-600',
      bar: 'from-emerald-500/90 to-teal-500/90',
    },
    amber: {
      ring: 'ring-amber-100',
      tint: 'bg-amber-50',
      icon: 'text-amber-600',
      bar: 'from-amber-500/90 to-orange-500/90',
    },
    violet: {
      ring: 'ring-violet-100',
      tint: 'bg-violet-50',
      icon: 'text-violet-600',
      bar: 'from-violet-500/90 to-fuchsia-500/90',
    },
  };
  const theme = palette[variant];
  
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ${theme.ring} transition transform hover:shadow-md hover:-translate-y-0.5`}>
      <div className="absolute inset-x-0 top-0 h-1">
        <div className={`h-full w-full bg-gradient-to-r ${theme.bar}`} />
      </div>
      <div className="p-5">
        <div className="flex items-start">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${theme.tint}`}>
            <Icon className={`h-6 w-6 ${theme.icon}`} aria-hidden="true" />
          </div>
          <div className="ml-4 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="mt-1 flex items-baseline">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-3">
          <div className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500" aria-hidden="true" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500" aria-hidden="true" />
            )}
            <span className={`ml-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};
