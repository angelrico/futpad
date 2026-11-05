import Header from './components/Header'
import SidePanel from './components/SidePanel'
import TacticalBoard from './components/TacticalBoard'
import { usePizarra } from './hooks/usePizarra'
import { usePlantilla } from './hooks/usePlantilla'

function App() {
  const {
    fondo,
    fichas,
    pizarra,
    guardadas,
    moverFicha,
    agregarFicha,
    colocarJugador,
    guardar,
    nueva,
    abrir,
    eliminar,
    sinGuardar,
    cambiarFondo,
  } = usePizarra()
  const { jugadores, eliminarJugador, agregarJugador, editarJugador } = usePlantilla()

  const idsEnCampo = new Set(fichas.flatMap((ficha) => (ficha.jugadorId ? [ficha.jugadorId] : [])))

  return (
    <div className="grid h-dvh grid-cols-[320px_1fr] grid-rows-[auto_1fr] [grid-template-areas:'header_header'_'panel_main']">
      <Header
        nombre={pizarra.nombre}
        onGuardar={guardar}
        onCrear={nueva}
        pizarras={guardadas}
        idActiva={pizarra.id}
        onAbrir={abrir}
        onEliminar={eliminar}
        sinGuardar={sinGuardar}
      />
      <SidePanel
        jugadores={jugadores}
        onAgregarFicha={agregarFicha}
        onEliminarJugador={eliminarJugador}
        idsEnCampo={idsEnCampo}
        onAgregarJugador={agregarJugador}
        onEditarJugador={editarJugador}
        onColocarJugador={colocarJugador}
        fondo={fondo}
        onCambiarFondo={cambiarFondo}
      />

      <TacticalBoard fondo={fondo} fichas={fichas} onMoverFicha={moverFicha} />
    </div>
  )
}

export default App
