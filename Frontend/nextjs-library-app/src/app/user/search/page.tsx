'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Search as SearchIcon, Filter, BookOpen } from 'lucide-react';
import Swal from 'sweetalert2';

export default function SearchPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) setUser(JSON.parse(u));
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await api.get('/books');
            setBooks(data);
            setFilteredBooks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = books;
        if (search) {
            result = result.filter(b =>
                b.title.toLowerCase().includes(search.toLowerCase()) ||
                b.author.toLowerCase().includes(search.toLowerCase()) ||
                b.isbn.includes(search)
            );
        }
        if (category) {
            result = result.filter(b => b.categoryName === category);
        }
        setFilteredBooks(result);
    }, [search, category, books]);

    const handleBorrow = async (bookId: number) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }

        try {
            await api.post('/library/issue', { userId: user.userId, bookId });
            Swal.fire('Success', 'Book issued successfully!', 'success');
            fetchBooks(); // Refresh availability
        } catch (err) {
            Swal.fire('Error', 'Could not issue book. Limit reached or unavailable.', 'error');
        }
    };

    const categories = Array.from(new Set(books.map(b => b.categoryName))).filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Collection</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Title, Author, ISBN..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder:text-gray-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-64 relative">
                        <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-gray-900 bg-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBooks.map(book => (
                            <div key={book.bookId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <BookOpen size={48} className="text-gray-400" />
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <span className="text-xs font-semibold text-blue-600 mb-1">{book.categoryName}</span>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">{book.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">by {book.author}</p>

                                    <div className="mt-auto flex justify-between items-center">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${book.availableCopies > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Out of Stock'}
                                        </span>
                                        <button
                                            onClick={() => handleBorrow(book.bookId)}
                                            disabled={book.availableCopies === 0}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                        >
                                            Borrow
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
