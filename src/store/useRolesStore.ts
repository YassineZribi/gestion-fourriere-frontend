import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import Role from '../types/Role';

interface State {
    roles: Role[];
    isLoading: boolean;
    error: string;
}

interface Actions {
    setRoles: (roles: Role[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string) => void;
    reset: () => void;
}

const initialState: State = {
    roles: [],
    isLoading: false,
    error: "",
}

const useRolesStore = create<State & Actions>()(
    devtools(
        (set) => ({
            ...initialState,
            setRoles: (roles) => {
                set({ roles });
            },
            setLoading: (isLoading) => {
                set({ isLoading });
            },
            setError: (error) => {
                set({ error });
            },
            reset: () => {
                set(initialState)
              },
        }),
        {
            enabled: import.meta.env.DEV,
            name: "Roles store"
        }
    ),
);



export default useRolesStore;
