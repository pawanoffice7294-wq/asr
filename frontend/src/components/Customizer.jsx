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
    const [userImage, setUserImage] = useState(null);
    const [imageScale, setImageScale] = useState(1);
    const [activeLayer, setActiveLayer] = useState('text'); // 'text' or 'image'

    // Drag and Drop State
    const [textPos, setTextPos] = useState({ x: 50, y: 50 }); // Set to true center by default
    const [imagePos, setImagePos] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [showQR, setShowQR] = useState(false);
    const [designId, setDesignId] = useState('');

    const siteUrl = window.location.origin;

    const shapes = {
        'T-Shirt': 'path("M 100,0 L 300,0 L 300,100 L 400,150 L 350,250 L 300,220 L 300,400 L 100,400 L 100,220 L 50,250 L 0,150 L 100,100 Z")',
        'Hoodie': 'path("M 100,20 L 300,20 L 300,100 L 400,150 L 350,250 L 300,220 L 300,400 L 100,400 L 100,220 L 50,250 L 0,150 L 100,100 Z")',
        'Mug': 'path("M 160,60 L 260,60 Q 300,60 300,100 L 300,380 Q 300,420 260,420 L 160,420 Q 120,420 120,380 L 120,100 Q 120,60 160,60 Z M 300,150 Q 360,150 360,200 L 360,280 Q 360,330 300,330 L 300,290 Q 330,290 330,260 L 330,220 Q 330,190 300,190 Z")',
        'Pillow': 'path("M 50,50 Q 50,20 80,20 L 320,20 Q 350,20 350,50 L 350,350 Q 350,380 320,380 L 80,380 Q 50,380 50,350 Z")',
        'Bag': 'path("M 120,120 L 280,120 L 320,420 L 80,420 Z M 160,120 Q 160,60 200,60 Q 240,60 240,120")',
        'Hat': 'path("M 100,250 Q 100,150 200,150 Q 300,150 300,250 L 380,300 L 380,330 L 20,330 L 20,300 Z")'
    };

    const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ffffff', '#000000'];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (f) => {
                setUserImage(f.target.result);
                setActiveLayer('image');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlUpload = () => {
        const url = prompt("Enter image URL:");
        if (url) {
            setUserImage(url);
            setActiveLayer('image');
        }
    };

    const handleMouseDown = (e, layer) => {
        setIsDragging(true);
        setActiveLayer(layer);
        const pos = layer === 'text' ? textPos : imagePos;
        const rect = e.currentTarget.parentElement.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        setDragOffset({ x: mouseX - pos.x, y: mouseY - pos.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100 - dragOffset.x;
        const y = ((e.clientY - rect.top) / rect.height) * 100 - dragOffset.y;

        if (activeLayer === 'text') setTextPos({ x, y });
        else setImagePos({ x, y });
    };

    const handleMouseUp = () => setIsDragging(false);

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
            details: {
                color, text, textColor, category: product.category,
                userImage, textPos, imagePos, imageScale
            }
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
            <div
                className="glass-card preview-area"
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'auto' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <button
                    className="glass"
                    onClick={() => window.history.back()}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        left: '1.5rem',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '12px',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                >
                    <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back
                </button>

                <div
                    className="product-canvas"
                    style={{
                        width: 'min(450px, 80vw)',
                        height: 'min(450px, 80vw)',
                        backgroundColor: color,
                        clipPath: shapes[product.category] || shapes['T-Shirt'],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: isDragging ? 'none' : 'background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.2)',
                        transform: `perspective(1000px) rotateY(${product.category === 'Mug' ? '-10deg' : '-5deg'})`,
                        position: 'relative',
                        marginTop: '2rem' // Give space for the back button on smaller screens
                    }}
                >
                    {/* Text Overlay */}
                    <div
                        onMouseDown={(e) => handleMouseDown(e, 'text')}
                        style={{
                            position: 'absolute',
                            left: `${textPos.x}%`,
                            top: `${textPos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            cursor: 'grab',
                            userSelect: 'none',
                            border: activeLayer === 'text' ? '1px dashed rgba(255,255,255,0.4)' : 'none',
                            padding: '10px',
                            zIndex: 5
                        }}
                    >
                        <span style={{
                            color: textColor,
                            fontSize: '2rem',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            maxWidth: '250px',
                            wordBreak: 'break-word',
                            textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            pointerEvents: 'none'
                        }}>
                            {text}
                        </span>
                    </div>

                    {/* Image Overlay */}
                    {userImage && (
                        <div
                            onMouseDown={(e) => handleMouseDown(e, 'image')}
                            style={{
                                position: 'absolute',
                                left: `${imagePos.x}%`,
                                top: `${imagePos.y}%`,
                                transform: `translate(-50%, -50%) scale(${imageScale})`,
                                cursor: 'grab',
                                userSelect: 'none',
                                border: activeLayer === 'image' ? '1px dashed rgba(255,255,255,0.4)' : 'none',
                                width: '150px',
                                height: '150px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 4
                            }}
                        >
                            <img src={userImage} alt="userupload" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
                        </div>
                    )}
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
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Personal <span className="gradient-text">Studio</span></h2>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Customize {product.category} • Drag to Position</p>
                </div>

                {/* Layer Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--glass)', padding: '0.4rem', borderRadius: '12px' }}>
                    <button
                        onClick={() => setActiveLayer('text')}
                        style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', background: activeLayer === 'text' ? 'var(--primary)' : 'transparent', color: activeLayer === 'text' ? 'white' : 'var(--text-muted)', fontSize: '0.85rem' }}
                    >
                        Text
                    </button>
                    <button
                        onClick={() => setActiveLayer('image')}
                        style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', background: activeLayer === 'image' ? 'var(--primary)' : 'transparent', color: activeLayer === 'image' ? 'white' : 'var(--text-muted)', fontSize: '0.85rem' }}
                    >
                        Logo
                    </button>
                </div>

                {activeLayer === 'text' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Edit Text</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value.toUpperCase())}
                                className="glass"
                                style={{ width: '100%', padding: '1rem', color: 'white', borderRadius: '12px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Typography</label>
                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                {['#ffffff', '#000000', '#ff2d55', '#ffcc00'].map(c => (
                                    <button key={c} onClick={() => setTextColor(c)} style={{ width: '30px', height: '30px', backgroundColor: c, borderRadius: '50%', border: textColor === c ? '2px solid var(--primary)' : '1px solid var(--glass-border)' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Upload Artwork</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                <label className="glass" style={{ padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <Upload size={18} />
                                    <span style={{ fontSize: '0.7rem' }}>Local File</span>
                                    <input type="file" hidden onChange={handleFileUpload} accept="image/*" />
                                </label>
                                <button onClick={handleUrlUpload} className="glass" style={{ padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <Plus size={18} />
                                    <span style={{ fontSize: '0.7rem' }}>Image URL</span>
                                </button>
                            </div>
                        </div>
                        {userImage && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Scale Size</label>
                                <input
                                    type="range" min="0.5" max="2" step="0.1" value={imageScale}
                                    onChange={(e) => setImageScale(parseFloat(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--primary)' }}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Base Color</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                        {colors.map(c => (
                            <button key={c} onClick={() => setColor(c)} style={{ height: '35px', backgroundColor: c, borderRadius: '8px', border: color === c ? '2px solid var(--primary)' : '1px solid transparent' }} />
                        ))}
                    </div>
                </div>

                <div style={{ background: 'var(--glass)', padding: '1.2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Alignment & Tools</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        <button onClick={() => {
                            if (activeLayer === 'text') setTextPos(p => ({ ...p, y: 20 }));
                            else setImagePos(p => ({ ...p, y: 30 }));
                        }} className="glass" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem' }}>Top</button>
                        <button onClick={() => {
                            if (activeLayer === 'text') setTextPos({ x: 50, y: 40 });
                            else setImagePos({ x: 50, y: 50 });
                        }} className="glass" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem', border: '1px solid var(--primary)' }}>Center</button>
                        <button onClick={() => {
                            if (activeLayer === 'text') setTextPos(p => ({ ...p, y: 70 }));
                            else setImagePos(p => ({ ...p, y: 80 }));
                        }} className="glass" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem' }}>Bottom</button>
                        <button onClick={() => {
                            if (activeLayer === 'text') setTextPos(p => ({ ...p, x: 30 }));
                            else setImagePos(p => ({ ...p, x: 30 }));
                        }} className="glass" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem' }}>Left</button>
                        <button onClick={() => {
                            if (activeLayer === 'text') setTextPos(p => ({ ...p, y: 50 }));
                            else setImagePos(p => ({ ...p, y: 50 }));
                        }} className="glass" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem' }}>Mid</button>
                        <button onClick={() => {
                            if (activeLayer === 'text') setTextPos(p => ({ ...p, x: 70 }));
                            else setImagePos(p => ({ ...p, x: 70 }));
                        }} className="glass" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem' }}>Right</button>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button onClick={handleSave} className="glass" style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>Share Session</button>
                    </div>
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
                            fontSize: '1rem',
                            boxShadow: '0 10px 30px var(--primary-glow)'
                        }}
                    >
                        <ShoppingBag size={20} /> Add to Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customizer;
