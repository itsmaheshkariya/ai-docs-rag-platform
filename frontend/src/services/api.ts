import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Node backend URL
});

export const login = (email: string, password: string) => 
  API.post('/auth/login', { email, password });

export const uploadDocument = (token: string, title: string, file: File) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('file', file);

  return API.post('/documents/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
