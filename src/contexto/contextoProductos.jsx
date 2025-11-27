
import { createContext, useContext, useEffect, useState } from 'react'
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../servicios/apiProductos.jsx'

const ProductosContexto = createContext(null)

export function ProveedorProductos({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const cargarProductos = async () => {
    try {
      setCargando(true)
      setError(null)
      const lista = await obtenerProductos()
      setProductos(lista)
    } catch (e) {
      setError(e.message || 'No pudimos cargar los productos.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const crearProductoCtx = async (datos) => {
    const creado = await crearProducto(datos)
    setProductos((prev) => [...prev, creado])
    return creado
  }

  const actualizarProductoCtx = async (id, datos) => {
    const actualizado = await actualizarProducto(id, datos)
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? actualizado : p))
    )
    return actualizado
  }

  const eliminarProductoCtx = async (id) => {
    await eliminarProducto(id)
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductosContexto.Provider
      value={{
        productos,
        cargando,
        error,
        cargarProductos,
        crearProducto: crearProductoCtx,
        actualizarProducto: actualizarProductoCtx,
        eliminarProducto: eliminarProductoCtx,
      }}
    >
      {children}
    </ProductosContexto.Provider>
  )
}

export function usarProductos() {
  return useContext(ProductosContexto)
}
