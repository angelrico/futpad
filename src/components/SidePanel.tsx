import type { DatosNuevaFicha } from '../types/pizarra'

interface SidePanelProps {
  onAgregarFicha: (datos: DatosNuevaFicha) => void
}

function SidePanel({ onAgregarFicha }: SidePanelProps) {
  return (
    <aside className="min-h-0 overflow-y-auto border-r border-linea bg-cesped-50 p-4 [grid-area:panel]">
      <form>
        <button
          type="button"
          className="w-full rounded-xl border-2 border-dashed border-cesped-700 py-3 font-semibold text-cesped-700"
          onClick={() => onAgregarFicha({ equipo: 'rival', rol: 'campo', dorsal: 1 })}
        >
          Agregar ficha libre
        </button>
      </form>
    </aside>
  )
}

export default SidePanel
