import { useGetAccessToken } from "@/app/hook/useAccessToken";
import userStore from "@/app/zustands/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Định nghĩa các kiểu cho props
interface WithAuthProps {
  requiredRole?: string; // Vai trò yêu cầu, mặc định là không yêu cầu
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: string
) => {
  const WithAuth = (props: P & WithAuthProps) => {
    const router = useRouter();
    const { role } = userStore();
    const token =
      typeof window !== "undefined" ? useGetAccessToken("access_token") : null;
    const userRole = typeof window !== "undefined" ? role : null;

    // Kiểm tra nếu không có token hoặc người dùng không có quyền truy cập
    useEffect(() => {
      if (role) {
        if (!token) {
          router.push("/signin-page");
        } else if (requiredRole && requiredRole !== role) {
          router.push("/Error");
        }
      }
    }, [token, userRole, requiredRole, router, role]);

    if (!token || (requiredRole && requiredRole !== userRole)) {
      return null; // Trả về null khi chưa xác thực hoặc chưa có quyền
    }

    // Nếu người dùng đã xác thực, hiển thị component gốc
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
