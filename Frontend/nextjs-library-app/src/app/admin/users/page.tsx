'use client';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Users, UserPlus, Mail } from 'lucide-react';

export default function ManageUsers() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@email.com', role: 'User', joined: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@email.com', role: 'User', joined: '2024-02-20' },
        { id: 3, name: 'Admin User', email: 'admin@library.com', role: 'Admin', joined: '2023-11-01' },
        { id: 4, name: 'Bob Reader', email: 'bob@read.com', role: 'User', joined: '2024-03-10' },
    ];

    return (
        <LayoutWrapper role="Admin">
            <header className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900 font-serif">Member Directory</h1>
                    <p className="text-gray-500 mt-1">View and manage library members.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-blue-200 transition-all flex items-center gap-2">
                    <UserPlus size={18} /> Add Member
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50 text-gray-500 uppercase font-semibold text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                        {user.name.charAt(0)}
                                    </div>
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{user.joined}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><Mail size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutWrapper>
    );
}
