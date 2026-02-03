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
        <div className="customizer-studio" style={{
            minHeight: '100vh',
            background: '#0a0a0c',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* 1. Studio Header */}
            <nav style={{
                height: '70px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                background: 'rgba(10,10,12,0.8)',
                backdropFilter: 'blur(20px)',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                    >
                        <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> Exit Studio
                    </button>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <span style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '1rem', textTransform: 'uppercase' }}>
                        {product.category} <span style={{ opacity: 0.4 }}>Configurator</span>
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleSave} className="glass" style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Share2 size={16} /> Share
                    </button>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            background: 'var(--primary)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.6rem 1.4rem',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px var(--primary-glow)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <ShoppingBag size={16} /> Add to Collection
                    </button>
                </div>
            </nav>

            {/* 2. Studio Workspace */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Product Stage (Left) */}
                <main
                    style={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(circle at center, #1a1a20 0%, #0a0a0c 100%)',
                        cursor: isDragging ? 'grabbing' : 'auto'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Shadow Pedestal */}
                    <div style={{
                        position: 'absolute',
                        bottom: '15%',
                        width: '400px',
                        height: '40px',
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
                        filter: 'blur(10px)'
                    }}></div>

                    {/* Canvas Container */}
                    <div
                        className="product-canvas-stage"
                        style={{
                            width: 'min(600px, 80%)',
                            height: 'min(600px, 80%)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2
                        }}
                    >
                        <div
                            className="product-canvas"
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: color,
                                clipPath: shapes[product.category] || shapes['T-Shirt'],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: isDragging ? 'none' : 'background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                                boxShadow: '0 60px 120px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.4)',
                                transform: `perspective(2000px) rotateY(${product.category === 'Mug' ? '-8deg' : '-4deg'}) rotateX(2deg)`,
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
                                    border: activeLayer === 'text' ? '2px solid var(--primary)' : '2px dashed transparent',
                                    padding: '12px',
                                    zIndex: 5,
                                    borderRadius: '4px',
                                    transition: 'border-color 0.3s'
                                }}
                            >
                                <span style={{
                                    color: textColor,
                                    fontSize: 'min(3.5rem, 6vw)',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    textAlign: 'center',
                                    maxWidth: '300px',
                                    wordBreak: 'break-word',
                                    textShadow: '0 10px 20px rgba(0,0,0,0.4)',
                                    pointerEvents: 'none',
                                    letterSpacing: '2px',
                                    lineHeight: 1
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
                                        border: activeLayer === 'image' ? '2px solid var(--primary)' : '2px dashed transparent',
                                        width: '200px',
                                        height: '200px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 4,
                                        borderRadius: '4px',
                                        transition: 'border-color 0.3s'
                                    }}
                                >
                                    <img src={userImage} alt="userupload" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* QR Code Floating Tag */}
                    {showQR && (
                        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', animation: 'slideRight 0.5s ease-out', zIndex: 1000 }}>
                            <div className="glass-heavy" style={{ padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ background: '#fff', padding: '0.6rem', borderRadius: '12px', marginBottom: '0.8rem' }}>
                                    <QRCode value={`${siteUrl}?design=${designId}`} size={120} />
                                </div>
                                <p style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.6, letterSpacing: '1px', textAlign: 'center' }}>SCAN TO PREVIEW</p>
                            </div>
                        </div>
                    )}
                </main>

                {/* Control Panel (Right) */}
                <aside style={{
                    width: '420px',
                    background: '#0f0f12',
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 2
                }}>
                    {/* Panel Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {[
                            { id: 'text', icon: <Type size={18} />, label: 'Graphics' },
                            { id: 'image', icon: <Upload size={18} />, label: 'Upload' },
                            { id: 'style', icon: <Palette size={18} />, label: 'Product' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveLayer(tab.id === 'style' ? activeLayer : tab.id)}
                                style={{
                                    flex: 1,
                                    padding: '1.5rem 0',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: (activeLayer === tab.id || (tab.id === 'style' && activeLayer !== 'text' && activeLayer !== 'image')) ? `2px solid var(--primary)` : '2px solid transparent',
                                    color: (activeLayer === tab.id || (tab.id === 'style' && activeLayer !== 'text' && activeLayer !== 'image')) ? '#fff' : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Properties */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

                        {/* Text Controls Content */}
                        {activeLayer === 'text' && (
                            <div style={{ animation: 'fadeIn 0.3s ease' }}>
                                <section style={{ marginBottom: '2.5rem' }}>
                                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '1.2rem' }}>Headline Text</h3>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value.toUpperCase())}
                                        placeholder="Type something..."
                                        style={{
                                            width: '100%',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            color: '#fff',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            minHeight: '80px',
                                            resize: 'none'
                                        }}
                                    />
                                </section>

                                <section style={{ marginBottom: '2.5rem' }}>
                                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '1.2rem' }}>Text Color</h3>
                                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                        {['#ffffff', '#000000', '#ff2d55', '#ffcc00', '#6366f1', '#10b981'].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setTextColor(c)}
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    backgroundColor: c,
                                                    borderRadius: '50%',
                                                    border: textColor === c ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                                    cursor: 'pointer',
                                                    transform: textColor === c ? 'scale(1.1)' : 'scale(1)',
                                                    transition: 'all 0.2s'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Image Controls Content */}
                        {activeLayer === 'image' && (
                            <div style={{ animation: 'fadeIn 0.3s ease' }}>
                                <section style={{ marginBottom: '2.5rem' }}>
                                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '1.2rem' }}>Brand Identity</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <label style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px dashed rgba(255,255,255,0.1)',
                                            borderRadius: '16px',
                                            padding: '2rem 1rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.3s'
                                        }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                                            <Upload size={24} style={{ opacity: 0.5 }} />
                                            <span style={{ fontSize: '0.7rem', fontWeight: '700' }}>DEVICE</span>
                                            <input type="file" hidden onChange={handleFileUpload} accept="image/*" />
                                        </label>
                                        <button
                                            onClick={handleUrlUpload}
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '16px',
                                                padding: '2rem 1rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '0.8rem',
                                                cursor: 'pointer',
                                                color: '#fff'
                                            }}
                                        >
                                            <Plus size={24} style={{ opacity: 0.5 }} />
                                            <span style={{ fontSize: '0.7rem', fontWeight: '700' }}>WEB URL</span>
                                        </button>
                                    </div>
                                </section>

                                {userImage && (
                                    <section style={{ marginBottom: '2.5rem' }}>
                                        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '1.2rem' }}>Image Scaling</h3>
                                        <input
                                            type="range" min="0.5" max="2.5" step="0.05" value={imageScale}
                                            onChange={(e) => setImageScale(parseFloat(e.target.value))}
                                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.6rem', opacity: 0.4 }}>
                                            <span>SMALL</span>
                                            <span>LARGE</span>
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}

                        {/* Global Styles Section */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', marginTop: '1rem' }}>
                            <section style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '1.2rem' }}>Product Color</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                    {colors.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            style={{
                                                height: '44px',
                                                backgroundColor: c,
                                                borderRadius: '12px',
                                                border: color === c ? `2px solid var(--primary)` : '1px solid rgba(255,255,255,0.1)',
                                                cursor: 'pointer',
                                                boxShadow: color === c ? `0 0 15px ${c}40` : 'none'
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>

                            <section style={{ marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '1.2rem' }}>Positioning</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                    {['Top', 'Center', 'Bottom', 'Left', 'Mid', 'Right'].map(tool => (
                                        <button
                                            key={tool}
                                            onClick={() => {
                                                const yMap = { Top: 25, Center: 50, Bottom: 75, Mid: 50 };
                                                const xMap = { Left: 25, Mid: 50, Right: 75, Center: 50 };
                                                if (activeLayer === 'text') {
                                                    setTextPos(p => ({
                                                        x: xMap[tool] !== undefined ? xMap[tool] : p.x,
                                                        y: yMap[tool] !== undefined ? yMap[tool] : p.y
                                                    }));
                                                } else if (activeLayer === 'image') {
                                                    setImagePos(p => ({
                                                        x: xMap[tool] !== undefined ? xMap[tool] : p.x,
                                                        y: yMap[tool] !== undefined ? yMap[tool] : p.y
                                                    }));
                                                }
                                            }}
                                            className="glass"
                                            style={{ padding: '0.8rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '700' }}
                                        >
                                            {tool}
                                        </button>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: '1rem', fontStyle: 'italic' }}>
                                    Tip: You can also click and drag elements directly on the product.
                                </p>
                            </section>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Customizer;
