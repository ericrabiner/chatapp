const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput,
} = require("../../util/validators");
const User = require("../../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  // Query: {
  //   async getUser({ id }) {
  //     try {
  //       const user = await User.findOne({ _id: id });
  //       return user;
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   },
  //   async getUsers() {
  //     try {
  //       const users = await User.find().sort({ createdAt: -1 });
  //       return users;
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   },
  // },
  Mutation: {
    login: async (_, { email, password }) => {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "Incorrect email or password.";
        throw new UserInputError("Incorrect email or password.", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Incorrect email or password.";
        throw new UserInputError("Incorrect email or password.", { errors });
      }

      const token = generateToken(user);

      return {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new UserInputError("This email is taken.", {
          errors: {
            email: "This email is taken.",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        id: res._id,
        username: res._doc.username,
        email: res._doc.email,
        createdAt: res._doc.createdAt,
        token,
      };
    },
    updateUser: async (
      _,
      {
        updateUserInput: {
          id,
          username,
          oldEmail,
          newEmail,
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
      }
    ) => {
      const { valid, errors } = validateUpdateUserInput(
        username,
        newEmail,
        oldPassword,
        newPassword,
        confirmNewPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ _id: id });

      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        errors.general = "Incorrect old password.";
        throw new UserInputError("Incorrect old password.", { errors });
      }

      if (newEmail !== oldEmail) {
        const existingEmail = await User.findOne({ email: newEmail });
        if (existingEmail) {
          throw new UserInputError("This email is taken.", {
            errors: {
              email: "This email is taken.",
            },
          });
        }
      }

      const password = await bcrypt.hash(newPassword, 12);

      await User.updateOne(
        {
          email: oldEmail,
        },
        { $set: { username, email: newEmail, password } }
      );

      const token = generateToken(user);

      return {
        id,
        username,
        email: newEmail,
        token,
        createdAt: user.createdAt,
      };
    },
  },
};
