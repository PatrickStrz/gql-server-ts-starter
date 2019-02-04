import dotenv from "dotenv"
import { ApolloServer } from "apollo-server"

import { typeDefs } from "./rootTypeDefs"
import { resolvers } from "./rootResolvers"

import { constructDataSources } from "./rootDataSources"

dotenv.config()

const server = new ApolloServer({ typeDefs, resolvers, dataSources: constructDataSources })

server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`)
})
