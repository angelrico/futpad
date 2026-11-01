import type { Jugador } from './plantilla'

export type Fondo = 'full' | 'half' | 'corner'

export type Equipo = 'propio' | 'rival'

export type Rol = 'portero' | 'campo'

export interface Ficha {
  id: string
  equipo: Equipo
  rol: Rol
  jugadorId: string | null
  nombre?: string
  dorsal: number
  color: string
  x: number // 0–1
  y: number // 0–1
}

export type DatosNuevaFicha = Pick<Ficha, 'equipo' | 'rol' | 'dorsal'>

export interface Pizarra {
  id: string
  nombre: string
  fondo: Fondo
  fichas: Ficha[]
  creadaEn: string // ISO 8601
  actualizadaEn: string
}

export interface DatosGuardados {
  version: 1
  plantilla: Jugador[]
  pizarras: Pizarra[]
}
