// src/paginas/checkout.jsx
import { usarAuth } from '../contexto/contextoAuth.jsx'
import { Caja } from '../styled/ui.jsx'

export default function Checkout() {
  const { usuario } = usarAuth()

  return (
    <Caja>
      <h2>Finalizar compra</h2>
      <p>
        Hola <strong>{usuario?.nombre}</strong> ({usuario?.email})
      </p>
      <p>Esta es una ruta protegida. Solo usuarios autenticados pueden verla.</p>
      <p className="aviso">Aquí irían los pasos de pago/envío.</p>
    </Caja>
  )
}
