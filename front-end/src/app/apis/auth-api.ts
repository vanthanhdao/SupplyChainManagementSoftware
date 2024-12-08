import axios from "axios";
import { getServerSideProps } from "./getServerSideProp";

// Call api for create a new account
export const authJwtLogin = async (data: IUserSignIn) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Call api for get info user from access token
export const authJwtProfile = async (access_token: string | null) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
