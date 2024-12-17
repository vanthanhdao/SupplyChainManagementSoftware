import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";

export const getOrderDetail = async (
  orderId: number
): Promise<IDataProduct[]> => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/order-details/${orderId}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccount failed: ${error}`);
  }
};

export const getGroupOrderDetails = async (
  orderId: number
): Promise<OrderDetailGroup[]> => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/order-details/group/${orderId}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccount failed: ${error}`);
  }
};
