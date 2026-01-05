import apiClient from './client.js';

// Get all messages (Admin)
export const getMessages = async (params = {}) => {
  const response = await apiClient.get('/messages', { params });
  return response.data;
};

// Get single message by ID
export const getMessage = async (id) => {
  const response = await apiClient.get(`/messages/${id}`);
  return response.data;
};

// Create message
export const createMessage = async (data) => {
  const response = await apiClient.post('/messages', data);
  return response.data;
};

// Mark message as read (Admin)
export const markMessageRead = async (id) => {
  const response = await apiClient.put(`/messages/${id}/read`);
  return response.data;
};

// Delete message (Admin)
export const deleteMessage = async (id) => {
  const response = await apiClient.delete(`/messages/${id}`);
  return response.data;
};

// Reply to message (Admin)
export const replyMessage = async (id, replyText) => {
  const response = await apiClient.post(`/messages/${id}/reply`, {
    reply: replyText
  });
  return response.data;
};

