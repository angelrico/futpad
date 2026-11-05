import { useState } from 'react'
import BackgroundSelector from './BackgroundSelector'
import type { DatosNuevaFicha, Fondo } from '../types/pizarra'
import type { Jugador, DatosJugador } from '../types/plantilla'
import SquadList from './SquadList'
import PlayerForm from './PlayerForm'

interface SidePanelProps {
  onAgregarFicha: (datos: DatosNuevaFicha) => void
  jugadores: Jugador[]
  idsEnCampo: ReadonlySet<string>
  fondo: Fondo
  onCambiarFondo: (fondo: Fondo) => void
  onEliminarJugador: (id: string) => void
  onAgregarJugador: (datos: DatosJugador) => void
  onEditarJugador: (id: string, datos: DatosJugador) => void
  onColocarJugador: (jugador: Jugador) => void
}

function SidePanel({
  onAgregarFicha,
  jugadores,
  idsEnCampo,
  fondo,
  onCambiarFondo,
  onEliminarJugador,
  onAgregarJugador,
  onEditarJugador,
  onColocarJugador,
}: SidePanelProps) {
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [jugadorEditando, setJugadorEditando] = useState<Jugador | null>(null)

  const abrirAlta = () => {
    setJugadorEditando(null)
    setFormularioAbierto(true)
  }

  const abrirEdicion = (jugador: Jugador) => {
    setJugadorEditando(jugador)
    setFormularioAbierto(true)
  }

  const cerrarFormulario = () => {
    setFormularioAbierto(false)
  }

  const guardarJugador = (datos: DatosJugador) => {
    if (jugadorEditando) {
      onEditarJugador(jugadorEditando.id, datos)
    } else {
      onAgregarJugador(datos)
    }
  }

  return (
    <aside className="min-h-0 overflow-y-auto border-r border-linea bg-cesped-50 p-4 [grid-area:panel]">
      <div className="mb-6">
        <BackgroundSelector valor={fondo} onCambiar={onCambiarFondo} />
      </div>

      <SquadList
        jugadores={jugadores}
        idsEnCampo={idsEnCampo}
        onEliminar={onEliminarJugador}
        onEditar={abrirEdicion}
        onNuevo={abrirAlta}
        onAgregarAlCampo={onColocarJugador}
      />
      {formularioAbierto && (
        <PlayerForm
          jugador={jugadorEditando}
          onCerrar={cerrarFormulario}
          jugadores={jugadores}
          onGuardar={guardarJugador}
        />
      )}

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
