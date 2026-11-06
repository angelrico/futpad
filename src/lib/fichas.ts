import type { Equipo, Ficha, Rol, DatosNuevaFicha, CambiosFicha } from '../types/pizarra'
import type { Jugador } from '../types/plantilla'

export const RADIO_FICHA = 22

// Mismos valores que --color-tinta y blanco en index.css (Konva no puede leer clases de Tailwind)
export const COLOR_DORSAL_OSCURO = '#13261a'
export const COLOR_DORSAL_CLARO = '#ffffff'
// Mismo valor que --color-destacado-500 en index.css
export const COLOR_SELECCION = '#f5b72e'

export function colorDorsal(color: string): string {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  const brillo = 0.299 * r + 0.587 * g + 0.114 * b
  return brillo < 150 ? COLOR_DORSAL_CLARO : COLOR_DORSAL_OSCURO
}

export const COLORES_FICHA: Record<Equipo, Record<Rol, string>> = {
  propio: { campo: '#2563eb', portero: '#f4c542' },
  rival: { campo: '#c62f2f', portero: '#9333ea' },
}

export function crearFicha({ equipo, rol, dorsal }: DatosNuevaFicha): Ficha {
  return {
    id: crypto.randomUUID(),
    equipo,
    rol,
    x: 0.5,
    y: 0.5,
    color: COLORES_FICHA[equipo][rol],
    jugadorId: null,
    dorsal,
  }
}

export function crearFichaDeJugador(jugador: Jugador): Ficha {
  return {
    ...crearFicha({
      equipo: 'propio',
      rol: jugador.esPortero ? 'portero' : 'campo',
      dorsal: jugador.dorsal,
    }),
    jugadorId: jugador.id,
    nombre: jugador.nombre,
  }
}

export function cambiosDeRol(equipo: Equipo, rol: Rol): CambiosFicha {
  return { rol, color: COLORES_FICHA[equipo][rol] }
}
