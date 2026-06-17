'use client';

import { useGetPostsQuery } from '@/store/postApi';

export default function PostList() {
  // hook nos dá a função 'refetch' e o estado 'isFetching' ...
  const { 
    data: posts, 
    isLoading, 
    isFetching, 
    error, 
    refetch 
  } = useGetPostsQuery();

  if (isLoading) return <p className="text-center p-10">Carregando posts iniciais...</p>;
  if (error) return <p className="text-center p-10 text-red-500">Erro ao carregar!</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts da JSONPlaceholder</h1>
        
        {/* btn q dispara o refetch */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition
            ${isFetching ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isFetching ? 'Atualizando...' : 'Sincronizar Agora'}
        </button>
      </div>

      <div className="space-y-4">
        {posts?.map((post) => (
          <article 
            key={post.id} 
            className={`p-4 border rounded-xl transition-opacity ${isFetching ? 'opacity-50' : 'opacity-100'}`}
          >
            <h2 className="font-bold capitalize text-blue-800">{post.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}