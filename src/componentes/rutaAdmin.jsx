
import { Navigate, useLocation } from 'react-router-dom'
import { usarAuth } from '../contexto/contextoAuth.jsx'

export default function RutaAdmin({ children }) {
  const { usuario } = usarAuth()
  const ubicacion = useLocation()

  // Si no está logueado, va a acceso
  if (!usuario) {
    return (
      <Navigate
        to="/acceso"
        replace
        state={{ desde: ubicacion.pathname }}
      />
    )
  }

  // Si está logueado pero NO es admin, va al inicio
  if (usuario.rol !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Es admin: puede ver el contenido
  return children
}
