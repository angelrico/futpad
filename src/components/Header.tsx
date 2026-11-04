import { useState } from 'react'
import NewBoardDialog from './NewBoardDialog'
import OpenBoardDialog from './OpenBoardDialog'
import type { Fondo, Pizarra } from '../types/pizarra'

interface HeaderProps {
  nombre: string
  pizarras: Pizarra[]
  idActiva: string
  sinGuardar: boolean
  onGuardar: () => void
  onCrear: (nombre: string, fondo: Fondo) => void
  onAbrir: (id: string) => void
  onEliminar: (id: string) => void
}

function Header({
  nombre,
  onGuardar,
  onCrear,
  pizarras,
  idActiva,
  onAbrir,
  onEliminar,
  sinGuardar,
}: HeaderProps) {
  const [dialogoNuevoAbierto, setDialogoNuevoAbierto] = useState(false)
  const [dialogoAbrirAbierto, setDialogoAbrirAbierto] = useState(false)

  const abrirDialogoNuevo = () => setDialogoNuevoAbierto(true)
  const abrirDialogoAbrir = () => setDialogoAbrirAbierto(true)

  return (
    <header className="flex items-center gap-4 border-b border-linea bg-white p-4 [grid-area:header]">
      <h1 className="shrink-0 font-display text-3xl font-bold text-cesped-900">Futpad</h1>

      <span className="min-w-0 truncate border-l border-linea py-1 pl-4 font-semibold text-cesped-900">
        {nombre}
      </span>
      {sinGuardar && (
        <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-destacado-700">
          Sin guardar
        </span>
      )}
      <div className="ml-auto flex shrink-0 gap-4">
        <button
          type="button"
          className="rounded-full border-2 border-cesped-700 px-6 py-2 font-semibold text-cesped-700"
          onClick={abrirDialogoNuevo}
        >
          Nueva
        </button>
        <button
          type="button"
          className="rounded-full border-2 border-cesped-700 bg-tiza px-6 py-2 font-semibold text-cesped-700"
          onClick={abrirDialogoAbrir}
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
      {dialogoNuevoAbierto && (
        <NewBoardDialog onCerrar={() => setDialogoNuevoAbierto(false)} onCrear={onCrear} />
      )}
      {dialogoAbrirAbierto && (
        <OpenBoardDialog
          pizarras={pizarras}
          idActiva={idActiva}
          onAbrir={onAbrir}
          onEliminar={onEliminar}
          onCerrar={() => setDialogoAbrirAbierto(false)}
        />
      )}
    </header>
  )
}

export default Header
