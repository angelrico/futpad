import type { DatosNuevaFicha } from '../types/pizarra'
import type { Jugador } from '../types/plantilla'

interface SidePanelProps {
  onAgregarFicha: (datos: DatosNuevaFicha) => void
  jugadores: Jugador[]
}

function SidePanel({ onAgregarFicha, jugadores }: SidePanelProps) {
  return (
    <aside className="min-h-0 overflow-y-auto border-r border-linea bg-cesped-50 p-4 [grid-area:panel]">
      {jugadores.map((jugador) => (
        <p key={jugador.id}>{jugador.nombre}</p>
      ))}
      <button
        type="button"
        className="w-full rounded-xl border-2 border-dashed border-cesped-700 py-3 font-semibold text-cesped-700"
        onClick={() => onAgregarFicha({ equipo: 'rival', rol: 'campo', dorsal: 1 })}
      >
        Añadir ficha libre
      </button>
    </aside>
  )
}

export default SidePanel
