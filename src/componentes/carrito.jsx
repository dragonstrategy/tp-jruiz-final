import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'

export default function Carrito({ items, onSumar, onRestar, onEliminar }) {
  if (items.length === 0) {
    return <p className="aviso">Aún no hay productos en el carrito.</p>
  }

  return (
    <div className="row g-3">
      {items.map((item) => (
        <div key={item.id} className="col-12">
          <div className="card p-3 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center">

            <div className="d-flex flex-column mb-2 mb-md-0">
              <strong>{item.nombre}</strong>
              <span className="text-muted">Cant.: {item.cantidad}</span>
            </div>

            <div className="d-flex gap-2 mb-2 mb-md-0">
              <button
                className="btn btn-secondary"
                onClick={() => onRestar(item.id)}
                aria-label="Restar unidad del producto"
              >
                <FaMinus />
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => onSumar(item.id)}
                aria-label="Sumar unidad del producto"
              >
                <FaPlus />
              </button>

              <button
                className="btn btn-danger"
                onClick={() => onEliminar(item.id)}
                aria-label="Eliminar producto del carrito"
              >
                <FaTrash />
              </button>
            </div>

            <span className="text-muted">
              Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
            </span>

          </div>
        </div>
      ))}
    </div>
  )
}
