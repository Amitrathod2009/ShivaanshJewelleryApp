import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import type { CartScreenProps } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';
import { CartItemView } from '../components/CartItemView';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../store/cartSlice';
import { calculateCartTotal, calculateCartItemCount } from '../utils/cart';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { shadows } from '../theme/shadows';

export function CartScreen({ navigation }: CartScreenProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastTotal, setLastTotal] = useState(0);

  const total = calculateCartTotal(items);
  const totalCount = calculateCartItemCount(items);

  const handleCheckout = () => {
    setLastTotal(total);
    setCheckoutSuccess(true);
  };

  const handleCloseModal = () => {
    setCheckoutSuccess(false);
    dispatch(clearCart());
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrement = (productId: number) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId: number) => {
    dispatch(decrementQuantity(productId));
  };

  if (items.length === 0) {
    return (
      <EmptyState
        message="Your shopping cart is empty. Discover our collection and add your favorite jewellery pieces."
        actionTitle="Browse Products"
        onActionPress={() => navigation.navigate('ProductList')}
      />
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <CartItemView
            item={item}
            onIncrement={() => handleIncrement(item.product.id)}
            onDecrement={() => handleDecrement(item.product.id)}
            onRemove={() => handleRemove(item.product.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items ({totalCount})</Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={[styles.summaryValue, styles.freeShipping]}>FREE</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.checkoutButtonWrapper}>
          <PrimaryButton title="Proceed to Checkout" onPress={handleCheckout} />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={checkoutSuccess}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconCircle}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Checkout Successful</Text>
            <Text style={styles.modalMessage}>
              Thank you for shopping with Shivaansh Jewellery! Your order total of{' '}
              <Text style={styles.boldTotal}>${lastTotal.toFixed(2)}</Text> has been placed.
            </Text>
            <View style={styles.modalButtonContainer}>
              <PrimaryButton title="Continue Shopping" onPress={handleCloseModal} />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2, // Leave space for summary panel
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...shadows.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  freeShipping: {
    color: colors.success,
    fontWeight: typography.weights.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  totalLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  totalValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
  },
  checkoutButtonWrapper: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...shadows.medium,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.success + '20', // translucent green tint
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  successIconText: {
    color: colors.success,
    fontSize: 28,
    fontWeight: typography.weights.bold,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  boldTotal: {
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  modalButtonContainer: {
    width: '100%',
  },
});
