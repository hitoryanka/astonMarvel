import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Character, CharacterResponse } from '../../types';

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const HASH_KEY = import.meta.env.VITE_HASH_KEY;
const SEARCH_PARAMS = `?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`;

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

    getCharacter: builder.query<CharacterResponse, number>({
      query: id => `/${id}${SEARCH_PARAMS}`,
      transformResponse: ({ data }) => data.results[0],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } =
  charactersApi;

// TODO create design for character cards
// TODO fetch details about characters from URLs field
