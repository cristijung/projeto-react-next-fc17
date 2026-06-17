// foco no cache
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
}

export interface CatImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
  breeds?: CatBreed[];
}

export const catApiDois = createApi({
  reducerPath: 'catApiDois', // nome único para o estado no Redux
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/' }),
  
  // config global de cache --> padrão é 60 segundos
  keepUnusedDataFor: 60, 

  endpoints: (builder) => ({
    // requisição1: cats aleatórios
    getRandomCats: builder.query<CatImage[], number>({
      query: (limit = 1) => `images/search?limit=${limit}`,
      keepUnusedDataFor: 30, // cache específico: 30 s
    }),

    // requisição2: lista de Raças
    getBreeds: builder.query<CatBreed[], void>({
      query: () => `breeds`,
      keepUnusedDataFor: 300, // cache específico: 5 min
    }),

    // requisição3: buscar por ID específico
    getCatById: builder.query<CatImage, string>({
      query: (id) => `images/${id}`,
      // usando padrão global de 60s
    }),
  }),
});

// hooks gerados automaticamente
export const { 
  useGetRandomCatsQuery, 
  useGetBreedsQuery, 
  useGetCatByIdQuery 
} = catApiDois;