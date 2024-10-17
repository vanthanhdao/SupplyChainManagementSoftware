
interface IUser {
    email: string,
    password: string,
    walletAddress: {
      publicKey: string,
      privateKey: string,
}
}