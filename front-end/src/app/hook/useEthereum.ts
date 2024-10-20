import contract from "@/app/contracts/UserSession.json";
import { ethers, verifyMessage } from "ethers";
// const { ethers } = require("ethers");

// Địa chỉ của smart contract
const contractAddress = "0x86a080b9a473EFce0EB97d59937310C42682523F"; // Địa chỉ contract ở nhà
// const contractAddress = "0xdd7B6DbEE63c282eAFa32FF7DD45f2858cB16B7a"; // Địa chỉ contract khác
// Các hàm trong smart contract
const contractABI = contract.abi;
// Kết nối tới mạng Ethereum qua JSON-RPC
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
// Pivate key của tài khoản admin
const privateKey =
  "0x34455e7b71db7eb7117a0adf35154cbc223c52f31f354f95d4d18fa4a61a23f7";

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
    const amountInEther = "10"; // Số lượng ETH muốn gửi,
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
    console.log(publicKey, privateKey, active);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transaction = await contract.storeSession(publicKey, active);
    await transaction.wait();
  } catch (error) {
    console.log("Failed transaction!: ", error);
  }
};

// Xác thực wallet address CSDL với 1 wallet khởi tạo
export const useVerifyWallet = async (
  privateKey: string
): Promise<boolean | null> => {
  if (!privateKey) return null;
  try {
    const wallet = new ethers.Wallet(privateKey);
    const message = "Verify account ownership";
    // Ký thông báo
    const signature = await wallet.signMessage(message);
    // Lấy lại địa chỉ từ chữ ký
    const recoveredAddress = verifyMessage(message, signature);
    // Kiểm tra xem địa chỉ có khớp với địa chỉ của người dùng hay không
    return recoveredAddress == wallet.address ? true : false;
  } catch (error) {
    console.log("Failed transaction!: ", error);
    return null;
  }
};

// Ném ether vào địa chỉ null (0x000.......000)
export const useDeleteEth = async () => {
  // Thông tin tài khoản của admin
  const signer = new ethers.Wallet(privateKey, provider);
  // Địa chỉ của người nhận và số lượng ETH để gửi
  const recipient = "0x0000000000000000000000000000000000000000"; // Địa chỉ người nhận
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
};
