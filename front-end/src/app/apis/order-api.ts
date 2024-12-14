import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";

const access_token = useGetAccessToken("access_token");

// Call api for get all product
export const getAllOrder = async (): Promise<IDataOrder[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccount failed: ${error}`);
  }
};

export const deletePurchaseOrder = async (data: number[]) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/canclePOs`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    throw new Error(`deletePurchaseOrder failed: ${error}`);
  }
};
