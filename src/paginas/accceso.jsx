import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usarAuth } from '../contexto/contextoAuth.jsx'
import { Helmet } from "react-helmet"
import { Caja, PanelError } from '../styled/ui.jsx'

export default function Acceso() {
  const { iniciarSesion } = usarAuth()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const navegar = useNavigate()

  const manejarSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!nombre.trim() || !email.trim()) {
      setError('Completá nombre y email.')
      return
    }

    const nombreFinal = nombre.trim()
    const emailFinal = email.trim()

    // Realiza el login
    iniciarSesion({ nombre: nombreFinal, email: emailFinal })

    // Redirección por rol (admin vs usuario común)
    if (emailFinal === 'admin@tienda.com') {
      navegar('/admin/productos', { replace: true })
    } else {
      navegar('/productos', { replace: true })
    }
  }

  return (
    <Caja>
      <Helmet>
        <title>Acceso – Mi Tienda Simple</title>
        <meta name="description" content="Accedé a tu cuenta para comprar o administrar productos." />
      </Helmet>

      <h2>Acceso</h2>

      <form className="formulario" onSubmit={manejarSubmit}>
        <label>
          <span>Nombre</span>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {error && (
          <PanelError style={{ marginTop: '.5rem' }}>
            <p>{error}</p>
          </PanelError>
        )}

        <button className="btn" type="submit">
          Ingresar
        </button>
      </form>

      <p className="aviso" style={{ marginTop: '.5rem' }}>
        Acceso ficticio solo para demo.  
        Para administrar la tienda usá el email: <strong>admin@tienda.com</strong>.
      </p>
    </Caja>
  )
}
