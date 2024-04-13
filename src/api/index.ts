// In general, it is better to set all sorts of access and URL to the API in the .env file
import { API_URL } from '@/constants';
import axios from 'axios';

export const API = axios.create({
  baseURL: `${API_URL}`
});
