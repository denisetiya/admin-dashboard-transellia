import { forwardRef } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  gradient?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    children, 
    variant = 'default', 
    size = 'md',
    dot = false,
    gradient = false,
    className = '',
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center font-semibold rounded-full transition-all duration-200";
    
    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm", 
      lg: "px-4 py-1.5 text-base"
    };

    const variantClasses = gradient ? {
      default: "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 ring-1 ring-indigo-300/50 shadow-sm",
      success: "bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 ring-1 ring-green-300/50 shadow-sm",
      warning: "bg-gradient-to-r from-amber-100 to-yellow-200 text-amber-800 ring-1 ring-amber-300/50 shadow-sm", 
      danger: "bg-gradient-to-r from-red-100 to-rose-200 text-red-800 ring-1 ring-red-300/50 shadow-sm",
      info: "bg-gradient-to-r from-blue-100 to-sky-200 text-blue-800 ring-1 ring-blue-300/50 shadow-sm",
      purple: "bg-gradient-to-r from-purple-100 to-violet-200 text-purple-800 ring-1 ring-purple-300/50 shadow-sm",
      gray: "bg-gradient-to-r from-gray-100 to-slate-200 text-gray-800 ring-1 ring-gray-300/50 shadow-sm"
    } : {
      default: "bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200/50",
      success: "bg-green-100 text-green-800 ring-1 ring-green-200/50",
      warning: "bg-amber-100 text-amber-800 ring-1 ring-amber-200/50",
      danger: "bg-red-100 text-red-800 ring-1 ring-red-200/50", 
      info: "bg-blue-100 text-blue-800 ring-1 ring-blue-200/50",
      purple: "bg-purple-100 text-purple-800 ring-1 ring-purple-200/50",
      gray: "bg-gray-100 text-gray-800 ring-1 ring-gray-200/50"
    };

    const dotColors = {
      default: "bg-indigo-500",
      success: "bg-green-500", 
      warning: "bg-amber-500",
      danger: "bg-red-500",
      info: "bg-blue-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500"
    };
    
    return (
      <span
        ref={ref}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {dot && (
          <div className={`h-1.5 w-1.5 rounded-full mr-2 ${dotColors[variant]}`}></div>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';