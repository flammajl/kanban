import axios from 'axios';
import { AxiosProps } from '../interfaces';

export const api: AxiosProps = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
