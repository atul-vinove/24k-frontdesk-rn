import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';
import { Button, Input } from '../components/ui';
import { BRANCHES } from '../constants/branches';
import { theme } from '../constants/theme';
import { useAuthStore } from '../state/authStore';

const logoUrl = 'https://www.24karat.co.in/images/logo.png';

// Eye icon component for password visibility toggle using Expo Vector Icons
const EyeIcon = ({ isVisible }: { isVisible: boolean }) => (
  <Ionicons
    name={isVisible ? 'eye' : 'eye-off'}
    size={20}
    color={theme.colors.subtleText}
  />
);
// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  branch: z.string().min(1, 'Please select a branch'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@24karat.co.in',
      password: 'password123',
      branch: 'Main Office',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      // In production, this would validate against your backend
      const mockUser = {
        id: '1',
        email: data.email,
        branch: data.branch,
        token: 'mock-token-' + Date.now(),
      };
      
      login(mockUser);
      navigation.replace('Main');
    } catch {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      enableOnAndroid={true}
      extraHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={{uri:logoUrl}} style={styles.logo} resizeMode='contain'/>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              required
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              required
              secureTextEntry={!showPassword}
              rightIcon={<EyeIcon isVisible={showPassword} />}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />
          )}
        />

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>
            Branch <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="branch"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={[styles.dropdown, errors.branch && styles.dropdownError]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                containerStyle={styles.containerStyle}
                activeColor={theme.colors.tertiary}
                data={BRANCHES}
                search
                maxHeight={200}
                labelField="name"
                valueField="name"
                placeholder="Select branch"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => onChange(item.name)}
                renderItem={item => (
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemText}>{item.name}</Text>
                    <Text style={styles.dropdownItemSubtext}>{item.address}</Text>
                  </View>
                )}
              />
            )}
          />
          {errors.branch && (
            <Text style={styles.errorText}>{errors.branch.message}</Text>
          )}
        </View>

        <Button
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          style={styles.loginButton}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.l,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: theme.spacing.xxl,
    resizeMode: 'contain',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.subtleText,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  dropdownContainer: {
    marginBottom: theme.spacing.s,
    borderRadius: theme.borderRadius.medium,
  },
  containerStyle: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  required: {
    color: theme.colors.error,
  },
  dropdown: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.m,
    minHeight: 48,
  },
  dropdownError: {
    borderColor: theme.colors.error,
  },
  placeholderStyle: {
    ...theme.typography.body,
    color: theme.colors.subtleText,
  },
  selectedTextStyle: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  inputSearchStyle: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
  },
  dropdownItem: {
    padding: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemSelected: {
    backgroundColor: theme.colors.tertiary,
  },
  dropdownItemText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '500',
  },
  dropdownItemSubtext: {
    ...theme.typography.caption,
    color: theme.colors.subtleText,
    marginTop: theme.spacing.xs,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.s,
  },
  loginButton: {
    marginTop: theme.spacing.l,
  },
});

