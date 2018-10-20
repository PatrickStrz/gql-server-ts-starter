import { RESTDataSource, RequestOptions } from "apollo-datasource-rest"

export class TrelloAPI extends RESTDataSource {
  public baseURL = "https://api.trello.com/1/"

  public willSendRequest(request: RequestOptions) {
    request.params.set("key", process.env.TRELLO_API_KEY)
    request.params.set("token", process.env.TRELLO_API_TOKEN)
  }
  public async boards(): Promise<any> {
    return this.get("/members/me/boards/")
  }
}
