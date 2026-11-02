import type { DatosGuardados, Pizarra } from '../types/pizarra'
import type { Jugador } from '../types/plantilla'

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

export function cargarPlantilla(): Jugador[] {
  const datos = cargarDatos()
  return datos.plantilla
}

export function guardarPlantilla(plantilla: Jugador[]) {
  const datos = cargarDatos()
  datos.plantilla = plantilla
  guardarDatos(datos)
}

export function listarPizarras(): Pizarra[] {
  const datos = cargarDatos()
  return datos.pizarras
}

export function guardarPizarra(pizarra: Pizarra) {
  const datos = cargarDatos()
  const existe = datos.pizarras.some((p) => p.id === pizarra.id)
  if (existe) {
    datos.pizarras = datos.pizarras.map((p) => (p.id === pizarra.id ? pizarra : p))
  } else {
    datos.pizarras = [...datos.pizarras, pizarra]
  }
  guardarDatos(datos)
}

export function eliminarPizarra(id: string) {
  const datos = cargarDatos()
  datos.pizarras = datos.pizarras.filter((p) => p.id !== id)
  guardarDatos(datos)
}
