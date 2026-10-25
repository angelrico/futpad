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
