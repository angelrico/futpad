import type { Fondo } from '../types/pizarra'
import fondoEntero from '../assets/fondos/full.svg'
import fondoMedio from '../assets/fondos/half.svg'
import fondoCorner from '../assets/fondos/corner.svg'

interface DatosFondo {
  imagen: string
  proporcion: number
  etiqueta: string
}

export const FONDOS: Record<Fondo, DatosFondo> = {
  full: { imagen: fondoEntero, proporcion: 111 / 74, etiqueta: 'Entero' },
  half: { imagen: fondoMedio, proporcion: 74 / 58.5, etiqueta: 'Medio' },
  corner: { imagen: fondoCorner, proporcion: 74 / 39, etiqueta: 'Córner' },
}

export const LISTA_FONDOS: Fondo[] = ['full', 'half', 'corner']
