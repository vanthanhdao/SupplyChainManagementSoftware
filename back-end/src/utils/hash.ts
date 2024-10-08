const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashHelper = async (plainText: string) => {
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
