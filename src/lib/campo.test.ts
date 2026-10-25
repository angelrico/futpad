import { describe, it, expect } from 'vitest'
import { encajarCampo } from './campo'

describe('encajarCampo', () => {
  it('ocupa todo el alto cuando el hueco es más ancho que el campo', () => {
    expect(encajarCampo(1000, 400, 1.5)).toEqual({ ancho: 600, alto: 400 })
  })

  it('ocupa todo el ancho cuando el hueco es más alto que el campo', () => {
    expect(encajarCampo(400, 1000, 1.5)).toEqual({ ancho: 400, alto: 266 })
  })

  it('ocupa lo mismo el ancho que el alto', () => {
    expect(encajarCampo(500, 500, 1)).toEqual({ ancho: 500, alto: 500 })
  })

  it('devuelve 0 × 0 si aún no hay espacio medido', () => {
    expect(encajarCampo(0, 0, 1.5)).toEqual({ ancho: 0, alto: 0 })
  })
})
