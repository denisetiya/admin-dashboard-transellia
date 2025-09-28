import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  XCircleIcon, 
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setIsVisible(true), 10);
    
    // Auto dismiss
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose(id);
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon
  };

  const colors = {
    success: {
      bg: 'bg-white',
      border: 'border-green-200',
      icon: 'text-green-500',
      title: 'text-green-800',
      message: 'text-green-700',
      progress: 'bg-green-500'
    },
    error: {
      bg: 'bg-white',
      border: 'border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      message: 'text-red-700',
      progress: 'bg-red-500'
    },
    warning: {
      bg: 'bg-white',
      border: 'border-amber-200',
      icon: 'text-amber-500',
      title: 'text-amber-800',
      message: 'text-amber-700',
      progress: 'bg-amber-500'
    },
    info: {
      bg: 'bg-white',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      message: 'text-blue-700',
      progress: 'bg-blue-500'
    }
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <div
      className={`
        relative max-w-sm w-full ${color.bg} shadow-2xl rounded-2xl border ${color.border} 
        backdrop-blur-sm pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
      `}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
        <div 
          className={`h-full ${color.progress} transition-all ease-linear`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
            width: '100%'
          }}
        ></div>
      </div>

      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color.icon}`} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-bold ${color.title}`}>
              {title}
            </p>
            {message && (
              <p className={`mt-1 text-sm ${color.message}`}>
                {message}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-h-screen overflow-hidden">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};