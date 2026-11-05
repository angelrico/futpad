import { useId } from 'react'
import { FONDOS, LISTA_FONDOS } from '../lib/fondos'
import type { Fondo } from '../types/pizarra'

interface BackgroundSelectorProps {
  valor: Fondo
  onCambiar: (fondo: Fondo) => void
}

function BackgroundSelector({ valor, onCambiar }: BackgroundSelectorProps) {
  const id = useId()
  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-semibold text-cesped-900">Campo</legend>
      <div className="mt-1 grid grid-cols-3 gap-3">
        {LISTA_FONDOS.map((f) => (
          <label
            key={f}
            className="flex cursor-pointer flex-col gap-2 rounded-xl border-2 border-linea bg-white p-2 has-checked:border-destacado-500 has-focus-visible:outline-2 has-focus-visible:outline-cesped-700"
          >
            <img src={FONDOS[f].imagen} alt="" className="h-16 w-full object-contain" />
            <span className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={`${id}-fondo`}
                value={f}
                checked={valor === f}
                onChange={() => onCambiar(f)}
                className="accent-cesped-700"
              />
              {FONDOS[f].etiqueta}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default BackgroundSelector
