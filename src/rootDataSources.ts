import { TrelloAPI } from "./data-sources/trello"

export const constructDataSources = () => {
  return {
    trelloAPI: new TrelloAPI(),
  }
}
