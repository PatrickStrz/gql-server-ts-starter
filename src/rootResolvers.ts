export const resolvers = {
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
