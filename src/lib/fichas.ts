export const RADIO_FICHA = 22

// Mismos valores que --color-tinta y blanco en index.css (Konva no puede leer clases de Tailwind)
export const COLOR_DORSAL_OSCURO = '#13261a'
export const COLOR_DORSAL_CLARO = '#ffffff'

export function colorDorsal(color: string): string {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  const brillo = 0.299 * r + 0.587 * g + 0.114 * b
  return brillo < 150 ? COLOR_DORSAL_CLARO : COLOR_DORSAL_OSCURO
}
