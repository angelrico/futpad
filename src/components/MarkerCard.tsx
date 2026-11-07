import { useId, useState } from 'react'
import type { CambiosFicha, Ficha, Rol } from '../types/pizarra'
import { X, Trash2 } from 'lucide-react'
import { validarDorsal } from '../lib/plantilla'
import { cambiosDeRol } from '../lib/fichas'
import { CLASE_BOTON_ICONO, CLASE_CAMPO } from './estilos'

interface MarkerCardProps {
  ficha: Ficha
  onEditar: (cambios: CambiosFicha) => void
  onQuitar: () => void
  onCerrar: () => void
}

const ROLES: { valor: Rol; etiqueta: string }[] = [
  { valor: 'campo', etiqueta: 'Campo' },
  { valor: 'portero', etiqueta: 'Portero' },
]

function MarkerCard({ ficha, onEditar, onQuitar, onCerrar }: MarkerCardProps) {
  const id = useId()
  const [dorsal, setDorsal] = useState(String(ficha.dorsal))
  const error = validarDorsal(dorsal)

  const cambiarDorsal = (texto: string) => {
    setDorsal(texto)
    if (!validarDorsal(texto)) {
      onEditar({ dorsal: Number(texto) })
    }
  }

  return (
    <section
      aria-labelledby={`${id}-titulo`}
      className="absolute top-4 right-4 flex w-64 flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 id={`${id}-titulo`} className="font-semibold text-cesped-900">
            {ficha.nombre ?? 'Ficha libre'}
          </h2>
          <p className="text-sm text-tenue">
            {ficha.equipo === 'propio' ? 'Propio' : 'Rival'}
            {ficha.jugadorId && ' · de la plantilla'}
          </p>
        </div>
        <button type="button" aria-label="Cerrar" className={CLASE_BOTON_ICONO} onClick={onCerrar}>
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
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
            value={dorsal}
            onChange={(e) => cambiarDorsal(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-dorsal-error` : undefined}
            className={CLASE_CAMPO}
          />
          {error && (
            <p id={`${id}-dorsal-error`} className="text-sm text-peligro">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-color`} className="text-sm font-semibold text-cesped-900">
            Color
          </label>
          <input
            id={`${id}-color`}
            type="color"
            value={ficha.color}
            onChange={(e) => onEditar({ color: e.target.value })}
            className="h-10 w-full cursor-pointer rounded-lg border border-linea p-1"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-cesped-900">Rol</legend>
        <div className="mt-1 grid grid-cols-2 rounded-full border border-linea p-1">
          {ROLES.map(({ valor, etiqueta }) => (
            <label
              key={valor}
              className="cursor-pointer rounded-full py-1.5 text-center text-sm font-semibold text-cesped-900 has-checked:bg-cesped-700 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-cesped-700"
            >
              <input
                type="radio"
                name={`${id}-rol`}
                value={valor}
                checked={ficha.rol === valor}
                onChange={() => onEditar(cambiosDeRol(ficha.equipo, valor))}
                className="sr-only"
              />
              {etiqueta}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onQuitar}
        className="flex items-center justify-center gap-2 rounded-full border-2 border-peligro px-4 py-2 font-semibold text-peligro"
      >
        <Trash2 size={16} /> Quitar del campo
      </button>
    </section>
  )
}

export default MarkerCard
