/**
 * Validation utilities using Zod schemas
 */

import { z } from 'zod';

// Visitor form validation schema
export const visitorFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  purpose: z.string().min(1, 'Please select a purpose for your visit'),
  photo: z.string().min(1, 'Photo is required'),
  signature: z.string().min(1, 'Signature is required'),
  branch: z.string().min(1, 'Please select a branch'),
});

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  branch: z.string().min(1, 'Please select a branch'),
});

// Type exports
export type VisitorFormData = z.infer<typeof visitorFormSchema>;
export type LoginData = z.infer<typeof loginSchema>;
