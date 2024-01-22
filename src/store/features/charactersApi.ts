import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const HASH_KEY = import.meta.env.VITE_HASH_KEY;

export const charactersApi = createApi({
  reducerPath: 'heroes',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://gateway.marvel.com/v1/public/characters/?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`,
  }),
  endpoints: builder => ({
    getCharacters: builder.query<any, void>({
      query: () => '',
    }),

    getCharacter: builder.query({
      query: id => `/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } =
  charactersApi;
