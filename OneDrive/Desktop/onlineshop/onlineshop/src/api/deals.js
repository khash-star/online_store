import apiClient from './client.js';

// Get all deals
export const getDeals = async (params = {}) => {
  const response = await apiClient.get('/deals', { params });
  return response.data;
};

// Create deal
export const createDeal = async (data) => {
  const response = await apiClient.post('/deals', data);
  return response.data;
};

// Update deal
export const updateDeal = async (id, data) => {
  const response = await apiClient.put(`/deals/${id}`, data);
  return response.data;
};

// Delete deal
export const deleteDeal = async (id) => {
  const response = await apiClient.delete(`/deals/${id}`);
  return response.data;
};

