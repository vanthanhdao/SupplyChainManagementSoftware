import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Định nghĩa interface cho trạng thái của store
interface AuthState {
  userId: number;
  email: string;
  isActive: boolean;
  role: string;
  setUser: (
    userId: number,
    email: string,
    isActive: boolean,
    role: string
  ) => void;
  clearUser: () => void;
}

// Tạo store Zustand với middleware "persist" để lưu vào sessionStorage
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: 0,
      email: "",
      isActive: false,
      role: "",
      // Hàm để thiết lập thông tin người dùng
      setUser: (userId?, email?, isActive?, role?) =>
        set({ userId, email, isActive, role }),
      // Hàm để xóa thông tin người dùng
      clearUser: () => set({ userId: 0, email: "", isActive: false, role: "" }),
    }),
    {
      name: "user", // Tên key trong sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Sử dụng sessionStorage thay vì localStorage
    }
  )
);

export default useAuthStore;
