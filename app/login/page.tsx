
'use client';

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

// schema do Zod
const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "Insira um endereço de e-mail válido." }),
  senha: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
});

// inferindo o tipo
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, estaAutenticado } = useAuth();
  const router = useRouter();

  // RHF com o zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    }
  });

  // redireciona automaticamente se o usuário já estiver autenticado
  useEffect(() => {
    if (estaAutenticado) {
      router.push("/perfil"); // levando p uma suposta área vip .....
    }
  }, [estaAutenticado, router]);

  // fn disparada ao submeter o formulário válido
  const onSubmit = async (data: LoginFormData) => {
    try {      
      await login(data.email);      
      // useEffect acima cuidará do redirecionamento assim que o estado mudar,
      // também podemos colocar o router.push("/")
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        
        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <span className="bg-indigo-600 text-white p-2.5 rounded-xl text-xl font-black shadow-md">
            🐾
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Acessar o Sistema
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Entre com suas credenciais para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* campo email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all dark:bg-slate-800 dark:text-white
                ${errors.email 
                  ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                  : "border-slate-200 focus:border-indigo-500 dark:border-slate-700"
                }`}
            />
            {errors.email && (
              <span className="text-xs font-medium text-rose-500">{errors.email.message}</span>
            )}
          </div>

          {/* campo senha */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              {...register("senha")}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all dark:bg-slate-800 dark:text-white
                ${errors.senha 
                  ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                  : "border-slate-200 focus:border-indigo-500 dark:border-slate-700"
                }`}
            />
            {errors.senha && (
              <span className="text-xs font-medium text-rose-500">{errors.senha.message}</span>
            )}
          </div>

          {/* btn enviar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Autenticando..." : "Entrar"}
          </button>

        </form>
      </div>
    </div>
  );
}