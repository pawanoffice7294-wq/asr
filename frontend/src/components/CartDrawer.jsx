import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose, cart, removeFromCart }) => {
    const calculateTotal = () => {
        let minTotal = 0;
        let maxTotal = 0;

        cart.forEach(item => {
            const prices = item.price.match(/\d+/g);
            if (prices) {
                if (prices.length === 2) {
                    minTotal += parseFloat(prices[0]);
                    maxTotal += parseFloat(prices[1]);
                } else if (prices.length === 1) {
                    minTotal += parseFloat(prices[0]);
                    maxTotal += parseFloat(prices[0]);
                }
            }
        });

        return minTotal === maxTotal ? `₹${minTotal.toFixed(2)}` : `₹${minTotal.toFixed(2)} - ₹${maxTotal.toFixed(2)}`;
    };

    const total = calculateTotal();

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
                    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="glass"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '400px',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <ShoppingBag size={24} color="var(--primary)" /> My Bag
                            </h2>
                            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                                    <ShoppingBag size={64} style={{ marginBottom: '1rem' }} />
                                    <p>Your bag is empty</p>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ height: '80px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.9rem' }}>{item.name}</h4>
                                            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem' }}>{item.price}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(index)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                    <span>Estimate Total</span>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{total}</span>
                                </div>
                                <button style={{ width: '100%', padding: '1.2rem', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    Checkout <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
