import { authJwtProfile } from "@/app/apis/index-api";
import { getServerSideProps } from "../apis/getServerSideProp";

export const useGetAccessToken = (name_token: string) => {
  try {
    const result = sessionStorage.getItem(name_token);
    if (!result) {
      throw new Error(`Empty AccessToken !`);
    }
    return result;
  } catch (error) {
    getServerSideProps;
  }
};

export const useSetAccessToken = (name_token: string, access_token: string) => {
  sessionStorage.setItem(name_token, access_token);
};

// Call api /auth/profile with axios when user signin
export const useTokenPayload = async (): Promise<IUserAccessToken | null> => {
  const access_token = useGetAccessToken("access_token");
  if (!access_token) {
    console.error("No access token found");
    return null;
  }

  try {
    const response = await authJwtProfile(access_token);
    const infoUser = response?.data;

    if (
      infoUser?.userId &&
      infoUser?.email &&
      infoUser?.isActive !== undefined &&
      infoUser?.role
    ) {
      const result: IUserAccessToken = {
        userId: infoUser.userId,
        email: infoUser.email,
        isActive: infoUser.isActive,
        role: infoUser.role,
      };
      return result;
    } else {
      console.error("Invalid user data:", infoUser);
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching data:", error.response || error);
    return null;
  }
};
