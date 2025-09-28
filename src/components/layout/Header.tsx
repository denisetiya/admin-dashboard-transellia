import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <div className="flex h-16 flex-shrink-0 bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <button
        type="button"
        className="border-r border-gray-200/50 px-4 text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden transition-all duration-200"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-between px-6">
        <div className="flex flex-1 items-center">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            <span className="text-sm font-medium text-gray-600">System Online</span>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3" ref={menuRef}>
            <div>
              <button
                type="button"
                className="flex max-w-xs items-center rounded-xl px-3 py-1.5 text-sm transition-all duration-200 h-10"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className='flex justify-center items-center'>
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                  <svg className={`ml-2 h-3 w-3 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white/90 backdrop-blur-xl py-2 shadow-2xl ring-1 ring-black/5 focus:outline-none transition-all duration-200 scale-100 opacity-100 border border-gray-200/50">
                <div className="px-4 py-3 border-b border-gray-100/50">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full mr-1.5"></div>
                    Active
                  </div>
                </div>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors duration-200">
                    <svg className="inline-block w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors duration-200">
                    <svg className="inline-block w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </a>
                </div>
                <div className="border-t border-gray-100/50 pt-1">
                  <button
                    onClick={handleLogout}
                    className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 hover:text-red-700 transition-colors duration-200 font-medium"
                  >
                    <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
