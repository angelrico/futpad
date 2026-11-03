import Header from './components/Header'
import SidePanel from './components/SidePanel'
import TacticalBoard from './components/TacticalBoard'
import { usePizarra } from './hooks/usePizarra'
import { usePlantilla } from './hooks/usePlantilla'

function App() {
  const { fondo, fichas, pizarra, moverFicha, agregarFicha, colocarJugador, guardar } = usePizarra()
  const { jugadores, eliminarJugador, agregarJugador, editarJugador } = usePlantilla()

  const idsEnCampo = new Set(fichas.flatMap((ficha) => (ficha.jugadorId ? [ficha.jugadorId] : [])))

  return (
    <div className="grid h-dvh grid-cols-[320px_1fr] grid-rows-[auto_1fr] [grid-template-areas:'header_header'_'panel_main']">
      <Header nombre={pizarra.nombre} onGuardar={guardar} />
      <SidePanel
        jugadores={jugadores}
        onAgregarFicha={agregarFicha}
        onEliminarJugador={eliminarJugador}
        idsEnCampo={idsEnCampo}
        onAgregarJugador={agregarJugador}
        onEditarJugador={editarJugador}
        onColocarJugador={colocarJugador}
      />

      <TacticalBoard fondo={fondo} fichas={fichas} onMoverFicha={moverFicha} />
    </div>
  )
}

export default App
