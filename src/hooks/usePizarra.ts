import { useState } from 'react'
import { COLORES_FICHA, crearFicha } from '../lib/fichas'
import type { DatosNuevaFicha, Ficha, Fondo } from '../types/pizarra'

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

export function usePizarra() {
  const [fichas, setFichas] = useState<Ficha[]>(FICHAS_PRUEBA)
  const [fondo, setFondo] = useState<Fondo>('full')

  const agregarFicha = (datos: DatosNuevaFicha) => {
    const nueva = crearFicha(datos)
    setFichas((anteriores) => [...anteriores, nueva])
  }

  const moverFicha = (id: string, x: number, y: number) => {
    setFichas((anteriores) =>
      anteriores.map((ficha) => (ficha.id === id ? { ...ficha, x, y } : ficha)),
    )
  }

  return { fondo, fichas, moverFicha, cambiarFondo: setFondo, agregarFicha }
}
