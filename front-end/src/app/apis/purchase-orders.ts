import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";

const access_token = useGetAccessToken("access_token");

// Call api create order
export const createOrder = async (data: IDataPurchaseOrder) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`UpdateRecordProduct failed: ${error}`);
  }
};
