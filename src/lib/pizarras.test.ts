import { describe, it, expect } from 'vitest'
import {
  crearPizarra,
  ultimaActualizada,
  ordenarPorActualizacion,
  pizarraInicial,
} from './pizarras'

describe('pizarras', () => {
  it('debería tener la misma fecha en creadaEn y actualizadaEn al crear una pizarra', () => {
    const ahora = new Date()
    const pizarra = crearPizarra('    Mi primera pizarra    ', 'full', ahora)
    expect(pizarra.nombre).toBe('Mi primera pizarra')
    expect(pizarra.fichas).toEqual([])
    expect(pizarra.creadaEn).toBe(ahora.toISOString())
    expect(pizarra.actualizadaEn).toBe(ahora.toISOString())
  })

  it('deberían de tener ids distintos dos pizarras creadas', () => {
    const p1 = crearPizarra('Pizarra 1', 'full')
    const p2 = crearPizarra('Pizarra 2', 'full')
    expect(p1.id).not.toBe(p2.id)
  })

  it('debería devolver undefined cuando no hay pizarras', () => {
    const result = ultimaActualizada([])
    expect(result).toBeUndefined()
  })

  it('debería devolver la más reciente de las creadas', () => {
    const p1 = crearPizarra('Pizarra 1', 'full', new Date('2024-01-02T00:00:00.000Z'))
    const p2 = crearPizarra('Pizarra 2', 'full', new Date('2024-01-03T00:00:00.000Z'))
    const p3 = crearPizarra('Pizarra 3', 'full', new Date('2024-01-01T00:00:00.000Z'))
    const result = ultimaActualizada([p1, p2, p3])
    expect(result).toBe(p2)
  })

  it('debería devolver el orden correcto en tres pizarras desordenadas', () => {
    const p1 = crearPizarra('Pizarra 1', 'full', new Date('2024-01-02T00:00:00.000Z'))
    const p2 = crearPizarra('Pizarra 2', 'full', new Date('2024-01-03T00:00:00.000Z'))
    const p3 = crearPizarra('Pizarra 3', 'full', new Date('2024-01-01T00:00:00.000Z'))
    const result = ordenarPorActualizacion([p1, p2, p3])
    expect(result).toEqual([p2, p1, p3])
  })

  it('no debería modificar el array original al ordenar por actualización', () => {
    const p1 = crearPizarra('Pizarra 1', 'full', new Date('2024-01-02T00:00:00.000Z'))
    const p2 = crearPizarra('Pizarra 2', 'full', new Date('2024-01-03T00:00:00.000Z'))
    const p3 = crearPizarra('Pizarra 3', 'full', new Date('2024-01-01T00:00:00.000Z'))
    const original = [p1, p2, p3]
    ordenarPorActualizacion(original)
    expect(original).toEqual([p1, p2, p3])
  })

  it('debería devolver la pizarra inicial cuando no hay pizarras', () => {
    const result = pizarraInicial([])
    expect(result.nombre).toBe('Mi primera pizarra')
    expect(result.fondo).toBe('full')
  })
})
