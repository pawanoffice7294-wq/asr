import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Camera, XCircle } from 'lucide-react';

const Scanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        });

        scanner.render(onScanSuccess, onScanError);

        function onScanSuccess(result) {
            scanner.clear();
            setScanResult(result);
        }

        function onScanError(err) {
            console.warn(err);
        }

        return () => {
            scanner.clear().catch(err => console.error("Failed to clear scanner", err));
        };
    }, []);

    return (
        <div style={{ padding: '6rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass" style={{ borderRadius: '24px', padding: '2rem', textAlign: 'center' }}>
                <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    <QrCode style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Scan QR Code
                </h2>
                <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Point your camera at a design's QR code to view and order</p>

                {!scanResult ? (
                    <div id="reader" style={{ borderRadius: '16px', overflow: 'hidden', border: 'none' }}></div>
                ) : (
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', animation: 'scaleIn 0.3s ease' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Design Found!</h3>
                        <p style={{ wordBreak: 'break-all', marginBottom: '2rem' }}>{scanResult}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="glass"
                            style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white' }}
                        >
                            Scan Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scanner;
