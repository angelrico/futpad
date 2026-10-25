import Header from './components/Header'
import SidePanel from './components/SidePanel'
import TacticalBoard from './components/TacticalBoard'

function App() {
  return (
    <div className="grid h-dvh grid-cols-[320px_1fr] grid-rows-[auto_1fr] [grid-template-areas:'header_header'_'panel_main']">
      <Header />

      <SidePanel />

      <TacticalBoard />
    </div>
  )
}

export default App
