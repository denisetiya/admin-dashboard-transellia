import { UserList } from '../components/users/UserList';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const UsersPage = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <PageHeader
          title="User Management"
          subtitle="Manage users, track their activities, and monitor subscription statuses across your platform."
          actions={
            <div className="flex space-x-3">
              <Button 
                variant="secondary" 
                leftIcon={<UserGroupIcon className="w-4 h-4" />}
              >
                Export Users
              </Button>
              <Button 
                variant="primary"
                leftIcon={<PlusIcon className="w-4 h-4" />}
              >
                Add New User
              </Button>
            </div>
          }
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <UserList />
        </div>
      </div>
    </div>
  );
};