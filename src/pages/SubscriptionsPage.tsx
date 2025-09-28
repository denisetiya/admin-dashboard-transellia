import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SubscriptionList } from '../components/subscriptions/SubscriptionList';
import { SubscriptionForm, type SubscriptionFormData } from '../components/subscriptions/SubscriptionForm';
import { PlusIcon } from '@heroicons/react/24/outline';

export const SubscriptionsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Partial<SubscriptionFormData> | undefined>();

  const handleCreateSubscription = (data: SubscriptionFormData) => {
    console.log('Creating subscription:', data);
    // TODO: Implement API call to create subscription
    // This would integrate with the API endpoint: POST /subscriptions
  };

  const handleEditSubscription = (subscription: Partial<SubscriptionFormData>) => {
    setEditingSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleUpdateSubscription = (data: SubscriptionFormData) => {
    console.log('Updating subscription:', data);
    // TODO: Implement API call to update subscription
    // This would integrate with the API endpoint: PUT /subscriptions/{id}
    setEditingSubscription(undefined);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSubscription(undefined);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <PageHeader 
          title="Subscription Plans" 
          subtitle="Manage and monitor subscription plans for your platform"
          actions={
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Plan
            </button>
          }
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <SubscriptionList onEdit={handleEditSubscription} />
        </div>
      </div>
      
      <SubscriptionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingSubscription ? handleUpdateSubscription : handleCreateSubscription}
        initialData={editingSubscription}
        mode={editingSubscription ? 'edit' : 'create'}
      />
    </div>
  );
};