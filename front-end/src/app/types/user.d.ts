


interface IUser {
    email: string,
    password: string,
    walletAddress: IUserWallet,
};

interface IUserWallet{
  publicKey: string,
  privateKey: string,
}

interface IUserSignIn {
  email: string,
  password: string,
};

interface IUserAccessToken {
  userId: number;
  email: string;
  isActive:boolean;
  role:string;
};

interface IUserToken{
  access_token:string,
  refresh_token:string,
}

interface IUserAddress{
  address:string;
}

