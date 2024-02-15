import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Character, Featured } from '../../types';

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const HASH_KEY = import.meta.env.VITE_HASH_KEY;
// REFACTOR there's a better way for sure
const SEARCH_PARAMS = `?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`;
export const ITEMS_LIMIT = 25;

export const charactersApi = createApi({
  reducerPath: 'heroes',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://gateway.marvel.com/v1/public/characters`,
  }),
  endpoints: builder => ({
    getCharacters: builder.query<Character[], [string, number]>({
      query: ([name, offset]) => {
        const page = `&limit=${ITEMS_LIMIT}&offset=${offset}`;
        if (name) {
          return `${SEARCH_PARAMS}&nameStartsWith=${name}${page}`;
        }
        return `${SEARCH_PARAMS}${page}`;
      },
      transformResponse: ({ data }) => data.results,
    }),

    getCharacterById: builder.query<Character, number | string>({
      query: id => `/${id}${SEARCH_PARAMS}`,
      transformResponse: ({ data }) => data.results[0],
    }),

    getCharacterFeatured: builder.query<
      Featured[],
      [number | string, 'comics' | 'series']
    >({
      query: ([id, type]) => `/${id}/${type}${SEARCH_PARAMS}`,
      transformResponse: ({ data }) => data.results,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetCharacterFeaturedQuery,
} = charactersApi;
