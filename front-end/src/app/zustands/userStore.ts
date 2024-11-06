import { create } from "zustand";
import { useGetAccessToken } from "@/app/hook/useAccessToken";
import {  getAccount} from "@/app/apis/index-api";

interface UserState {
  userId: number | null;
  email: string | null;
  isActive: boolean | "Null" | null;
  role: string | null;
  initializeUser: () => Promise<void>; 
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  isActive: "Null",
  role: null,
  initializeUser: async () => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      if(access_token){
      const response = await getAccount(access_token);
      if (response) {
        set({
          userId: response.userId,
          email: response.email,
          isActive: response.isActive,
          role: response.role,
        });
      }
    } else set({isActive:null});
    } catch (error) {
      console.error("Failed to initialize user data:", error);
    }
  },
}));

export default useUserStore;
