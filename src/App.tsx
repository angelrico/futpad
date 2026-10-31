import Header from './components/Header'
import SidePanel from './components/SidePanel'
import TacticalBoard from './components/TacticalBoard'
import { usePizarra } from './hooks/usePizarra'
import { usePlantilla } from './hooks/usePlantilla'

function App() {
  const { fondo, fichas, moverFicha, agregarFicha } = usePizarra()
  const { jugadores } = usePlantilla()

  return (
    <div className="grid h-dvh grid-cols-[320px_1fr] grid-rows-[auto_1fr] [grid-template-areas:'header_header'_'panel_main']">
      <Header />

      <SidePanel jugadores={jugadores} onAgregarFicha={agregarFicha} />

      <TacticalBoard fondo={fondo} fichas={fichas} onMoverFicha={moverFicha} />
    </div>
  )
}

export default App
