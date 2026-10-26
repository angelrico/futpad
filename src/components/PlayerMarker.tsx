import { Circle, Group, Text } from 'react-konva'
import { colorDorsal, RADIO_FICHA } from '../lib/fichas'
import { limitarMovimiento } from '../lib/coordenadas'

interface PlayerMarkerProps {
  x: number
  y: number
  dorsal: number
  color: string
  anchoCampo: number
  altoCampo: number
  onMover: (x: number, y: number) => void // posiciona al soltar en pixeles
}

function PlayerMarker({ x, y, dorsal, color, anchoCampo, altoCampo, onMover }: PlayerMarkerProps) {
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
    >
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
