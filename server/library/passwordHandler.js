const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  //console.debug("Hashing password");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
exports.comparePassword = async (password, hashedPassword) => {
  //console.debug("compare password");
  return await bcrypt.compare(password, hashedPassword);
};
