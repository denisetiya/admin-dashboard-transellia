import { useState, useEffect } from 'react';
import { XMarkIcon, UserCircleIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  mode?: 'create' | 'edit';
}

export interface UserFormData {
  email: string;
  password?: string;
  role: 'user' | 'ADMIN';
  isEmployee: boolean;
  subscriptionId?: string | null;
  userDetails: {
    name: string;
    phoneNumber?: string;
    address?: string;
  };
}

const defaultFormData: UserFormData = {
  email: '',
  password: '',
  role: 'user',
  isEmployee: false,
  subscriptionId: null,
  userDetails: {
    name: '',
    phoneNumber: '',
    address: ''
  }
};

export const UserForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = 'create'
}: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>(() => ({
    ...defaultFormData,
    ...initialData
  }));
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (mode === 'create' && !formData.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (mode === 'create' && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.userDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Only close modal on successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Don't close modal on error - let user try again
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === 'checkbox' ? target.checked : false;
    
    if (name.includes('userDetails.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        userDetails: {
          ...prev.userDetails,
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (name === 'subscriptionId') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New User' : 'Edit User'}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {mode === 'create' 
                  ? 'Add a new user to your platform' 
                  : 'Update user information'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border-0 pl-10 pr-4 py-3 text-gray-900 ring-1 ring-inset ${
                        errors.email ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                      placeholder="user@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 pl-10 pr-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors appearance-none"
                    >
                      <option value="user">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password (only for create mode) */}
              {mode === 'create' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                      errors.password ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  <p className="mt-1 text-sm text-gray-500">Password must be at least 6 characters</p>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="userDetails.name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    id="userDetails.name"
                    name="userDetails.name"
                    type="text"
                    value={formData.userDetails.name}
                    onChange={handleInputChange}
                    className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                      errors.name ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label htmlFor="userDetails.phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="userDetails.phoneNumber"
                      name="userDetails.phoneNumber"
                      type="tel"
                      value={formData.userDetails.phoneNumber}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors"
                      placeholder="+1234567890"
                    />
                  </div>

                  {/* Subscription */}
                  <div>
                    <label htmlFor="subscriptionId" className="block text-sm font-medium text-gray-700 mb-2">
                      Subscription
                    </label>
                    <select
                      id="subscriptionId"
                      name="subscriptionId"
                      value={formData.subscriptionId || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors appearance-none"
                    >
                      <option value="">No Subscription</option>
                      {/* This would be populated with actual subscriptions from the API */}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="userDetails.address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="userDetails.address"
                    name="userDetails.address"
                    rows={3}
                    value={formData.userDetails.address}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        userDetails: {
                          ...prev.userDetails,
                          address: e.target.value
                        }
                      }));
                    }}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors"
                    placeholder="123 Main St, City, State"
                  />
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Additional Settings</h3>
              </div>

              {/* Is Employee */}
              <div className="flex items-center">
                <input
                  id="isEmployee"
                  name="isEmployee"
                  type="checkbox"
                  checked={formData.isEmployee}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="isEmployee" className="ml-3 block text-sm font-medium text-gray-700">
                  Is Employee
                </label>
                <p className="ml-6 text-sm text-gray-500">Grant employee access and permissions</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create User' : 'Update User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};