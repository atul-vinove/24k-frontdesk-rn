/**
 * Custom drawer content component with About Us and Logout options
 */

import Constants from 'expo-constants';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../constants/theme';
import { useAuthStore } from '../state/authStore';

interface DrawerContentProps {
  navigation: {
    navigate: (screen: string) => void;
    reset: (options: { index: number; routes: { name: string }[] }) => void;
  };
}

export default function DrawerContent({ navigation }: DrawerContentProps) {
  const { user, logout } = useAuthStore();

  const handleHome = () => {
    navigation.navigate('VisitorForm');
  };

  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>24Karet</Text>
        <Text style={styles.subtitle}>Visitor Management</Text>
        {user && (
          <View>
          <Text style={styles.userInfo}>
            {user.email}
          </Text>
           <Text style={styles.userInfo}>
          {user.branch}
         </Text>
         </View>
        )}
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleHome}
          activeOpacity={0.7}
        >
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleAboutUs}
          activeOpacity={0.7}
        >
          <Text style={styles.menuItemText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>
          Version {Constants.expoConfig?.version}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl + 20, // Account for status bar
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.subtleText,
    marginBottom: theme.spacing.m,
  },
  userInfo: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  menu: {
    padding: theme.spacing.l,
  },
  menuItem: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.s,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.secondary,
  },
  menuItemText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  logoutText: {
    color: theme.colors.error,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  versionText: {
    ...theme.typography.caption,
    color: theme.colors.subtleText,
    textAlign: 'center',
    fontSize: 12,
  },
});
