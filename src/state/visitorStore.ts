/**
 * Visitor data state management using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VisitorFormData } from '../types';

interface VisitorState {
  visitors: VisitorFormData[];
  isLoading: boolean;
  addVisitor: (visitor: VisitorFormData) => void;
  getRecentVisitors: (limit?: number) => VisitorFormData[];
  setLoading: (loading: boolean) => void;
  clearVisitors: () => void;
}

// Dummy data for demonstration
const dummyVisitors: VisitorFormData[] = [
  {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    purpose: 'meeting',
    source: 'website',
    photo: 'https://avatar.iran.liara.run/public/1',
    signature: '',
    branch: 'Main Office',
    timestamp: new Date('2024-01-15T10:30:00'),
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1-555-0456',
    purpose: 'interview',
    source: 'referral',
    photo: 'https://avatar.iran.liara.run/public/2',
    signature: '',
    branch: 'Branch A',
    timestamp: new Date('2024-01-14T14:15:00'),
  },
  {
    name: 'Mike Chen',
    email: 'mike.chen@tech.com',
    phone: '+1-555-0789',
    purpose: 'consultation',
    source: 'social_media',
    photo: 'https://avatar.iran.liara.run/public/3',
    signature: '',
    branch: 'Branch B',
    timestamp: new Date('2024-01-13T09:45:00'),
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1-555-0321',
    purpose: 'delivery',
    source: 'advertisement',
    photo: 'https://avatar.iran.liara.run/public/4',
    signature: '',
    branch: 'Main Office',
    timestamp: new Date('2024-01-12T16:20:00'),
  },
  {
    name: 'Robert Wilson',
    email: 'robert.w@business.com',
    phone: '+1-555-0654',
    purpose: 'maintenance',
    source: 'website',
    photo: 'https://avatar.iran.liara.run/public/5',
    signature: '',
    branch: 'Branch C',
    timestamp: new Date('2024-01-11T11:00:00'),
  },
];

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set, get) => ({
      visitors: dummyVisitors,
      isLoading: false,
      addVisitor: (visitor) => 
        set((state) => ({ 
          visitors: [visitor, ...state.visitors] 
        })),
      getRecentVisitors: (limit = 10) => {
        const { visitors } = get();
        return visitors.slice(0, limit);
      },
      setLoading: (isLoading) => set({ isLoading }),
      clearVisitors: () => set({ visitors: [] }),
    }),
    {
      name: 'visitor-storage',
    }
  )
);
