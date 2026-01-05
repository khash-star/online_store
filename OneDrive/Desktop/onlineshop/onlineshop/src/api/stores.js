import apiClient from './client.js';

// Get all stores
export const getStores = async (params = {}) => {
  const response = await apiClient.get('/stores', { params });
  return response.data;
};

// Create store (Admin)
export const createStore = async (data) => {
  const response = await apiClient.post('/stores', data);
  return response.data;
};

// Update store (Admin)
export const updateStore = async (id, data) => {
  const response = await apiClient.put(`/stores/${id}`, data);
  return response.data;
};

// Delete store (Admin)
export const deleteStore = async (id) => {
  const response = await apiClient.delete(`/stores/${id}`);
  return response.data;
};

