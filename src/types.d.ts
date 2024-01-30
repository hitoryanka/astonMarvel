// TODO expand on this later
type Thumbnail = {
  path: string;
  extension: string;
};

export type Character = {
  id: number;
  description: string;
  name: string;
  thumbnail: Thumbnail;
  comics: CharacterItems;
  series: CharacterItems;
  stories: CharacterItems;
  events: CharacterItems;
  urls: { type: string; url: string }[];
};

export type FavoriteCharacter = {
  id: number;
  cover: string;
  name: string;
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

export type Series = {
  id: number;
  title: string;
  description: string | null;
  thumbnail: Thumbnail;
};

export type Comic = {
  id: number;
  title: string;
  description: string | null;
  thumbnail: Thumbnail;
};
