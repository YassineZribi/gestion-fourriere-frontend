// authStore.ts
import {create} from 'zustand';
import User from '../types/User';
import LoginResponse from '../features/authentication/types/LoginResponse';
import { ACCESS_TOKEN_KEY } from '../utils/constants';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (loginResponse: LoginResponse) => void;
    logout: () => void;
    loadAuthenticatedUser: (user: User) => void;
    updateAuthenticatedUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: ({user, accessToken}) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        set({ isAuthenticated: true, user });
    },
    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        set({ isAuthenticated: false, user: null });
    },
    loadAuthenticatedUser: (user) => {
        set({ isAuthenticated: true, user });
    },
    updateAuthenticatedUser: (user) => {
        set({ user });
    },
}));

export default useAuthStore;
