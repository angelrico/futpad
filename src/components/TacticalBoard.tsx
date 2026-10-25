import useImage from 'use-image'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'

import { useTamanoContenedor } from '../hooks/useTamanoContenedor'
import { encajarCampo } from '../lib/campo'
import type { Fondo } from '../types/fondo'
import { FONDOS } from '../lib/fondos'

function TacticalBoard() {
  const { ref: mainRef, ancho, alto } = useTamanoContenedor()

  const fondo: Fondo = 'corner'
  const datosFoto = FONDOS[fondo]
  const [imagen] = useImage(datosFoto.imagen)
  const { ancho: anchoCampo, alto: altoCampo } = encajarCampo(ancho, alto, datosFoto.proporcion)

  return (
    <main
      className="flex min-h-0 min-w-0 items-center justify-center overflow-hidden p-4 [grid-area:main]"
      ref={mainRef}
    >
      <Stage width={anchoCampo} height={altoCampo}>
        <Layer>
          <KonvaImage image={imagen} width={anchoCampo} height={altoCampo} />
        </Layer>
      </Stage>
    </main>
  )
}

export default TacticalBoard
