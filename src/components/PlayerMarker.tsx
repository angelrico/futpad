import { Circle, Group, Text } from 'react-konva'
import { colorDorsal, RADIO_FICHA } from '../lib/fichas'

interface PlayerMarkerProps {
  x: number
  y: number
  dorsal: number
  color: string
}

function PlayerMarker({ x, y, dorsal, color }: PlayerMarkerProps) {
  return (
    <Group x={x} y={y}>
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
