import React, { useState } from 'react';
import { Palette, Type, Upload, Save, Share2, ShoppingBag, Plus } from 'lucide-react';
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
        <div style={{ padding: '6rem 2rem 2rem', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Preview Area */}
            <div className="glass" style={{ borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
                <div style={{
                    width: '400px',
                    height: '400px',
                    backgroundColor: color,
                    clipPath: shapes[product.category] || shapes['T-Shirt'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.5s ease',
                    boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)'
                }}>
                    <span style={{
                        color: textColor,
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        maxWidth: '200px',
                        wordBreak: 'break-word',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        {text}
                    </span>
                </div>

                {showQR && (
                    <div className="glass" style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '1rem', borderRadius: '16px', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
                        <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem', opacity: 0.7 }}>SCAN TO VIEW</p>
                        <QRCode value={`${siteUrl}?design=${designId}`} size={128} bgColor="transparent" fgColor="#ffffff" />
                    </div>
                )}
            </div>

            {/* Controls Area */}
            <div className="glass" style={{ borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <h2 className="gradient-text" style={{ fontSize: '1.5rem' }}>{product.name} Studio</h2>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
                        <Palette size={16} /> Base Color
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {colors.map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                style={{
                                    height: '35px',
                                    backgroundColor: c,
                                    borderRadius: '8px',
                                    border: color === c ? '2px solid white' : 'none',
                                    boxShadow: color === c ? '0 0 10px white' : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
                        <Type size={16} /> Custom Text
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value.toUpperCase())}
                        className="glass"
                        style={{ width: '100%', padding: '0.8rem', color: 'white', borderRadius: '12px' }}
                        placeholder="Type here..."
                    />
                </div>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
                        <Palette size={16} /> Text Color
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {['#ffffff', '#000000', '#ff0000', '#ffff00'].map(c => (
                            <button
                                key={c}
                                onClick={() => setTextColor(c)}
                                style={{
                                    height: '35px',
                                    backgroundColor: c,
                                    borderRadius: '8px',
                                    border: textColor === c ? '2px solid white' : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <button
                        onClick={handleSave}
                        className="glass"
                        style={{
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Save size={18} /> Save Design
                    </button>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            padding: '1rem',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={18} /> Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customizer;
