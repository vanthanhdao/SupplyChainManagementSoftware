import { create } from "zustand";
import { useGetAccessToken } from "@/app/hook/useAccessToken";
import {  getAccount} from "@/app/apis/index-api";

interface UserState {
  userId: number | null;
  email: string | null;
  isActive: boolean | null;
  role: string | null;
  initializeUser: () => Promise<void>; 
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  isActive: null,
  role: null,
  initializeUser: async () => {
    try {
      const access_token = useGetAccessToken("access_token");
      const response = await getAccount(access_token);
      if (response) {
        set({
          userId: response.userId,
          email: response.email,
          isActive: response.isActive,
          role: response.role,
        });
      }
    } catch (error) {
      console.error("Failed to initialize user data:", error);
    }
  },
}));

export default useUserStore;
