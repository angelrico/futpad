import { describe, it, expect } from 'vitest'
import { validarJugador } from './plantilla'

describe('validarJugador', () => {
  it('debería dar errores si no hay datos en el formulario', () => {
    const errores = validarJugador({ nombre: '', dorsal: '' }, [])
    expect(errores).toEqual({
      nombre: 'El nombre es obligatorio',
      dorsal: 'El dorsal es obligatorio',
    })
  })

  it('debería dar error en nombre vacío', () => {
    const errores = validarJugador({ nombre: '', dorsal: '10' }, [])
    expect(errores).toEqual({ nombre: 'El nombre es obligatorio' })
  })

  it('debería dar error en nombre con solo espacios', () => {
    const errores = validarJugador({ nombre: '   ', dorsal: '10' }, [])
    expect(errores).toEqual({ nombre: 'El nombre es obligatorio' })
  })

  it('debería dar error en dorsal con solo espacios', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '   ' }, [])
    expect(errores).toEqual({ dorsal: 'El dorsal es obligatorio' })
  })

  it('debería dar error de dorsal vacío', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '' }, [])
    expect(errores).toEqual({ dorsal: 'El dorsal es obligatorio' })
  })

  it('debería dar error de dorsal con número 0', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '0' }, [])
    expect(errores).toEqual({ dorsal: 'El dorsal debe estar entre 1 y 99' })
  })

  it('debería dar error de dorsal con número 100', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '100' }, [])
    expect(errores).toEqual({ dorsal: 'El dorsal debe estar entre 1 y 99' })
  })

  it('debería dar error de dorsal con número 7.5', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '7.5' }, [])
    expect(errores).toEqual({ dorsal: 'El dorsal debe ser un número entero' })
  })

  it('debería dar error de dorsal con letras', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: 'abc' }, [])
    expect(errores).toEqual({ dorsal: 'El dorsal debe ser un número entero' })
  })

  it('debería dar error de repetido con dorsal existente', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '10' }, [
      { id: '1', nombre: 'Otro', dorsal: 10, esPortero: false },
    ])
    expect(errores).toEqual({ dorsal: 'Ya lo lleva Otro' })
  })

  it('debería no dar errores al editar el propio dorsal', () => {
    const errores = validarJugador(
      { nombre: 'Jugador', dorsal: '10' },
      [{ id: '0', nombre: 'Jugador', dorsal: 10, esPortero: false }],
      '0',
    )
    expect(errores).toEqual({})
  })

  it('debería no dar errores con datos válidos', () => {
    const errores = validarJugador({ nombre: 'Jugador', dorsal: '10' }, [])
    expect(errores).toEqual({})
  })
})
