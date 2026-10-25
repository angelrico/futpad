function Header() {
  return (
    <header className="flex items-center gap-4 border-b border-linea bg-white p-4 [grid-area:header]">
      <h1 className="font-display text-3xl font-bold text-cesped-900">Futpad</h1>

      <div className="border-l border-linea py-1 pl-4">Nombre pizarra</div>
      <div className="ml-auto flex gap-4">
        <button className="rounded-full border-2 border-cesped-700 px-6 py-2 font-semibold text-cesped-700">
          Nueva
        </button>
        <button className="rounded-full border-2 border-cesped-700 bg-tiza px-6 py-2 font-semibold text-cesped-700">
          Abrir
        </button>
        <button className="rounded-full bg-destacado-500 px-6 py-2 font-semibold text-tinta">
          Guardar
        </button>
      </div>
    </header>
  )
}

export default Header
