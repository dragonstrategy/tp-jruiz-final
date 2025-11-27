import { Helmet } from "react-helmet"
import Carrito from '../componentes/carrito.jsx'
import { usarCarrito } from '../contexto/contextoCarrito.jsx'
import { Caja } from '../styled/ui.jsx'

export default function VerCarrito() {
  const { carrito, sumarCantidad, restarCantidad, eliminarItem } = usarCarrito()

  return (
    <Caja>
      <Helmet>
        <title>Carrito – Mi Tienda Simple</title>
        <meta name="description" content="Revisá los productos que agregaste al carrito." />
      </Helmet>

      <h2>Tu carrito</h2>
      <Carrito
        items={carrito}
        onSumar={sumarCantidad}
        onRestar={restarCantidad}
        onEliminar={eliminarItem}
      />
    </Caja>
  )
}

