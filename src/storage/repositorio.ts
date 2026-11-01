import type { DatosGuardados } from '../types/pizarra'

export const CLAVE = 'futpad:datos'

export function datosVacios(): DatosGuardados {
  return {
    version: 1,
    plantilla: [],
    pizarras: [],
  }
}

export function guardarDatos(datos: DatosGuardados) {
  localStorage.setItem(CLAVE, JSON.stringify(datos))
}

export function cargarDatos(): DatosGuardados {
  const texto = localStorage.getItem(CLAVE)
  if (!texto) return datosVacios()

  try {
    const datosJSON: unknown = JSON.parse(texto)
    if (esDatosGuardados(datosJSON)) return datosJSON
    return datosVacios()
  } catch {
    return datosVacios()
  }
}

function esDatosGuardados(valor: unknown): valor is DatosGuardados {
  if (typeof valor !== 'object' || valor === null) return false
  return (
    'version' in valor &&
    valor.version === 1 &&
    'plantilla' in valor &&
    Array.isArray(valor.plantilla) &&
    'pizarras' in valor &&
    Array.isArray(valor.pizarras)
  )
}
