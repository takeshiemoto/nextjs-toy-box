import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }
  type AuthPayload {
    token: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type Mutation {
    signUp(data: SignInInput): AuthPayload!
    signIn(data: SignInInput): AuthPayload!
  }
  type Query {
    message: String!
  }
`;
