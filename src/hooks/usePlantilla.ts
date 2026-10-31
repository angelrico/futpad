import { useState } from 'react'
import type { Jugador, DatosJugador } from '../types/plantilla'
import { crearJugador } from '../lib/plantilla'

const JUGADORES_PRUEBA: Jugador[] = [
  { id: '1', nombre: 'Jugador 1', dorsal: 1, esPortero: true },
  { id: '2', nombre: 'Jugador 2', dorsal: 2, esPortero: false },
  { id: '3', nombre: 'Jugador 3', dorsal: 13, esPortero: true },
  { id: '4', nombre: 'Jugador 4', dorsal: 4, esPortero: false },
]

export function usePlantilla() {
  const [jugadores, setJugadores] = useState<Jugador[]>(JUGADORES_PRUEBA)

  const agregarJugador = (datos: DatosJugador) => {
    const nuevo = crearJugador(datos)
    setJugadores((anteriores) => [...anteriores, nuevo])
  }

  const editarJugador = (id: string, datos: DatosJugador) => {
    setJugadores((anteriores) =>
      anteriores.map((jugador) => (jugador.id === id ? { ...jugador, ...datos, id } : jugador)),
    )
  }

  const eliminarJugador = (id: string) => {
    setJugadores((anteriores) => anteriores.filter((jugador) => jugador.id !== id))
  }

  return { jugadores, agregarJugador, editarJugador, eliminarJugador }
}
