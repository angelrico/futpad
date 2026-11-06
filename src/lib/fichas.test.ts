import { describe, it, expect } from 'vitest'
import {
  colorDorsal,
  crearFicha,
  COLOR_DORSAL_CLARO,
  COLOR_DORSAL_OSCURO,
  COLORES_FICHA,
  crearFichaDeJugador,
  cambiosDeRol,
} from './fichas'

describe('fichas', () => {
  it('deberia ser texto blanco para azul', () => {
    expect(colorDorsal('#2563eb')).toBe(COLOR_DORSAL_CLARO)
  })

  it('deberia ser texto oscuro para color amarillo', () => {
    expect(colorDorsal('#f4c542')).toBe(COLOR_DORSAL_OSCURO)
  })

  it('deberia ser texto blanco para rojo', () => {
    expect(colorDorsal('#c62f2f')).toBe(COLOR_DORSAL_CLARO)
  })

  it('deberia ser texto blanco para violeta', () => {
    expect(colorDorsal('#9333ea')).toBe(COLOR_DORSAL_CLARO)
  })

  it('deberia ser texto oscuro para blanco', () => {
    expect(colorDorsal('#ffffff')).toBe(COLOR_DORSAL_OSCURO)
  })

  it('deberia ser texto blanco para negro', () => {
    expect(colorDorsal('#000000')).toBe(COLOR_DORSAL_CLARO)
  })

  it('crea una ficha libre en el centro con el color por defecto', () => {
    const ficha = crearFicha({ equipo: 'rival', rol: 'portero', dorsal: 1 })
    expect(ficha.color).toBe(COLORES_FICHA.rival.portero)
    expect(ficha.jugadorId).toBeNull()
    expect(ficha.x).toBe(0.5)
    expect(ficha.y).toBe(0.5)
    expect(ficha.dorsal).toBe(1)
  })

  it('debería coincidir jugadorID con id si copio nombre y dorsal', () => {
    const jugador = { id: '123', nombre: 'Juan', dorsal: 10, esPortero: false }
    const ficha = crearFichaDeJugador(jugador)
    expect(ficha.dorsal).toBe(jugador.dorsal)
    expect(ficha.nombre).toBe(jugador.nombre)
    expect(ficha.jugadorId).toBe(jugador.id)
  })

  it('deberia tener rol portero y color portero propio si esPortero', () => {
    const jugador = { id: '456', nombre: 'Pedro', dorsal: 1, esPortero: true }
    const ficha = crearFichaDeJugador(jugador)
    expect(ficha.rol).toBe('portero')
    expect(ficha.equipo).toBe('propio')
    expect(ficha.color).toBe(COLORES_FICHA.propio.portero)
  })

  it('debería tener rol campo y equipo propio si no es portero', () => {
    const jugador = { id: '789', nombre: 'Luis', dorsal: 8, esPortero: false }
    const ficha = crearFichaDeJugador(jugador)
    expect(ficha.rol).toBe('campo')
    expect(ficha.equipo).toBe('propio')
    expect(ficha.color).toBe(COLORES_FICHA.propio.campo)
  })

  it('debería generar un id diferente al id del jugador', () => {
    const jugador = { id: '123', nombre: 'Juan', dorsal: 10, esPortero: false }
    const ficha = crearFichaDeJugador(jugador)
    expect(ficha.id).not.toBe(jugador.id)
  })

  it('debería dar los valores por defecto de portero rival al cambiar el rol a portero', () => {
    const cambios = cambiosDeRol('rival', 'portero')
    expect(cambios.rol).toBe('portero')
    expect(cambios.color).toBe(COLORES_FICHA.rival.portero)
  })
})
