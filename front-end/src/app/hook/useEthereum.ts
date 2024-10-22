import contract from "@/app/contracts/UserSession.json";
import contractSC from "@/app/contracts/SupplyChain.json";
import { ethers, verifyMessage } from "ethers";
import { timeStamp } from "console";
// const { ethers } = require("ethers");

// Địa chỉ của smart contract
// const contractAddress = "0x86a080b9a473EFce0EB97d59937310C42682523F"; // Địa chỉ contract ở nhà
// const contractAddress = "0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3"; 
const contractAddress = "0x5e1A88Dcf52F5Ca91C3FA8aeDc834AeF0D7ffDF9"; // SuppyChain
// Các hàm trong smart contract
const contractABI = contract.abi;
const contractABISuppyChain = contractSC.abi;
// Kết nối tới mạng Ethereum qua JSON-RPC
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
// Pivate key của tài khoản admin
const privateKey =
  // "0x34455e7b71db7eb7117a0adf35154cbc223c52f31f354f95d4d18fa4a61a23f7"; // Địa chỉ contract ở nhà
  "0x1fe238ae4a021c604e1fb34807ad6fe03c993cde474a63a00bc0ee9c7586f80c";

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
  const amountInEther = "1000"; // Số lượng ETH muốn gửi,
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


export const useGetBlock = async () => {
  try {
    // // Lấy thông tin block từ block hash
    // const blockHash = "0x0454c6768d85a2bf5f79d7ec2f70974f9308984d9b81deada785edf773c5fc65"
    // const block = await provider.getBlock(blockHash);
    // console.log('Thông tin block:', block);
    const transaction = await provider.getTransaction("0xbb7382a09df46f15128ff447becb5693bbfae4ca497c8f0a62377237a3b65768");
        
    if (transaction) {
        // Tạo contract interface từ ABI
        const iface = new ethers.Interface(contractABI);
        
        // Giải mã dữ liệu giao dịch
        const decodedData = iface.decodeFunctionData("storeSession", transaction.data);
        
        console.log('Thông tin giải mã từ giao dịch:', decodedData);
    } else {
        console.log('Không tìm thấy giao dịch');
    }
} catch (error) {
    console.error('Lỗi khi lấy block:', error);
}
};


export const useGetAllUserSession = async () =>{
  try {
    const contract = new ethers.Contract(contractAddress, contractABISuppyChain, provider);
    const allUsers = await contract.getAllUserSession();
        //    // Chuyển đổi dữ liệu thành một mảng đơn giản để dễ xử lý
        //    const formattedUsers = allUsers.map((user: any) => ({
        //     name: user[0],
        //     email: user[1],
        //     isActive: user[2],
        //     role: user[3],
        //     phone: user[4],
        //     certificates: user[5]
        // }));
           const formattedUsers = allUsers.map((user: any) => ({
            isLogin: user[0],
            timeStamp: user[1],
            data: user[2],
            method: user[3],
        }));
        // Lắng nghe sự kiện UserRegistered
        console.log("All Users:", allUsers);
        //  console.log("All Users:", formattedUsers);
} catch (error) {
    console.error("Error fetching user data:", error);
}
}

export const useStoreUserSession = async () =>{
  try {
    const contract = new ethers.Contract(contractAddress, contractABISuppyChain, provider);
    const allUsers = await contract.storeUserSession();
        //    // Chuyển đổi dữ liệu thành một mảng đơn giản để dễ xử lý
        //    const formattedUsers = allUsers.map((user: any) => ({
        //     name: user[0],
        //     email: user[1],
        //     isActive: user[2],
        //     role: user[3],
        //     phone: user[4],
        //     certificates: user[5]
        // }));
           const formattedUsers = allUsers.map((user: any) => ({
            isLogin: user[0],
            timeStamp: user[1],
            data: user[2],
            method: user[3],
        }));
        // Lắng nghe sự kiện UserRegistered
        console.log("All Users:", allUsers);
        //  console.log("All Users:", formattedUsers);
} catch (error) {
    console.error("Error fetching user data:", error);
}
}
