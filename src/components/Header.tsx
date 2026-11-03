interface HeaderProps {
  nombre: string
  onGuardar: () => void
}

function Header({ nombre, onGuardar }: HeaderProps) {
  return (
    <header className="flex items-center gap-4 border-b border-linea bg-white p-4 [grid-area:header]">
      <h1 className="font-display text-3xl font-bold text-cesped-900">Futpad</h1>

      <div className="truncate border-l border-linea py-1 pl-4 font-semibold text-cesped-900">
        {nombre}
      </div>
      <div className="ml-auto flex gap-4">
        <button
          type="button"
          className="rounded-full border-2 border-cesped-700 px-6 py-2 font-semibold text-cesped-700"
        >
          Nueva
        </button>
        <button
          type="button"
          className="rounded-full border-2 border-cesped-700 bg-tiza px-6 py-2 font-semibold text-cesped-700"
        >
          Abrir
        </button>
        <button
          type="button"
          className="rounded-full bg-destacado-500 px-6 py-2 font-semibold text-tinta"
          onClick={onGuardar}
        >
          Guardar
        </button>
      </div>
    </header>
  )
}

export default Header
