const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (myPlaintextPassword: string) => {
  try {
    return await bcrypt.hash(myPlaintextPassword, saltRounds);
  } catch (err) {
    console.error(err);
    throw new Error('Error hashing password');
  }
};
