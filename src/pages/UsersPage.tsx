import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { UserList, UserForm, type UserFormData } from '../components/users';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { apiService, type CreateUserRequest, type UpdateUserRequest, type User } from '../services/api';
import { useToast } from '../hooks/useToast';

export const UsersPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserFormData> & { id?: string } | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();

  const handleCreateUser = async (data: UserFormData) => {
    try {
      // Transform form data to match backend API format
      const userData: CreateUserRequest = {
        email: data.email,
        password: data.password || '',
        role: data.role,
        isEmployee: data.isEmployee,
        userDetails: data.userDetails
      };

      const response = await apiService.createUser(userData);
      
      if (response.success) {
        addToast({
          type: 'success',
          title: 'User Created',
          message: 'User has been created successfully'
        });
        // Refresh the user list
        window.location.reload();
      } else {
        console.error('Error creating user:', response.message);
        // Throw error to prevent modal from closing
        throw new Error(response.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Re-throw error to prevent modal from closing
      throw error;
    }
  };

  const handleEditUser = (user: User) => {
    // Transform user data to form format
    const formData: Partial<UserFormData> & { id: string } = {
      id: user.id,
      email: user.email,
      role: user.role as 'user' | 'ADMIN',
      isEmployee: user.isEmployee || false,
      subscriptionId: user.subscriptionId,
      userDetails: {
        name: user.UserDetails?.name || '',
        phoneNumber: user.UserDetails?.phoneNumber || '',
        address: user.UserDetails?.address || ''
      }
    };
    
    setEditingUser(formData);
    setIsFormOpen(true);
  };

  const handleUpdateUser = async (data: UserFormData) => {
    try {
      if (!editingUser?.id) {
        console.error('User ID is required for update');
        throw new Error('User ID is required for update');
      }

      // Transform form data to match backend API format
      const userData: UpdateUserRequest = {
        email: data.email,
        role: data.role,
        isEmployee: data.isEmployee,
        subscriptionId: data.subscriptionId,
        userDetails: data.userDetails
      };

      const response = await apiService.updateUser(editingUser.id, userData);
      
      if (response.success) {
        addToast({
          type: 'success',
          title: 'User Updated',
          message: 'User has been updated successfully'
        });
        // Refresh the user list
        window.location.reload();
      } else {
        console.error('Error updating user:', response.message);
        // Throw error to prevent modal from closing
        throw new Error(response.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // Re-throw error to prevent modal from closing
      throw error;
    }
  };

  const handleDeleteUser = (id: string, name: string) => {
    setUserToDelete({ id, name });
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return false;

    setIsDeleting(true);
    try {
      const response = await apiService.deleteUser(userToDelete.id);
      
      if (response.success) {
        addToast({
          type: 'success',
          title: 'User Deleted',
          message: 'User has been deleted successfully'
        });
        // Refresh the user list
        window.location.reload();
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
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(undefined);
  };

  const handleExportUsers = () => {
    // This would be implemented in the future
    addToast({
      type: 'info',
      title: 'Coming Soon',
      message: 'Export functionality will be available soon'
    });
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <PageHeader
          title="User Management"
          subtitle="Manage users, track their activities, and monitor subscription statuses across your platform."
          actions={
            <div className="flex space-x-3">
              <button
                onClick={handleExportUsers}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <UserGroupIcon className="h-4 w-4 mr-2" />
                Export Users
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add New User
              </button>
            </div>
          }
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <UserList
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>
      </div>
      
      <UserForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        initialData={editingUser}
        mode={editingUser ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone and will permanently remove the user from the system.`}
        confirmText="Delete User"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};