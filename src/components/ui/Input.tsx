/**
 * Reusable Input component with validation support
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  required?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export default function Input({
  label,
  error,
  containerStyle,
  required = false,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            rightIcon ? styles.inputWithIcon : null,
            style,
          ]}
          placeholderTextColor={theme.colors.subtleText}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  required: {
    color: theme.colors.error,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 0, // Remove vertical padding to let text center naturally
    minHeight: 48,
    textAlignVertical: 'center', // Ensure text is vertically centered
    includeFontPadding: false, // Remove extra font padding that can cause misalignment
  },
  inputWithIcon: {
    paddingRight: 50, // Make space for the right icon
  },
  rightIconContainer: {
    position: 'absolute',
    right: theme.spacing.m,
    top: '50%',
    transform: [{ translateY: -12 }], // Half of the icon height (24/2) to center perfectly
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.s,
  },
});
