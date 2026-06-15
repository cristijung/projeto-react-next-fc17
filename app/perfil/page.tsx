'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { adicionarTodo, alternarTodo, removerTodo } from '../../store/todoSlice';
import { useAuth } from '@/context/authContext';

export default function Perfil() {
  const { usuario } = useAuth(); // buscando o usuário logado do seu Context API
  const [novaTarefa, setNovaTarefa] = useState('');
  
  // consumindo o estado do Redux RTK
  const todos = useAppSelector((state) => state.todos.items);
  const dispatch = useAppDispatch();

  const handleAdicionar = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaTarefa.trim() === '') return;

    dispatch(adicionarTodo(novaTarefa));
    setNovaTarefa('');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* cabeçalho do perfil */}
      <div className="mb-8 border-b border-slate-200 pb-5 dark:border-slate-800">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Minha Conta
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Olá, <strong className="text-indigo-600 dark:text-indigo-400">{usuario?.nome || 'Usuário'}</strong>. Organize suas tarefas diárias abaixo.
        </p>
      </div>

      {/* form do ToDo */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white mb-4">
          Lista de Tarefas (Redux RTK)
        </h2>
        
        <form onSubmit={handleAdicionar} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Adicionar
          </button>
        </form>

        {/* lista de tarefas */}
        {todos.length === 0 ? (
          <p className="text-sm text-center text-slate-400 py-4">
            Nenhuma tarefa cadastrada por enquanto. 🐾
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.concluido}
                    onChange={() => dispatch(alternarTodo(todo.id))}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm font-medium transition-all ${
                      todo.concluido
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {todo.texto}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(removerTodo(todo.id))}
                  className="rounded px-2 py-1 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}