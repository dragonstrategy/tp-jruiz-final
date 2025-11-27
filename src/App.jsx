// src/App.jsx
import { Routes, Route } from 'react-router-dom'

import LayoutTienda from './layouts/layoutTienda.jsx'
import Inicio from './paginas/inicio.jsx'
import Productos from './paginas/productos.jsx'
import DetalleProducto from './paginas/detalleProducto.jsx'
import VerCarrito from './paginas/verCarrito.jsx'
import NoEncontrado from './paginas/noEncontrado.jsx'
import Acceso from './paginas/accceso.jsx'
import Checkout from './paginas/checkout.jsx'
import { ProveedorAuth } from './contexto/contextoAuth.jsx'
import { ProveedorProductos } from './contexto/contextoProductos.jsx'
import { ProveedorCarrito } from './contexto/contextoCarrito.jsx'
import RutaProtegida from './componentes/rutaProtegida.jsx'
import RutaAdmin from './componentes/rutaAdmin.jsx'
import AdminProductos from './paginas/adminProductos.jsx'
import AgregarProducto from './paginas/agregarProducto.jsx'
import EditarProducto from './paginas/editarProducto.jsx'

export default function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <ProveedorCarrito>
          <LayoutTienda>
            <Routes>
              {/* Públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<VerCarrito />} />
              <Route path="/acceso" element={<Acceso />} />

              {/* Ruta protegida para usuarios logueados (cliente o admin) */}
              <Route
                path="/checkout"
                element={
                  <RutaProtegida>
                    <Checkout />
                  </RutaProtegida>
                }
              />

              {/* Rutas solo para admin */}
              <Route
                path="/admin/productos"
                element={
                  <RutaAdmin>
                    <AdminProductos />
                  </RutaAdmin>
                }
              />

              <Route
                path="/admin/productos/nuevo"
                element={
                  <RutaAdmin>
                    <AgregarProducto />
                  </RutaAdmin>
                }
              />

              <Route
                path="/admin/productos/:id/editar"
                element={
                  <RutaAdmin>
                    <EditarProducto />
                  </RutaAdmin>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </LayoutTienda>
        </ProveedorCarrito>
      </ProveedorProductos>
    </ProveedorAuth>
  )
}
