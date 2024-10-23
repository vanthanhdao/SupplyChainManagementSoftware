import contract from "@/app/contracts/UserSession.json";
import contractSC from "@/app/contracts/SupplyChain.json";
import { ethers, verifyMessage } from "ethers";

// const { ethers } = require("ethers");

// Địa chỉ của smart contract
// const contractAddress = "0x86a080b9a473EFce0EB97d59937310C42682523F"; // Địa chỉ contract ở nhà
// const contractAddress = "0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3"; 
const contractAddress = "0x9565BE43D8d1e3f4D98FC7Bb6cAa3A22c76c48C3"; // SuppyChain
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


export const useGetBlockByHash = async () => {
  try {
    const block = await provider.getBlock("0x1acc7be4dceaaaf1b28530f8ed0450948cea91eb9b1c75598548fa7ebe1ba560");

    if (block && block.transactions.length > 0) {
        // Lấy hash của giao dịch đầu tiên trong block
        const transactionHash = "0xa9f2269a0e753c05b3575b2f39a70440cc86ae6263bed82ac80ecf495c28be1b";        
        // Lấy chi tiết giao dịch từ transaction hash
        const transaction = await provider.getTransaction(transactionHash);
        if (!transaction) {
          console.log('Giao dịch không tồn tại');
          return;
        }
        // Khởi tạo interface từ ABI
        const contractInterface = new ethers.Interface(contractABISuppyChain);
        // Decode dữ liệu từ transaction.data
        const decodedData = contractInterface.decodeFunctionData("storeUserSession",transaction.data);
        console.log("Block:", block);
        console.log("Decoded data:", decodedData);
      }
} catch (error) {
    console.error('Lỗi khi lấy block:', error);
}
};


export const useGetBlockByEvent = async () => {
  try {
    const contract = new ethers.Contract(contractAddress, contractABISuppyChain, provider);
        // Định nghĩa từBlock và đếnBlock (optional)
        const fromBlock = 0; // hoặc một block cụ thể
        const toBlock = "latest"; // lấy đến block mới nhất
    
        // // Lấy các sự kiện UserRegistered đã phát ra
        const filter = contract.filters.storeUserSignUp(); // Tạo filter cho sự kiện
        const logs = await provider.getLogs({ ...filter, fromBlock, toBlock });
        console.log(logs)
    
  // Chuyển đổi log thành sự kiện và in ra block hash
  const events = logs.map(log => {
    const parsedLog = contract.interface.parseLog(log);
    return {
      userAddress: parsedLog?.args.userAddress,
      email: parsedLog?.args.email,
      isLogin: parsedLog?.args.isLogin,
      method: parsedLog?.args.method,
      blockHash: log.blockHash, // Lấy blockHash từ log
      transactionHash: log.transactionHash // Lấy transactionHash từ log
    };
  });

  // In ra các sự kiện cùng với block hash
  events.forEach(event => {
    console.log(`Past Event: 
      User Address: ${event.userAddress || "null"}, 
      Email: ${event.email || "null"}, 
      Is Login: ${event.isLogin || "null"}, 
      Method: ${event.method || "null"},
      Block Hash: ${event.blockHash}, 
      Transaction Hash: ${event.transactionHash}
    `);
  });

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
        //    const formattedUsers = allUsers.map((user: any) => ({
        //     isLogin: user[0],
        //     timeStamp: user[1],
        //     data: user[2],
        //     method: user[3],
        // }));
        // Lắng nghe sự kiện UserRegistered
        console.log("All Users:", allUsers);
        //  console.log("All Users:", formattedUsers);
} catch (error) {
    console.error("Error fetching user data:", error);
}
}

export const useStoreUserSession = async (walletAddress: IWalletAddress, email: string,data: string, type: string): Promise<IBlockHash | null> =>{
  try {
    const {publicKey,privateKey}=walletAddress;
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABISuppyChain, signer);
    const txResponse = await contract.storeUserSession(publicKey,email,data,type);
    // Đợi cho giao dịch được xác nhận
    const txReceipt = await txResponse.wait();
    // Lấy thông tin từ txReceipt
    const transactionHash = txResponse.hash; 
    const blockHash = txReceipt.blockHash; 
    const blockNumber = txReceipt.blockNumber;
    const from = txReceipt.from;
    const result: IBlockHash = {
      blockHash,
      blockNumber,
      transactionHash,
      userAddress:from
    };
    return result;
} catch (error) {
    console.error("Error fetching user data:", error);
    return null;
}
}
