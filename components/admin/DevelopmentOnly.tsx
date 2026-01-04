export default function DevelopmentOnly({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Development Only
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Blog management is disabled in this environment. 
          To manage posts, please run the application locally in development mode.
        </p>
        <div className="mt-8">
           <code className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded text-sm font-mono">
             bun dev
           </code>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
