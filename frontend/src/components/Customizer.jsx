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
        <div className="customizer-layout" style={{
            padding: '1rem 2rem 5rem',
            maxWidth: '100vw',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--background)'
        }}>
            {/* 1. Top Navigation: Absolutely isolated at the top left */}
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 1000 }}>
                <button
                    className="glass"
                    onClick={() => window.history.back()}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                >
                    <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Shop
                </button>
            </div>

            {/* 2. Main Studio - Using a balanced grid to keep the center Column perfectly centered on the page */}
            <main style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(420px, 1fr) minmax(auto, 600px) minmax(420px, 1fr)',
                gap: '2rem',
                flex: 1,
                alignItems: 'center',
                paddingTop: '5rem'
            }}>
                {/* Left Spacer - Keeps the middle balanced */}
                <div className="desktop-only"></div>

                {/* Center Column: The T-Shirt Container - ONLY T-SHIRT HERE */}
                <div
                    className="glass-card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.5) 0%, rgba(2, 6, 23, 0.8) 100%)',
                        overflow: 'hidden',
                        cursor: isDragging ? 'grabbing' : 'auto',
                        borderRadius: '40px',
                        aspectRatio: '1/1',
                        width: '100%',
                        boxShadow: '0 30px 100px rgba(0,0,0,0.7)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="product-canvas"
                        style={{
                            width: '85%',
                            height: '85%',
                            backgroundColor: color,
                            clipPath: shapes[product.category] || shapes['T-Shirt'],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: isDragging ? 'none' : 'background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.3)',
                            transform: `perspective(1000px) rotateY(${product.category === 'Mug' ? '-10deg' : '-5deg'})`,
                            position: 'relative'
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
                                border: activeLayer === 'text' ? '1px dashed rgba(255,255,255,0.6)' : 'none',
                                padding: '10px',
                                zIndex: 5
                            }}
                        >
                            <span style={{
                                color: textColor,
                                fontSize: '2.2rem',
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                maxWidth: '280px',
                                wordBreak: 'break-word',
                                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                pointerEvents: 'none',
                                letterSpacing: '1px'
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
                                    border: activeLayer === 'image' ? '1px dashed rgba(255,255,255,0.6)' : 'none',
                                    width: '180px',
                                    height: '180px',
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
                </div>

                {/* Right Column: Studio Controls Side Panel */}
                <aside className="glass-card" style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    borderRadius: '32px',
                    width: '400px'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>Personal <span className="gradient-text">Studio</span></h2>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Customize {product.category}</p>
                    </div>

                    {/* Layer Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--glass)', padding: '0.4rem', borderRadius: '12px' }}>
                        <button
                            onClick={() => setActiveLayer('text')}
                            style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', background: activeLayer === 'text' ? 'var(--primary)' : 'transparent', color: activeLayer === 'text' ? 'white' : 'var(--text-muted)', fontSize: '0.8rem' }}
                        >
                            Text
                        </button>
                        <button
                            onClick={() => setActiveLayer('image')}
                            style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', background: activeLayer === 'image' ? 'var(--primary)' : 'transparent', color: activeLayer === 'image' ? 'white' : 'var(--text-muted)', fontSize: '0.8rem' }}
                        >
                            Logo
                        </button>
                    </div>

                    {activeLayer === 'text' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', animation: 'fadeIn 0.3s ease' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Edit Text</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value.toUpperCase())}
                                    className="glass"
                                    style={{ width: '100%', padding: '0.8rem', color: 'white', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Typography</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {['#ffffff', '#000000', '#ff2d55', '#ffcc00'].map(c => (
                                        <button key={c} onClick={() => setTextColor(c)} style={{ width: '28px', height: '28px', backgroundColor: c, borderRadius: '50%', border: textColor === c ? '2px solid var(--primary)' : '1px solid var(--glass-border)' }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', animation: 'fadeIn 0.3s ease' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Upload Artwork</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                    <label className="glass" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                        <Upload size={16} />
                                        <span style={{ fontSize: '0.65rem' }}>Local File</span>
                                        <input type="file" hidden onChange={handleFileUpload} accept="image/*" />
                                    </label>
                                    <button onClick={handleUrlUpload} className="glass" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                                        <Plus size={16} />
                                        <span style={{ fontSize: '0.65rem' }}>Image URL</span>
                                    </button>
                                </div>
                            </div>
                            {userImage && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Scale Size</label>
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
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Base Color</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                            {colors.map(c => (
                                <button key={c} onClick={() => setColor(c)} style={{ height: '30px', backgroundColor: c, borderRadius: '8px', border: color === c ? '2px solid var(--primary)' : '1px solid transparent' }} />
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'var(--glass)', padding: '1rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Alignment Tools</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                            {['Top', 'Center', 'Bottom', 'Left', 'Mid', 'Right'].map(tool => (
                                <button key={tool} onClick={() => {
                                    const yMap = { Top: 25, Center: 50, Bottom: 75, Mid: 50 };
                                    const xMap = { Left: 25, Mid: 50, Right: 75, Center: 50 };
                                    if (activeLayer === 'text') {
                                        setTextPos(p => ({
                                            x: xMap[tool] !== undefined ? xMap[tool] : p.x,
                                            y: yMap[tool] !== undefined ? yMap[tool] : p.y
                                        }));
                                    } else {
                                        setImagePos(p => ({
                                            x: xMap[tool] !== undefined ? xMap[tool] : p.x,
                                            y: yMap[tool] !== undefined ? yMap[tool] : p.y
                                        }));
                                    }
                                }} className="glass" style={{ padding: '0.5rem', borderRadius: '8px', fontSize: '0.7rem' }}>{tool}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <button onClick={handleSave} className="glass" style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Share2 size={16} /> Share Link
                        </button>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.6rem',
                                borderRadius: '16px',
                                fontWeight: '800',
                                fontSize: '0.95rem',
                                boxShadow: '0 10px 30px var(--primary-glow)'
                            }}
                        >
                            <ShoppingBag size={18} /> Add to Bag
                        </button>
                    </div>
                </aside>

                {/* Secondary QR Overlay - Fixed to screen, not inside t-shirt container */}
                {showQR && (
                    <div className="glass-heavy" style={{ position: 'fixed', bottom: '2rem', right: '2rem', padding: '1.2rem', borderRadius: '24px', textAlign: 'center', animation: 'fadeIn 0.5s ease', border: '1px solid var(--primary)', zIndex: 1000 }}>
                        <p style={{ fontSize: '0.7rem', marginBottom: '0.8rem', opacity: 0.6, fontWeight: '800', letterSpacing: '1px' }}>SCAN TO SHARE</p>
                        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '12px' }}>
                            <QRCode value={`${siteUrl}?design=${designId}`} size={120} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Customizer;
