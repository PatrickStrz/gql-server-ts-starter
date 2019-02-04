import { createTestClient } from "apollo-server-testing"
import { TrelloAPI } from "../data-sources/trello/trelloAPI"
import { gql } from "apollo-server"
import { constructTestServer } from "../testHelpers"

const ALL_BOARDS_QUERY = gql`
  {
    boards {
      id
    }
  }
`

// @ts-ignore
TrelloAPI.prototype.get = jest.fn(() => [{ id: 1 }, { id: 5 }])

it("fetches a list of boards", async () => {
  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const { server } = constructTestServer()
  // use the test server to create a query function
  // @ts-ignore
  const { query } = createTestClient(server)
  // run query against the server and snapshot the output
  const res = await query({ query: ALL_BOARDS_QUERY })
  // @ts-ignore
  expect(res).toMatchSnapshot()
})
