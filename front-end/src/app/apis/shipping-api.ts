import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";
import { GridRowsProp } from "@mui/x-data-grid";

const access_token = useGetAccessToken("access_token");

// Call api for get all Shipping
export const getAllShipping = async (): Promise<IDataShipping[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/shipping-methods`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccount failed: ${error}`);
  }
};

// Call api CRUD Shippings
export const updateRecordShipping = async (data: GridRowsProp) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/shipping-methods/updateRecords`,
      data,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    throw new Error(`UpdateRecordShipping failed: ${error}`);
  }
};
