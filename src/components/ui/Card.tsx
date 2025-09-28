import { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default', 
    padding = 'md',
    hover = true,
    className = '',
    ...props 
  }, ref) => {
    const baseClasses = "rounded-2xl transition-all duration-300";
    
    const variantClasses = {
      default: "bg-white shadow-lg ring-1 ring-gray-200/50",
      glass: "bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-gray-200/50",
      elevated: "bg-white shadow-2xl ring-1 ring-gray-100/50",
      gradient: "bg-gradient-to-br from-white via-white to-gray-50/30 shadow-xl ring-1 ring-gray-200/50"
    };
    
    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-10"
    };
    
    const hoverClasses = hover ? "hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer" : "";
    
    return (
      <div
        ref={ref}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${hoverClasses}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';