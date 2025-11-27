// src/paginas/productos.jsx
import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet"
import TarjetaCarga from '../componentes/tarjetaCarga.jsx'
import ListaProductos from '../componentes/listaProductos.jsx'
import Paginador from '../componentes/paginador.jsx'
import { usarProductos } from '../contexto/contextoProductos.jsx'
import { usarCarrito } from '../contexto/contextoCarrito.jsx'
import { Caja, PanelError } from '../styled/ui.jsx'
import { toast } from 'react-toastify'

export default function Productos() {
  const { productos, cargando, error, cargarProductos } = usarProductos()
  const { agregarAlCarrito } = usarCarrito()

  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const itemsPorPagina = 8

  const manejarAgregar = (prod) => {
    agregarAlCarrito(prod)
    toast.success(`"${prod.nombre}" se agregó al carrito`)
  }

  const texto = busqueda.toLowerCase().trim()

  const productosFiltrados = productos.filter((p) => {
    if (!texto) return true
    const nombre = (p.nombre || '').toLowerCase()
    const categoria = (p.categoria || '').toLowerCase()
    return nombre.includes(texto) || categoria.includes(texto)
  })

  const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina) || 1

  useEffect(() => {
    // Cuando cambia la búsqueda o la cantidad de productos, volvemos a página 1
    setPaginaActual(1)
  }, [busqueda, productos.length])

  const indiceInicio = (paginaActual - 1) * itemsPorPagina
  const productosPagina = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + itemsPorPagina
  )

  return (
    <Caja>
      <Helmet>
        <title>Productos – Mi Tienda Simple</title>
        <meta
          name="description"
          content="Catálogo completo de productos disponibles en Mi Tienda Simple. Buscá por nombre o categoría."
        />
      </Helmet>

      <h2>Productos</h2>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <label className="form-label" htmlFor="busqueda-productos">
          Buscar por nombre o categoría
        </label>
        <input
          id="busqueda-productos"
          type="text"
          className="form-control"
          placeholder="Ej: remera, zapatillas, ropa..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar productos por texto"
        />
      </div>

      {cargando && <TarjetaCarga texto="Cargando productos..." />}

      {error && (
        <PanelError>
          <p>{error}</p>
          <button
            className="btn btn-secundario"
            onClick={cargarProductos}
            aria-label="Reintentar carga de productos"
          >
            Reintentar
          </button>
        </PanelError>
      )}

      {!cargando && !error && (
        <>
          {productosFiltrados.length === 0 ? (
            <p className="aviso">
              No se encontraron productos que coincidan con "{busqueda}".
            </p>
          ) : (
            <>
              <div className="row g-3">
                <ListaProductos
                  productos={productosPagina}
                  onAgregar={manejarAgregar}
                />
              </div>

              <Paginador
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={setPaginaActual}
              />
            </>
          )}
        </>
      )}
    </Caja>
  )
}
