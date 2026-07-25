import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { PrimaryButton } from './PrimaryButton';

export interface EmptyStateProps {
  message: string;
  actionTitle?: string;
  onActionPress?: () => void;
}

export function EmptyState({
  message,
  actionTitle,
  onActionPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {actionTitle && onActionPress && (
        <View style={styles.buttonContainer}>
          <PrimaryButton title={actionTitle} onPress={onActionPress} variant="outline" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  message: {
    fontSize: typography.sizes.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: spacing.lg,
    width: '60%',
  },
});
