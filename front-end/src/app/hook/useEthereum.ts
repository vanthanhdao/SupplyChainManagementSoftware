import contract from "@/app/contracts/OrderTracking.json";
import contractSC from "@/app/contracts/SupplyChain.json";
import { ethers, verifyMessage } from "ethers";
import { getAccountById } from "../apis/users-api";
import { Varela_Round } from "next/font/google";

// const { ethers } = require("ethers");

// Địa chỉ của smart contract
const contractAddress = "0x3e5508f8E3369937e7D929f00f5C0A1D04146382"; // SuppyChain
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
  po: string
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.addOrderCustomer(
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

export const useAddSubOrder = async (
  orderId: number,
  subOrderId: number,
  subTimeLine: string[],
  subpo: string,
  materialList: string[],
  history: string,
  timeLine: string
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.addSubOrderManufacturer(
      orderId,
      subOrderId,
      subTimeLine,
      subpo,
      materialList,
      history,
      timeLine
    );
    await txResponse.wait();
    return false;
  } catch (error) {
    throw new Error(`useAddSubOrder failed: ${error}`);
  }
};

export const useAddSubOrderCarrier = async (
  orderId: number,
  subOrderId: number,
  subTimeLine: string[],
  subpo: string,
  shipping: string,
  timeLine: string,
  history: string
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.addSubOrderCarrier(
      orderId,
      subOrderId,
      subTimeLine,
      subpo,
      shipping,
      timeLine,
      history
    );
    await txResponse.wait();
    return false;
  } catch (error) {
    throw new Error(`useAddSubOrder failed: ${error}`);
  }
};

export const usePushToTimeLine = async (
  orderId: number,
  timeLine: string
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
    throw new Error(`usePushToTimeLine failed: ${error}`);
  }
};

export const usePushToSubTimeLine = async (
  subOrderId: number,
  subTimeLine: string
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.pushToSubTimeLine(
      subOrderId,
      subTimeLine
    );
    // Đợi cho giao dịch được xác nhận
    await txResponse.wait();
    return false;
  } catch (error) {
    throw new Error(`usePushToSubTimeLine failed: ${error}`);
  }
};

export const usePushBothToTimeLine = async (
  orderId: number,
  subOrderId: number,
  timeline: string,
  subTimeLine: string
): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const txResponse = await contract.pushBothToTimeLine(
      orderId,
      subOrderId,
      timeline,
      subTimeLine
    );
    // Đợi cho giao dịch được xác nhận
    await txResponse.wait();
    return false;
  } catch (error) {
    throw new Error(`usePushBothToTimeLine failed: ${error}`);
  }
};

// export const parsedData = (data:any) => {
//   const parsed = data.map(item => {
//   const result = {};
//   item.replace(/{|}/g, '')  // Loại bỏ dấu ngoặc nhọn
//     .split(',')  // Chia chuỗi thành các phần
//     .forEach(part => {
//       const [key, value] = part.split(':').map(str => str.trim().replace(/['"]/g, ''));  // Xử lý trim và loại bỏ dấu nháy
//       result[key] = value;
//     });
//   return result;
// });
// };

type Order = {
  Date: string;
  Status: string;
  Title: string;
};

export const useGetOderById = async (
  role: string,
  id: number,
  groupOrder: OrderGroup
) => {
  try {
    if (!window.ethereum) {
      throw new Error(`MetaMask is not installed.`);
    }
    if (!role && !id) throw new Error(`Role and Id is null`);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    var order = "";
    if (role !== "CUSTOMER") {
      if (groupOrder.SubOrderId) {
        order = await contract.getSubOrder(id);
      } else {
        order = await contract.getOrder(id);
      }
    } else {
      order = await contract.getOrder(id);
    }
    if (!order) return;
    const formatArray = Object.values(order);
    const processedData = formatArray.map((item: any, index) => {
      if (typeof item === "bigint") {
        return Number(item);
      } else if (typeof item === "object") {
        return Object.values(item);
      } else {
        return item;
      }
    });
    const checkProcessedData =
      role !== "CUSTOMER"
        ? groupOrder && groupOrder.SubOrderId
          ? processedData[2]
          : processedData[4]
        : processedData[4];
    // Tối ưu hóa: Sử dụng RegEx để phân tích cú pháp chuỗi và chuyển thành đối tượng
    const parsedData: Order[] = checkProcessedData.map(
      (item: string): Order => {
        // Loại bỏ dấu ngoặc nhọn và chia chuỗi thành các phần
        const result: Order = { Date: "", Status: "", Title: "" };

        item
          .replace(/{|}/g, "") // Loại bỏ dấu ngoặc nhọn
          .split(",") // Chia chuỗi thành các phần
          .forEach((part) => {
            const [key, value] = part
              .split(":")
              .map((str) => str.trim().replace(/['"]/g, "")); // Xử lý trim và loại bỏ dấu nháy
            if (key in result) {
              result[key as keyof Order] = value;
            }
          });

        return result;
      }
    );
    return {
      ordertracking: parsedData,
      purchaseOrder: role !== "CUSTOMER" ? processedData[3] : processedData[6],
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
