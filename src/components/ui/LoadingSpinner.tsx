interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'indigo' | 'purple' | 'blue' | 'green';
  text?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'indigo',
  text 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    indigo: 'text-indigo-600',
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    green: 'text-green-600'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full`}></div>
        
        {/* Spinning inner ring */}
        <div className={`${sizeClasses[size]} border-2 border-t-transparent ${colorClasses[color]} rounded-full animate-spin absolute inset-0`}></div>
        
        {/* Inner dot */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className={`w-1 h-1 ${colorClasses[color]} rounded-full animate-pulse bg-current`}></div>
        </div>
      </div>
      
      {text && (
        <p className="text-sm font-medium text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const PageLoadingSpinner = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <LoadingSpinner size="xl" color="indigo" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          {text}
        </h2>
        <p className="text-gray-600 font-medium">Please wait while we prepare your dashboard</p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
              style={{animationDelay: `${i * 0.2}s`}}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};