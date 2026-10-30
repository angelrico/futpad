export interface Jugador {
  id: string
  nombre: string
  dorsal: number
  esPortero: boolean
}

export type DatosJugador = Omit<Jugador, 'id'>

export type JugadorFormulario = Omit<DatosJugador, 'dorsal'> & { dorsal: string }

export type ErroresJugador = Partial<Record<'nombre' | 'dorsal', string>>
