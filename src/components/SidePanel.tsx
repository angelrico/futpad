import type { DatosNuevaFicha } from '../types/pizarra'
import type { Jugador } from '../types/plantilla'
import SquadList from './SquadList'

interface SidePanelProps {
  onAgregarFicha: (datos: DatosNuevaFicha) => void
  jugadores: Jugador[]
  onEliminarJugador: (id: string) => void
}

function onEditarTemp(jugador: Jugador): void {
  console.log('EDITAR JUGADOR:', jugador)
}

function SidePanel({ onAgregarFicha, jugadores, onEliminarJugador }: SidePanelProps) {
  return (
    <aside className="min-h-0 overflow-y-auto border-r border-linea bg-cesped-50 p-4 [grid-area:panel]">
      <SquadList jugadores={jugadores} onEliminar={onEliminarJugador} onEditar={onEditarTemp} />
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
