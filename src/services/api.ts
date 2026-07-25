import axios from 'axios';
import type { Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  timeout: 10000,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`products/${id}`);
  return response.data;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    if (responseData && typeof responseData === 'object' && 'message' in responseData) {
      return String(responseData.message);
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};
