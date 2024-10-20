import { create } from "zustand";

interface UserState {
  userId: number | null;
  email: string | null;
  isActive: boolean | null;
  role: string | null;
  setStateUser: (
    userId: number,
    email: string,
    isActive: boolean,
    role: string
  ) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  isActive: null,
  role: null,
  setStateUser: (userId, email, isActive, role) => {
    set({ userId, email, isActive, role });
  },
}));

export default useUserStore;
