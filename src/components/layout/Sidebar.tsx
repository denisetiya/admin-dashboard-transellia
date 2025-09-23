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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-r from-indigo-800 to-indigo-700 text-white transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 lg:h-full flex flex-col`}
      >
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-bold tracking-tight text-white">Transellia Admin</h1>
        </div>
        <nav className="mt-4 flex-1 px-2 overflow-y-auto ">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-indigo-800/80 text-white border-l-4 border-white/70 shadow-sm'
                      : 'text-indigo-100 hover:bg-indigo-600/70 hover:text-white hover:shadow-md border-l-4 border-transparent'
                  } group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-indigo-200 group-hover:text-white'}`} aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};
