import { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label,
    error,
    leftIcon,
    rightIcon,
    variant = 'default',
    size = 'md',
    className = '',
    ...props 
  }, ref) => {
    const baseClasses = "block w-full border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";
    
    const variantClasses = {
      default: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/50 bg-white",
      glass: "border-gray-300/50 focus:border-indigo-500 focus:ring-indigo-500/50 bg-white/50 backdrop-blur-sm"
    };
    
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm", 
      lg: "px-5 py-3 text-base"
    };
    
    const errorClasses = error 
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/50" 
      : variantClasses[variant];
    
    const paddingClasses = leftIcon && rightIcon 
      ? "pl-10 pr-10" 
      : leftIcon 
        ? "pl-10" 
        : rightIcon 
          ? "pr-10" 
          : "";
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {leftIcon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              ${baseClasses}
              ${errorClasses}
              ${sizeClasses[size]}
              ${paddingClasses}
              ${className}
            `}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="h-5 w-5 text-gray-400">
                {rightIcon}
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';