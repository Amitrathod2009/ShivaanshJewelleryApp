import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductById } from '../services/api';
import type { Product } from '../types';

export const useProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProductQuery = (productId: number) => {
  return useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !isNaN(productId),
  });
};
