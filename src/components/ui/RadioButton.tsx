/**
 * Reusable RadioButton component for form selections
 */

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants/theme';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function RadioButton({
  options,
  selectedValue,
  onValueChange,
  label,
  required = false,
  error,
  containerStyle,
}: RadioButtonProps) {
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;
  
  // Calculate option width based on screen size
  const optionWidth = isTablet ? '48%' : '48%';
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              { width: optionWidth },
              index % 2 === 0 ? styles.optionLeft : styles.optionRight,
            ]}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.7}
          >
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radio,
                  selectedValue === option.value && styles.radioSelected,
                ]}
              >
                {selectedValue === option.value && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.optionText} numberOfLines={2}>
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    marginBottom: theme.spacing.m,
  },
  required: {
    color: theme.colors.error,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.s,
  },
  option: {
    marginBottom: theme.spacing.s,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    minHeight: 50,
    justifyContent: 'center',
  },
  optionLeft: {
    marginRight: 0,
  },
  optionRight: {
    marginLeft: 0,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    flex: 1,
    textAlign: 'left',
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.s,
  },
});
