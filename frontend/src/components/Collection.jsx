import React, { useRef, useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Star, Plus, Download } from 'lucide-react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { getProducts } from '../utils/api';

const Collection = ({ onCustomize, onAddToCart }) => {
    const siteUrl = window.location.origin;
    const qrRef = useRef(null);

    const downloadQR = () => {
        if (qrRef.current === null) return;
        toPng(qrRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'ASR-Enterprises-Store-QR.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('Could not download QR code', err);
            });
    };

    const categories = [
        { id: 'all', name: 'All Access', image: '/products/white_tshirt_asr_1769234711724.png' },
        { id: 'T-Shirt', name: 'Premium Tee', image: '/products/white_tshirt_asr_1769234711724.png' },
        { id: 'Hoodie', name: 'Elite Hoodie', image: '/products/hoodie_asr_white_1769235205914.png' },
        { id: 'Bag', name: 'Eco Carry', image: '/products/ecobag_asr_white_1769235236150.png' },
        { id: 'Mug', name: 'Pro Mug', image: '/products/white_mug_asr_1769234726825.png' },
        { id: 'Pillow', name: 'Soft Rest', image: '/products/white_pillow_asr_1769234741512.png' },
    ];

    const [products, setProducts] = useState([
        { id: 1, name: 'Signature Tee', price: 'Rs 99 - 999', image: '/products/white_tshirt_asr_1769234711724.png', category: 'T-Shirt', featured: true },
        { id: 2, name: 'Oversized Hoodie', price: 'Rs 99 - 999', image: '/products/hoodie_asr_white_1769235205914.png', category: 'Hoodie' },
        { id: 3, name: 'Designer Tote', price: 'Rs 99 - 999', image: '/products/ecobag_asr_white_1769235236150.png', category: 'Bag' },
        { id: 4, name: 'Pro Snapback', price: 'Rs 99 - 999', image: '/products/snapback_asr_white_1769235221302.png', category: 'Hat' },
        { id: 5, name: 'Artisan Mug', price: 'Rs 99 - 999', image: '/products/white_mug_asr_1769234726825.png', category: 'Mug' },
        { id: 6, name: 'Cloud Pillow', price: 'Rs 99 - 999', image: '/products/white_pillow_asr_1769234741512.png', category: 'Pillow', featured: true },
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                console.log("Fetched products from API:", data);
                if (data && data.length > 0) {
                    setProducts(data.map(p => ({
                        id: p.id,
                        name: p.name,
                        price: 'Rs 99 - 999', // User requested fixed price label for all products
                        image: p.imagePath,
                        category: p.category,
                        featured: p.category === 'T-Shirt' || p.category === 'Pillow'
                    })));
                } else {
                    console.log("API returned no products, using fallback.");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                console.log("Using offline mode for products");
            }
        };
        fetchProducts();
    }, []);

    return (
        <div style={{ paddingBottom: '8rem' }}>
            {/* Desktop Hero Section */}
            <header className="desktop-only" style={{ padding: '8rem 2rem 4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                    Elevate Your <span className="gradient-text">Identity</span>
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.6, maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Experience premium customization with ASR Enterprises. Where quality craftsmanship meets your unique vision.
                </p>
                <div className="glass-card" style={{ display: 'inline-flex', padding: '1.5rem 2.5rem', alignItems: 'center', gap: '2rem' }}>
                    <div ref={qrRef} style={{ background: 'white', padding: '0.8rem', borderRadius: '12px' }}>
                        <QRCode value={siteUrl} size={80} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.3rem' }}>ASR STUDIO MOBILE</div>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem' }}>Take the design studio with you.</p>
                        <button onClick={downloadQR} className="glass" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', borderRadius: '50px' }}>
                            <Download size={14} /> Get Access
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Story Header */}
            <div className="mobile-only" style={{ padding: '5rem 1rem 1rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Discover <span className="gradient-text">ASR</span></h2>
                    <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>Premium Custom Essentials</p>
                </div>

                <div className="stories-container">
                    {categories.map(cat => (
                        <div key={cat.id} className="story-item">
                            <div className="story-circle">
                                <div className="story-inner">
                                    <img src={cat.image} alt={cat.name} />
                                </div>
                            </div>
                            <span className="story-label">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="lifestyle-grid">
                {products.map(p => (
                    <div
                        key={p.id}
                        className="glass-card"
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            aspectRatio: '4/5', // Unified height for all cards
                            gridColumn: 'auto'
                        }}
                    >
                        <div
                            style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'pointer' }}
                            onClick={() => onCustomize(p)}
                        >
                            <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }} />
                        </div>

                        <div style={{ padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>{p.category}</div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{p.name}</h3>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '1.2rem' }}>{p.price}</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem' }}>
                                <button
                                    onClick={() => onAddToCart(p)}
                                    style={{ flex: 1, background: 'var(--primary)', color: 'white', padding: '0.8rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}
                                >
                                    Quick Add
                                </button>
                                <button
                                    onClick={() => onCustomize(p)}
                                    className="glass"
                                    style={{ width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {p.featured && (
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--secondary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>
                                TOP PICK
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collection;
