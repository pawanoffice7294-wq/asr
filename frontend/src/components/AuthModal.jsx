import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate auth
        onLogin({ name: isLogin ? 'User' : formData.name, email: formData.email });
        onClose();
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
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>

                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                        {isLogin ? 'Welcome Back' : 'Join Us'}
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        {isLogin ? 'Enter your details to sign in to ASR' : 'Create an account to start designing'}
                    </p>

                    {isLogin && (
                        <div className="glass" style={{ padding: '0.8rem', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                            <strong>Hint:</strong> Use <code>pawan</code> as both ID and Password
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {!isLogin && (
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="glass"
                                    required
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem' }}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}

                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="glass"
                                required
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem' }}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="glass"
                                required
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem' }}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{ padding: '1rem', background: 'var(--primary)', color: 'white', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </span>
                    </p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
