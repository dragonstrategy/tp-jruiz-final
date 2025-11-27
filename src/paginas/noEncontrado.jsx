
import { Link } from 'react-router-dom'
import { Caja } from '../styled/ui.jsx'

export default function NoEncontrado() {
  return (
    <Caja>
      <h2>Página no encontrada</h2>
      <p className="aviso">La ruta solicitada no existe.</p>
      <Link className="btn" to="/">
        Volver al inicio
      </Link>
    </Caja>
  )
}
