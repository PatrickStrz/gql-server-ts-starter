import dotenv from "dotenv"
import { ApolloServer } from "apollo-server"
import { TrelloAPI } from "./data-sources/trello"
import { typeDefs } from "./typeDefs"
import { resolvers } from "./rootResolvers"

dotenv.config()

export const dataSources = () => {
  return {
    trelloAPI: new TrelloAPI(),
  }
}

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`)
})
