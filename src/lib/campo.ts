export function encajarCampo(
  anchoDisponible: number,
  altoDisponible: number,
  proporcion: number,
): { ancho: number; alto: number } {
  if (anchoDisponible / altoDisponible > proporcion) {
    const alto = altoDisponible
    const ancho = Math.floor(alto * proporcion)
    return { ancho, alto }
  } else {
    const ancho = anchoDisponible
    const alto = Math.floor(ancho / proporcion)
    return { ancho, alto }
  }
}
