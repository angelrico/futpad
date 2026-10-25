import type { Fondo } from '../types/fondo'
import fondoEntero from '../assets/fondos/full.svg'
import fondoMedio from '../assets/fondos/half.svg'
import fondoCorner from '../assets/fondos/corner.svg'

interface DatosFondo {
  imagen: string
  proporcion: number
  etiqueta: string
}

export const FONDOS: Record<Fondo, DatosFondo> = {
  full: { imagen: fondoEntero, proporcion: 111 / 74, etiqueta: 'Campo entero' },
  half: { imagen: fondoMedio, proporcion: 74 / 58.5, etiqueta: 'Medio campo' },
  corner: { imagen: fondoCorner, proporcion: 74 / 39, etiqueta: 'Córner' },
}
