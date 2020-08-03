const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Message {
    id: ID!
    text: String!
    user: User!
    createdAt: String!
  }
  input UpdateUserInput {
    id: ID!
    username: String!
    oldEmail: String!
    newEmail: String!
    oldPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }
  input MessageInput {
    id: ID!
    text: String!
  }
  type Query {
    getUser(id: ID!): User!
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(updateUserInput: UpdateUserInput!): User!
    createMessage(messageInput: MessageInput!): Message
  }
  type Subscription {
    newMessage: Message!
  }
`;
