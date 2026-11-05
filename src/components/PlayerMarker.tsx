import { Circle, Group, Text } from 'react-konva'
import { COLOR_SELECCION, colorDorsal, RADIO_FICHA } from '../lib/fichas'
import { limitarMovimiento } from '../lib/coordenadas'

interface PlayerMarkerProps {
  x: number
  y: number
  dorsal: number
  color: string
  anchoCampo: number
  altoCampo: number
  seleccionada: boolean
  onMover: (x: number, y: number) => void // posiciona al soltar en pixeles
  onSeleccionar: () => void
}

function PlayerMarker({
  x,
  y,
  dorsal,
  color,
  anchoCampo,
  altoCampo,
  onMover,
  seleccionada,
  onSeleccionar,
}: PlayerMarkerProps) {
  return (
    <Group
      x={x}
      y={y}
      draggable
      dragBoundFunc={(pos) => {
        return limitarMovimiento(pos.x, pos.y, anchoCampo, altoCampo)
      }}
      onDragEnd={(e) => {
        const { x, y } = e.target.position()
        onMover(x, y)
      }}
      onClick={onSeleccionar}
      onTap={onSeleccionar}
    >
      {seleccionada && (
        <Circle radius={RADIO_FICHA + 6} stroke={COLOR_SELECCION} strokeWidth={3} dash={[6, 4]} />
      )}
      <Circle radius={RADIO_FICHA} fill={color} stroke="white" strokeWidth={2} />
      <Text
        text={dorsal.toString()}
        fontSize={16}
        fontStyle="bold"
        fontFamily="Inter"
        align="center"
        verticalAlign="middle"
        width={RADIO_FICHA * 2}
        height={RADIO_FICHA * 2}
        offsetX={RADIO_FICHA}
        offsetY={RADIO_FICHA}
        fill={colorDorsal(color)}
      />
    </Group>
  )
}

export default PlayerMarker
