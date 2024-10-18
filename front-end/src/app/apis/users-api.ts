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
    export const getAccountById = async (userId: number,access_token:string): Promise<IUserWallet|null> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        return response?.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };