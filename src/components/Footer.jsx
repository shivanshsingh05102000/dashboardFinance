export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">F</span>
            </div>
            <span className="text-gray-300 text-sm font-medium">FinDash</span>
          </div>
          <span className="text-gray-500 text-sm">
            © 2024 Zorvyn FinTech · Built by Shivansh Singh
          </span>
        </div>
      </div>
    </footer>
  );
}