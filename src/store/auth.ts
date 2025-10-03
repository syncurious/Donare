import { create } from 'zustand';

export type UserRole = 'user' | 'admin';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Add other user fields as needed
}

interface AuthState {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (user: UserData) => void;
  logout: () => void;
  setUser: (user: UserData | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setUser: (user) => set({ user, isLoggedIn: !!user }),
})); 