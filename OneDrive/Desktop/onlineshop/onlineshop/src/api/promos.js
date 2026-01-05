import apiClient from './client.js';

// Get all promos
export const getPromos = async (params = {}) => {
  const response = await apiClient.get('/promos', { params });
  return response.data;
};

// Create promo (Admin)
export const createPromo = async (data) => {
  const response = await apiClient.post('/promos', data);
  return response.data;
};

// Update promo (Admin)
export const updatePromo = async (id, data) => {
  const response = await apiClient.put(`/promos/${id}`, data);
  return response.data;
};

// Delete promo (Admin)
export const deletePromo = async (id) => {
  const response = await apiClient.delete(`/promos/${id}`);
  return response.data;
};

