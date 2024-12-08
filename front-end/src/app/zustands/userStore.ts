import { create } from "zustand";
import { useGetAccessToken } from "@/app/hook/useAccessToken";
import { getAccount } from "@/app/apis/index-api";

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
      const response = await getAccount();
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
