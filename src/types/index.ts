/**
 * Shared TypeScript types for the Visitor Management App
 */

// Visitor form data structure
export interface VisitorFormData {
  name: string;
  email?: string;
  phone: string;
  purpose: string;
  source: string; // Where did you hear about us
  photo: string; // Base64 encoded image
  signature: string; // Base64 encoded signature
  branch: string;
  timestamp: Date;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
  branch: string;
}

export interface AuthUser {
  id: string;
  email: string;
  branch: string;
  token: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Branch selection
export interface Branch {
  id: string;
  name: string;
  address?: string;
}

// Purpose of visit options
export interface VisitPurpose {
  id: string;
  label: string;
  value: string;
}

// Source options
export interface Source {
  id: string;
  label: string;
  value: string;
}
