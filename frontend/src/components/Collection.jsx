import React, { useRef } from 'react';
import { ShoppingBag, ArrowRight, Star, Plus, Download } from 'lucide-react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

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

    const products = [
        { id: 1, name: 'Premium Tee', price: '₹299 - ₹699', image: '/products/white_tshirt_asr_1769234711724.png', category: 'T-Shirt' },
        { id: 2, name: 'Hoodie Pro', price: '₹899 - ₹1599', image: '/products/hoodie_asr_white_1769235205914.png', category: 'Hoodie' },
        { id: 3, name: 'Eco Bag', price: '₹149 - ₹399', image: '/products/ecobag_asr_white_1769235236150.png', category: 'Bag' },
        { id: 4, name: 'Snapback', price: '₹199 - ₹499', image: '/products/snapback_asr_white_1769235221302.png', category: 'Hat' },
        { id: 5, name: 'Classic Cup', price: '₹199 - ₹499', image: '/products/white_mug_asr_1769234726825.png', category: 'Cup' },
        { id: 6, name: 'Travel Mug', price: '₹249 - ₹599', image: '/products/white_mug_asr_1769234726825.png', category: 'Mug' },
        { id: 7, name: 'Soft Pillow', price: '₹349 - ₹799', image: '/products/white_pillow_asr_1769234741512.png', category: 'Pillow' },
    ];

    return (
        <div style={{ padding: '6rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Welcome to <span className="gradient-text">ASR Enterprises</span>
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
                    Quality Prints, Personal Touch.
                </p>

                <div className="glass" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '2rem', maxWidth: '500px' }}>
                    <div ref={qrRef} style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'flex' }}>
                        <QRCode value={siteUrl} size={100} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>Share Our Store</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>Scan or download this QR to visit ASR Enterprises from your mobile device.</p>
                        <button
                            onClick={downloadQR}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.8rem',
                                padding: '0.5rem 1rem',
                                background: 'white',
                                color: 'black',
                                borderRadius: '50px',
                                fontWeight: 'bold'
                            }}
                        >
                            <Download size={14} /> Download QR
                        </button>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {products.map(p => (
                    <div key={p.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', height: '300px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img
                                src={p.image}
                                alt={p.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: p.category === 'Mug' ? 'scaleY(1.2) translateY(-10px)' : 'none',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: p.category === 'Mug' ? 'var(--secondary)' : 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                {p.category === 'Mug' ? 'ASR Pro Series' : 'ASR Branded'}
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem' }}>{p.name}</h3>
                                <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
                            </div>
                            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2rem' }}>{p.price}</p>

                            <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button
                                    onClick={() => onCustomize(p)}
                                    style={{
                                        padding: '1rem',
                                        background: 'var(--surface-light)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Customize <ArrowRight size={16} />
                                </button>
                                <button
                                    onClick={() => onAddToCart(p)}
                                    style={{
                                        padding: '1rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <Plus size={16} /> Add to Bag
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collection;
