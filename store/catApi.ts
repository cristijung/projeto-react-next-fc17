import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/' }),
  endpoints: (builder) => ({
    
    getRandomCats: builder.query<CatImage[], number>({
      query: (limit = 1) => `images/search?limit=${limit}`,
    }),
  }),
});


export const { useGetRandomCatsQuery } = catApi;