import { useState, useEffect } from 'react';
import { UserCircleIcon, MagnifyingGlassIcon, FunnelIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { apiService, type User } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import { UserForm } from './UserForm';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface UserListProps {
  onEdit?: (user: User) => void;
  onDelete?: (id: string, name: string) => void;
}

export const UserList = ({ onEdit, onDelete }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  
  // Form and dialog states
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const { addToast } = useToast();

  // Fetch users from API
  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await apiService.getUsers(page, 10);
      
      if (response.success && response.data) {
        setUsers(response.data.users);
        setTotalPages(response.data.meta.totalPages);
        setTotalUsers(response.data.meta.total);
        setCurrentPage(page);
      } else {
        addToast({
          type: 'error',
          title: 'Error',
          message: response.message || 'Failed to fetch users'
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      addToast({
        type: 'error',
        title: 'Error',
        message: 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter users based on search term and status
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = users.filter((user) => {
      const matchesSearch =
        (user.UserDetails?.name || '').toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      // For now, we'll consider all users as "active" since the API doesn't provide a status field
      const matchesStatus = statusFilter === 'all' || statusFilter === 'active';
      return matchesSearch && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter]);

  const formatRegistrationDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const handleEditUser = (user: User) => {
    if (onEdit) {
      onEdit(user);
    } else {
      setSelectedUser(user);
      setIsUserFormOpen(true);
    }
  };

  const handleDeleteUser = (user: User) => {
    if (onDelete) {
      onDelete(user.id, user.UserDetails?.name || user.email);
    } else {
      setUserToDelete(user);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return false;
    
    try {
      const response = await apiService.deleteUser(userToDelete.id);
      
      if (response.success) {
        addToast({
          type: 'success',
          title: 'User Deleted',
          message: 'User has been deleted successfully'
        });
        fetchUsers(currentPage);
        return true;
      } else {
        addToast({
          type: 'error',
          title: 'Error',
          message: response.message || 'Failed to delete user'
        });
        return false;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      addToast({
        type: 'error',
        title: 'Error',
        message: 'An unexpected error occurred'
      });
      return false;
    }
  };


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchUsers(page);
    }
  };

  return (
    <>
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
                Total {filteredUsers.length} of {totalUsers} {totalUsers === 1 ? 'user' : 'users'} found
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
              { label: 'Total Users', value: totalUsers, color: 'text-blue-600' },
              { label: 'Active', value: totalUsers, color: 'text-green-600' },
              { label: 'Inactive', value: 0, color: 'text-gray-600' },
              { label: 'With Subscription', value: users.filter(u => u.subscriptionId).length, color: 'text-purple-600' },
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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Joined</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Subscription</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {user.UserDetails?.imageProfile ? (
                            <img className="h-12 w-12 rounded-xl object-cover shadow-sm ring-2 ring-white group-hover:ring-indigo-100 transition-all duration-200" src={user.UserDetails.imageProfile} alt={user.UserDetails.name || 'User'} />
                          ) : (
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                              {(user.UserDetails?.name || 'User').split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{user.UserDetails?.name || 'No Name'}</div>
                          <div className="text-sm text-gray-500">
                            {user.role === 'ADMIN' ? (
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
                      <div className="text-sm text-gray-500">ID: {user.id.substring(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-1 ring-green-200">
                        <div className="h-1.5 w-1.5 rounded-full mr-2 bg-green-500"></div>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{formatRegistrationDate(user.createdAt)}</div>
                      <div className="text-xs text-gray-500">
                        {Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        user.isEmployee 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-1 ring-green-200'
                          : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 ring-1 ring-gray-200'
                      }`}>
                        {user.isEmployee ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 flex items-center"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 flex items-center"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && !loading && (
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

      {/* User Form Modal */}
      <UserForm
        isOpen={isUserFormOpen}
        onClose={() => {
          setIsUserFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={async (data) => {
          try {
            if (selectedUser) {
              // Update existing user
              const updateData = {
                email: data.email,
                role: data.role,
                isEmployee: data.isEmployee,
                subscriptionId: data.subscriptionId || null,
                userDetails: data.userDetails
              };
              
              const response = await apiService.updateUser(selectedUser.id, updateData);
              
              if (response.success) {
                addToast({
                  type: 'success',
                  title: 'User Updated',
                  message: 'User has been updated successfully'
                });
                fetchUsers(currentPage);
                setSelectedUser(null);
                setIsUserFormOpen(false);
              } else {
                addToast({
                  type: 'error',
                  title: 'Error',
                  message: response.message || 'Failed to update user'
                });
              }
            } else {
              // Create new user
              const createData = {
                email: data.email,
                password: data.password || '',
                role: data.role,
                isEmployee: data.isEmployee,
                userDetails: data.userDetails.name ? data.userDetails : undefined
              };
              
              const response = await apiService.createUser(createData);
              
              if (response.success) {
                addToast({
                  type: 'success',
                  title: 'User Created',
                  message: 'User has been created successfully'
                });
                fetchUsers(currentPage);
                setIsUserFormOpen(false);
              } else {
                addToast({
                  type: 'error',
                  title: 'Error',
                  message: response.message || 'Failed to create user'
                });
              }
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            addToast({
              type: 'error',
              title: 'Error',
              message: 'An unexpected error occurred'
            });
          }
        }}
        initialData={selectedUser ? {
          email: selectedUser.email,
          role: selectedUser.role as 'user' | 'ADMIN',
          isEmployee: selectedUser.isEmployee || false,
          subscriptionId: selectedUser.subscriptionId,
          userDetails: {
            name: selectedUser.UserDetails?.name || '',
            phoneNumber: selectedUser.UserDetails?.phoneNumber || '',
            address: selectedUser.UserDetails?.address || ''
          }
        } : undefined}
        mode={selectedUser ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.UserDetails?.name || userToDelete?.email}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  );
};
