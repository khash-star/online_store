import apiClient from './client.js';

// Get all products
export const getProducts = async (params = {}) => {
  const response = await apiClient.get('/products', { params });
  return response.data;
};

// Get single product
export const getProduct = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// Create product (Admin)
export const createProduct = async (data) => {
  const response = await apiClient.post('/products', data);
  return response.data;
};

// Update product (Admin)
export const updateProduct = async (id, data) => {
  const response = await apiClient.put(`/products/${id}`, data);
  return response.data;
};

// Delete product (Admin)
export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

