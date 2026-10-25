import { useState, useRef, useEffect } from 'react'

export function useTamanoContenedor<T extends HTMLElement>() {
  const [tamano, setTamano] = useState({ ancho: 0, alto: 0 })
  const ref = useRef<T>(null)

  useEffect(() => {
    // 1. Coger el elemento de ref.current (si no hay, salir)
    const mainActual = ref.current
    if (!mainActual) return
    // 2. Crear un ResizeObserver cuyo callback lea entry.contentRect.width / height
    //    y llame a setTamano
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        //const { width: ancho, height: alto } = entry.contentRect
        const { width, height } = entry.contentRect
        const ancho = Math.floor(width)
        const alto = Math.floor(height)
        setTamano({ ancho, alto })
      }
    })
    // 3. observer.observe(elemento)
    observer.observe(mainActual)
    // 4. Devolver una función que haga observer.disconnect()
    return () => observer.disconnect()
  }, [])

  return { ref, ...tamano }
}
