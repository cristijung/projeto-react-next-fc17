'use client';

import { useGetBreedsQuery } from '@/store/catApiDois';

export default function BreedCatalog() {
  // hook gerencia o estado de carregamento e erro automaticamente
  const { data: breeds, isLoading, isError } = useGetBreedsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 bg-red-50 text-red-600 rounded-xl">
        <p className="font-bold">Ops! Erro ao carregar as raças.</p>
        <p className="text-sm">Verifique a conexão com a The Cat API.</p>
      </div>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Enciclopédia Felina</h1>
          <p className="text-gray-600">Explore as características de diversas raças através da catApiDois</p>
        </header>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds?.map((breed) => (
            <div 
              key={breed.id} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-indigo-600">{breed.name}</h3>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
                  {breed.origin}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                {breed.description}
              </p>

              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Temperamento</p>
                <div className="flex flex-wrap gap-2">
                  {breed.temperament.split(',').slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}