
import { Link } from 'react-router-dom'
import { usarProductos } from '../contexto/contextoProductos.jsx'
import { Caja, PanelError } from '../styled/ui.jsx'
import { toast } from 'react-toastify'

export default function AdminProductos() {
  const {
    productos,
    cargando,
    error,
    eliminarProducto,
    cargarProductos,
  } = usarProductos()

const manejarEliminar = async (id) => {
    const confirmar = window.confirm(
      '¿Seguro que querés eliminar este producto?'
    )
    if (!confirmar) return

    try {
      await eliminarProducto(id)
      toast.success('Producto eliminado correctamente.')
    } catch (e) {
      alert('No se pudo eliminar el producto.')
      toast.error('No se pudo eliminar el producto.')
    }
  }

  return (
    <Caja>
      <h2>Administrar productos</h2>

      <div style={{ marginBottom: '.75rem' }}>
        <Link to="/admin/productos/nuevo" className="btn">
          + Nuevo producto
        </Link>
      </div>

      {cargando && <p className="aviso">Cargando productos...</p>}

      {error && (
        <PanelError>
          <p>{error}</p>
          <button
            className="btn btn-secundario"
            onClick={cargarProductos}
          >
            Reintentar
          </button>
        </PanelError>
      )}

      {!cargando && !error && productos.length === 0 && (
        <p className="aviso">No hay productos cargados.</p>
      )}

      {!cargando && !error && productos.length > 0 && (
  <ul className="lista-productos">
    {productos.map((p) => (
      <li key={p.id} className="item-producto">
        
        <div className="info">
          
          {p.image && (
            <img
              src={p.image}
              alt={p.nombre}
              style={{
                width: 48,
                height: 48,
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          )}
          
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>{p.nombre}</strong>
            <span className="precio">${p.precio.toFixed(2)}</span>
            <span className="aviso">{p.categoria}</span>
          </div>
        
        </div>

        <div className="grupo-botones">
          <Link
            to={`/admin/productos/${p.id}/editar`}
            className="btn btn-secundario"
          >
            Editar
          </Link>
          <button
            className="btn btn-secundario"
            onClick={() => manejarEliminar(p.id)}
          >
            Eliminar
          </button>
        </div>

      </li>
    ))}
  </ul>
)}

    </Caja>
  )
}
