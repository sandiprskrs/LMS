'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Trash2, Edit, BookOpen, Clock, AlertTriangle, X, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import LayoutWrapper from '@/components/LayoutWrapper';

export default function AdminDashboard() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, issued: 0, overdue: 0 });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '', author: '', isbn: '', categoryId: 1, totalCopies: 1, publisher: 'Unknown', publicationYear: 2024
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await api.get('/books');
            setBooks(data);
            setStats({
                total: data.length,
                issued: data.filter((b: any) => b.availableCopies < b.totalCopies).length,
                overdue: data.filter((b: any) => b.status === 'Overdue').length // Adjust logical check based on your data
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBook = async (id: number) => {
        const result = await Swal.fire({
            title: 'Delete Book?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/books/${id}`);
                Swal.fire('Deleted', 'Book removed from inventory.', 'success');
                fetchBooks();
            } catch (error) {
                Swal.fire('Error', 'Failed to delete book.', 'error');
            }
        }
    };

    const openModal = (book: any = null) => {
        if (book) {
            setEditingBook(book);
            setFormData({
                title: book.title, author: book.author, isbn: book.isbn, categoryId: book.categoryId || 1,
                totalCopies: book.totalCopies,
                publisher: book.publisher || '',
                publicationYear: book.publicationYear || 2024
            });
        } else {
            setEditingBook(null);
            setFormData({ title: '', author: '', isbn: '', categoryId: 1, totalCopies: 1, publisher: '', publicationYear: 2024 });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBook) {
                await api.put(`/books/${editingBook.bookId}`, { ...formData, bookId: editingBook.bookId });
                Swal.fire('Updated', 'Book details updated.', 'success');
            } else {
                await api.post('/books', formData);
                Swal.fire('Added', 'New book added to library.', 'success');
            }
            setIsModalOpen(false);
            fetchBooks();
        } catch (error: any) {
            console.error("Save Error:", error);
            Swal.fire('Error', 'Operation failed. Check inputs or server logs.', 'error');
        }
    };

    return (
        <LayoutWrapper role="Admin">
            <header className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900 font-serif">Library Operations</h1>
                    <p className="text-gray-500 mt-1">Manage inventory, borrowers, and system settings.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-blue-200 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Add New Book
                </button>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Collection</h3>
                        <p className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><BookOpen size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Loans</h3>
                        <p className="text-4xl font-bold text-amber-500 mt-2">{stats.issued}</p>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Action Needed</h3>
                        <p className="text-4xl font-bold text-red-500 mt-2">{stats.overdue}</p>
                    </div>
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={24} /></div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800 font-serif">Book Inventory</h2>
                </div>
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Title / Author</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">ISBN</th>
                            <th className="px-6 py-4">Availability</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading library data...</td></tr>
                        ) : books.map((book) => (
                            <tr key={book.bookId} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900 text-base">{book.title}</div>
                                    <div className="text-gray-400 text-xs mt-0.5">{book.author}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                        {book.categoryName || 'General'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-500 text-xs">{book.isbn}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${book.availableCopies > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                        <span className="font-medium text-gray-700">{book.availableCopies}</span>
                                        <span className="text-gray-400">/ {book.totalCopies}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button onClick={() => openModal(book)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteBook(book.bookId)} className="text-rose-500 hover:bg-rose-100 p-2 rounded-md transition-colors"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-serif font-bold text-xl text-gray-800">{editingBook ? 'Edit Book Details' : 'Add New Book'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Book Title</label>
                                    <input className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                        value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. The Great Gatsby" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Author</label>
                                        <input className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ISBN</label>
                                        <input className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            value={formData.isbn} onChange={e => setFormData({ ...formData, isbn: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}>
                                            <option value={1}>Fiction</option>
                                            <option value={2}>Non-Fiction</option>
                                            <option value={3}>Science</option>
                                            <option value={4}>History</option>
                                            <option value={5}>Technology</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Copies</label>
                                        <input type="number" className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            value={formData.totalCopies} onChange={e => setFormData({ ...formData, totalCopies: parseInt(e.target.value) })} min="1" required />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md shadow-blue-200 flex items-center gap-2 transition-all">
                                    <Save size={18} /> {editingBook ? 'Save Changes' : 'Add Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </LayoutWrapper>
    );
}
