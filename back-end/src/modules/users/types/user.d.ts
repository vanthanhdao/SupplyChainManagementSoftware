interface IUserAccessToken {
  userId: number;
  email: string;
  isActive: boolean;
  role: string;
}

interface IUserWalletAddress {
  publicKey: string;
  privateKey: string;
}
