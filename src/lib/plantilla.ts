import type { DatosJugador, ErroresJugador, Jugador, JugadorFormulario } from '../types/plantilla'

export function validarJugador(
  datos: Pick<JugadorFormulario, 'nombre' | 'dorsal'>,
  plantilla: Jugador[],
  idEditado?: string,
): ErroresJugador {
  const errores: ErroresJugador = {}

  const nombre = datos.nombre.trim()
  const textoDorsal = datos.dorsal.trim()
  const dorsal = Number(textoDorsal)
  const jugadorRepetido = plantilla.find(
    (jugador) => jugador.dorsal === dorsal && jugador.id !== idEditado,
  )

  const errorDorsal = validarDorsal(textoDorsal)
  if (errorDorsal) {
    errores.dorsal = errorDorsal
  } else if (jugadorRepetido) {
    errores.dorsal = `Ya lo lleva ${jugadorRepetido.nombre}`
  }

  if (nombre === '') {
    errores.nombre = 'El nombre es obligatorio'
  }

  return errores
}

export function crearJugador(datos: DatosJugador): Jugador {
  return {
    id: crypto.randomUUID(),
    ...datos,
  }
}

export function validarDorsal(texto: string): string | undefined {
  const limpio = texto.trim()
  if (limpio === '') {
    return 'El dorsal es obligatorio'
  }

  const dorsal = Number(limpio)
  if (!Number.isInteger(dorsal)) {
    return 'El dorsal debe ser un número entero'
  }

  if (dorsal < 1 || dorsal > 99) {
    return 'El dorsal debe estar entre 1 y 99'
  }

  return undefined
}
