import apiClient from './client.js';

// Get user's orders
export const getOrders = async (params = {}) => {
  const response = await apiClient.get('/orders', { params });
  return response.data;
};

// Get single order
export const getOrder = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

// Create order
export const createOrder = async (data) => {
  const response = await apiClient.post('/orders', data);
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  const response = await apiClient.get('/orders/admin/all');
  return response.data;
};

// Update order (Admin)
export const updateOrder = async (id, data) => {
  const response = await apiClient.put(`/orders/${id}`, data);
  return response.data;
};

