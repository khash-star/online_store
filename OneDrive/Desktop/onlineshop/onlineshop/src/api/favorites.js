import apiClient from './client.js';

// Get user's favorites
export const getFavorites = async () => {
  const response = await apiClient.get('/favorites');
  return response.data;
};

// Add to favorites
export const addFavorite = async (productId) => {
  const response = await apiClient.post('/favorites', { product_id: productId });
  return response.data;
};

// Remove from favorites
export const removeFavorite = async (id) => {
  const response = await apiClient.delete(`/favorites/${id}`);
  return response.data;
};

