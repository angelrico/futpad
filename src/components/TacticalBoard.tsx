import useImage from 'use-image'
import { useState } from 'react'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'

import { useTamanoContenedor } from '../hooks/useTamanoContenedor'

import type { Ficha, Fondo } from '../types/pizarra'

import PlayerMarker from './PlayerMarker'
import { FONDOS } from '../lib/fondos'
import { encajarCampo } from '../lib/campo'
import { COLORES_FICHA } from '../lib/fichas'
import { pasarAPixeles } from '../lib/coordenadas'

const FICHAS_PRUEBA: Ficha[] = [
  {
    id: '1',
    equipo: 'propio',
    rol: 'campo',
    x: 0.2,
    y: 0.3,
    color: COLORES_FICHA.propio.campo,
    jugadorId: null,
    dorsal: 9,
  },
  {
    id: '2',
    equipo: 'propio',
    rol: 'portero',
    x: 0.1,
    y: 0.5,
    color: COLORES_FICHA.propio.portero,
    jugadorId: null,
    dorsal: 1,
  },
  {
    id: '3',
    equipo: 'rival',
    rol: 'campo',
    x: 0.7,
    y: 0.2,
    color: COLORES_FICHA.rival.campo,
    jugadorId: null,
    dorsal: 7,
  },
  {
    id: '4',
    equipo: 'rival',
    rol: 'portero',
    x: 0.8,
    y: 0.4,
    color: COLORES_FICHA.rival.portero,
    jugadorId: null,
    dorsal: 1,
  },
]

function TacticalBoard() {
  const { ref: mainRef, ancho, alto } = useTamanoContenedor()
  const fondo: Fondo = 'corner'
  const datosFondo = FONDOS[fondo]
  const [imagen] = useImage(datosFondo.imagen)
  const { ancho: anchoCampo, alto: altoCampo } = encajarCampo(ancho, alto, datosFondo.proporcion)

  const [fichas] = useState<Ficha[]>(FICHAS_PRUEBA)

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
          {fichas.map((ficha) => {
            const { x: xPx, y: yPx } = pasarAPixeles(ficha.x, ficha.y, anchoCampo, altoCampo)
            return (
              <PlayerMarker
                key={ficha.id}
                x={xPx}
                y={yPx}
                dorsal={ficha.dorsal}
                color={ficha.color}
              />
            )
          })}
        </Layer>
      </Stage>
    </main>
  )
}

export default TacticalBoard
