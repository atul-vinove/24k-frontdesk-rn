/**
 * API client configuration using Apisauce
 */

import { create } from 'apisauce';
import { ApiResponse } from '../types';

// Create API client
export const apiClient = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.addRequestTransform((request) => {
  // Add auth token if available
  // This will be implemented when auth is set up
});

// Response interceptor for error handling
apiClient.addResponseTransform((response) => {
  if (!response.ok) {
    // Handle API errors
    console.error('API Error:', response.data);
  }
});

// API endpoints
export const api = {
  // Authentication
  login: (credentials: { email: string; password: string; branch: string }) =>
    apiClient.post<ApiResponse<any>>('/auth/login', credentials),
  
  // Visitor management
  submitVisitor: (visitorData: any) =>
    apiClient.post<ApiResponse<any>>('/visitors', visitorData),
  
  getVisitors: (branch: string) =>
    apiClient.get<ApiResponse<any>>(`/visitors?branch=${branch}`),
  
  // Branches
  getBranches: () =>
    apiClient.get<ApiResponse<any>>('/branches'),
};
