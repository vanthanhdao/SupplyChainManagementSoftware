const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
const saltRounds = 10;

export const hashPassHelper = async (plainText: string) => {
  try {
    return await bcrypt.hash(plainText, saltRounds);
  } catch (err) {
    console.error(err);
    throw new Error('Error hashing helper');
  }
};

export const compareHelper = async (plainText: string, hashTest: string) => {
  try {
    const result = await bcrypt.compare(plainText, hashTest);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Error compare helper');
  }
};



export const hashWalletHelper = async (plainText: string, secretKey:string) => {
  try {
    return await CryptoJS.AES.encrypt(plainText,secretKey).toString();
  } catch (err) {
    console.error(err);
    throw new Error('Error hashing helper');
  }
};

export const reHashWalletHelper = async (hashText: string, secretKey:string) => {
  try {
    return await CryptoJS.AES.decrypt(hashText,secretKey).toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error(err);
    throw new Error('Error rehashing helper');
  }
};