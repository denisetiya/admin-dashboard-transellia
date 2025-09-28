import { useMemo, useState } from 'react';
import { mockUsers } from '../../data/mockData';
import { UserCircleIcon, MagnifyingGlassIcon, FunnelIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export const UserList = () => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const formatRegistrationDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl ring-1 ring-gray-200/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-6 bg-gradient-to-r from-white via-white to-gray-50/50 border-b border-gray-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <UserCircleIcon className="h-6 w-6 mr-2 text-indigo-600" />
              Users Overview
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Total {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm placeholder-gray-400 transition-all duration-200"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-2.5 border border-gray-300/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm appearance-none transition-all duration-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/30 border-b border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: users.length, color: 'text-blue-600' },
            { label: 'Active', value: users.filter(u => u.status === 'active').length, color: 'text-green-600' },
            { label: 'Inactive', value: users.filter(u => u.status === 'inactive').length, color: 'text-gray-600' },
            { label: 'With Subscription', value: users.filter(u => u.subscription).length, color: 'text-purple-600' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Joined</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Subscription</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Stores</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      {user.avatar ? (
                        <img className="h-12 w-12 rounded-xl object-cover shadow-sm ring-2 ring-white group-hover:ring-indigo-100 transition-all duration-200" src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Administrator
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            User
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{user.email}</div>
                  <div className="text-sm text-gray-500">Member #{user.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      user.status === 'active'
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-1 ring-green-200'
                        : user.status === 'inactive'
                        ? 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 ring-1 ring-gray-200'
                        : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 ring-1 ring-red-200'
                    }`}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full mr-2 ${
                      user.status === 'active' ? 'bg-green-500' : user.status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'
                    }`}></div>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{formatRegistrationDate(user.registrationDate)}</div>
                  <div className="text-xs text-gray-500">
                    {Math.floor((new Date().getTime() - new Date(user.registrationDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.subscription ? (
                    <div className="flex flex-col">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 ring-1 ring-blue-200 shadow-sm">
                        {user.subscription.name}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Active plan</span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      No subscription
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-bold text-gray-900">
                      {Array.isArray(user.stores) ? user.stores.length : user.stores}
                    </div>
                    <div className="text-sm text-gray-500 ml-1">
                      store{Array.isArray(user.stores) && user.stores.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
                      Edit
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <EllipsisHorizontalIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            We couldn't find any users matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
