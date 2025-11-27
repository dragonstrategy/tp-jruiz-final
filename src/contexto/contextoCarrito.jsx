
import { createContext, useContext, useEffect, useState } from 'react'

const CarritoContexto = createContext(null)

export function ProveedorCarrito({ children }) {
  const [carrito, setCarrito] = useState([])

  // Restaurar carrito desde localStorage
  useEffect(() => {
    const guardado = localStorage.getItem('carrito')
    if (guardado) {
      try {
        setCarrito(JSON.parse(guardado))
      } catch {
        setCarrito([])
      }
    }
  }, [])

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const sumarCantidad = (id) =>
    setCarrito((s) =>
      s.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    )

  const restarCantidad = (id) =>
    setCarrito((s) =>
      s
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    )

  const eliminarItem = (id) =>
    setCarrito((s) => s.filter((p) => p.id !== id))

  const vaciarCarrito = () => setCarrito([])

  const totalItems = carrito.reduce((a, p) => a + p.cantidad, 0)
  const totalPrecio = carrito.reduce(
    (a, p) => a + p.precio * p.cantidad,
    0
  )

  return (
    <CarritoContexto.Provider
      value={{
        carrito,
        agregarAlCarrito,
        sumarCantidad,
        restarCantidad,
        eliminarItem,
        vaciarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CarritoContexto.Provider>
  )
}

export function usarCarrito() {
  return useContext(CarritoContexto)
}
