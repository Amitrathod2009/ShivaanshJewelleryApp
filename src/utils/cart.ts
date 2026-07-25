import type { CartItem } from '../types';

export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const calculateCartItemCount = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.quantity, 0);
