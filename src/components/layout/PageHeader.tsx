interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-base text-gray-600 max-w-2xl leading-relaxed font-medium ml-5">
              {subtitle}
            </p>
          )}
          <div className="ml-5 flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>
        {actions && (
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

