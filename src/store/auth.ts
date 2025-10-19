import { create } from 'zustand';

export type UserRole = 'user' | 'admin';

export interface UserData {
  id: string;
  name: string;
  fullName: string;
  email: string;
  role: UserRole;
  token?: string;
  profilePicture?: string;
  phone?: string;
  city?: string;
  lastZakatDate?: string;
  zakatRemindersEnabled?: boolean;
  campaignUpdatesEnabled?: boolean;
  userPreferences?: {
    lastZakatDate?: string;
    zakatRemindersEnabled?: boolean;
    campaignUpdatesEnabled?: boolean;
  };
}

interface AuthState {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (user: UserData) => void;
  logout: () => void;
  setUser: (user: UserData | null) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoggedIn: false,
  login: user => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setUser: user => set({ user, isLoggedIn: !!user }),
}));
