import Link from 'next/link';
import { BookOpen, Search, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <BookOpen className="w-6 h-6" />
            <span>LBS<span className="text-gray-900">v2</span></span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Library Management <span className="text-blue-600">Reimagined</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A comprehensive system to manage books, patrons, fines, and reservations with ease.
          </p>

          <div className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-lg border border-gray-200 flex gap-2">
            <Search className="w-6 h-6 text-gray-400 ml-2 self-center" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="flex-1 p-2 outline-none text-gray-700"
            />
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800">
              Search
            </button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {['Fiction', 'Science', 'History'].map((cat) => (
            <div key={cat} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">{cat}</h3>
              <p className="text-gray-500 mb-4">Explore our vast collection of {cat.toLowerCase()} books.</p>
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">View Collection &rarr;</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
