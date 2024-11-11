import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";

const access_token = useGetAccessToken("access_token");

// Call api for create a new account
export const getAllCategory = async (): Promise<IDataCategory[]> => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      return response.data;
    } catch (error) {
      throw new Error(`GetAccount failed: ${error}`);
    }
  };
  