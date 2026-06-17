'use client';

import Image from 'next/image';
import { useGetRandomCatsQuery } from '@/store/catApi';

export default function Cats() {
  const { data: cats, error, isLoading, refetch } = useGetRandomCatsQuery(1);

  if (isLoading) return <div className="p-10 text-center">Carregando gatinho...</div>;
  if (error) return <div className="p-10 text-red-500">Erro ao buscar gatinho!</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Cat do Dia</h1>
        
        {cats && cats[0] && (
          <div className="relative h-64 w-full mb-6 overflow-hidden rounded-xl">            
            <Image 
              src={cats[0].url} 
              alt="Gatinho fofo" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 384px"
              priority 
            />
          </div>
        )}

        <button
          onClick={() => refetch()}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Ver outro gatinho
        </button>
      </div>
    </div>
  );
}