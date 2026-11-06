import { useState } from 'react'
import useImage from 'use-image'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'
import MarkerCard from './MarkerCard'

import { useTamanoContenedor } from '../hooks/useTamanoContenedor'

import type { CambiosFicha, Ficha, Fondo } from '../types/pizarra'

import PlayerMarker from './PlayerMarker'
import { FONDOS } from '../lib/fondos'
import { encajarCampo } from '../lib/campo'
import { pasarAPixeles, pasarANormalizado } from '../lib/coordenadas'

interface TacticalBoardProps {
  fondo: Fondo
  fichas: Ficha[]
  onMoverFicha: (id: string, x: number, y: number) => void
  onEditarFicha: (id: string, cambios: CambiosFicha) => void
  onQuitarFicha: (id: string) => void
}

function TacticalBoard({
  fondo,
  fichas,
  onMoverFicha,
  onEditarFicha,
  onQuitarFicha,
}: TacticalBoardProps) {
  const { ref: mainRef, ancho, alto } = useTamanoContenedor()
  const datosFondo = FONDOS[fondo]
  const [imagen] = useImage(datosFondo.imagen)
  const [idSeleccionada, setIdSeleccionada] = useState<string | null>(null)
  const seleccionada = fichas.find((ficha) => ficha.id === idSeleccionada)

  const { ancho: anchoCampo, alto: altoCampo } = encajarCampo(ancho, alto, datosFondo.proporcion)

  const soltarFicha = (id: string, xPx: number, yPx: number) => {
    const { x, y } = pasarANormalizado(xPx, yPx, anchoCampo, altoCampo)
    onMoverFicha(id, x, y)
  }

  return (
    <main
      className="relative flex min-h-0 min-w-0 touch-none items-center justify-center overflow-hidden p-4 [grid-area:main]"
      ref={mainRef}
    >
      <Stage width={anchoCampo} height={altoCampo}>
        <Layer>
          <KonvaImage
            image={imagen}
            width={anchoCampo}
            height={altoCampo}
            onClick={() => setIdSeleccionada(null)}
            onTap={() => setIdSeleccionada(null)}
          />
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
                seleccionada={idSeleccionada === ficha.id}
                onSeleccionar={() => setIdSeleccionada(ficha.id)}
              />
            )
          })}
        </Layer>
      </Stage>
      {seleccionada && (
        <MarkerCard
          key={seleccionada.id}
          ficha={seleccionada}
          onEditar={(cambios) => onEditarFicha(seleccionada.id, cambios)}
          onQuitar={() => onQuitarFicha(seleccionada.id)}
          onCerrar={() => setIdSeleccionada(null)}
        />
      )}
    </main>
  )
}

export default TacticalBoard
