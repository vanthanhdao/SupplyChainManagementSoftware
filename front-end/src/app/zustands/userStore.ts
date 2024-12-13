import { create } from "zustand";
import { getAccount } from "@/app/apis/index-api";

interface UserState {
  userId: number | null;
  nameCompany: string | null;
  taxCode: string | null;
  certificates: string | null;
  phoneNumber: string | null;
  email: string | null;
  isActive: boolean | "Null" | null;
  role: string | null;
  initializeUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  nameCompany: null,
  taxCode: null,
  certificates: null,
  phoneNumber: null,
  email: null,
  isActive: "Null",
  role: null,
  initializeUser: async () => {
    try {
      const response = await getAccount();
      if (response) {
        set({
          userId: response.UserId,
          nameCompany: response.NameCompany,
          taxCode: response.TaxCode,
          certificates: response.Certificates,
          phoneNumber: response.PhobeNumber,
          email: response.Email,
          isActive: response.IsActive,
          role: response.Role,
        });
      }
    } catch (error) {
      console.error("Failed to initialize user data:", error);
    }
  },
}));

export default useUserStore;
