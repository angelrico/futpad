import useImage from 'use-image'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'

import { useTamanoContenedor } from '../hooks/useTamanoContenedor'

import type { Ficha, Fondo } from '../types/pizarra'

import PlayerMarker from './PlayerMarker'
import { FONDOS } from '../lib/fondos'
import { encajarCampo } from '../lib/campo'
import { pasarAPixeles, pasarANormalizado } from '../lib/coordenadas'

interface TacticalBoardProps {
  fondo: Fondo
  fichas: Ficha[]
  onMoverFicha: (id: string, x: number, y: number) => void
}

function TacticalBoard({ fondo, fichas, onMoverFicha }: TacticalBoardProps) {
  const { ref: mainRef, ancho, alto } = useTamanoContenedor()
  const datosFondo = FONDOS[fondo]
  const [imagen] = useImage(datosFondo.imagen)
  const { ancho: anchoCampo, alto: altoCampo } = encajarCampo(ancho, alto, datosFondo.proporcion)

  const soltarFicha = (id: string, xPx: number, yPx: number) => {
    const { x, y } = pasarANormalizado(xPx, yPx, anchoCampo, altoCampo)
    onMoverFicha(id, x, y)
  }

  return (
    <main
      className="flex min-h-0 min-w-0 touch-none items-center justify-center overflow-hidden p-4 [grid-area:main]"
      ref={mainRef}
    >
      <Stage width={anchoCampo} height={altoCampo}>
        <Layer>
          <KonvaImage image={imagen} width={anchoCampo} height={altoCampo} />
        </Layer>
        <Layer>
          {fichas.map((ficha) => {
            const { x: xPx, y: yPx } = pasarAPixeles(ficha.x, ficha.y, anchoCampo, altoCampo)
            return (
              <PlayerMarker
                key={ficha.id}
                x={xPx}
                y={yPx}
                dorsal={ficha.dorsal}
                color={ficha.color}
                anchoCampo={anchoCampo}
                altoCampo={altoCampo}
                onMover={(x, y) => soltarFicha(ficha.id, x, y)}
              />
            )
          })}
        </Layer>
      </Stage>
    </main>
  )
}

export default TacticalBoard
