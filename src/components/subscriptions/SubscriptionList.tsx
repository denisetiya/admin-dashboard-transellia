import { useState } from 'react';
import { mockSubscriptions } from '../../data/mockData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { SubscriptionFormData } from './SubscriptionForm';

interface SubscriptionListProps {
  onEdit?: (subscription: Partial<SubscriptionFormData>) => void;
}

interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: {
    value: number;
    unit: string;
  };
  features: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const SubscriptionList = ({ onEdit }: SubscriptionListProps) => {
  const [subscriptions] = useState(mockSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatDuration = (duration: { value: number; unit: string }) => {
    return `${duration.value} ${duration.unit}${duration.value > 1 ? 's' : ''}`;
  };

  const handleEdit = (subscription: Subscription) => {
    if (onEdit) {
      // Convert mock data format to form data format
      const formData: Partial<SubscriptionFormData> = {
        name: subscription.name,
        description: subscription.description,
        price: subscription.price,
        currency: 'IDR',
        duration: subscription.duration as SubscriptionFormData['duration'],
        features: subscription.features,
        status: subscription.status as SubscriptionFormData['status'],
        maxStores: 5, // Default values since not in mock data
        maxProducts: 1000,
        supportLevel: 'priority',
        apiAccess: subscription.features.includes('API access'),
        customDomain: subscription.features.includes('Custom domain'),
        analytics: 'advanced'
      };
      onEdit(formData);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Subscriptions</h3>
          <div className="mt-3 flex md:mt-0 md:ml-4">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-3 pr-10 py-2"
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{subscription.name}</div>
                  <div className="text-sm text-gray-500">{subscription.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatPrice(subscription.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDuration(subscription.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {subscription.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {feature}
                      </span>
                    ))}
                    {subscription.features.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{subscription.features.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEdit(subscription)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                    title="Edit subscription"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => console.log('Delete subscription:', subscription.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete subscription"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">No subscriptions found.</p>
        </div>
      )}
    </div>
  );
};