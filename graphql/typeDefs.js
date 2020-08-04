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
  input UpdateProfileInput {
    id: ID!
    username: String!
    oldEmail: String!
    newEmail: String!
  }
  input UpdatePasswordInput {
    id: ID!
    oldPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }
  input MessageInput {
    id: ID!
    text: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    getMessages: [Message!]!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateProfile(updateProfileInput: UpdateProfileInput!): User!
    updatePassword(updatePasswordInput: UpdatePasswordInput!): User!
    createMessage(messageInput: MessageInput!): Message!
    singleUpload(file: Upload!): File
  }
  type Subscription {
    newMessage: Message!
  }
`;
