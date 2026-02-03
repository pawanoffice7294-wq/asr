import React, { useState } from 'react';
import { Palette, Type, Upload, Save, Share2, ShoppingBag, Plus, ArrowRight } from 'lucide-react';
import QRCode from 'react-qr-code';
import confetti from 'canvas-confetti';

const Customizer = ({ onAddToCart, initialProduct }) => {
    // Fallback if initialProduct is null (e.g., from Navbar)
    const defaultProduct = { id: 1, category: 'T-Shirt', name: 'Premium Tee', image: '/products/white_tshirt_asr_1769234711724.png' };
    const [product, setProduct] = useState(initialProduct || defaultProduct);
    const [color, setColor] = useState('#6366f1');
    const [text, setText] = useState('YOUR TEXT');
    const [textColor, setTextColor] = useState('#ffffff');
    const [showQR, setShowQR] = useState(false);
    const [designId, setDesignId] = useState('');

    const siteUrl = window.location.origin;

    const shapes = {
        'T-Shirt': 'path("M 100,0 L 300,0 L 300,100 L 400,150 L 350,250 L 300,220 L 300,400 L 100,400 L 100,220 L 50,250 L 0,150 L 100,100 Z")',
        'Hoodie': 'path("M 100,50 L 300,50 L 300,100 L 400,150 L 350,250 L 300,220 L 300,400 L 100,400 L 100,220 L 50,250 L 0,150 L 100,100 Z M 150,0 L 250,0 L 280,50 L 120,50 Z")',
        'Cup': 'path("M 150,50 L 250,50 Q 270,50 270,70 L 270,380 Q 270,400 250,400 L 150,400 Q 130,400 130,380 L 130,70 Q 130,50 150,50 Z M 270,100 Q 320,100 320,150 L 320,300 Q 320,350 270,350 L 270,320 Q 290,320 290,290 L 290,160 Q 290,130 270,130 Z")',
        'Mug': 'path("M 150,50 L 250,50 Q 270,50 270,70 L 270,380 Q 270,400 250,400 L 150,400 Q 130,400 130,380 L 130,70 Q 130,50 150,50 Z M 270,100 Q 320,100 320,150 L 320,300 Q 320,350 270,350 L 270,320 Q 290,320 290,290 L 290,160 Q 290,130 270,130 Z")',
        'Pillow': 'path("M 50,50 Q 50,20 80,20 L 320,20 Q 350,20 350,50 L 350,350 Q 350,380 320,380 L 80,380 Q 50,380 50,350 Z")',
        'Bag': 'path("M 100,100 L 300,100 L 320,400 L 80,400 Z M 150,100 Q 150,50 200,50 Q 250,50 250,100")',
        'Hat': 'path("M 100,250 Q 100,150 200,150 Q 300,150 300,250 L 380,300 L 380,330 L 20,330 L 20,300 Z")'
    };

    const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ffffff', '#000000'];

    const handleSave = () => {
        const id = Math.random().toString(36).substring(7);
        setDesignId(id);
        setShowQR(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: [color, '#ffffff']
        });
    };

    const handleAddToCart = () => {
        onAddToCart({
            id: Date.now(),
            name: `Custom ${product.category} (${text || 'No Text'})`,
            price: product.price || '₹299 - ₹699',
            image: product.image,
            details: { color, text, textColor, category: product.category }
        });

        confetti({
            particleCount: 50,
            velocity: 30,
            spread: 360,
            origin: { x: 0.9, y: 0.1 }
        });
    };

    return (
        <div className="customizer-layout" style={{ padding: '6rem 2rem 8rem', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
            {/* Immersive Preview Area */}
            <div className="glass-card preview-area" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)', overflow: 'hidden' }}>
                <button
                    className="glass"
                    onClick={() => window.history.back()}
                    style={{ position: 'absolute', top: '2rem', left: '2rem', padding: '0.8rem 1.5rem', borderRadius: '50px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}
                >
                    <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Shop
                </button>

                <div style={{
                    width: '450px',
                    height: '450px',
                    backgroundColor: color,
                    clipPath: shapes[product.category] || shapes['T-Shirt'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(0,0,0,0.3)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                }}>
                    <span style={{
                        color: textColor,
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        maxWidth: '250px',
                        wordBreak: 'break-word',
                        textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        letterSpacing: '2px'
                    }}>
                        {text}
                    </span>
                </div>

                {showQR && (
                    <div className="glass-heavy" style={{ position: 'absolute', bottom: '2rem', right: '2rem', padding: '1.2rem', borderRadius: '24px', textAlign: 'center', animation: 'fadeIn 0.5s ease', border: '1px solid var(--primary)' }}>
                        <p style={{ fontSize: '0.7rem', marginBottom: '0.8rem', opacity: 0.6, fontWeight: '800', letterSpacing: '1px' }}>SHARE DESIGN</p>
                        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '12px' }}>
                            <QRCode value={`${siteUrl}?design=${designId}`} size={100} />
                        </div>
                    </div>
                )}
            </div>

            {/* Studio Controls */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Custom <span className="gradient-text">{product.category}</span></h2>
                    <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>Studio Edition • Handcrafted Design</p>
                </div>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <Palette size={16} color="var(--primary)" /> Selection Palette
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
                        {colors.map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                style={{
                                    height: '45px',
                                    backgroundColor: c,
                                    borderRadius: '12px',
                                    border: color === c ? '3px solid var(--primary)' : '2px solid transparent',
                                    transition: 'var(--transition)',
                                    transform: color === c ? 'scale(1.1)' : 'scale(1)',
                                    boxShadow: color === c ? '0 0 20px var(--primary-glow)' : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <Type size={16} color="var(--primary)" /> Signature Text
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value.toUpperCase())}
                        className="glass"
                        style={{ width: '100%', padding: '1.2rem', color: 'white', borderRadius: '16px', fontSize: '1rem', fontWeight: '600', border: '1px solid var(--glass-border)' }}
                        placeholder="Enter your text..."
                    />
                </div>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <Palette size={16} color="var(--primary)" /> Typography Color
                    </label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {['#ffffff', '#000000', '#ff2d55', '#ffcc00'].map(c => (
                            <button
                                key={c}
                                onClick={() => setTextColor(c)}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: c,
                                    borderRadius: '50%',
                                    border: textColor === c ? '3px solid var(--primary)' : '2px solid var(--glass-border)',
                                    transition: 'var(--transition)'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={handleSave}
                        className="glass"
                        style={{
                            padding: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            borderRadius: '16px',
                            fontWeight: '700'
                        }}
                    >
                        <Share2 size={20} /> Share Studio Link
                    </button>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            padding: '1.2rem',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            borderRadius: '16px',
                            fontWeight: '800',
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 30px var(--primary-glow)'
                        }}
                    >
                        <ShoppingBag size={22} /> Add to Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customizer;
