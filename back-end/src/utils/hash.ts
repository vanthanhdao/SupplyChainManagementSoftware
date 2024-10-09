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
    return await bcrypt.compare(plainText, hashTest);
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