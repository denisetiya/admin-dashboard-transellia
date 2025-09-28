import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CreditCardIcon, 
  UserGroupIcon, 
 CurrencyDollarIcon, 
  ShoppingBagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
  { name: 'Users', href: '/users', icon: UserGroupIcon },
  { name: 'Payments', href: '/payments', icon: CurrencyDollarIcon },
  { name: 'Income', href: '/income', icon: ChartBarIcon },
  { name: 'Stores', href: '/stores', icon: ShoppingBagIcon },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" />
        </div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-16 lg:w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200/60 transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 lg:h-screen flex flex-col shadow-lg`}
      >
        {/* Logo Section */}
        <div className="relative flex items-center justify-center  lg:justify-start h-16 px-4 border-b border-gray-200/60 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">T</span>
          </div>
          <span className="hidden lg:block ml-3 text-lg font-bold text-gray-900 tracking-tight mt-3">
            Transellia
            <p className='text-xs font-normal text-gray-400'>
              Admin Management
            </p>
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-2 lg:px-4 overflow-y-auto min-h-0">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 relative`}
                  onClick={() => setSidebarOpen(false)}
                  title={item.name}
                >
                  <item.icon 
                    className={`${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                    } h-5 w-5 flex-shrink-0 transition-colors duration-200`} 
                    aria-hidden="true" 
                  />
                  <span className="hidden lg:block ml-3 truncate">{item.name}</span>
                  
                  {/* Active indicator dot for mobile */}
                  {isActive && (
                    <div className="lg:hidden absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
          
        {/* Bottom User Section - Only on desktop */}
        <div className="hidden lg:block relative p-4 border-t border-gray-200/60 flex-shrink-0">
          <div className="flex items-center p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">Online</p>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
