import { useEffect, useState } from 'react'
import {
  ordenarPorActualizacion,
  crearPizarra,
  pizarraInicial,
  tieneCambios,
} from '../lib/pizarras'
import { crearFicha, crearFichaDeJugador } from '../lib/fichas'
import type { DatosNuevaFicha, Fondo, Pizarra } from '../types/pizarra'
import type { Jugador } from '../types/plantilla'
import { listarPizarras, guardarPizarra, eliminarPizarra } from '../storage/repositorio'

export function usePizarra() {
  const [guardadas, setGuardadas] = useState<Pizarra[]>(() => listarPizarras())
  const [pizarra, setPizarra] = useState<Pizarra>(() => pizarraInicial(guardadas))
  const sinGuardar = tieneCambios(pizarra, guardadas)

  useEffect(() => {
    if (!sinGuardar) return
    const avisar = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', avisar)
    return () => window.removeEventListener('beforeunload', avisar)
  }, [sinGuardar])

  const agregarFicha = (datos: DatosNuevaFicha) => {
    const nueva = crearFicha(datos)
    setPizarra((p) => ({
      ...p,
      fichas: [...p.fichas, nueva],
    }))
  }

  const moverFicha = (id: string, x: number, y: number) => {
    setPizarra((p) => ({
      ...p,
      fichas: p.fichas.map((ficha) => (ficha.id === id ? { ...ficha, x, y } : ficha)),
    }))
  }

  const colocarJugador = (jugador: Jugador) => {
    const fichaNueva = crearFichaDeJugador(jugador)
    setPizarra((p) =>
      p.fichas.some((ficha) => ficha.jugadorId === jugador.id)
        ? p
        : { ...p, fichas: [...p.fichas, fichaNueva] },
    )
  }

  const cambiarFondo = (fondo: Fondo) => setPizarra((p) => ({ ...p, fondo }))

  const guardar = () => {
    const guardada = { ...pizarra, actualizadaEn: new Date().toISOString() }
    guardarPizarra(guardada)
    setGuardadas(listarPizarras())
    setPizarra(guardada)
  }

  const nueva = (nombre: string, fondo: Fondo) => {
    const creada = crearPizarra(nombre, fondo)
    guardarPizarra(creada)
    setGuardadas(listarPizarras())
    setPizarra(creada)
  }

  const abrir = (id: string) => {
    const encontrada = guardadas.find((p) => p.id === id)
    if (encontrada) setPizarra(encontrada)
  }

  const eliminar = (id: string) => {
    eliminarPizarra(id)
    const restantes = listarPizarras()
    setGuardadas(restantes)
    if (id === pizarra.id) setPizarra(pizarraInicial(restantes))
  }

  return {
    fondo: pizarra.fondo,
    fichas: pizarra.fichas,
    pizarra,
    guardadas: ordenarPorActualizacion(guardadas),
    moverFicha,
    cambiarFondo,
    agregarFicha,
    colocarJugador,
    guardar,
    nueva,
    abrir,
    eliminar,
    sinGuardar,
  }
}
