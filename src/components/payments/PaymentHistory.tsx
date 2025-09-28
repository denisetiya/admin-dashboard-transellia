import { useState } from 'react';
import { mockPayments } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  CurrencyDollarIcon, 
  CreditCardIcon, 
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

export const PaymentHistory = () => {
  const [payments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.subscriptionName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTransactionDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCardIcon className="h-5 w-5 text-white" />;
      default:
        return <CurrencyDollarIcon className="h-5 w-5 text-white" />;
    }
  };

  const getTotalAmount = () => {
    return payments.reduce((total, payment) => {
      return payment.status === 'completed' ? total + payment.amount : total;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glass" padding="md" hover={false}>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Revenue</div>
              <div className="text-lg font-bold text-gray-900">{formatAmount(getTotalAmount())}</div>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" padding="md" hover={false}>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Successful</div>
              <div className="text-lg font-bold text-gray-900">
                {payments.filter(p => p.status === 'completed').length}
              </div>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" padding="md" hover={false}>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</div>
              <div className="text-lg font-bold text-gray-900">
                {payments.filter(p => p.status === 'pending').length}
              </div>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" padding="md" hover={false}>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Failed</div>
              <div className="text-lg font-bold text-gray-900">
                {payments.filter(p => p.status === 'failed').length}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Payment Table */}
      <Card variant="glass" padding="none">
        {/* Header */}
        <div className="px-6 py-6 bg-gradient-to-r from-white via-white to-gray-50/50 border-b border-gray-200/50 rounded-t-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2 text-indigo-600" />
                Payment Transactions
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {filteredPayments.length} transaction{filteredPayments.length !== 1 ? 's' : ''} found
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
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FunnelIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-8 py-2.5 border border-gray-300/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm appearance-none transition-all duration-200"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              {/* Date Range */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-8 py-2.5 border border-gray-300/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm appearance-none transition-all duration-200"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last Year</option>
                </select>
              </div>
              
              <Button
                variant="secondary"
                leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  User Details
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Subscription
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">#{payment.transactionId}</div>
                        <div className="text-xs text-gray-500 capitalize">{payment.paymentMethod.replace('_', ' ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{payment.userName}</div>
                      <div className="text-sm text-gray-500">{payment.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info" gradient>
                      {payment.subscriptionName}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatAmount(payment.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={
                        payment.status === 'completed' ? 'success' : 
                        payment.status === 'pending' ? 'warning' : 'danger'
                      } 
                      gradient
                      dot
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{formatTransactionDate(payment.transactionDate)}</div>
                    <div className="text-xs text-gray-500">
                      {Math.floor((new Date().getTime() - new Date(payment.transactionDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
                        View
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
        
        {filteredPayments.length === 0 && (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <CreditCardIcon className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              We couldn't find any payment transactions matching your search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDateRange('all');
              }}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};