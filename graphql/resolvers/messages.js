// import { PubSub, withFilter } from "graphql-subscriptions";

// const pubsub = new PubSub();

const Message = require("../../models/Message");
const User = require("../../models/User");

module.exports = {
  //   Query: {},
  Mutation: {
    async createMessage(_, { messageInput: { id, text } }) {
      try {
        if (!text) {
          throw new Error("Message cannot be empty.");
        }
        const newMessage = new Message({
          text,
          user: id,
          createdAt: new Date().toISOString(),
        });
        const res = await newMessage.save();

        const user = await User.findOne({ _id: id });

        console.log(user);
        console.log(user);

        return {
          id: res._id,
          text: res._doc.text,
          createdAt: res._doc.createdAt,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
          },
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  //   Subscription: {
  //     newMessage: {
  //       //   subscribe: withFilter(
  //       //     () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
  //       //     (payload, args) => payload.channelId === args.channelId
  //       //   ),
  //     },
  //   },
};
