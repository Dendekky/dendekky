export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Dendekky Admin
          </h1>
          <nav className="mt-4 flex gap-4">
            <a href="/admin/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Blog Posts
            </a>
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Back to Site
            </a>
          </nav>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
