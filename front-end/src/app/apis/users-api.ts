import axios from "axios";

// Call api for create a new account
export const createAccount = async (data: IUser) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call api for create a new account
export const revertAccount = async (data: IUser) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/users/revert`,
    { data }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call api for create a new account
export const getAccountWallet = async (
  access_token: string
): Promise<IUserWallet | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profileWallet`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Call api for create a new account
export const getAccount = async (
  access_token: string
): Promise<IUserAccessToken | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
