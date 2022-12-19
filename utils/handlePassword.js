const bcrypt = require("bcryptjs");

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const compare = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = { encrypt, compare };
