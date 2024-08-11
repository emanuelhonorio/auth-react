import axios from 'axios';
import { getToken } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    console.log("interceptoring response", {response})

    return response;
  },
  error => {
    console.log("interceptoring errror", {error, status: error?.response?.status})
    
    if (error?.response?.status === 401 && !error?.config.url?.endsWith("/login")) {
       window.location.href = '/login?logout';
    }
    return Promise.reject(error);
  }
);

export default api;