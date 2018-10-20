import dotenv from "dotenv"

dotenv.config()

import { ApolloServer, gql } from "apollo-server"

import { TrelloAPI } from "./data-sources/trello"

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Board {
    id: ID!
    name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    boards: [Board]
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    /* tslint:disable-next-line */
    books: async (_0: any, _1: any, { dataSources }: any) => {
      console.log(await dataSources.trelloAPI.boards())
      return books
    },
    /* tslint:disable-next-line */
    boards: async (_0: any, _1: any, { dataSources }: any) => {
      return await dataSources.trelloAPI.boards()
    },
  },
}

const dataSources = () => {
  return {
    trelloAPI: new TrelloAPI(),
  }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, dataSources })

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`)
})
