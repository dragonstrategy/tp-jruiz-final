import { Navigate, useLocation } from 'react-router-dom'
import { usarAuth } from '../contexto/contextoAuth.jsx'

export default function RutaProtegida({ children }) {
  const { usuario } = usarAuth()
  const ubicacion = useLocation()

  if (!usuario) {
    
    return <Navigate to="/acceso" replace state={{ desde: ubicacion.pathname }} />
  }
  return children
}
