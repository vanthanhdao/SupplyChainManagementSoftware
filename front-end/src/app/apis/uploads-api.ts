import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";
const access_token = useGetAccessToken("access_token");
// Call api for upload images
export const uploadImages = async (
  files: FormData
  // folder: string
): Promise<String[]> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase-storage/uploads`,
      files,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`uploadImages failed - ${error}`);
  }
};
