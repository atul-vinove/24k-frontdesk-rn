/**
 * About Us screen displaying company information
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '../constants/theme';

export default function AboutUsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.subtitle}>Welcome to 24Karet</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          At 24Karet, we are committed to providing exceptional service and creating
          meaningful connections with our visitors. Our state-of-the-art visitor
          management system ensures a seamless and professional experience for
          everyone who walks through our doors.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Do</Text>
        <Text style={styles.sectionText}>
          We specialize in creating innovative solutions for modern businesses.
          Our team of experts works tirelessly to deliver excellence in every
          project we undertake, from technology solutions to customer service.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <Text style={styles.sectionText}>
          • Integrity: We conduct business with honesty and transparency{'\n'}
          • Innovation: We embrace new technologies and creative solutions{'\n'}
          • Excellence: We strive for the highest quality in everything we do{'\n'}
          • Respect: We value every individual and their unique contributions
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.sectionText}>
          For more information about our services or to schedule a visit,
          please contact us through our main office or visit our website.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 24Karet. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.l,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.medium,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  sectionText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.colors.subtleText,
  },
});
