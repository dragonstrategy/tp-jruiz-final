import { Helmet } from "react-helmet"
import Carrito from '../componentes/carrito.jsx'
import { usarCarrito } from '../contexto/contextoCarrito.jsx'
import { Caja } from '../styled/ui.jsx'

export default function VerCarrito() {
  const { carrito, sumarCantidad, restarCantidad, eliminarItem } = usarCarrito()

  // 👉 cálculo del total
  const total = carrito.reduce(
    (acum, item) => acum + item.precio * item.cantidad,
    0
  )

  return (
    <Caja>
      <Helmet>
        <title>Carrito – Mi Tienda Simple</title>
        <meta
          name="description"
          content="Revisá los productos que agregaste al carrito."
        />
      </Helmet>

      <h2>Tu carrito</h2>

      <Carrito
        items={carrito}
        onSumar={sumarCantidad}
        onRestar={restarCantidad}
        onEliminar={eliminarItem}
      />

      {/* 👉 Total al final del carrito */}
      {carrito.length > 0 && (
        <div className="total-carrito">
          <span>Total de la compra:</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      )}
    </Caja>
  )
}

