import contract from "@/app/contracts/OrderTracking.json";
import contractSC from "@/app/contracts/SupplyChain.json";
import { ethers, verifyMessage } from "ethers";

// const { ethers } = require("ethers");

// Địa chỉ của smart contract
const contractAddress = "0x13c2CE84642E4C7d23de2f7926f5b0BCF8B1302e"; // SuppyChain
// Các hàm trong smart contract
const contractABISuppyChain = contract.abi;
const contractABI = contract.abi;
// Kết nối tới mạng Ethereum qua JSON-RPC
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
// Pivate key của tài khoản admin
const privateKey =
  "0x34455e7b71db7eb7117a0adf35154cbc223c52f31f354f95d4d18fa4a61a23f7";

// Chuyển ether cho người dùng
export const useProvideEthUser = async (walletAddress: string) => {
  try {
    // Thông tin tài khoản của admin
    const signer = new ethers.Wallet(privateKey, provider);
    // Địa chỉ của người nhận và số lượng ETH để gửi
    const recipient = walletAddress; // Địa chỉ người nhận
    const amountInEther = "0.1"; // Số lượng ETH muốn gửi,
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
    throw new Error(`UseProvideEthUser failed: ${error}`);
  }
};

// Xác thực wallet address CSDL với 1 wallet khởi tạo
export const useVerifyWallet = async (privateKey: string): Promise<boolean> => {
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
    throw new Error(`UseVerifyWallet failed: ${error}`);
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

export const useGetBlockByAllEvent = async () => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractABISuppyChain,
      provider
    );
    const filter = {
      address: contractAddress,
      fromBlock: 0,
      toBlock: "latest",
    };
    const events = await provider.getLogs(filter);
    const results = events
      .map((log: any) => {
        const decodedLog = contract.interface.parseLog(log);
        if (decodedLog) {
          return {
            eventName: decodedLog.name,
            args: decodedLog.args,
            blockHash: log.blockHash,
            blockNumber: log.blockNumber,
          };
        }
        return null;
      })
      .filter((item: any) => item !== null);

    console.log(results);
  } catch (error) {
    console.error("Get Block Failed: ", error);
  }
};

export const useGetBlockByOneEvent = async (
  topic: string
): Promise<IDataBlockByOneEvent[]> => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractABISuppyChain,
      provider
    );
    const filter = contract.filters[topic]();
    const events = await contract.queryFilter(filter, 0, "latest");

    if (topic === "StoreUserSession") {
      const results: IDataBlockByOneEvent[] = events.map((log: any) => {
        const decodedLog = contract.interface.decodeEventLog(
          topic,
          log.data,
          log.topics
        );

        if (decodedLog) {
          const address = decodedLog[0];
          const isLogin = decodedLog[1];
          const timeStamp = decodedLog[2];
          const data = decodedLog[3];
          const action = decodedLog[4];

          return {
            eventName: topic,
            action,
            address,
            data,
            isLogin,
            timeStamp,
            blockHash: log.blockHash,
            blockNumber: log.blockNumber,
          };
        }
        throw new Error(`StoreUserSession null!`);
      });
      return results;
    } else {
      const results = events
        .map((log: any) => {
          const decodedLog = contract.interface.decodeEventLog(
            topic,
            log.data,
            log.topics
          );
          if (decodedLog) {
            return {
              eventName: topic,
              action: decodedLog[4],
              address: decodedLog[0],
              data: decodedLog[3],
              isLogin: decodedLog[1],
              timeStamp: decodedLog[2],
              blockHash: log.blockHash,
              blockNumber: log.blockNumber,
            } as IDataBlockByOneEvent;
          }
          return null;
        })
        .filter((item): item is IDataBlockByOneEvent => item !== null);
      return results;
    }
  } catch (error) {
    throw new Error(`UseGetBlockByOneEvent failed: ${error}`);
  }
};

export const useGetWalletAddress = async () => {
  if (window.ethereum) {
    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];
    return accounts[0];
  }
};

export const useConnectMetaMask = async () => {
  try {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xbc5c01",
              chainName: "MyNetwork",
              rpcUrls: ["http://127.0.0.1:8545"],
              nativeCurrency: {
                name: "Ethereum Coin",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        });
      } catch (error) {
        console.error("Error adding network:", error);
      }
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  } catch (error) {
    throw new Error(`useConnectMetaMask failed: ${error}`);
  }
};

export const useAddOrder = async (
  orderId: number,
  productList: string[],
  history: string[],
  timeLine: string[],
  po: string[]
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.addOrder(
      orderId,
      productList,
      history,
      timeLine,
      po
    );
    // Đợi cho giao dịch được xác nhận
    await txResponse.wait();
    return false;
    // // Lấy thông tin từ txReceipt
    // const transactionHash = txResponse.hash;
    // const blockHash = txReceipt.blockHash;
    // const blockNumber = txReceipt.blockNumber;
    // const from = txReceipt.from;
    // const result = {
    //   blockHash,
    //   blockNumber,
    //   transactionHash,
    //   address: from,
    // };
  } catch (error) {
    throw new Error(`useAddOrder failed: ${error}`);
  }
};

export const usePushToTimeLine = async (
  orderId: number,
  timeLine: string[]
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.pushToTimeLine(orderId, timeLine);
    // Đợi cho giao dịch được xác nhận
    await txResponse.wait();
    return false;
  } catch (error) {
    throw new Error(`useAddOrder failed: ${error}`);
  }
};
