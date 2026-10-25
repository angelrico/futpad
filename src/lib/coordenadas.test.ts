import { pasarAPixeles, pasarANormalizado, limitarMovimiento } from './coordenadas'
import { describe, it, expect } from 'vitest'

describe('coordenadas', () => {
  it('debe convertir coordenadas normalizadas a pixeles', () => {
    const result = pasarAPixeles(0.5, 0.5, 200, 100)
    expect(result).toEqual({ x: 100, y: 50 })
  })

  it('debe limitar las coordenadas dentro del escenario', () => {
    const result = limitarMovimiento(10, 10, 200, 100)
    expect(result).toEqual({ x: 22, y: 22 })
  })

  it('debe convertir coordenadas de pixeles a normalizadas', () => {
    const result = pasarANormalizado(100, 50, 200, 100)
    expect(result).toEqual({ x: 0.5, y: 0.5 })
  })

  it('debe convertir coordenadas de pixeles a normalizadas con Stage vacío', () => {
    const result = pasarANormalizado(100, 50, 0, 0)
    expect(result).toEqual({ x: 0, y: 0 })
  })

  it('debe convertir coordenadas de pixeles a normalizadas con Stage con x=0', () => {
    const result = pasarANormalizado(100, 50, 0, 100)
    expect(result).toEqual({ x: 0, y: 0.5 })
  })

  it('debe convertir coordenadas de pixeles a normalizadas con Stage con y=0', () => {
    const result = pasarANormalizado(100, 50, 100, 0)
    expect(result).toEqual({ x: 1, y: 0 })
  })

  it('debe limitar las coordenadas cuando exceden el escenario', () => {
    const result = limitarMovimiento(190, 90, 200, 100)
    expect(result).toEqual({ x: 178, y: 78 })
  })

  it('debe limitar las coordenadas cuando están por encima del escenario', () => {
    const result = limitarMovimiento(250, 150, 200, 100)
    expect(result).toEqual({ x: 178, y: 78 })
  })

  it('debe limitar las coordenadas solo del eje x si se sale solo en el x', () => {
    const result = limitarMovimiento(250, 50, 200, 100)
    expect(result).toEqual({ x: 178, y: 50 })
  })

  it('debe limitar las coordenadas cuando están exactamente en el borde del escenario', () => {
    const result = limitarMovimiento(22, 22, 200, 100)
    expect(result).toEqual({ x: 22, y: 22 })
  })

  it('debe convertir las coordenadas normalizadas a pixeles y de vuelta a normalizadas', () => {
    const pixeles = pasarAPixeles(0.5, 0.5, 200, 100)
    const normalizado = pasarANormalizado(pixeles.x, pixeles.y, 200, 100)
    expect(normalizado).toEqual({ x: 0.5, y: 0.5 })
  })

  it('debe convertir coordenadas de pixeles a normalizadas y de vuelta a pixeles', () => {
    const normalizado = pasarANormalizado(100, 50, 200, 100)
    const pixeles = pasarAPixeles(normalizado.x, normalizado.y, 200, 100)
    expect(pixeles).toEqual({ x: 100, y: 50 })
  })

  it('debe limitar las coordenadas cuando están en el centro del escenario', () => {
    const result = limitarMovimiento(100, 50, 200, 100)
    expect(result).toEqual({ x: 100, y: 50 })
  })
})
