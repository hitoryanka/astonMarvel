import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'heroes',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://gateway.marvel.com/v1/public/characters/?ts=1&apikey=${process.env.PUBLIC_KEY}`,
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
