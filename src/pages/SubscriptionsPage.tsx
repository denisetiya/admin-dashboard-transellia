import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SubscriptionList } from '../components/subscriptions/SubscriptionList';
import { SubscriptionForm, type SubscriptionFormData } from '../components/subscriptions/SubscriptionForm';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import { apiService, type CreateSubscriptionRequest, type UpdateSubscriptionRequest } from '../services/api';

export const SubscriptionsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Partial<SubscriptionFormData> & { id?: string } | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateSubscription = async (data: SubscriptionFormData) => {
    try {
      // Transform form data to match backend API format
      const subscriptionData: CreateSubscriptionRequest = {
        name: data.name,
        description: data.description,
        price: data.price,
        currency: data.currency,
        duration: data.duration,
        features: data.features,
        status: data.status
      };

      const response = await apiService.createSubscription(subscriptionData);
      
      if (response.success) {
        // Refresh the subscription list
        window.location.reload();
      } else {
        console.error('Error creating subscription:', response.message);
        // Throw error to prevent modal from closing
        throw new Error(response.message || 'Failed to create subscription');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      // Re-throw error to prevent modal from closing
      throw error;
    }
  };

  const handleEditSubscription = (subscription: Partial<SubscriptionFormData>) => {
    setEditingSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleUpdateSubscription = async (data: SubscriptionFormData) => {
    try {
      if (!editingSubscription?.id) {
        console.error('Subscription ID is required for update');
        throw new Error('Subscription ID is required for update');
      }

      // Transform form data to match backend API format
      const subscriptionData: UpdateSubscriptionRequest = {
        name: data.name,
        description: data.description,
        price: data.price,
        currency: data.currency,
        duration: data.duration,
        features: data.features,
        status: data.status
      };

      const response = await apiService.updateSubscription(editingSubscription.id, subscriptionData);
      
      if (response.success) {
        // Refresh the subscription list
        window.location.reload();
      } else {
        console.error('Error updating subscription:', response.message);
        // Throw error to prevent modal from closing
        throw new Error(response.message || 'Failed to update subscription');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      // Re-throw error to prevent modal from closing
      throw error;
    } finally {
      // Only clear editing subscription if successful (handled by window.location.reload)
      // If there's an error, keep the editing state so user can try again
    }
  };

  const handleDeleteSubscription = (id: string, name: string) => {
    setSubscriptionToDelete({ id, name });
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteSubscription = async () => {
    if (!subscriptionToDelete) return false;

    setIsDeleting(true);
    try {
      const response = await apiService.deleteSubscription(subscriptionToDelete.id);
      
      if (response.success) {
        // Refresh the subscription list
        window.location.reload();
        return true;
      } else {
        console.error('Error deleting subscription:', response.message);
        // TODO: Show error message to user
        return false;
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      // TODO: Show error message to user
      return false;
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setSubscriptionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSubscriptionToDelete(null);
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
          <SubscriptionList
            onEdit={handleEditSubscription}
            onDelete={handleDeleteSubscription}
          />
        </div>
      </div>
      
      <SubscriptionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingSubscription ? handleUpdateSubscription : handleCreateSubscription}
        initialData={editingSubscription}
        mode={editingSubscription ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteSubscription}
        title="Delete Subscription Plan"
        message={`Are you sure you want to delete "${subscriptionToDelete?.name}"? This action cannot be undone and will permanently remove the subscription plan from the system.`}
        confirmText="Delete Plan"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};