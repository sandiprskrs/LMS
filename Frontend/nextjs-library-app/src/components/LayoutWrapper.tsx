import { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children, role }: { children: ReactNode, role: 'Admin' | 'User' }) {
    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Sidebar role={role} />
            <main className="ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
