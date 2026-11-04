import type { Fondo, Pizarra } from '../types/pizarra'

export function crearPizarra(nombre: string, fondo: Fondo, ahora = new Date()): Pizarra {
  return {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    fondo,
    fichas: [],
    creadaEn: ahora.toISOString(),
    actualizadaEn: ahora.toISOString(),
  }
}

export function ultimaActualizada(pizarras: Pizarra[]): Pizarra | undefined {
  if (pizarras.length === 0) return undefined
  return ordenarPorActualizacion(pizarras)[0]
}

export function ordenarPorActualizacion(pizarras: Pizarra[]): Pizarra[] {
  return pizarras.toSorted((a, b) => b.actualizadaEn.localeCompare(a.actualizadaEn))
}

export function pizarraInicial(pizarras: Pizarra[]): Pizarra {
  return ultimaActualizada(pizarras) ?? crearPizarra('Mi primera pizarra', 'full')
}
