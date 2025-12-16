'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Shield, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar({ role }: { role: 'Admin' | 'User' }) {
    const pathname = usePathname();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserName(user.fullName || user.FullName || 'User');
        }
    }, []);

    const links = role === 'Admin' ? [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/books', label: 'Manage Books', icon: BookOpen }, // Future
        { href: '/admin/users', label: 'Manage Members', icon: Users }, // Future
        { href: '/settings', label: 'Settings', icon: Settings },
    ] : [
        { href: '/user/dashboard', label: 'My Books', icon: BookOpen },
        { href: '/user/search', label: 'Browse Library', icon: LayoutDashboard },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold font-serif">L</div>
                <span className="text-xl font-bold text-blue-900 font-serif tracking-tight">LMS<span className="text-amber-500">.Edu</span></span>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-100">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role === 'Admin' ? 'bg-purple-600' : 'bg-blue-600'
                            }`}>
                            {role === 'Admin' ? (
                                <Shield className="w-5 h-5 text-white" />
                            ) : (
                                <User className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${role === 'Admin' ? 'text-purple-700' : 'text-blue-700'
                                }`}>
                                {role}
                            </div>
                            <div className="text-sm font-medium text-gray-900 truncate">
                                {userName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                            ? 'bg-blue-50 text-blue-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}>
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                    onClick={() => { localStorage.removeItem('user'); window.location.href = '/login'; }}>
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Sign Out</span>
                </div>
            </div>
        </aside>
    );
}
