import { describe, it, expect } from 'vitest'
import {
  colorDorsal,
  crearFicha,
  COLOR_DORSAL_CLARO,
  COLOR_DORSAL_OSCURO,
  COLORES_FICHA,
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
})
