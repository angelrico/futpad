import { useEffect, useId, useRef, useState } from 'react'
import type { Fondo } from '../types/pizarra'
import { X } from 'lucide-react'
import { CLASE_CAMPO } from './estilos'
import { FONDOS, LISTA_FONDOS } from '../lib/fondos'

interface NewBoardDialogProps {
  onCerrar: () => void
  onCrear: (nombre: string, fondo: Fondo) => void
}

function NewBoardDialog({ onCerrar, onCrear }: NewBoardDialogProps) {
  const dialogoRef = useRef<HTMLDialogElement>(null)
  const id = useId()

  const [nombre, setNombre] = useState('')
  const [fondo, setFondo] = useState<Fondo>('full')
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    dialogoRef.current?.showModal()
  }, [])

  const crear = () => {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    setError(undefined)
    onCrear(nombre.trim(), fondo)
    dialogoRef.current?.close()
  }

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={`${id}-titulo`}
      onClose={onCerrar}
      className="w-full max-w-lg rounded-2xl p-6 backdrop:bg-tinta/50"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-cesped-900" id={`${id}-titulo`}>
          Nueva pizarra
        </h2>
        <button
          type="button"
          aria-label="Cerrar"
          className="text-tenue focus-visible:outline-2"
          onClick={() => dialogoRef.current?.close()}
        >
          <X size={18} />
        </button>
      </div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          crear()
        }}
        className="mt-4 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-nombre`} className="text-sm font-semibold text-cesped-900">
            Nombre de la pizarra
          </label>
          <input
            id={`${id}-nombre`}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-nombre-error` : undefined}
            className={CLASE_CAMPO}
          />
          {error && (
            <p id={`${id}-nombre-error`} className="text-sm text-peligro">
              {error}
            </p>
          )}
        </div>

        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold text-cesped-900">Campo</legend>
          <div className="mt-1 grid grid-cols-3 gap-3">
            {LISTA_FONDOS.map((f) => (
              <label
                key={f}
                className="flex cursor-pointer flex-col gap-2 rounded-xl border-2 border-linea p-2 has-checked:border-destacado-500 has-focus-visible:outline-2 has-focus-visible:outline-cesped-700"
              >
                <img src={FONDOS[f].imagen} alt="" className="h-16 w-full object-contain" />
                <span className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${id}-fondo`}
                    value={f}
                    checked={fondo === f}
                    onChange={() => setFondo(f)}
                    className="accent-cesped-700"
                  />
                  {FONDOS[f].etiqueta}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => dialogoRef.current?.close()}
            className="rounded-full border-2 border-cesped-700 bg-tiza px-6 py-2 font-semibold text-cesped-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-full bg-destacado-500 px-6 py-2 font-semibold text-tinta"
          >
            Crear pizarra
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default NewBoardDialog
