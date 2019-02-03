import { createTestClient } from "apollo-server-testing"
import { ApolloServer } from "apollo-server"
import { TrelloAPI } from "../data-sources/trello/trelloAPI"
import { resolvers } from "../rootResolvers"
import { typeDefs } from "../rootTypeDefs"
import { gql } from "apollo-server"

const ALL_BOARDS_QUERY = gql`
  {
    boards {
      id
    }
  }
`

// @ts-ignore
TrelloAPI.prototype.get = jest.fn(() => [{ id: 1 }, { id: 5 }])

export const dataSources = () => {
  return {
    trelloAPI: new TrelloAPI(),
  }
}

it("fetches single launch", async () => {
  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
  })
  // use the test server to create a query function
  // @ts-ignore
  const { query } = createTestClient(server)
  // run query against the server and snapshot the output
  const res = await query({ query: ALL_BOARDS_QUERY })
  // @ts-ignore
  expect(res).toMatchSnapshot()
  const b = { resolvers, typeDefs }

  expect(b).toBeTruthy()
})
