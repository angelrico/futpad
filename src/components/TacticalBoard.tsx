//import { Stage, Layer, Circle } from 'react-konva'
import { useTamanoContenedor } from '../hooks/useTamanoContenedor'

function TacticalBoard() {
  const { ref: mainRef, ancho, alto } = useTamanoContenedor()
  return (
    //Hay que añadir al main min-w-0 y overflow-hidden
    <main className="min-h-0 bg-orange-300 [grid-area:main]" ref={mainRef}>
      <p>
        Ancho: {ancho}, Alto: {alto}
      </p>
    </main>
  )
}

export default TacticalBoard
