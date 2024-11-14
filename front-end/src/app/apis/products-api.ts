import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";
import { GridRowsProp } from "@mui/x-data-grid";

const access_token = useGetAccessToken("access_token");

// Call api for get all product
export const getAllProduct = async (): Promise<IDataProduct[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccount failed: ${error}`);
  }
};

// Call api CRUD products
export const updateRecordProduct = async (data: GridRowsProp) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/products/updateRecords`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    throw new Error(`UpdateRecordProduct failed: ${error}`);
  }
};
