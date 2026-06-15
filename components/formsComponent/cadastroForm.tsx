'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// esquema de validação com Zod
const cadastroSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Insira um e-mail válido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// inferência de tipo
type CadastroFormData = z.infer<typeof cadastroSchema>;

export default function CadastroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
    },
  });

  // fn de destino final do formulário 
  // esta fn define q os q serão enviados estão 100% validados
  const onSubmit = async (data: CadastroFormData) => {
    // a new Promise + await força a parada do código
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Dados validados e enviados com sucesso:', data);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 dark:from-zinc-900 dark:to-zinc-950">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 dark:border-zinc-800/80 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 backdrop-blur-sm">
        
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
            Criar Conta
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            Preencha os dados abaixo para começar.
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          
          {/* campo nome */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              {...register('nome')}
              placeholder="Seu nome completo"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800/50 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 transition-all outline-none focus:ring-2
                ${errors.nome 
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-slate-200 dark:border-zinc-700/80 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
            />
            {errors.nome && (
              <p className="text-xs font-medium text-red-500 mt-0.5 flex items-center gap-1">
                ⚠️ {errors.nome.message}
              </p>
            )}
          </div>

          {/* campo email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="voce@exemplo.com"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800/50 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 transition-all outline-none focus:ring-2
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-slate-200 dark:border-zinc-700/80 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-0.5 flex items-center gap-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* campo senha */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              {...register('senha')}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800/50 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 transition-all outline-none focus:ring-2
                ${errors.senha 
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-slate-200 dark:border-zinc-700/80 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
            />
            {errors.senha && (
              <p className="text-xs font-medium text-red-500 mt-0.5 flex items-center gap-1">
                ⚠️ {errors.senha.message}
              </p>
            )}
          </div>

          {/* btn de submit */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </>
            ) : (
              'Cadastrar'
            )}
          </button>

        </form>
      </div>
    </main>
  );
}