import { Link } from 'react-router-dom'
import { FaCartPlus, FaEdit } from 'react-icons/fa'
import { usarAuth } from '../contexto/contextoAuth.jsx'

export default function ListaProductos({ productos, onAgregar }) {
  const { usuario } = usarAuth()

  return (
    <>
      {productos.map((prod) => (
        <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 p-3 shadow-sm d-flex">

            {prod.image && (
              <img
                src={prod.image}
                alt={prod.nombre}
                className="mb-2"
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
            )}

            <h5 className="card-title mb-1">
              <Link
                to={`/productos/${prod.id}`}
                className="text-decoration-none text-dark"
              >
                {prod.nombre}
              </Link>
            </h5>

            <p className="text-muted mb-2">
              ${prod.precio.toFixed(2)}
            </p>

            <div className="mt-auto d-flex gap-2">
              <button
                className="btn btn-dark flex-grow-1"
                onClick={() => onAgregar(prod)}
              >
                <FaCartPlus style={{ marginRight: 4 }} />
                Agregar
              </button>

              {usuario?.rol === 'admin' && (
                <Link
                  to={`/admin/productos/${prod.id}/editar`}
                  className="btn btn-secundario"
                  title="Editar producto"
                >
                  <FaEdit />
                </Link>
              )}

            </div>

          </div>
        </div>
      ))}
    </>
  )
}
