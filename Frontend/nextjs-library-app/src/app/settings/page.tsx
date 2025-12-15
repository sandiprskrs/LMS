'use client';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Sliders, Bell, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
    return (
        <LayoutWrapper role="Admin">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-blue-900 font-serif">System Settings</h1>
                <p className="text-gray-500 mt-1">Configure application preferences.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Sliders size={20} /></div>
                        <h2 className="text-lg font-bold text-gray-800">General Configuration</h2>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Library Name</label>
                            <input className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-100 outline-none" defaultValue="LMS.Edu" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Max Books per User</label>
                            <input type="number" className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-100 outline-none" defaultValue="5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Fine per Day ($)</label>
                            <input type="number" className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-100 outline-none" defaultValue="0.50" />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 mt-4">
                            <Save size={16} /> Save Changes
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Bell size={20} /></div>
                        <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Email Alerts for Overdue Books</span>
                            <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">New Member Notifications</span>
                            <input type="checkbox" className="toggle" />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
