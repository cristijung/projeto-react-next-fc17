'use client';
import BtnText from "./btnText";
import { useAuth } from "@/context/authContext";

export default function BarNav() {
  const { usuario, estaAutenticado, logout } = useAuth();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegação Principal"
      >
        {/* área do Logo */}
        <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white text-lg tracking-tight">
          <span className="bg-indigo-600 text-white p-1.5 rounded-lg text-sm font-black shadow-sm">
            🐾
          </span>
          <span>Logotipo</span>
        </div>

        {/* barra de navegação */}
        <div className="hidden md:flex items-center gap-6">
          <BtnText href="/" texto="Home" />
          <BtnText href="/about" texto="Quem Somos" />
          <BtnText href="/gallery" texto="Galeria de Gatos" />
          <BtnText href="/portfolio" texto="Nosso Portfólio" />
          <BtnText href="/contact" texto="Entre em Contato" />
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 text-sm font-medium transition-colors">
            Redes
          </a>
        </div>

        {/* bloco de autenticação */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {estaAutenticado ? (
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
              <span className="text-slate-700 dark:text-slate-300">
                Olá, <strong className="text-slate-900 dark:text-white font-semibold">{usuario?.nome}</strong>
              </span>
              <button 
                onClick={logout} 
                className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors shadow-sm"
              >
                Sair
              </button>
            </div>
          ) : (
            <BtnText href="/login" texto="Entrar" />
          )}
        </div>
      </nav>
    </div>
  );
}

