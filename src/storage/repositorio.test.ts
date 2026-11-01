// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { cargarDatos, datosVacios, guardarDatos, CLAVE } from './repositorio'
import type { DatosGuardados } from '../types/pizarra'

describe('repositorio', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('debería devolver datos vacíos si no hay nada guardado', () => {
    expect(cargarDatos()).toEqual(datosVacios())
  })

  it('debería cargar lo mismo que se guardó', () => {
    const datos: DatosGuardados = {
      version: 1,
      plantilla: [{ id: '1', nombre: 'Jugador 1', dorsal: 10, esPortero: false }],
      pizarras: [
        {
          id: '1',
          nombre: 'Pizarra 1',
          fichas: [],
          creadaEn: '2026-11-01T18:00:00.000Z',
          fondo: 'full',
          actualizadaEn: '2026-11-01T18:00:00.000Z',
        },
      ],
    }
    guardarDatos(datos)
    expect(cargarDatos()).toEqual(datos)
  })

  it('debería devolver datos vacíos si el JSON está roto', () => {
    localStorage.setItem(CLAVE, '{no es json')
    expect(cargarDatos()).toEqual(datosVacios())
  })

  it('debería devolver datos vacíos si la forma no es la esperada', () => {
    localStorage.setItem(CLAVE, '42')
    expect(cargarDatos()).toEqual(datosVacios())

    localStorage.setItem(CLAVE, 'null')
    expect(cargarDatos()).toEqual(datosVacios())

    localStorage.setItem(CLAVE, JSON.stringify({ version: 2, plantilla: [], pizarras: [] }))
    expect(cargarDatos()).toEqual(datosVacios())

    localStorage.setItem(CLAVE, JSON.stringify({ version: 1 }))
    expect(cargarDatos()).toEqual(datosVacios())
  })
})
