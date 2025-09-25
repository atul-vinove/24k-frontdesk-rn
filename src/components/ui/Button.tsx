/**
 * Reusable Button component with primary and secondary variants
 */

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[]; 
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.background : theme.colors.primary}
          size="small"
        />
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  small: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    minHeight: 40,
  },
  medium: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    minHeight: 48,
  },
  large: {
    paddingVertical: theme.spacing.l,
    paddingHorizontal: theme.spacing.xl,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...theme.typography.button,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.background,
  },
  secondaryText: {
    color: theme.colors.text,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  smallText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  mediumText: {
    ...theme.typography.button,
  },
  largeText: {
    ...theme.typography.bodyLarge,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.7,
  },
});
