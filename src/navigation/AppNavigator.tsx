import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import type { RootStackParamList } from './types';
import { useAppSelector } from '../store/hooks';
import { calculateCartItemCount } from '../utils/cart';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface HeaderCartButtonProps {
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
}

function HeaderCartButton({ navigation }: HeaderCartButtonProps) {
  const items = useAppSelector((state) => state.cart.items);
  const count = calculateCartItemCount(items);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      activeOpacity={0.8}
      style={styles.cartButton}
    >
      <Text style={styles.cartIcon}>🛒</Text>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: typography.sizes.md,
            fontWeight: typography.weights.bold,
            color: colors.text,
          },
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({ navigation }) => ({
            title: 'Shivaansh Jewellery',
            headerRight: () => <HeaderCartButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ navigation }) => ({
            title: 'Product Details',
            headerRight: () => <HeaderCartButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'My Cart',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    padding: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  cartIcon: {
    fontSize: typography.sizes.xl,
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -2,
    backgroundColor: colors.primary,
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: typography.weights.bold,
  },
});
