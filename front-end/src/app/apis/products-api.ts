import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";
import { GridRowsProp } from "@mui/x-data-grid";

// Call api for get all product
export const getAllProduct = async (): Promise<IDataProduct[]> => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`getAllProduct failed: ${error}`);
  }
};

export const getAllProduct_StorePage = async (): Promise<IDataProduct[]> => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/store-page`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`getAllProduct_StorePage failed: ${error}`);
  }
};

export const getProductByOrderId = async (orderId: number) => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${orderId}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`getProductByOrderId failed: ${error}`);
  }
};

// Call api CRUD products
export const updateRecordProduct = async (data: GridRowsProp) => {
  try {
    const access_token = useGetAccessToken("access_token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/products/updateRecords`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    throw new Error(`UpdateRecordProduct failed: ${error}`);
  }
};
