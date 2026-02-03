import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, signupUser } from '../utils/api';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [authType, setAuthType] = useState('customer'); // 'customer' or 'admin'
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let user;
            if (isLogin || authType === 'admin') {
                user = await loginUser({ email: formData.email, password: formData.password });
            } else {
                user = await signupUser({ name: formData.name, email: formData.email, password: formData.password });
            }
            // Store user in local storage
            localStorage.setItem('asr_user', JSON.stringify(user));
            onLogin(user);
            onClose();
        } catch (err) {
            console.error(err);
            setError(isLogin ? 'Invalid credentials' : 'Signup failed. Email might be taken.');
        }
    };

    return (
        <AnimatePresence>
            <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="glass"
                    style={{
                        width: '90%',
                        maxWidth: '400px',
                        padding: '2.5rem',
                        borderRadius: '32px',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: authType === 'admin' ? '1px solid var(--secondary)' : '1px solid var(--glass-border)'
                    }}
                >
                    <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>

                    {/* Account Type Switcher */}
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '4px', marginBottom: '2rem' }}>
                        <button
                            onClick={() => { setAuthType('customer'); setFormData({ name: '', email: '', password: '' }); setError(''); }}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '12px',
                                background: authType === 'customer' ? 'var(--primary)' : 'transparent',
                                color: authType === 'customer' ? 'white' : 'var(--text-muted)',
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                            }}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => {
                                setAuthType('admin');
                                setIsLogin(true);
                                setFormData({ name: '', email: 'admin@asr.com', password: '' });
                                setError('');
                            }}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '12px',
                                background: authType === 'admin' ? 'var(--secondary)' : 'transparent',
                                color: authType === 'admin' ? 'white' : 'var(--text-muted)',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Shield size={16} /> Admin
                        </button>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                        {authType === 'admin' ? 'Admin Access' : (isLogin ? 'Welcome Back' : 'Join Us')}
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        {authType === 'admin' ? 'Secure login for store managers' : (isLogin ? 'Enter your details to sign in' : 'Create an account to start shopping')}
                    </p>

                    {error && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.8rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem', fontSize: '0.8rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {/* Name field only for Customer Signup */}
                        {authType === 'customer' && !isLogin && (
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    className="glass"
                                    required
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', color: 'white' }}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}

                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                className="glass"
                                required
                                readOnly={authType === 'admin'} // Admin email is fixed mainly for demo
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', color: 'white', opacity: authType === 'admin' ? 0.7 : 1 }}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                className="glass"
                                required
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', color: 'white' }}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: '1rem',
                                background: authType === 'admin' ? 'var(--secondary)' : 'var(--primary)',
                                color: 'white',
                                marginTop: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {authType === 'admin' ? 'Enter Dashboard' : (isLogin ? 'Sign In' : 'Create Account')} <ArrowRight size={18} />
                        </button>
                    </form>

                    {authType === 'customer' && (
                        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </span>
                        </p>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
