'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Clock, Book, AlertCircle, BookOpen } from 'lucide-react';
import LayoutWrapper from '@/components/LayoutWrapper';

export default function UserDashboard() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Get user from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const u = JSON.parse(storedUser);
            setUser(u);
            fetchHistory(u.userId);
        } else {
            window.location.href = '/login';
        }
    }, []);

    const fetchHistory = async (userId: number) => {
        try {
            const data = await api.get(`/library/history/${userId}`);
            console.log('History Data:', data); // Debugging
            setTransactions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const activeLoans = transactions.filter(t => t.status === 'Issued');
    const overdueCount = activeLoans.filter(t => new Date(t.dueDate) < new Date()).length;

    return (
        <LayoutWrapper role="User">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-blue-900 font-serif">My Library</h1>
                <p className="text-gray-500 mt-1">Welcome back, <span className="font-semibold text-gray-700">{user?.fullName}</span>. Here is your reading overview.</p>
            </header>

            {/* Alerts */}
            {overdueCount > 0 && (
                <div className="mb-8 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-4 shadow-sm animate-pulse">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg"><AlertCircle size={24} /></div>
                    <div>
                        <h4 className="font-bold text-red-800 text-lg">Overdue Books Detected</h4>
                        <p className="text-red-600">You have {overdueCount} book(s) past their due date. Please return them to avoid daily fines.</p>
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-primary/10 text-blue-700 rounded-full bg-blue-50"><BookOpen size={28} /></div>
                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Loans</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{activeLoans.length} <span className="text-lg text-gray-400 font-normal">/ {user?.maxBooksAllowed || 5}</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-amber-50 text-amber-600 rounded-full"><Clock size={28} /></div>
                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Returns Due This Week</h3>
                        {/* Simplified logic for demo */}
                        <p className="text-3xl font-bold text-gray-800 mt-1">{activeLoans.length > 0 ? 1 : 0}</p>
                    </div>
                </div>
            </div>

            {/* Current Loans Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800 font-serif">Borrowed Books</h2>
                </div>
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-white text-gray-500 uppercase font-semibold text-xs tracking-wider border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Book Title</th>
                            <th className="px-6 py-4">Issue Date</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading your history...</td></tr>
                        ) : activeLoans.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">You have no active loans. Time to visit the library!</td></tr>
                        ) : activeLoans.map((t) => {
                            const isOverdue = new Date(t.dueDate) < new Date();
                            return (
                                <tr key={t.transactionId} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-6 py-5 font-semibold text-gray-900 text-base">{t.bookTitle}</td>
                                    <td className="px-6 py-5 text-gray-500">{new Date(t.issueDate).toLocaleDateString()}</td>
                                    <td className={`px-6 py-5 font-medium ${isOverdue ? 'text-red-600' : 'text-gray-700'}`}>
                                        {new Date(t.dueDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isOverdue ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                                            {isOverdue ? 'Overdue' : 'On Time'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {!isOverdue && t.renewalCount < 1 && (
                                            <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded font-medium transition-colors text-xs uppercase tracking-wide">Renew Book</button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </LayoutWrapper>
    );
}
