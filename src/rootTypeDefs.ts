import { gql } from "apollo-server"

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Board {
    id: ID!
    name: String
  }

  type Query {
    books: [Book]
    boards: [Board]
  }
`
