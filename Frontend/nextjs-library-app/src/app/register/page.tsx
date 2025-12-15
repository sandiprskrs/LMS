'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: 'User' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/register', formData);
            router.push('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Create Account</h2>
                {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text" placeholder="Full Name" required
                        className="w-full border p-2 rounded text-gray-900"
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <input
                        type="email" placeholder="Email" required
                        className="w-full border p-2 rounded text-gray-900"
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password" placeholder="Password" required
                        className="w-full border p-2 rounded text-gray-900"
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    <select
                        className="w-full border p-2 rounded text-gray-900 bg-white"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded font-bold">
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}
