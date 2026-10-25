import { RADIO_FICHA } from './fichas'

export function pasarAPixeles(
  valorX: number,
  valorY: number,
  anchoStage: number,
  altoStage: number,
) {
  return {
    x: valorX * anchoStage,
    y: valorY * altoStage,
  }
}

export function pasarANormalizado(
  pixelX: number,
  pixelY: number,
  anchoStage: number,
  altoStage: number,
) {
  return {
    x: anchoStage === 0 ? 0 : pixelX / anchoStage,
    y: altoStage === 0 ? 0 : pixelY / altoStage,
  }
}

export function limitarMovimiento(
  pixelX: number,
  pixelY: number,
  anchoStage: number,
  altoStage: number,
) {
  return {
    x: Math.max(RADIO_FICHA, Math.min(pixelX, anchoStage - RADIO_FICHA)),
    y: Math.max(RADIO_FICHA, Math.min(pixelY, altoStage - RADIO_FICHA)),
  }
}
