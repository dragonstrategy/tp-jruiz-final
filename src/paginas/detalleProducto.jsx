import { Helmet } from "react-helmet"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerProductoPorId } from '../servicios/apiProductos.jsx'
import TarjetaCarga from '../componentes/tarjetaCarga.jsx'
import { usarCarrito } from '../contexto/contextoCarrito.jsx'
import { Caja, PanelError } from '../styled/ui.jsx'
import { toast } from 'react-toastify'

export default function DetalleProducto() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const { agregarAlCarrito } = usarCarrito()

  useEffect(() => {
    let vivo = true
    async function cargar() {
      try {
        setCargando(true)
        setError(null)
        const p = await obtenerProductoPorId(id)
        if (vivo) setProducto(p)
      } catch {
        if (vivo) setError('No pudimos cargar el producto.')
      } finally {
        if (vivo) setCargando(false)
      }
    }
    cargar()
    return () => { vivo = false }
  }, [id])

  if (cargando)
    return (
      <Caja>
        <TarjetaCarga />
      </Caja>
    )

  if (error)
    return (
      <Caja>
        <PanelError>
          <p>{error}</p>
        </PanelError>
      </Caja>
    )

    return (
    <Caja>
      <Helmet>
        <title>{producto.nombre} – Mi Tienda Simple</title>
        <meta name="description" content={`Detalles del producto ${producto.nombre}.`} />
      </Helmet>

      <h2>{producto.nombre}</h2>
      <p className="aviso">#{producto.id}</p>

      {producto.image && (
        <img
          src={producto.image}
          alt={producto.nombre}
          style={{
            width: '100%',
            maxWidth: '320px',
            height: 'auto',
            borderRadius: '0.75rem',
            marginBottom: '1rem',
          }}
        />
      )}

      {producto.descripcion && <p>{producto.descripcion}</p>}
      <p>
        <strong>Precio:</strong> ${producto.precio.toFixed(2)}
      </p>
      <button
        className="btn"
        onClick={() => {
          agregarAlCarrito(producto)
          toast.success(`"${producto.nombre}" se agregó al carrito`)
        }}
        aria-label="Agregar producto al carrito"
      >
        Agregar al carrito
      </button>
    </Caja>
  )

}
