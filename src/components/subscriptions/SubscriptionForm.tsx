import { useState } from 'react';
import { 
  XMarkIcon, 
  PlusIcon, 
  MinusIcon,
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface SubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subscription: SubscriptionFormData) => void;
  initialData?: Partial<SubscriptionFormData>;
  mode?: 'create' | 'edit';
}

export interface SubscriptionFormData {
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: {
    value: number;
    unit: 'days' | 'weeks' | 'months' | 'years';
  };
  features: string[];
  status: 'active' | 'inactive' | 'draft';
  trialPeriod?: number;
  maxStores: number;
  maxProducts: number;
  supportLevel: 'basic' | 'priority' | 'dedicated';
  apiAccess: boolean;
  customDomain: boolean;
  analytics: 'basic' | 'advanced' | 'enterprise';
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: {
    value: number;
    unit: string;
  };
  features: string[];
  status: string;
  subscribersCount?: number;
  totalRevenue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionResponse {
  success: boolean;
  data: {
    subscriptions: Subscription[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

const defaultFormData: SubscriptionFormData = {
  name: '',
  description: '',
  price: 0,
  currency: 'USD',
  duration: { value: 1, unit: 'months' },
  features: [''],
  status: 'draft',
  trialPeriod: 0,
  maxStores: 1,
  maxProducts: 100,
  supportLevel: 'basic',
  apiAccess: false,
  customDomain: false,
  analytics: 'basic'
};

export const SubscriptionForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  mode = 'create' 
}: SubscriptionFormProps) => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    ...defaultFormData,
    ...initialData
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plan name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.duration.value <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (formData.maxStores <= 0) {
      newErrors.maxStores = 'Max stores must be greater than 0';
    }

    if (formData.maxProducts <= 0) {
      newErrors.maxProducts = 'Max products must be greater than 0';
    }

    const validFeatures = formData.features.filter(f => f.trim());
    if (validFeatures.length === 0) {
      newErrors.features = 'At least one feature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Filter out empty features
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim())
      };
      
      await onSubmit(cleanedData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Subscription Plan' : 'Edit Subscription Plan'}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {mode === 'create' 
                  ? 'Set up a new subscription plan for your users' 
                  : 'Update the subscription plan details'
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
                <TagIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Plan Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                      errors.name ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                    placeholder="e.g., Premium Plan"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      status: e.target.value as 'active' | 'inactive' | 'draft' 
                    }))}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                    errors.description ? 'ring-red-300' : 'ring-gray-300'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                  placeholder="Describe what this plan offers..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <CurrencyDollarIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pricing & Duration</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      className={`block w-full rounded-xl border-0 pl-8 pr-4 py-3 text-gray-900 ring-1 ring-inset ${
                        errors.price ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                {/* Duration Value */}
                <div>
                  <label htmlFor="durationValue" className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    id="durationValue"
                    type="number"
                    min="1"
                    value={formData.duration.value}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      duration: { ...prev.duration, value: parseInt(e.target.value) || 1 }
                    }))}
                    className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                      errors.duration ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                    placeholder="1"
                  />
                  {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                </div>

                {/* Duration Unit */}
                <div>
                  <label htmlFor="durationUnit" className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    id="durationUnit"
                    value={formData.duration.unit}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      duration: { ...prev.duration, unit: e.target.value as 'days' | 'weeks' | 'months' | 'years' }
                    }))}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              {/* Currency */}
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  className="block w-full max-w-xs rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="IDR">IDR - Indonesian Rupiah</option>
                </select>
              </div>

              {/* Trial Period */}
              <div>
                <label htmlFor="trialPeriod" className="block text-sm font-medium text-gray-700 mb-2">
                  Trial Period (days)
                </label>
                <input
                  id="trialPeriod"
                  type="number"
                  min="0"
                  value={formData.trialPeriod}
                  onChange={(e) => setFormData(prev => ({ ...prev, trialPeriod: parseInt(e.target.value) || 0 }))}
                  className="block w-full max-w-xs rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors"
                  placeholder="0"
                />
                <p className="mt-1 text-sm text-gray-500">Set to 0 for no trial period</p>
              </div>
            </div>

            {/* Limits & Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Limits & Features</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Max Stores */}
                <div>
                  <label htmlFor="maxStores" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Stores *
                  </label>
                  <input
                    id="maxStores"
                    type="number"
                    min="1"
                    value={formData.maxStores}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxStores: parseInt(e.target.value) || 1 }))}
                    className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                      errors.maxStores ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                  />
                  {errors.maxStores && <p className="mt-1 text-sm text-red-600">{errors.maxStores}</p>}
                </div>

                {/* Max Products */}
                <div>
                  <label htmlFor="maxProducts" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Products *
                  </label>
                  <input
                    id="maxProducts"
                    type="number"
                    min="1"
                    value={formData.maxProducts}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxProducts: parseInt(e.target.value) || 1 }))}
                    className={`block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ${
                      errors.maxProducts ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors`}
                  />
                  {errors.maxProducts && <p className="mt-1 text-sm text-red-600">{errors.maxProducts}</p>}
                </div>

                {/* Support Level */}
                <div>
                  <label htmlFor="supportLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Support Level
                  </label>
                  <select
                    id="supportLevel"
                    value={formData.supportLevel}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      supportLevel: e.target.value as 'basic' | 'priority' | 'dedicated'
                    }))}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors"
                  >
                    <option value="basic">Basic Support</option>
                    <option value="priority">Priority Support</option>
                    <option value="dedicated">Dedicated Support</option>
                  </select>
                </div>

                {/* Analytics Level */}
                <div>
                  <label htmlFor="analytics" className="block text-sm font-medium text-gray-700 mb-2">
                    Analytics Level
                  </label>
                  <select
                    id="analytics"
                    value={formData.analytics}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      analytics: e.target.value as 'basic' | 'advanced' | 'enterprise'
                    }))}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-colors"
                  >
                    <option value="basic">Basic Analytics</option>
                    <option value="advanced">Advanced Analytics</option>
                    <option value="enterprise">Enterprise Analytics</option>
                  </select>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="apiAccess"
                    type="checkbox"
                    checked={formData.apiAccess}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiAccess: e.target.checked }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="apiAccess" className="ml-3 block text-sm font-medium text-gray-700">
                    API Access
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="customDomain"
                    type="checkbox"
                    checked={formData.customDomain}
                    onChange={(e) => setFormData(prev => ({ ...prev, customDomain: e.target.checked }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="customDomain" className="ml-3 block text-sm font-medium text-gray-700">
                    Custom Domain Support
                  </label>
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Feature List *</h3>
                </div>
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="block flex-1 rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 transition-colors"
                      placeholder="Enter feature description..."
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="rounded-lg p-2 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.features && <p className="text-sm text-red-600">{errors.features}</p>}
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
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Plan' : 'Update Plan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};