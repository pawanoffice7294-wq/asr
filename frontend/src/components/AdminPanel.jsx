import React, { useState, useEffect } from 'react';
import { Plus, Trash, Edit, Save, Video, Image as ImageIcon } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../utils/api';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: '', priceRange: '', category: '', imagePath: '', reelsUrl: '', description: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateProduct(editId, { id: editId, ...form });
                setIsEditing(false);
                setEditId(null);
            } else {
                await createProduct(form);
            }
            setForm({ name: '', priceRange: '', category: '', imagePath: '', reelsUrl: '', description: '' });
            loadProducts();
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setIsEditing(true);
        setEditId(product.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                <p style={{ opacity: 0.6 }}>Manage products, prices, and media.</p>
            </div>

            {/* Editor Form */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                    {isEditing ? 'Update Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Product Name</label>
                        <input
                            required name="name" value={form.name} onChange={handleChange}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Price / Range</label>
                        <input
                            required name="priceRange" value={form.priceRange} onChange={handleChange} placeholder="e.g. ₹499"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Category</label>
                        <select
                            required name="category" value={form.category} onChange={handleChange}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                        >
                            <option value="">Select Category</option>
                            <option value="T-Shirt">T-Shirt</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Bag">Bag</option>
                            <option value="Mug">Mug</option>
                            <option value="Hat">Hat</option>
                            <option value="Pillow">Pillow</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Image URL</label>
                        <input
                            required name="imagePath" value={form.imagePath} onChange={handleChange} placeholder="/products/..."
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Reels / Video URL</label>
                        <input
                            name="reelsUrl" value={form.reelsUrl || ''} onChange={handleChange} placeholder="https://..."
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                        />
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Description</label>
                        <textarea
                            name="description" value={form.description} onChange={handleChange}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: 'white', minHeight: '80px' }}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setForm({ name: '', priceRange: '', category: '', imagePath: '', reelsUrl: '', description: '' }); }}
                                style={{ padding: '0.8rem 2rem', borderRadius: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            style={{ padding: '0.8rem 2rem', borderRadius: '10px', background: 'var(--primary)', color: 'white', fontWeight: 'bold' }}
                        >
                            {isEditing ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Product List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {products.map(p => (
                    <div key={p.id} className="glass-card" style={{ padding: '1rem', position: 'relative' }}>
                        <div style={{ height: '200px', background: 'white', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src={p.imagePath} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{p.name}</h3>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{p.category}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{p.priceRange}</span>
                            {p.reelsUrl && <Video size={16} color="var(--accent)" />}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => handleEdit(p)}
                                style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <Edit size={16} /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
