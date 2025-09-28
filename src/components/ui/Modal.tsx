import { Fragment, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  size = 'md',
  showCloseButton = true 
}: ModalProps) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl mx-4'
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
          />

          {/* Center modal */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          {/* Modal panel */}
          <div className={`
            relative inline-block w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl 
            bg-white/95 backdrop-blur-xl text-left align-bottom shadow-2xl transition-all duration-300 
            sm:my-8 sm:align-middle ring-1 ring-gray-200/50
            animate-fade-in animate-slide-up
          `}>
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="relative px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-white via-white to-gray-50/30">
                <div className="flex items-start justify-between">
                  {(title || subtitle) && (
                    <div className="flex-1">
                      {title && (
                        <h3 className="text-lg font-bold text-gray-900 leading-6">
                          {title}
                        </h3>
                      )}
                      {subtitle && (
                        <p className="mt-1 text-sm text-gray-600">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {showCloseButton && (
                    <button
                      type="button"
                      className="ml-4 rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="relative px-6 py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// Modal Footer Component
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter = ({ children, className = '' }: ModalFooterProps) => {
  return (
    <div className={`flex items-center justify-end space-x-3 pt-4 border-t border-gray-200/50 ${className}`}>
      {children}
    </div>
  );
};

// Modal Body Component
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody = ({ children, className = '' }: ModalBodyProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
};