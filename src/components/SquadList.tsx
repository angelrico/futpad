import { Pencil, Trash2 } from 'lucide-react'
import type { Jugador } from '../types/plantilla'

interface SquadListProps {
  jugadores: Jugador[]
  onEditar: (jugador: Jugador) => void
  onEliminar: (id: string) => void
}

function SquadList({ jugadores, onEliminar, onEditar }: SquadListProps) {
  return (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm">
        <h2 className="tracking-wide uppercase">Plantilla</h2>
        <span className="pl-1 text-tenue">{jugadores.length} jugadores</span>
        <button className="ml-auto text-sm text-cesped-700" type="button">
          + Nuevo
        </button>
      </div>
      {jugadores.length === 0 ? (
        <p>Añade tu primer jugador</p>
      ) : (
        <ul>
          {jugadores
            .toSorted((a, b) => a.dorsal - b.dorsal)
            .map((jugador) => (
              <li key={jugador.id} className="mb-3 flex items-center gap-2">
                <span
                  className={`inline-flex size-7 items-center justify-center rounded-full ${!jugador.esPortero ? 'bg-propio text-white' : 'bg-portero text-tinta'}`}
                >
                  {jugador.dorsal}
                </span>
                <span>{jugador.nombre}</span>
                <span>
                  {jugador.esPortero && (
                    <span className="ml-2 rounded-full bg-destacado-50 px-2 text-xs font-semibold text-destacado-700">
                      Portero
                    </span>
                  )}
                </span>
                <div className="ml-auto flex gap-1">
                  <button
                    type="button"
                    aria-label={`Editar a ${jugador.nombre}`}
                    className="text-tenue focus-visible:outline-2"
                    onClick={() => onEditar(jugador)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Eliminar a ${jugador.nombre}`}
                    className="ml-2 text-tenue focus-visible:outline-2"
                    onClick={() => onEliminar(jugador.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  )
}

export default SquadList
