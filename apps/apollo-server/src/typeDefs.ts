import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar DateTime
  type User {
    id: String!
    name: String!
  }
  type AuthPayload {
    token: String!
    tokenExpiry: DateTime
    refreshToken: String
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type Mutation {
    signUp(data: SignInInput): AuthPayload!
    signIn(data: SignInInput): AuthPayload!
    refreshToken: AuthPayload!
  }
  type Query {
    message: String!
  }
`;
