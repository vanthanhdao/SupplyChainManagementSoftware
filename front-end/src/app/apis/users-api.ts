import axios from "axios";

  
  // Call api for create a new account
  export const createAccount = async (data: any) => {
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
    export const getAccountById = async (infoUser: any | null,access_token:string | null) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${infoUser.userId}`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };