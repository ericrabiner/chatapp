const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: String,
});

module.exports = model("User", userSchema);
