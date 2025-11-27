// src/layouts/layoutTienda.jsx
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { usarAuth } from '../contexto/contextoAuth.jsx'
import { usarCarrito } from '../contexto/contextoCarrito.jsx'

import {
  FaShoppingCart,
  FaCashRegister,
  FaTools,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa'

export default function LayoutTienda({ children }) {
  const { usuario, cerrarSesion } = usarAuth()
  const { totalItems, totalPrecio, vaciarCarrito } = usarCarrito()

  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = () => setMenuAbierto((prev) => !prev)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <>
      <header className="barra">
        <h1 className="marca">
          <Link to="/" className="link-producto" onClick={cerrarMenu}>
            Mi Tienda Simple
          </Link>
        </h1>

        {/* Botón hamburguesa solo para pantallas chicas */}
        <button
          type="button"
          className="nav-toggle btn btn-secundario"
          onClick={toggleMenu}
          aria-label="Abrir o cerrar menú de navegación"
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav ${menuAbierto ? 'abierta' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={cerrarMenu}>
            Inicio
          </NavLink>

          <NavLink to="/productos" className="nav-link" onClick={cerrarMenu}>
            Productos
          </NavLink>



          <NavLink
            to="/carrito"
            className="nav-link"
            onClick={cerrarMenu}
          >
            <FaShoppingCart style={{ marginRight: 4 }} />
            Carrito ({totalItems})
          </NavLink>

          <NavLink
            to="/checkout"
            className="nav-link"
            onClick={cerrarMenu}
          >
            <FaCashRegister style={{ marginRight: 4 }} />
            Finalizar
          </NavLink>

            {usuario?.rol === 'admin' && (
              <NavLink
                to="/admin/productos"
                className="nav-link"
                onClick={cerrarMenu}
              >
                Admin
              </NavLink>
            )}

        </nav>

        <div className="resumen-carrito">
          <span>Total: ${totalPrecio.toFixed(2)}</span>

          <button
            className="btn btn-secundario"
            onClick={() => {
              vaciarCarrito()
              cerrarMenu()
            }}
            disabled={totalItems === 0}
          >
            Vaciar
          </button>

          {usuario ? (
            <div className="usuario">
              <span className="aviso">Hola, {usuario.nombre}</span>
              <button
                className="btn btn-secundario"
                onClick={() => {
                  cerrarSesion()
                  cerrarMenu()
                }}
              >
                <FaSignOutAlt style={{ marginRight: 4 }} />
                Salir
              </button>
            </div>
          ) : (
            <NavLink
              to="/acceso"
              className="nav-link"
              onClick={cerrarMenu}
            >
              <FaSignInAlt style={{ marginRight: 4 }} />
              Ingresar
            </NavLink>
          )}
        </div>
      </header>

      <main className="container my-4">{children}</main>

      <footer className="pie">
        <small>© {new Date().getFullYear()} Mi Tienda Simple</small>
      </footer>
    </>
  )
}
