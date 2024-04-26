import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import User from '../types/User';
import LoginResponse from '../features/authentication/types/LoginResponse';
import { ACCESS_TOKEN_KEY } from '../utils/constants';

interface State {
    isAuthenticated: boolean;
    user: User | null;
}

interface Actions {
    login: (loginResponse: LoginResponse) => void;
    logout: () => void;
    loadAuthenticatedUser: (user: User) => void;
    updateAuthenticatedUser: (user: User) => void;
}

const initialState: State = {
    isAuthenticated: false,
    user: null,
}

const useAuthStore = create<State & Actions>()(
    devtools(
        (set) => ({
            ...initialState,
            login: ({ user, accessToken }) => {
                localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
                set({ isAuthenticated: true, user });
            },
            logout: () => {
                localStorage.removeItem(ACCESS_TOKEN_KEY)
                set(initialState);
            },
            loadAuthenticatedUser: (user) => {
                set({ isAuthenticated: true, user });
            },
            updateAuthenticatedUser: (user) => {
                set({ user });
            },
        }),
        {
            enabled: import.meta.env.DEV,
            name: "Auth store"
        }
    ),
);



export default useAuthStore;
