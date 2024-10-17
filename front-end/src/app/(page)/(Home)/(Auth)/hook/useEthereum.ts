
import contract from "@/app/contracts/UserSession.json";
const { ethers } = require("ethers");


// Địa chỉ của smart contract
const contractAddress = "0x4d419A0ecf7ACEB43c8E06afB9731660Ab7894f3";
// Các hàm trong smart contract
const contractABI = contract.abi;
// Kết nối tới mạng Ethereum qua JSON-RPC
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
// Pivate key của tài khoản admin
const privateKey ="0x1fe238ae4a021c604e1fb34807ad6fe03c993cde474a63a00bc0ee9c7586f80c"; 


// Chuyển ether cho người dùng 
export const useProvideEthUser = async (walletAddress: string)=>{
    if(!walletAddress) return;
    try{
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
            value: amount
        };
        // Ký và gửi giao dịch
        const transaction = await signer.sendTransaction(tx);
        await transaction.wait();
    }catch(error){
        console.log("Failed transaction!: ",error);
    };
};


// Gọi hàm StoreSession tre6nsmart contract
export const useStoreSession = async (wallet: IWalletAddress, active: string)=>{
    if(!wallet && !active) return;
    try{
    const {publicKey,privateKey} = wallet;
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transaction = await contract.storeSession(publicKey,active);
    await transaction.wait();
    }catch(error){
        console.log("Failed transaction!: ",error);
    };

};