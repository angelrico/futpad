import type { Pizarra } from '../types/pizarra'
import { useEffect, useId, useRef } from 'react'
import { Trash2, X } from 'lucide-react'
import { FONDOS } from '../lib/fondos'
import { CLASE_BOTON_ICONO } from './estilos'

interface OpenBoardDialogProps {
  pizarras: Pizarra[]
  idActiva: string
  onAbrir: (id: string) => void
  onEliminar: (id: string) => void
  onCerrar: () => void
}

const FORMATO_FECHA = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' })

function OpenBoardDialog({
  pizarras,
  idActiva,
  onAbrir,
  onEliminar,
  onCerrar,
}: OpenBoardDialogProps) {
  const dialogoRef = useRef<HTMLDialogElement>(null)
  const id = useId()

  useEffect(() => {
    dialogoRef.current?.showModal()
  }, [])

  const abrirPizarra = (idPizarra: string) => {
    onAbrir(idPizarra)
    dialogoRef.current?.close()
  }

  const eliminar = (pizarra: Pizarra) => {
    if (window.confirm(`¿Eliminar «${pizarra.nombre}»? No se puede deshacer.`)) {
      onEliminar(pizarra.id)
    }
  }

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={`${id}-titulo`}
      onClose={onCerrar}
      className="m-auto w-full max-w-lg rounded-2xl p-6 backdrop:bg-tinta/50"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-cesped-900" id={`${id}-titulo`}>
          Abrir pizarra
        </h2>
        <button
          type="button"
          aria-label="Cerrar"
          className={CLASE_BOTON_ICONO}
          onClick={() => dialogoRef.current?.close()}
        >
          <X size={18} />
        </button>
      </div>
      {pizarras.length === 0 ? (
        <p className="mt-4 text-tenue">Todavía no hay pizarras guardadas.</p>
      ) : (
        <ul className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto">
          {pizarras.map((p) => (
            <li
              key={p.id}
              aria-current={idActiva === p.id ? 'true' : undefined}
              className="flex items-center gap-2 rounded-xl border border-linea p-2 aria-[current=true]:border-cesped-500 aria-[current=true]:bg-cesped-50"
            >
              <button
                className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-cesped-700"
                type="button"
                onClick={() => abrirPizarra(p.id)}
              >
                <img
                  src={FONDOS[p.fondo].imagen}
                  alt=""
                  className="h-10 w-16 shrink-0 object-contain"
                />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-cesped-900">{p.nombre}</span>
                  <span className="block text-sm text-tenue">
                    Actualizada: {FORMATO_FECHA.format(new Date(p.actualizadaEn))}
                    {idActiva === p.id && ' · abierta'}
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label={`Eliminar ${p.nombre}`}
                className="rounded-lg p-2 text-peligro focus-visible:outline-2 focus-visible:outline-cesped-700"
                onClick={() => eliminar(p)}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => dialogoRef.current?.close()}
          className="rounded-full border-2 border-cesped-700 bg-tiza px-6 py-2 font-semibold text-cesped-700"
        >
          Cerrar
        </button>
      </div>
    </dialog>
  )
}

export default OpenBoardDialog
