
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContexto = createContext(null)

// mail del admin
const ADMIN_EMAIL = 'admin@tienda.com'

export function ProveedorAuth({ children }) {
  const [usuario, setUsuario] = useState(null) // {nombre, email, rol}

  // Restaurar sesión desde localStorage
  useEffect(() => {
    const guardado = localStorage.getItem('usuario')
    if (guardado) {
      try {
        const u = JSON.parse(guardado)
        // Compatibilidad por si antes no tenía rol
        if (!u.rol) {
          u.rol = u.email === ADMIN_EMAIL ? 'admin' : 'cliente'
        }
        setUsuario(u)
      } catch {
        // Si algo está mal, limpiamos
        localStorage.removeItem('usuario')
      }
    }
  }, [])

  const iniciarSesion = ({ nombre, email }) => {
    const rol = email === ADMIN_EMAIL ? 'admin' : 'cliente'
    const u = { nombre, email, rol }
    setUsuario(u)
    localStorage.setItem('usuario', JSON.stringify(u))
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContexto.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContexto.Provider>
  )
}

export function usarAuth() {
  return useContext(AuthContexto)
}
