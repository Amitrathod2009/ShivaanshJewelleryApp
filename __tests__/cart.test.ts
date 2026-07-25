import { calculateCartTotal, calculateCartItemCount } from '../src/utils/cart';
import type { CartItem } from '../src/types';

describe('Cart Calculations', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Gold Ring',
      price: 150.0,
      description: 'Elegant gold ring',
      category: 'jewelery',
      image: 'http://example.com/ring.jpg',
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: 2,
      title: 'Silver Necklace',
      price: 85.5,
      description: 'Stunning silver necklace',
      category: 'jewelery',
      image: 'http://example.com/necklace.jpg',
      rating: { rate: 4.8, count: 90 },
    },
  ];

  describe('calculateCartTotal', () => {
    it('should return 0 for an empty cart', () => {
      const items: CartItem[] = [];
      expect(calculateCartTotal(items)).toBe(0);
    });

    it('should calculate the total price of items in the cart', () => {
      const items: CartItem[] = [
        { product: mockProducts[0]!, quantity: 2 }, // 2 * 150 = 300
        { product: mockProducts[1]!, quantity: 1 }, // 1 * 85.5 = 85.5
      ];
      expect(calculateCartTotal(items)).toBe(385.5);
    });
  });

  describe('calculateCartItemCount', () => {
    it('should return 0 for an empty cart', () => {
      const items: CartItem[] = [];
      expect(calculateCartItemCount(items)).toBe(0);
    });

    it('should return the sum of quantities of all items in the cart', () => {
      const items: CartItem[] = [
        { product: mockProducts[0]!, quantity: 3 },
        { product: mockProducts[1]!, quantity: 2 },
      ];
      expect(calculateCartItemCount(items)).toBe(5);
    });
  });
});
