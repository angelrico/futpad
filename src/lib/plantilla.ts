import type { ErroresJugador, Jugador, JugadorFormulario } from '../types/plantilla'

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

  if (nombre === '') {
    errores.nombre = 'El nombre es obligatorio'
  }

  if (textoDorsal === '') {
    errores.dorsal = 'El dorsal es obligatorio'
  } else if (!Number.isInteger(dorsal)) {
    errores.dorsal = 'El dorsal debe ser un número entero'
  } else if (dorsal < 1 || dorsal > 99) {
    errores.dorsal = 'El dorsal debe estar entre 1 y 99'
  } else if (jugadorRepetido) {
    errores.dorsal = `Ya lo lleva ${jugadorRepetido.nombre}`
  }

  return errores
}
