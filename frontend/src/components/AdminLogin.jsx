import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { loginUser } from '../utils/api';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('admin@asr.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await loginUser({ email, password });
            if (user.role !== 'Admin') {
                setError('Access Denied: You do not have admin privileges.');
            } else {
                localStorage.setItem('asr_user', JSON.stringify(user));
                onLogin(user);
            }
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0c',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
            }}></div>

            <div className="glass-card" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '3rem',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(255,255,255,0.08)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
                    }}>
                        <Shield size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Admin Portal</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Secure access for store management</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ margin: 0 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem', marginLeft: '0.5rem', color: 'var(--text-muted)' }}>ADMIN ID</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass"
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                    borderRadius: '14px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ margin: 0 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem', marginLeft: '0.5rem', color: 'var(--text-muted)' }}>PASSWORD</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass"
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                    borderRadius: '14px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            marginTop: '1rem',
                            padding: '1.2rem',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '14px',
                            fontWeight: '700',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            cursor: isLoading ? 'wait' : 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: '0 8px 20px -4px var(--primary-glow)'
                        }}
                    >
                        {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                        {!isLoading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ opacity: 0.6 }}>Restricted Area. Authorized Personnel Only.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
