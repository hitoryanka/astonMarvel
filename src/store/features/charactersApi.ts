import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Character, CharacterResponse } from '../../types';

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const HASH_KEY = import.meta.env.VITE_HASH_KEY;
// REFACTOR there's a better way for sure
const SEARCH_PARAMS = `?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}&modifiedSince=10.10.2015&orderBy=-name`;

export const charactersApi = createApi({
  reducerPath: 'heroes',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://gateway.marvel.com/v1/public/characters`,
  }),
  endpoints: builder => ({
    getCharacters: builder.query<Character[], void>({
      query: () => `${SEARCH_PARAMS}`,
      transformResponse: ({ data }) => data.results,
    }),

    getCharacterById: builder.query<CharacterResponse, number>({
      query: id => `/${id}${SEARCH_PARAMS}`,
      transformResponse: ({ data }) => data.results[0],
    }),

    getCharacterByName: builder.query<CharacterResponse, string>({
      query: name => `&nameStartsWith=${name}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetCharacterByNameQuery,
} = charactersApi;

// TODO create design for character cards
// TODO fetch details about characters from URLs field
