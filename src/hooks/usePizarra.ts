import { useState } from 'react'
import { crearFicha, crearFichaDeJugador } from '../lib/fichas'
import type { DatosNuevaFicha, Fondo, Pizarra } from '../types/pizarra'
import type { Jugador } from '../types/plantilla'
import { crearPizarra, ultimaActualizada } from '../lib/pizarras'
import { listarPizarras, guardarPizarra } from '../storage/repositorio'

export function usePizarra() {
  const [pizarra, setPizarra] = useState<Pizarra>(
    () => ultimaActualizada(listarPizarras()) ?? crearPizarra('Mi primera pizarra', 'full'),
  )

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
    setPizarra(guardada)
  }

  const nueva = (nombre: string, fondo: Fondo) => {
    const creada = crearPizarra(nombre, fondo)
    guardarPizarra(creada)
    setPizarra(creada)
  }

  return {
    fondo: pizarra.fondo,
    fichas: pizarra.fichas,
    pizarra,
    moverFicha,
    cambiarFondo,
    agregarFicha,
    colocarJugador,
    guardar,
    nueva,
  }
}
