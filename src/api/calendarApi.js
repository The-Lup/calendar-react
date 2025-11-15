import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Api-Token'] = token;
  }

  return config;
});

export default calendarApi;
