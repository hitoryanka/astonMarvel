// TODO expand on this later
export type Character = {
  id: number;
  description: string;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: CharacterItems;
  series: CharacterItems;
  stories: CharacterItems;
  events: CharacterItems;
  urls: { type: string; url: string }[];
};

type CharacterItems = {
  available: number;
  items: {
    resourceURI: string;
    name: string;
  }[];
};

type BasicResponse = {
  count: number;
  limit: number;
  offset: number;
  results?: unknown;
  total: number;
};

export interface CharacterResponse extends BasicResponse {
  results: Character[];
}
