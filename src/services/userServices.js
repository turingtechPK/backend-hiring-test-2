const User = require("../models/User");

// return true if user exists
const checkUserId = async (id) => {
  const user = User.findById(id);

  return user && true;
};

const getUserAccountType = async (id) => {
  const user = User.findById(id);

  return user.accountType;
};

module.exports = {
  checkUserId,
  getUserAccountType,
};
