import { describe, it, expect } from 'vitest'
import {
  crearPizarra,
  ultimaActualizada,
  ordenarPorActualizacion,
  pizarraInicial,
  tieneCambios,
} from './pizarras'
import { crearFicha } from './fichas'

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

  it('debería devolver false si la pizarra no está guardada y no tiene fichas', () => {
    const pizarra = crearPizarra('Pizarra 1', 'full')
    const result = tieneCambios(pizarra, [])
    expect(result).toBe(false)
  })

  it('debería devolver true si la pizarra no está guardada y tiene fichas', () => {
    const pizarra = crearPizarra('Pizarra 1', 'full')
    const ficha = crearFicha({ equipo: 'rival', rol: 'portero', dorsal: 1 })
    pizarra.fichas.push(ficha)
    const result = tieneCambios(pizarra, [])
    expect(result).toBe(true)
  })

  it('debería devolver false si es igual que la guardada', () => {
    const p1 = crearPizarra('Pizarra 1', 'full', new Date('2024-01-02T00:00:00.000Z'))
    p1.fichas.push(crearFicha({ equipo: 'rival', rol: 'portero', dorsal: 1 }))
    const guardadas = [p1]
    const p2 = structuredClone(p1)
    const result = tieneCambios(p2, guardadas)
    expect(result).toBe(false)
  })

  it('debería devolver true si es distinta a la guardada', () => {
    const p1 = crearPizarra('Pizarra 1', 'full', new Date('2024-01-02T00:00:00.000Z'))
    p1.fichas.push(crearFicha({ equipo: 'rival', rol: 'portero', dorsal: 1 }))
    const guardadas = [p1]
    const result = tieneCambios({ ...p1, fondo: 'corner' }, guardadas)
    expect(result).toBe(true)
  })
})
