// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayerForm from './PlayerForm'
import type { Jugador } from '../types/plantilla'

// jsdom no implementa showModal() ni close() de <dialog>
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})

// Sin globals de Vitest, Testing Library no desmonta entre tests
afterEach(cleanup)

function renderizar(jugadores: Jugador[] = []) {
  const onGuardar = vi.fn()
  render(
    <PlayerForm jugador={null} jugadores={jugadores} onCerrar={() => {}} onGuardar={onGuardar} />,
  )
  return { onGuardar, usuario: userEvent.setup() }
}

describe('PlayerForm', () => {
  it('debería mostrar un error y no guardar si el nombre está vacío', async () => {
    const { onGuardar, usuario } = renderizar()

    await usuario.type(screen.getByLabelText('Dorsal (1-99)'), '10')
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('El nombre es obligatorio')).toBeTruthy()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('debería mostrar un error si el dorsal está fuera de rango', async () => {
    const { onGuardar, usuario } = renderizar()
    await usuario.type(screen.getByLabelText('Nombre'), 'Rubén')
    await usuario.type(screen.getByLabelText('Dorsal (1-99)'), '120')
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByText('El dorsal debe estar entre 1 y 99')).toBeTruthy()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('debería mostrar quién lleva el dorsal si está repetido', async () => {
    const dani: Jugador = { id: '1', nombre: 'Dani', dorsal: 10, esPortero: false }
    const { onGuardar, usuario } = renderizar([dani])
    await usuario.type(screen.getByLabelText('Nombre'), 'Rubén')
    await usuario.type(screen.getByLabelText('Dorsal (1-99)'), '10')
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByText('Ya lo lleva Dani')).toBeTruthy()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('debería guardar los datos limpios si todo es válido', async () => {
    const { onGuardar, usuario } = renderizar()
    await usuario.type(screen.getByLabelText('Nombre'), ' Rubén ')
    await usuario.type(screen.getByLabelText('Dorsal (1-99)'), '7')
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onGuardar).toHaveBeenCalledWith({ nombre: 'Rubén', dorsal: 7, esPortero: false })
  })
})
