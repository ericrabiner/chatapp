const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input UpdateUserInput {
    username: String!
    oldEmail: String!
    newEmail: String!
    oldPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(updateUserInput: UpdateUserInput!): User!
  }
`;
