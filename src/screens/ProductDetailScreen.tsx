import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ProductDetailScreenProps } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { QuantitySelector } from '../components/QuantitySelector';
import { Loader } from '../components/Loader';
import { ErrorView } from '../components/ErrorView';
import { useProductQuery } from '../hooks/useProducts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../store/cartSlice';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { shadows } from '../theme/shadows';

export function ProductDetailScreen({
  route,
  navigation,
}: ProductDetailScreenProps) {
  const { productId } = route.params;
  const dispatch = useAppDispatch();
  const { data: product, isLoading, error, refetch } = useProductQuery(productId);

  // Retrieve cart item state for this product
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.product.id === productId)
  );

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(productId));
  };

  if (isLoading) {
    return <Loader message="Fetching product details..." />;
  }

  if (error || !product) {
    return (
      <ErrorView
        message={
          error instanceof Error
            ? error.message
            : 'Could not fetch product information.'
        }
        onRetry={refetch}
      />
    );
  }

  // Format category
  const formattedCategory = product.category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <ScreenContainer scrollable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.category}>{formattedCategory}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>
              {product.rating.rate} ({product.rating.count} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />

        <View style={styles.actionContainer}>
          {cartItem ? (
            <View style={styles.cartActionRow}>
              <View style={styles.qtySelectorWrapper}>
                <Text style={styles.qtyLabel}>Quantity in Cart:</Text>
                <QuantitySelector
                  quantity={cartItem.quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              </View>
              <View style={styles.viewCartBtnWrapper}>
                <PrimaryButton
                  title="Go to Cart"
                  variant="outline"
                  onPress={() => navigation.navigate('Cart')}
                />
              </View>
            </View>
          ) : (
            <PrimaryButton
              title="Add to Shopping Cart"
              onPress={handleAddToCart}
            />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    flex: 1,
    minHeight: 300,
    ...shadows.medium,
  },
  category: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.xl,
    color: colors.text,
    fontWeight: typography.weights.semibold,
    lineHeight: 28,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  price: {
    fontSize: typography.sizes.xxl,
    color: colors.text,
    fontWeight: typography.weights.bold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingStar: {
    color: '#FBBF24',
    marginRight: 4,
    fontSize: typography.sizes.md,
  },
  ratingText: {
    fontSize: typography.sizes.xs,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    lineHeight: 22,
  },
  actionContainer: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  cartActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtySelectorWrapper: {
    flex: 1,
  },
  qtyLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  viewCartBtnWrapper: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'flex-end',
  },
});
