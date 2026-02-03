const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5288';

export const saveDesign = async (baseProductId, config) => {
    try {
        const response = await fetch(`${API_URL}/api/Customization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                baseProductId,
                config
            })
        });

        if (!response.ok) throw new Error('Failed to save design');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getDesign = async (designId) => {
    const response = await fetch(`${API_URL}/api/Customization/${designId}`);
    if (!response.ok) throw new Error('Design not found');
    return await response.json();
};

// Product Management
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/api/Product`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
};

export const createProduct = async (product) => {
    const response = await fetch(`${API_URL}/api/Product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
};

export const updateProduct = async (id, product) => {
    const response = await fetch(`${API_URL}/api/Product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return true;
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/api/Product/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return true;
};

// Auth
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json();
};

export const signupUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/Auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Signup failed');
    return await response.json();
};
