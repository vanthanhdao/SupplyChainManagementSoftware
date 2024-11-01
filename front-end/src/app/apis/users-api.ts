import axios from "axios";

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
export const getAccountWallet = async (
  access_token: string
): Promise<IUserWallet> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profileWallet`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccountWallet Failed: ${error}`);
  }
};

// Call api for create a new account
export const getAccount = async (
  access_token: string
): Promise<IUserAccessToken> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(`GetAccount failed: ${error}`);
  }
};


  // Call api /users/ with axios when user update infimation
export  const updateIsActive = async (access_token: string) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
        {isActive:true},
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
    } catch (error) {
      throw new Error(`UpdateIsActive failed: ${error}`);
    }
  };