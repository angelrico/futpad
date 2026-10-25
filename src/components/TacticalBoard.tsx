import useImage from 'use-image'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'

import { useTamanoContenedor } from '../hooks/useTamanoContenedor'
import { encajarCampo } from '../lib/campo'
import type { Fondo } from '../types/pizarra'
import { FONDOS } from '../lib/fondos'
import PlayerMarker from './PlayerMarker'

function TacticalBoard() {
  const { ref: mainRef, ancho, alto } = useTamanoContenedor()

  const fondo: Fondo = 'corner'
  const datosFondo = FONDOS[fondo]
  const [imagen] = useImage(datosFondo.imagen)
  const { ancho: anchoCampo, alto: altoCampo } = encajarCampo(ancho, alto, datosFondo.proporcion)

  return (
    <main
      className="flex min-h-0 min-w-0 items-center justify-center overflow-hidden p-4 [grid-area:main]"
      ref={mainRef}
    >
      <Stage width={anchoCampo} height={altoCampo}>
        <Layer>
          <KonvaImage image={imagen} width={anchoCampo} height={altoCampo} />
        </Layer>
        <Layer>
          <PlayerMarker x={100} y={100} dorsal={10} color="#c62f2f" />
          <PlayerMarker x={400} y={500} dorsal={1} color="#2563eb" />
          <PlayerMarker x={700} y={200} dorsal={56} color="#f4c542" />
          <PlayerMarker x={200} y={200} dorsal={9} color="#9333ea" />
        </Layer>
      </Stage>
    </main>
  )
}

export default TacticalBoard
