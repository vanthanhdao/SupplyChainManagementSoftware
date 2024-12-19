import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";

// Call api create order
export const createOrder = async (data: IDataPurchaseOrder) => {
  try {
    const access_token = useGetAccessToken("access_token");
    console.log(data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`createOrder failed: ${error}`);
  }
};

// Call api create order
export const createOrderDetails = async (data: IDataPurchaseOrderDetail[]) => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/order-details`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`createOrderDetails failed: ${error}`);
  }
};
