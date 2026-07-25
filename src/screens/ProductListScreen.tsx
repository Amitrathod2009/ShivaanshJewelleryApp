import React, { useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import type { ProductListScreenProps } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Loader } from '../components/Loader';
import { ErrorView } from '../components/ErrorView';
import { useProductsQuery } from '../hooks/useProducts';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { Product } from '../types';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export function ProductListScreen({ navigation }: ProductListScreenProps) {
  const { data: products, isLoading, error, refetch } = useProductsQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Dynamically extract categories
  const categories = useMemo(() => {
    if (!products) return [];
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats);
  }, [products]);

  // Process sorting & filtering
  const processedProducts = useMemo(() => {
    if (!products) return [];
    let list = [...products];

    // Filter by search
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSortBy('default');
  };

  if (isLoading) {
    return <Loader message="Fetching the finest jewellery..." />;
  }

  if (error) {
    return (
      <ErrorView
        message={error instanceof Error ? error.message : 'Unknown error'}
        onRetry={refetch}
      />
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* Categories Horizontal Scroll */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === null && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === null && styles.categoryTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryTab,
                selectedCategory === cat && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sorting Controls */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort By:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.sortTab,
                sortBy === 'default' && styles.sortTabActive,
              ]}
              onPress={() => setSortBy('default')}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === 'default' && styles.sortTextActive,
                ]}
              >
                Recommended
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortTab,
                sortBy === 'price-asc' && styles.sortTabActive,
              ]}
              onPress={() => setSortBy('price-asc')}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === 'price-asc' && styles.sortTextActive,
                ]}
              >
                Price: Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortTab,
                sortBy === 'price-desc' && styles.sortTabActive,
              ]}
              onPress={() => setSortBy('price-desc')}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === 'price-desc' && styles.sortTextActive,
                ]}
              >
                Price: High to Low
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={processedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <EmptyState
            message={
              searchQuery.trim().length > 0
                ? 'No products found matching your search. Try adjusting your query.'
                : 'No products found.'
            }
            actionTitle="Clear Filters"
            onActionPress={handleClearFilters}
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  filtersContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
  },
  categoryScroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  categoryTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 16,
    marginRight: spacing.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: typography.weights.medium,
  },
  categoryTextActive: {
    color: colors.surface,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  sortLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: typography.weights.semibold,
    marginRight: spacing.sm,
  },
  sortTab: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  sortTabActive: {
    backgroundColor: colors.accent + '22', // translucent gold tint
  },
  sortText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: typography.weights.regular,
  },
  sortTextActive: {
    color: colors.primaryDark,
    fontWeight: typography.weights.semibold,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
