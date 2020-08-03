const Message = require("../../models/Message");
const { user } = require("./merge");

const NEW_MESSAGE = "NEW_MESSAGE";

module.exports = {
  Query: {
    getMessages: async () => {
      try {
        const messages = await Message.find().sort({ createdAt: -1 });
        return messages.map((message) => {
          return {
            id: message._id,
            ...message._doc,
            user: user.bind(this, message._doc.user),
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createMessage: async (_, { messageInput: { id, text } }, context) => {
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

        context.pubsub.publish(NEW_MESSAGE, {
          newMessage: {
            id: res._id,
            ...res._doc,
            user: user.bind(this, res._doc.user),
          },
        });

        return {
          id: res._id,
          ...res._doc,
          user: user.bind(this, res._doc.user),
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([NEW_MESSAGE]),
    },
  },
};
