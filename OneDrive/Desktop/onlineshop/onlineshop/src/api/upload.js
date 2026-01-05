import apiClient from './client.js';

// Upload file (public)
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Upload private file
export const uploadPrivateFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/upload/private', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get signed URL for private file
export const getSignedUrl = async (fileId) => {
  const response = await apiClient.get(`/files/${fileId}/signed-url`);
  return response.data;
};

