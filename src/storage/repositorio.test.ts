// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import {
  cargarDatos,
  datosVacios,
  guardarDatos,
  CLAVE,
  cargarPlantilla,
  guardarPlantilla,
  guardarPizarra,
  eliminarPizarra,
  listarPizarras,
} from './repositorio'
import type { DatosGuardados, Pizarra } from '../types/pizarra'

function pizarraDePrueba(id: string, nombre: string): Pizarra {
  return {
    id,
    nombre,
    fichas: [],
    creadaEn: '2026-11-01T18:00:00.000Z',
    fondo: 'full',
    actualizadaEn: '2026-11-01T18:00:00.000Z',
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('cargar y guardar datos', () => {
  it('debería devolver datos vacíos si no hay nada guardado', () => {
    expect(cargarDatos()).toEqual(datosVacios())
  })

  it('debería cargar lo mismo que se guardó', () => {
    const datos: DatosGuardados = {
      version: 1,
      plantilla: [{ id: '1', nombre: 'Jugador 1', dorsal: 10, esPortero: false }],
      pizarras: [pizarraDePrueba('1', 'Pizarra 1')],
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

describe('operaciones de plantilla y pizarras', () => {
  it('debería devolver la misma plantilla cargándola tras guardar', () => {
    const plantilla = [{ id: '1', nombre: 'Jugador 1', dorsal: 10, esPortero: false }]
    guardarPlantilla(plantilla)
    expect(cargarPlantilla()).toEqual(plantilla)
  })

  it('debería conservar la pizarra tras guardar la plantilla', () => {
    const pizarra: Pizarra = pizarraDePrueba('12', 'Pizarra 1')
    guardarPizarra(pizarra)
    const plantilla = [{ id: '1', nombre: 'Jugador 1', dorsal: 10, esPortero: false }]
    guardarPlantilla(plantilla)
    expect(listarPizarras()).toEqual([pizarra])
  })

  it('debería añadir una pizarra nueva', () => {
    const pizarra: Pizarra = pizarraDePrueba('13', 'Pizarra 2')
    guardarPizarra(pizarra)
    expect(listarPizarras()).toEqual([pizarra])
  })

  it('debería actualizar la pizarra al guardarla dos veces', () => {
    const pizarra: Pizarra = pizarraDePrueba('14', 'Pizarra 3')
    guardarPizarra(pizarra)
    const pizarraActualizada: Pizarra = {
      ...pizarra,
      nombre: 'Pizarra 3 Actualizada',
    }
    guardarPizarra(pizarraActualizada)
    expect(listarPizarras()).toEqual([pizarraActualizada])
  })

  it('debería eliminar una pizarra', () => {
    const pizarra: Pizarra = pizarraDePrueba('15', 'Pizarra 4')
    const nuevaPizarra: Pizarra = pizarraDePrueba('16', 'Pizarra 5')
    guardarPizarra(pizarra)
    guardarPizarra(nuevaPizarra)
    eliminarPizarra(pizarra.id)
    expect(listarPizarras()).toEqual([nuevaPizarra])
  })
})
