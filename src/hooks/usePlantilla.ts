import { useState, useEffect } from 'react'
import type { Jugador, DatosJugador } from '../types/plantilla'
import { crearJugador } from '../lib/plantilla'
import { cargarPlantilla, guardarPlantilla } from '../storage/repositorio'

export function usePlantilla() {
  const [jugadores, setJugadores] = useState<Jugador[]>(() => cargarPlantilla())

  useEffect(() => {
    guardarPlantilla(jugadores)
  }, [jugadores])

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
