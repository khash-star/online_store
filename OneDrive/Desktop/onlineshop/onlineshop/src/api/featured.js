import apiClient from './client.js';

// Get all featured products
export const getFeatured = async (params = {}) => {
  const response = await apiClient.get('/featured', { params });
  return response.data;
};

// Add featured product (Admin)
export const addFeatured = async (productId, order = 0) => {
  const response = await apiClient.post('/featured', { product_id: productId, order });
  return response.data;
};

// Remove featured product (Admin)
export const removeFeatured = async (id) => {
  const response = await apiClient.delete(`/featured/${id}`);
  return response.data;
};

