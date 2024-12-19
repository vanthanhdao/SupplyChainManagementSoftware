import axios from "axios";
import { useGetAccessToken } from "../hook/useAccessToken";
import useUserStore from "../zustands/userStore";

// Call api for create a new account
export const createAccount = async (data: IUser) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      data
    );
  } catch (error) {
    throw new Error(`CreateAccount failed - ${error}`);
  }
};

// Call api for create a new account
export const revertAccount = async (data: IUser) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/users/revert`,
      { data }
    );
  } catch (error) {
    throw new Error(`RevertAccount failed - ${error}`);
  }
};

// Call api for create a new account
export const getAccountWallet = async (): Promise<IUserWallet> => {
  try {
    const access_token = await useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profileWallet`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("getAccountWallet failed: ", error);
    throw error;
  }
};

// Call api for create a new account
export const getAccount = async () => {
  try {
    const access_token = await useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("getAccount failed: ", error);
    throw error;
  }
};

export const getAllAccountByRole = async () => {
  try {
    const access_token = await useGetAccessToken("access_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/role`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("getAllAccountByRole failed: ", error);
    throw error;
  }
};

// // Call api for get list account
// export const getListAccount = async (data: IUserAddress[]
// ) => {
//   try {
//     const access_token = useGetAccessToken("access_token");
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/users/getByBlock`,
//       data,
//       { headers: { Authorization: `Bearer ${access_token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(`GetListAccount failed: ${error}`);
//   }
// };

// Call api /users/ with axios when user update infimation
export const updateIsActive = async () => {
  try {
    const access_token = await useGetAccessToken("access_token");
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
      { isActive: true },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    throw new Error(`UpdateIsActive failed: ${error}`);
  }
};
