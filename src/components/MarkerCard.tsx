import { useId, useState } from 'react'
import type { CambiosFicha, Ficha } from '../types/pizarra'
import { X, Trash2 } from 'lucide-react'
import { validarDorsal } from '../lib/plantilla'
import { CLASE_CAMPO } from './estilos'

interface MarkerCardProps {
  ficha: Ficha
  onEditar: (cambios: CambiosFicha) => void
  onQuitar: () => void
  onCerrar: () => void
}

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
        <button
          type="button"
          aria-label="Cerrar"
          className="text-tenue focus-visible:outline-2"
          onClick={onCerrar}
        >
          <X size={18} />
        </button>
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
