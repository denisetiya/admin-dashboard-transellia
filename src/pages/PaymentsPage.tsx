import { PaymentHistory } from '../components/payments/PaymentHistory';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { 
  ArrowDownTrayIcon, 
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export const PaymentsPage = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <PageHeader
          title="Payment Management"
          subtitle="Monitor transactions, track payment statuses, and analyze revenue patterns across all subscription plans."
          actions={
            <div className="flex space-x-3">
              <Button 
                variant="secondary" 
                leftIcon={<ChartBarIcon className="w-4 h-4" />}
              >
                Analytics
              </Button>
              <Button 
                variant="secondary"
                leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
              >
                Export
              </Button>
              <Button 
                variant="primary"
                leftIcon={<PlusIcon className="w-4 h-4" />}
              >
                Manual Payment
              </Button>
            </div>
          }
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};