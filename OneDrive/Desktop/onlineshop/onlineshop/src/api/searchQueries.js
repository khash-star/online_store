import apiClient from './client.js';

// Get search queries (Admin)
export const getSearchQueries = async (params = {}) => {
  const response = await apiClient.get('/search-queries', { params });
  return response.data;
};

// Create/update search query
export const createSearchQuery = async (query) => {
  const response = await apiClient.post('/search-queries', { query });
  return response.data;
};

