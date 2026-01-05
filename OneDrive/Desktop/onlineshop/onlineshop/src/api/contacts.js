import apiClient from './client.js';

// Get all contacts (Admin)
export const getContacts = async (params = {}) => {
  const response = await apiClient.get('/contacts', { params });
  return response.data;
};

// Create contact (Admin)
export const createContact = async (data) => {
  const response = await apiClient.post('/contacts', data);
  return response.data;
};

// Update contact (Admin)
export const updateContact = async (id, data) => {
  const response = await apiClient.put(`/contacts/${id}`, data);
  return response.data;
};

// Delete contact (Admin)
export const deleteContact = async (id) => {
  const response = await apiClient.delete(`/contacts/${id}`);
  return response.data;
};

