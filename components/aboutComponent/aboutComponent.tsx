"use client";

import { useState, useEffect } from "react";

// interface p tipar os dados da API do GitHub
interface GitHubUser {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
}

export default function UserProfile() {
  // estados p armazenar o usuário, o carregamento e possíveis erros
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // o useEffect dispara a busca assim que o componente é montado
  useEffect(() => {
    async function fetchUserData() {
      try {
        // buscando dados de um perfil público --> usando o do próprio criador do Linux como exemplo
        const response = await fetch("https://api.github.com/users/cristijung");
        const data: GitHubUser = await response.json();
        
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // desativa o indicador de carregamento
      }
    }

    fetchUserData();
  }, []); // array de dependências vazio = roda apenas UMA vez após a renderização inicial

  // renderização condicional para o estado de loading
  if (loading) {
    return <p className="text-center p-4">Carregando perfil...</p>;
  }

  // SE não encontrar o usuário por algum motivo
  if (!user) {
    return <p className="text-center p-4">Não foi possível carregar o usuário.</p>;
  }

  // renderização do componente com os dados salvos no useState
  return (
    <>
    <h1>Quem somos</h1>
    <div className="max-w-sm mx-auto my-8 bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden p-6 border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col items-center">
        <img
          className="h-24 w-24 rounded-full object-cover ring-2 ring-blue-500"
          src={user.avatar_url}
          alt={`Avatar de ${user.name}`}
        />
        <h2 className="mt-4 text-xl font-bold text-zinc-850 dark:text-white">
          {user.name}
        </h2>
        <p className="mt-2 text-zinc-500 text-sm text-center">
          {user.bio || "Sem biografia disponível."}
        </p>
        <div className="mt-4 pt-4 border-t border-zinc-100 w-full text-center">
          <span className="text-xs uppercase font-semibold text-zinc-400 block">
            Repositórios Públicos
          </span>
          <span className="text-2xl font-extrabold text-blue-600">
            {user.public_repos}
          </span>
        </div>
      </div>
    </div>
    </>
  );
}