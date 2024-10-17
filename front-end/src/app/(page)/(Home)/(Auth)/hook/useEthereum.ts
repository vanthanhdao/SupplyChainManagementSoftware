import contract from "@/app/contracts/UserSession.json";
const { ethers } = require("ethers");

// Địa chỉ của smart contract
const contractAddress = "0x38D78c81Cc35E2a9636A45Aafc61E0BCCA458B9c";
// Các hàm trong smart contract
const contractABI = contract.abi;
// Kết nối tới mạng Ethereum qua JSON-RPC
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
// Pivate key của tài khoản admin
const privateKey =
  "0x2a7aebcb4621cb17e69816a477c5f0f9f8d6468522aad0c08b8ad8acd94157a6";

// Create wallet using ethers.js
// Update Wallet info into state
export const useGenerateWallet = (): IWalletAddress | null => {
  try {
    const newWallet = ethers.Wallet.createRandom();
    const result = {
      publicKey: newWallet.address,
      privateKey: newWallet.privateKey,
    };
    return result;
  } catch (error) {
    console.error("Create wallet error:", error);
    return null;
  }
};

// Chuyển ether cho người dùng
export const useProvideEthUser = async (walletAddress: string) => {
  if (!walletAddress) return;
  try {
    // Thông tin tài khoản của admin
    const signer = new ethers.Wallet(privateKey, provider);
    // Địa chỉ của người nhận và số lượng ETH để gửi
    const recipient = walletAddress; // Địa chỉ người nhận
    const amountInEther = "100"; // Số lượng ETH muốn gửi,
    // Chuyển số lượng ETH sang đơn vị Wei
    const amount = ethers.parseEther(amountInEther);
    // Tạo giao dịch
    const tx = {
      to: recipient,
      value: amount,
    };
    // Ký và gửi giao dịch
    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
  } catch (error) {
    console.log("Failed transaction!: ", error);
  }
};

// Gọi hàm StoreSession tre6nsmart contract
export const useStoreSession = async (
  wallet: IWalletAddress,
  active: string
) => {
  if (!wallet && !active) return;
  try {
    const { publicKey, privateKey } = wallet;
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transaction = await contract.storeSession(publicKey, active);
    await transaction.wait();
  } catch (error) {
    console.log("Failed transaction!: ", error);
  }
};
