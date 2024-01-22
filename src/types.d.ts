// TODO expand on this later
export type Character = {
  id: number;
  description: string;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
};

type ResponseWrapper = {
  data: BasicResponse;
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
