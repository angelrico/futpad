// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SquadList from './SquadList'
import type { Jugador } from '../types/plantilla'

afterEach(cleanup)

const dani: Jugador = { id: '1', nombre: 'Dani', dorsal: 10, esPortero: false }
const ruben: Jugador = { id: '2', nombre: 'Rubén', dorsal: 7, esPortero: false }

function renderizar() {
  const onAgregarAlCampo = vi.fn()
  render(
    <SquadList
      jugadores={[dani, ruben]}
      idsEnCampo={new Set([dani.id])}
      onAgregarAlCampo={onAgregarAlCampo}
      onEditar={() => {}}
      onNuevo={() => {}}
      onEliminar={() => {}}
    />,
  )
  return { onAgregarAlCampo, usuario: userEvent.setup() }
}

describe('SquadList', () => {
  it('debería desactivar «Añadir» si el jugador ya está en el campo', () => {
    renderizar()
    const boton = screen.getByRole('button', { name: `${dani.nombre} ya está en el campo` })
    expect(boton).toHaveProperty('disabled', true)
  })

  it('debería añadir al jugador que no está en el campo', async () => {
    const { onAgregarAlCampo, usuario } = renderizar()
    const botonRuben = screen.getByRole('button', { name: `Añadir a ${ruben.nombre} al campo` })
    await usuario.click(botonRuben)
    expect(onAgregarAlCampo).toHaveBeenCalledWith(ruben)
  })

  it('no debería hacer nada al pulsar el botón de un jugador que ya está en el campo', async () => {
    const { onAgregarAlCampo, usuario } = renderizar()
    const botonDani = screen.getByRole('button', { name: `${dani.nombre} ya está en el campo` })
    await usuario.click(botonDani)
    expect(onAgregarAlCampo).not.toHaveBeenCalled()
  })
})
