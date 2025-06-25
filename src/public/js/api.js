const API = {
    baseUrl: '/api',

    // Auth endpoints
    auth: {
        register: async (userData) => {
            const response = await fetch(`${API.baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return response.json();
        },

        login: async (credentials) => {
            const response = await fetch(`${API.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            return response.json();
        },

        getProfile: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        }
    },

    // Product endpoints
    products: {
        getAll: async () => {
            const response = await fetch(`${API.baseUrl}/products`);
            return response.json();
        },

        getById: async (id) => {
            const response = await fetch(`${API.baseUrl}/products/${id}`);
            return response.json();
        },

        getByCategory: async (category) => {
            const response = await fetch(`${API.baseUrl}/products/category/${encodeURIComponent(category)}`);
            return response.json();
        },

        search: async (query) => {
            const response = await fetch(`${API.baseUrl}/products/search?query=${encodeURIComponent(query)}`);
            return response.json();
        },

        create: async (productData) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            return response.json();
        },

        update: async (id, productData) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            return response.json();
        },

        delete: async (id) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        }
    },

    // Cart endpoints
    cart: {
        get: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        add: async (productData) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            return response.json();
        },

        update: async (itemId, quantity) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/cart/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity })
            });
            return response.json();
        },

        remove: async (itemId) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        clear: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/cart`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        }
    },

    // Order endpoints
    orders: {
        create: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        getAll: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        getById: async (orderId) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/orders/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        updateStatus: async (orderId, status) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API.baseUrl}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            return response.json();
        }
    }
};

// Helper function to handle API errors
API.handleError = (error) => {
    console.error('API Error:', error);
    if (error.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/auth.html';
    }
    throw error;
};

// Add error handling to all API calls
Object.keys(API).forEach(category => {
    if (typeof API[category] === 'object') {
        Object.keys(API[category]).forEach(method => {
            const originalMethod = API[category][method];
            API[category][method] = async (...args) => {
                try {
                    const result = await originalMethod(...args);
                    if (result.error) {
                        throw result;
                    }
                    return result;
                } catch (error) {
                    API.handleError(error);
                }
            };
        });
    }
});

// Export API object
window.API = API; 