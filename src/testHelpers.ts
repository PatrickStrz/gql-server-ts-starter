/* integration test helpers */
import { ApolloServer } from "apollo-server"
import { constructDataSources } from "./rootDataSources"
import { typeDefs } from "./rootTypeDefs"
import { resolvers } from "./rootResolvers"

export const constructTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: constructDataSources,
    context: {},
  })

  return { server }
}
