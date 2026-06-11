import BtnText from "./btnText";

function BarNav() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegação Principal"
      >
        {/* Área do Logo */}
        <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white text-lg tracking-tight">
          {/* Aqui você pode futuramente colocar um SVG ou <img> */}
          <span className="bg-indigo-600 text-white p-1.5 rounded-lg text-sm font-black shadow-sm">
            🐾
          </span>
          <span>Logotipo</span>
        </div>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-6">
          {/* Aqui passamos as props do componente BtnText */}
          <BtnText href="/" texto="Home" />
          <BtnText href="/about" texto="Quem Somos" />
          <BtnText href="/gallery" texto="Galeria de Gatos" />
          <BtnText href="/portfolio" texto="Nosso Portfólio" />
          <BtnText href="/contact" texto="Entre em Contato" />
          <a href="https://www.instagram.com/" target="_blank">Redes</a>
        </div>
      </nav>
    </div>
  );
}

export default BarNav;
