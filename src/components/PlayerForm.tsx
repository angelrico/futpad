import { useEffect, useRef, useId, useState } from 'react'
import type { DatosJugador, Jugador, JugadorFormulario, ErroresJugador } from '../types/plantilla'
import { X } from 'lucide-react'
import { validarJugador } from '../lib/plantilla'
import { CLASE_CAMPO } from './estilos'

interface PlayerFormProps {
  jugador: Jugador | null
  jugadores: Jugador[]
  onCerrar: () => void
  onGuardar: (datos: DatosJugador) => void
}

function valoresIniciales(jugador: Jugador | null): JugadorFormulario {
  if (!jugador) {
    return { nombre: '', dorsal: '', esPortero: false }
  }
  return { nombre: jugador.nombre, dorsal: String(jugador.dorsal), esPortero: jugador.esPortero }
}

function PlayerForm({ jugador, onCerrar, jugadores, onGuardar }: PlayerFormProps) {
  const dialogoRef = useRef<HTMLDialogElement>(null)
  const [valores, setValores] = useState<JugadorFormulario>(() => valoresIniciales(jugador))
  const [errores, setErrores] = useState<ErroresJugador>({})
  const id = useId()

  useEffect(() => {
    dialogoRef.current?.showModal()
  }, [])

  const guardar = () => {
    const erroresValidacion = validarJugador(valores, jugadores, jugador?.id)
    setErrores(erroresValidacion)
    if (Object.keys(erroresValidacion).length > 0) return
    onGuardar({
      nombre: valores.nombre.trim(),
      dorsal: Number(valores.dorsal),
      esPortero: valores.esPortero,
    })
    dialogoRef.current?.close()
  }

  return (
    <dialog
      ref={dialogoRef}
      className="w-full max-w-md rounded-2xl p-6 backdrop:bg-tinta/50"
      onClose={onCerrar}
      aria-labelledby={`${id}-titulo`}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-cesped-900" id={`${id}-titulo`}>
          {jugador ? 'Editar jugador' : 'Nuevo jugador'}
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
          guardar()
        }}
        className="mt-4 flex flex-col gap-4"
      >
        <div className="grid grid-cols-[1fr_8rem] gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor={`${id}-nombre`} className="text-sm font-semibold text-cesped-900">
              Nombre
            </label>
            <input
              id={`${id}-nombre`}
              type="text"
              value={valores.nombre}
              onChange={(e) => setValores((v) => ({ ...v, nombre: e.target.value }))}
              aria-invalid={errores.nombre ? true : undefined}
              aria-describedby={errores.nombre ? `${id}-nombre-error` : undefined}
              className={CLASE_CAMPO}
            />
            {errores.nombre && (
              <p id={`${id}-nombre-error`} className="text-sm text-peligro">
                {errores.nombre}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${id}-dorsal`} className="text-sm font-semibold text-cesped-900">
              Dorsal (1-99)
            </label>
            <input
              id={`${id}-dorsal`}
              type="number"
              inputMode="numeric"
              min={1}
              max={99}
              value={valores.dorsal}
              onChange={(e) => setValores((v) => ({ ...v, dorsal: e.target.value }))}
              aria-invalid={errores.dorsal ? true : undefined}
              aria-describedby={errores.dorsal ? `${id}-dorsal-error` : undefined}
              className={CLASE_CAMPO}
            />
            {errores.dorsal && (
              <p id={`${id}-dorsal-error`} className="text-sm text-peligro">
                {errores.dorsal}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="size-5 accent-cesped-700"
            id={`${id}-esPortero`}
            checked={valores.esPortero}
            onChange={(e) => setValores((v) => ({ ...v, esPortero: e.target.checked }))}
          />
          <label htmlFor={`${id}-esPortero`} className="text-sm font-semibold text-cesped-900">
            Es portero
          </label>
        </div>
        <p className="text-sm text-tenue">
          {jugador
            ? 'Las pizarras guardadas no se cambian.'
            : 'Se añade a la plantilla global. Las pizarras guardadas no se cambian.'}
        </p>
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
            Guardar
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default PlayerForm
