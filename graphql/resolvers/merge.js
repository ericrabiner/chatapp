const User = require("../../models/User");

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return { id: user._id, ...user._doc };
  } catch (err) {
    throw err;
  }
};

exports.user = user;
